using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_PackingForm
    {
        Task<ResponseData<List<M_PackingForm>>> getListPackingFormBySequenceStatus(string sequenceStatus);
    }
    public class S_PackingForm : IS_PackingForm
    {
        private readonly ICallBaseApi _callApi;
        public S_PackingForm(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_PackingForm>>> getListPackingFormBySequenceStatus(string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_PackingForm>>("PackingForm/getListPackingFormBySequenceStatus", dictPars);
        }
    }
}
