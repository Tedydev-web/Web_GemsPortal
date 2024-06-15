using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_CustomerTestimonial
    {
        Task<ResponseData<List<M_CustomerTestimonial>>> GetListBySequenceStatusSupplierId(string sequenceStatus, int supplierId);

    }
    public class S_CustomerTestimonial: IS_CustomerTestimonial
    {
        private readonly ICallBaseApi _callApi;
        public S_CustomerTestimonial(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<List<M_CustomerTestimonial>>> GetListBySequenceStatusSupplierId(string sequenceStatus, int supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_CustomerTestimonial>>("CustomerTestimonial/GetListBySequenceStatusSupplierId", dictPars);
        }
    }
}
