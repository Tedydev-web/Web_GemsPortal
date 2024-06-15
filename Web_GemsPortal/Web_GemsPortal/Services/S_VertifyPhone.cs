using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_VertifyPhone
    {
        Task<ResponseData<M_VertifyPhone>> VertifyPhone(string id, string activeCode, string phoneNumber);
        Task<ResponseData<object>> ResendCode(string id);
    }
    public class S_VertifyPhone : IS_VertifyPhone
    {
        private readonly ICallBaseApi _callApi;
        public S_VertifyPhone(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<M_VertifyPhone>> VertifyPhone(string id, string activeCode, string phoneNumber)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
                {"activeCode", activeCode},
                {"phoneNumber", phoneNumber},
            };
            return await _callApi.PostResponseDataAsync<M_VertifyPhone>("VertifyPhone/VertifyPhone", dictPars);
        }
        public async Task<ResponseData<object>> ResendCode(string id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
            };
            return await _callApi.PostResponseDataAsync<object>("VertifyPhone/ResendCode", dictPars);
        }
    }
}
