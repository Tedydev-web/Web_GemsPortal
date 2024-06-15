using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Category
    {
        Task<ResponseData<List<M_Category>>> getListMenu(string supplierId);
        Task<ResponseData<M_Category>> getCategoryByIdStatus(int? id);
    }
    public class S_Category : IS_Category
    {
        private readonly ICallBaseApi _callApi;
        public S_Category(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_Category>>> getListMenu(string supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Category>>("Category/getListMenu", dictPars);
        }
        public async Task<ResponseData<M_Category>> getCategoryByIdStatus(int? id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_Category>("Category/getCategoryByIdStatus", dictPars);
        }
    }
}
