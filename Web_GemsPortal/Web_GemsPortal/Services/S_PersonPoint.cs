using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_PersonPoint
    {
        Task<ResponseData<M_PersonPoint>> getPersonPointByPersonId(string access_token, string personId);
    }
    public class S_PersonPoint : IS_PersonPoint
    {
        private readonly ICallBaseApi _callApi;
        public S_PersonPoint(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<M_PersonPoint>> getPersonPointByPersonId(string access_token, string personId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"personId", personId},
            };
            return await _callApi.GetResponseDataAsync<M_PersonPoint>("PersonPoint/getPersonPointByPersonId", dictPars);
        }
    }
}
