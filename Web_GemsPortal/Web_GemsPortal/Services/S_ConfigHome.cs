using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_ConfigHome
    {
        Task<ResponseData<List<M_ConfigHome>>> GetById(int id);
        Task<ResponseData<List<M_ConfigHome>>> GetListBySequenceStatusSupplierIdLocation(string sequenceStatus, int supplierId, int location);

    }
    public class S_ConfigHome : IS_ConfigHome
    {
        private readonly ICallBaseApi _callApi;
        public S_ConfigHome(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_ConfigHome>>> GetById(int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<List<M_ConfigHome>>("ConfigHome/GetById", dictPars);
        }
        public async Task<ResponseData<List<M_ConfigHome>>> GetListBySequenceStatusSupplierIdLocation(string sequenceStatus, int supplierId, int location)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"sequenceStatus", sequenceStatus},
                {"location", location},
            };
            return await _callApi.GetResponseDataAsync<List<M_ConfigHome>>("ConfigHome/GetListBySequenceStatusSupplierIdLocation", dictPars);
        }
    }
}
