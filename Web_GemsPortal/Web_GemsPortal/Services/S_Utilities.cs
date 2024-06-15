using Web_GemsPortal.EditModels;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_Utilities
    {
        Task<ResponseData<object>> SendSmsList(string supplierId, EM_SendSms model);
    }
    public class S_Utilities : IS_Utilities
    {
        private readonly ICallBaseApi _callApi;
        public S_Utilities(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<object>> SendSmsList(string supplierId, EM_SendSms model)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"phone", model.phone},
                {"param1", model.param1},
                {"templateId",model.templateId},
                {"param2", model.param2},
                {"param3", model.param3},
            };
            return await _callApi.PostResponseDataAsync<object>("Utilities/SendSmsList", dictPars);
        }
    }
}
