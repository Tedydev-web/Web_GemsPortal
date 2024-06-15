using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Product
    {
        Task<ResponseData<List<M_Product>>> getListHubProductByCategoryIdPageSizePage(int? categoryId, int page = 1, int recordNumber = 10);
        Task<ResponseData<List<M_Product>>> getListEcomProductBySupplierId(string supplierId, int page = 1, int recordNumber = 10);
        Task<ResponseData<List<M_Product>>> getHubProductHubIsHot();
        Task<ResponseData<List<M_Product>>> getListHubProductByProductNews(int page = 1, int recordNumber = 10);
        Task<ResponseData<List<M_Product>>> getListHubProductByProductDiscount(int recordNumber = 10);
        Task<ResponseData<List<M_Product>>> getListHubProductByProductHighlights(int recordNumber = 10);
        Task<ResponseData<List<M_Product>>> getListHubProductByProductSelling(int recordNumber = 10);
        Task<ResponseData<List<M_Product>>> getListHubProductBySupplierIdProductCondition(string supplierId, string name, int? categoryId, string sequenceSize, string sequenceColor, string sequenceIsTradeMark, int? fprice, int? tprice, int type, int page = 1, int recordNumber = 10);
        Task<ResponseData<List<M_Product>>> getListHubProductByProductConditionSecond(string name, int? categoryId, string sequenceUnit, string sequencePackingForm, string sequencePropertyFilter0, string sequencePropertyFilter1, string sequencePropertyFilter2, string sequencePropertyFilter3, string sequenceStar, int? fprice, int? tprice, int type, int page = 1, int recordNumber = 10);
        Task<ResponseData<List<M_Product>>> getHubProductByIdSupplierIdProductRelation(string supplierId, int id, int recordNumber = 10);
        Task<ResponseData<List<M_Product>>> getListProductRegisBySupplierId(string sequenceStatus, string supplierId, int page = 1, int recordNumber = 20);
        Task<ResponseData<M_ProductDetail>> getHubProductById(int id);
        Task<ResponseData<M_ProductDetail>> getHubProductByIdSupplierId(int id, int supplierId);
    }
    public class S_Product : IS_Product
    {
        private readonly ICallBaseApi _callApi;
        public S_Product(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_Product>>> getListHubProductByCategoryIdPageSizePage(int? categoryId, int page = 1, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"categoryId", categoryId},
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListHubProductByCategoryIdPageSizePage", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListEcomProductBySupplierId(string supplierId, int page = 1, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListEcomProductBySupplierId", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getHubProductHubIsHot()
        {
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getHubProductHubIsHot", default(Dictionary<string, dynamic>));
        }
        public async Task<ResponseData<List<M_Product>>> getListHubProductByProductNews(int page = 1, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListHubProductByProductNews", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListHubProductByProductDiscount(int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListHubProductByProductDiscount", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListHubProductByProductHighlights(int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListHubProductByProductHighlights", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListHubProductByProductSelling(int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListHubProductByProductSelling", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListHubProductBySupplierIdProductCondition(string supplierId, string name, int? categoryId, string sequenceSize, string sequenceColor, string sequenceIsTradeMark, int? fprice, int? tprice, int type, int page = 1, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"name", name},
                {"categoryId", categoryId},
                {"sequenceSize", sequenceSize},
                {"sequenceColor", sequenceColor},
                {"sequenceIsTradeMark", sequenceIsTradeMark},
                {"fprice", fprice},
                {"tprice", tprice},
                {"type", type},
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListHubProductBySupplierIdProductCondition", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getListHubProductByProductConditionSecond(string name, int? categoryId, string sequenceUnit, string sequencePackingForm, string sequencePropertyFilter0, string sequencePropertyFilter1, string sequencePropertyFilter2, string sequencePropertyFilter3, string sequenceStar, int? fprice, int? tprice, int type, int page = 1, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"name", name},
                {"categoryId", categoryId ?? 0},
                {"sequenceUnit", sequenceUnit},
                {"sequencePackingForm", sequencePackingForm},
                {"sequencePropertyFilter0", sequencePropertyFilter0},
                {"sequencePropertyFilter1", sequencePropertyFilter1},
                {"sequencePropertyFilter2", sequencePropertyFilter2},
                {"sequencePropertyFilter3", sequencePropertyFilter3},
                {"sequenceStar", sequenceStar},
                {"fprice", fprice},
                {"tprice", tprice},
                {"type", type},
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListHubProductByProductConditionSecond", dictPars);
        }
        public async Task<ResponseData<List<M_Product>>> getHubProductByIdSupplierIdProductRelation(string supplierId, int id, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"id", id},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getHubProductByIdSupplierIdProductRelation", dictPars);
        }

        public async Task<ResponseData<List<M_Product>>> getListProductRegisBySupplierId(string sequenceStatus, string supplierId, int page = 1, int recordNumber = 20)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"sequenceStatus", sequenceStatus},
                {"page", page},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_Product>>("Product/getListProductRegisBySupplierId", dictPars);
        }
        public async Task<ResponseData<M_ProductDetail>> getHubProductById(int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_ProductDetail>("Product/getHubProductById", dictPars);
        }
        public async Task<ResponseData<M_ProductDetail>> getHubProductByIdSupplierId(int id, int supplierId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
                {"supplierId", supplierId},
            };
            return await _callApi.GetResponseDataAsync<M_ProductDetail>("Product/getHubProductByIdSupplierId", dictPars);
        }
    }
}
