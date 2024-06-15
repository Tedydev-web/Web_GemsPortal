using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_SupplierModel
    {
        Task<ResponseData<List<M_SupplierModel>>> getListSupplierModelBySequenceStatus(string sequenceStatus);
    }
    public class S_SupplierModel : IS_SupplierModel
    {
        private readonly ICallBaseApi _callApi;
        public S_SupplierModel(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_SupplierModel>>> getListSupplierModelBySequenceStatus(string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_SupplierModel>>("SupplierModel/getListSupplierModelBySequenceStatus", dictPars);
        }
    }
}
