using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Reason
    {
        Task<ResponseData<List<M_Reason>>> getListReason();
        Task<ResponseData<List<M_Reason>>> getListReasonByType(int type = 2);
    }
    public class S_Reason : IS_Reason
    {
        private readonly ICallBaseApi _callApi;
        public S_Reason(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_Reason>>> getListReason()
        {
            return await _callApi.GetResponseDataAsync<List<M_Reason>>("Reason/getListReason", default(Dictionary<string, dynamic>));
        }
        public async Task<ResponseData<List<M_Reason>>> getListReasonByType(int type = 2)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"type", type},
            };
            return await _callApi.GetResponseDataAsync<List<M_Reason>>("Reason/getListReasonByType", dictPars);
        }
    }
}
