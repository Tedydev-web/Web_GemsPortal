using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_News
    {
        Task<ResponseData<List<M_News>>> getListHubNewsByNews(string supplierId, int recordNumber, EN_NewsCategoryTypeId typeId, int isHot = 0);
        Task<ResponseData<List<M_News>>> getListHubNews(string supplierId, int recordNumber, int page);
        Task<ResponseData<List<M_News>>> getListHubNewsByCategoryId(string supplierId, int? categoryId, int recordNumber, int page);
        Task<ResponseData<List<M_News>>> getListHubNewsByCategoryIdTypeId(string supplierId, int? categoryId, EN_NewsCategoryTypeId typeId, int recordNumber, int page);
        Task<ResponseData<List<M_News>>> getListHubNewsByNewsCategoryId(string supplierId, int? categoryId, int recordNumber);
        Task<ResponseData<List<M_News>>> getListHubNewsIntroduceBySupplierId(string supplierId);
        Task<ResponseData<M_News>> getHubNewsById(int id);
    }
    public class S_News : IS_News
    {
        private readonly ICallBaseApi _callApi;
        public S_News(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_News>>> getListHubNewsByNews(string supplierId, int recordNumber, EN_NewsCategoryTypeId typeId, int isHot = 0)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"typeId", (int)typeId},
                {"isHot", (int)isHot},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListHubNewsByNews", dictPars);
        }
        public async Task<ResponseData<List<M_News>>> getListHubNews(string supplierId, int recordNumber, int page)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListHubNews", dictPars);
        }
        public async Task<ResponseData<List<M_News>>> getListHubNewsByCategoryId(string supplierId, int? categoryId, int recordNumber, int page)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"categoryId", categoryId},
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListHubNewsByCategoryId", dictPars);
        }
        public async Task<ResponseData<List<M_News>>> getListHubNewsByCategoryIdTypeId(string supplierId, int? categoryId, EN_NewsCategoryTypeId typeId, int recordNumber, int page)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"categoryId", categoryId},
                {"typeId", (int)typeId},
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListHubNewsByCategoryIdTypeId", dictPars);
        }
        public async Task<ResponseData<List<M_News>>> getListHubNewsByNewsCategoryId(string supplierId, int? categoryId, int recordNumber)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"categoryId", categoryId},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListHubNewsByNewsCategoryId", dictPars);
        }
        public async Task<ResponseData<List<M_News>>> getListHubNewsIntroduceBySupplierId(string supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
            };
            return await _callApi.GetResponseDataAsync<List<M_News>>("News/getListHubNewsIntroduceBySupplierId", dictPars);
        }
        public async Task<ResponseData<M_News>> getHubNewsById(int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_News>("News/getHubNewsById", dictPars);
        }
    }
}
