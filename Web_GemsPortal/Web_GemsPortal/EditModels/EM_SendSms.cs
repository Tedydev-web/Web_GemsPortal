using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.EditModels
{
    public class EM_SendSms
    {
        public string templateId { get; set; }
        public string phone { get; set; }
        public string param1 { get; set; }
        public string param2 { get; set; }
        public string param3 { get; set; }
    }
}
