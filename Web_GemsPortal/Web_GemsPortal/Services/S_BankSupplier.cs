using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_BankSupplier
    {
        Task<ResponseData<List<M_BankSupplier>>> getListBankSupplierBySupplierId(string supplierId);
    }
    public class S_BankSupplier : IS_BankSupplier
    {
        private readonly ICallBaseApi _callApi;
        public S_BankSupplier(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_BankSupplier>>> getListBankSupplierBySupplierId(string supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
            };
            return await _callApi.GetResponseDataAsync<List<M_BankSupplier>>("BankSupplier/getListBankSupplierBySupplierId", dictPars);
        }
    }
}
