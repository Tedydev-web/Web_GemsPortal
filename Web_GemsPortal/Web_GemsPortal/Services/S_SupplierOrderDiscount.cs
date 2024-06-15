using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_SupplierOrderDiscount
    {
        Task<ResponseData<List<M_SupplierOrderDiscount>>> getListSupplierOrderDiscountBySupplierId(string supplierId);
    }
    public class S_SupplierOrderDiscount : IS_SupplierOrderDiscount
    {
        private readonly ICallBaseApi _callApi;
        public S_SupplierOrderDiscount(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_SupplierOrderDiscount>>> getListSupplierOrderDiscountBySupplierId(string supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
            };
            return await _callApi.GetResponseDataAsync<List<M_SupplierOrderDiscount>>("SupplierOrderDiscount/getListSupplierOrderDiscountBySupplierId", dictPars);
        }
    }
}
