using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Post
    {
        Task<ResponseData<List<M_Post>>> getListPostBySupplierIdSequenceStatusPageRecorNumber(string supplierId, int page = 1, int recordNumber = 10);
        Task<ResponseData<List<M_Post>>> getListPostBySequenceStatusPageRecorNumber(int page = 1, int recordNumber = 10);
    }
    public class S_Post : IS_Post
    {
        private readonly ICallBaseApi _callApi;
        public S_Post(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_Post>>> getListPostBySupplierIdSequenceStatusPageRecorNumber(string supplierId, int page = 1, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"sequenceStatus", "1"},
                {"page", page},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_Post>>("Post/getListPostBySupplierIdSequenceStatusPageRecorNumber", dictPars);
        }
        public async Task<ResponseData<List<M_Post>>> getListPostBySequenceStatusPageRecorNumber(int page = 1, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", "1"},
                {"page", page},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_Post>>("Post/getListPostBySequenceStatusPageRecorNumber", dictPars);
        }
    }
}
