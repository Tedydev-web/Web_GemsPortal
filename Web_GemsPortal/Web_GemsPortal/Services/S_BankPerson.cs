using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_BankPerson
    {
        Task<ResponseData<List<M_BankPerson>>> getListHubBankPersonBySupplierId(string supplierId);
    }
    public class S_BankPerson : IS_BankPerson
    {
        private readonly ICallBaseApi _callApi;
        public S_BankPerson(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_BankPerson>>> getListHubBankPersonBySupplierId(string supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
            };
            return await _callApi.GetResponseDataAsync<List<M_BankPerson>>("BankPerson/getListHubBankPersonBySupplierId", dictPars);
        }
    }
}
