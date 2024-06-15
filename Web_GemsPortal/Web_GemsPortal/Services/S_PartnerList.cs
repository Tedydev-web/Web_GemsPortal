using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_PartnerList
    {
        Task<ResponseData<List<M_PartnerList>>> getListPartnerListBySequenceStatus(string sequenceStatus, int? ísSupplier);
    }
    public class S_PartnerList : IS_PartnerList
    {
        private readonly ICallBaseApi _callApi;
        public S_PartnerList(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_PartnerList>>> getListPartnerListBySequenceStatus(string sequenceStatus, int? ísSupplier)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
                {"isSupplier", ísSupplier},
            };
            return await _callApi.GetResponseDataAsync<List<M_PartnerList>>("PartnerList/getListPartnerListBySequenceStatus", dictPars);
        }
    }
}
