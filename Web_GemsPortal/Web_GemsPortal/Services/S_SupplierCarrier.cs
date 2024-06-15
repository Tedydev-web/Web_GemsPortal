using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_SupplierCarrier
    {
        Task<ResponseData<string>> getTokenSupplierCarrier(string carrierCode, string supplierId);
        Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySequenceSupplier(string sequenceSuplier);

        Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySupplierId(string supplierId);
        Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySupplierIdStatus(string supplierId, int status);
        Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySupplierIdSequenceStatus(string supplierId, string sequenceStatus);
        Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySupplierIdCarrierIdStatus(string supplierId, int status, int carrierId);
    }
    public class S_SupplierCarrier : IS_SupplierCarrier
    {
        private readonly ICallBaseApi _callApi;
        public S_SupplierCarrier(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<string>> getTokenSupplierCarrier(string carrierCode, string supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"carrierCode", carrierCode},
            };
            return await _callApi.GetResponseDataAsync<string>("SupplierCarrier/getTokenSupplierCarrier", dictPars);
        }
        public async Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySequenceSupplier(string sequenceSuplier)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceSuplier", sequenceSuplier},
            };
            return await _callApi.GetResponseDataAsync<List<M_SupplierCarrier>>("SupplierCarrier/getListSupplierCarrierBySequenceSupplier", dictPars);
        }
        public async Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySupplierId(string supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
            };
            return await _callApi.GetResponseDataAsync<List<M_SupplierCarrier>>("SupplierCarrier/getListSupplierCarrierBySupplierId", dictPars);
        }
        public async Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySupplierIdStatus(string supplierId, int status)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"status", status},
            };
            return await _callApi.GetResponseDataAsync<List<M_SupplierCarrier>>("SupplierCarrier/getListSupplierCarrierBySupplierIdStatus", dictPars);
        }
        public async Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySupplierIdSequenceStatus(string supplierId, string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_SupplierCarrier>>("SupplierCarrier/getListSupplierCarrierBySupplierIdSequenceStatus", dictPars);
        }
        public async Task<ResponseData<List<M_SupplierCarrier>>> getListSupplierCarrierBySupplierIdCarrierIdStatus(string supplierId, int status, int carrierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"status", status},
                {"carrierId", carrierId},
            };
            return await _callApi.GetResponseDataAsync<List<M_SupplierCarrier>>("SupplierCarrier/getListSupplierCarrierBySupplierIdCarrierIdStatus", dictPars);
        }
    }
}
