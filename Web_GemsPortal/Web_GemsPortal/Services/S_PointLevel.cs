using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_PointLevel
    {
        Task<ResponseData<List<M_PointLevel>>> getListPointLevelBySequenceStatus(string sequenceStatus = "1");
    }
    public class S_PointLevel : IS_PointLevel
    {
        private readonly ICallBaseApi _callApi;
        public S_PointLevel(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_PointLevel>>> getListPointLevelBySequenceStatus(string sequenceStatus = "1")
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_PointLevel>>("PointLevel/getListPointLevelBySequenceStatus", dictPars);
        }
    }
}
