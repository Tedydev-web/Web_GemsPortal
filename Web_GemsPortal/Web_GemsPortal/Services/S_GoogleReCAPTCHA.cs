using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Web_GemsPortal.Services
{
    public interface IS_GoogleReCAPTCHA
    {
        Task<GoogleRespo> VertifyToken(string token);
    }
    public class S_GoogleReCAPTCHA : IS_GoogleReCAPTCHA
    {
        private ReCAPTCHASettings _settings;

        public S_GoogleReCAPTCHA(IOptions<ReCAPTCHASettings> settings)
        {
            _settings = settings.Value;
        }
        public virtual async Task<GoogleRespo> VertifyToken(string token)
        {
            GooglereCaptchaData _mydata = new GooglereCaptchaData
            {
                response = token,
                secret = _settings.ReCAPTCHA_Secret_Key
            };
            using (HttpClient client = new HttpClient())
            {
                var response = await client.GetStringAsync($"https://www.google.com/recaptcha/api/siteverify?secret={_mydata.secret}&response={_mydata.response}");
                var capresp = JsonConvert.DeserializeObject<GoogleRespo>(response);
                return capresp;
            }
        }
    }
    public class GooglereCaptchaData
    {
        public string response { get; set; } //token
        public string secret { get; set; }
    }
    public class GoogleRespo
    {
        public bool success { get; set; }
        public double score { get; set; }
        public string action { get; set; }
        public DateTime challenge_ts { get; set; }
        public string hostname { get; set; }
    }
    public class ReCAPTCHASettings
    {
        public string ReCAPTCHA_Site_Key { get; set; }
        public string ReCAPTCHA_Secret_Key { get; set; }
    }
}
