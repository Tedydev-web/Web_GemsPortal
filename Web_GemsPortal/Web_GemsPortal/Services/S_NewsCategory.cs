using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_NewsCategory
    {
        Task<ResponseData<List<M_NewsCategory>>> getListHubNewsCategoryALL(string _supplierId);
        Task<ResponseData<List<M_NewsCategory>>> getListHubNewsCategoryBySupplierId(string supplierId);
        Task<ResponseData<M_NewsCategory>> getHubNewsCategoryById(int id);
    }
    public class S_NewsCategory : IS_NewsCategory
    {
        private readonly ICallBaseApi _callApi;
        public S_NewsCategory(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_NewsCategory>>> getListHubNewsCategoryALL(string supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
            };
            return await _callApi.GetResponseDataAsync<List<M_NewsCategory>>("NewsCategory/getListHubNewsCategoryALL", dictPars);
        }
        public async Task<ResponseData<List<M_NewsCategory>>> getListHubNewsCategoryBySupplierId(string supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
            };
            return await _callApi.GetResponseDataAsync<List<M_NewsCategory>>("NewsCategory/getListHubNewsCategoryBySupplierId", dictPars);
        }
        public async Task<ResponseData<M_NewsCategory>> getHubNewsCategoryById(int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_NewsCategory>("NewsCategory/getHubNewsCategoryById", dictPars);
        }
    }
}
