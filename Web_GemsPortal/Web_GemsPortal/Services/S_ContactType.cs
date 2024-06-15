using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_ContactType
    {
        Task<ResponseData<List<M_ContactType>>> getListContactTypeByStatusBranch(int branch, int status = 1);
    }
    public class S_ContactType : IS_ContactType
    {
        private readonly ICallBaseApi _callApi;
        public S_ContactType(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_ContactType>>> getListContactTypeByStatusBranch(int branch, int status = 1) //branch = 0 : contact page  |  branch = 1 : ctv page
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"status", status},
                {"branch", branch},
            };
            return await _callApi.GetResponseDataAsync<List<M_ContactType>>("ContactType/getListContactTypeByStatusBranch", dictPars);
        }
    }
}
