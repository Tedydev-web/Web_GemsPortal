using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Unit
    {
        Task<ResponseData<List<M_Unit>>> getListUnitBySequenceStatusTypeIdByParent(string sequenceStatus, int typeId);
        Task<ResponseData<List<M_Unit>>> getListUnitBySequenceStatusTypeId(string sequenceStatus, int typeId);
        Task<ResponseData<List<M_Unit>>> getListUnitBySequenceStatus(string sequenceStatus);
        Task<ResponseData<List<M_Unit>>> getListUnitBySequenceStatusFromProduct(string sequenceStatus);
    }
    public class S_Unit : IS_Unit
    {
        private readonly ICallBaseApi _callApi;
        public S_Unit(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_Unit>>> getListUnitBySequenceStatusTypeIdByParent(string sequenceStatus, int typeId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
                {"typeId", typeId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Unit>>("Unit/getListUnitBySequenceStatusTypeIdByParent", dictPars);
        }
        public async Task<ResponseData<List<M_Unit>>> getListUnitBySequenceStatusTypeId(string sequenceStatus, int typeId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
                {"typeId", typeId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Unit>>("Unit/getListUnitBySequenceStatusTypeId", dictPars);
        }
        public async Task<ResponseData<List<M_Unit>>> getListUnitBySequenceStatus(string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_Unit>>("Unit/getListUnitBySequenceStatus", dictPars);
        }
        public async Task<ResponseData<List<M_Unit>>> getListUnitBySequenceStatusFromProduct(string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_Unit>>("Unit/getListUnitBySequenceStatusFromProduct", dictPars);
        }
    }
}
