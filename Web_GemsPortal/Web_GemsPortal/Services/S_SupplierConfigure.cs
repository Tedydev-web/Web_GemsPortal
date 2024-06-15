using Web_GemsPortal.Lib;
using Web_GemsPortal.Models.FarmConfigure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_SupplierConfigure
    {
        Task<ResponseData<List<M_SupplierConfigure>>> checkExistsDomain(string domainName, int domainType = 0);
    }
    public class S_SupplierConfigure : IS_SupplierConfigure
    {
        private readonly ICallBaseApi _callApi;
        public S_SupplierConfigure(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_SupplierConfigure>>> checkExistsDomain(string domainName, int domainType = 0)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"domainName", domainName},
                {"domainType", domainType},//0: url portal; 1: url cms; 2: url ops
            };
            return await _callApi.GetResponseDataAsync<List<M_SupplierConfigure>>("SupplierConfigure/checkExistsDomain", dictPars);
        }
    }
}
