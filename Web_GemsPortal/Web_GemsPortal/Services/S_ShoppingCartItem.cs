using Web_GemsPortal.EditModels;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_ShoppingCartItem
    {
        Task<ResponseData<int>> getShoppingCartItemCountProduct(string access_token, string shoppingCartId);
        Task<ResponseData<List<M_ShoppingCartItem>>> getListShoppingCartItemBySupplierIdShoppingCartIdStatus(string access_token, int? supplierId, string shoppingCartId);
        Task<ResponseData<object>> Create(string access_token, EM_ShoppingCardItem model, string createdBy);
        Task<ResponseData<object>> UpdateQuantity(string access_token, int id, int quantity, string updatedBy);
        Task<ResponseData<List<M_ShoppingCartItem>>> DeleteSequenceId(string access_token, string sequenceShoppingCartItemId);
        Task<ResponseData<M_ShoppingCartItem>> Delete(string access_token, int id);
        Task<ResponseData<M_ShoppingCartItem>> getShoppingCartItemById(string access_token, int id);
    }
    public class S_ShoppingCartItem : IS_ShoppingCartItem
    {
        private readonly ICallBaseApi _callApi;
        public S_ShoppingCartItem(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<int>> getShoppingCartItemCountProduct(string access_token, string shoppingCartId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"shoppingCartId", shoppingCartId},
            };
            return await _callApi.GetResponseDataAsync<int>("ShoppingCartItem/getShoppingCartItemCountProduct", dictPars);
        }
        public async Task<ResponseData<List<M_ShoppingCartItem>>> getListShoppingCartItemBySupplierIdShoppingCartIdStatus(string access_token, int? supplierId, string shoppingCartId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"supplierId", supplierId},
                {"shoppingCartId", shoppingCartId},
            };
            return await _callApi.GetResponseDataAsync<List<M_ShoppingCartItem>>("ShoppingCartItem/getListShoppingCartItemBySupplierIdShoppingCartIdStatus", dictPars);
        }
        public async Task<ResponseData<object>> Create(string access_token, EM_ShoppingCardItem model, string createdBy)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"shoppingCartId", model.shoppingCartId},
                {"supplierId", model.supplierId},
                {"unitId", model.unitId},
                {"productId", model.productId},
                {"productPriceId", model.productPriceId},
                {"quantity", model.quantity},
                {"typeSizeId", model.typeSizeId},
                {"typeColorId", model.typeColorId},
                {"isBigShop", model.isBigShop},
                {"createdBy", createdBy},
            };
            return await _callApi.PostResponseDataAsync<object>("ShoppingCartItem/Create", dictPars);
        }
        public async Task<ResponseData<object>> UpdateQuantity(string access_token, int id, int quantity, string updatedBy)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
                {"quantity", quantity},
                {"updatedBy", updatedBy},
            };
            return await _callApi.PostResponseDataAsync<object>("ShoppingCartItem/UpdateQuantity", dictPars);
        }
        public async Task<ResponseData<List<M_ShoppingCartItem>>> DeleteSequenceId(string access_token, string sequenceShoppingCartItemId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"sequenceShoppingCartItemId", sequenceShoppingCartItemId},
            };
            return await _callApi.PostResponseDataAsync<List<M_ShoppingCartItem>>("ShoppingCartItem/DeleteSequenceId", dictPars);
        }
        public async Task<ResponseData<M_ShoppingCartItem>> Delete(string access_token, int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
            };
            return await _callApi.PostResponseDataAsync<M_ShoppingCartItem>("ShoppingCartItem/Delete", dictPars);
        }
        public async Task<ResponseData<M_ShoppingCartItem>> getShoppingCartItemById(string access_token, int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_ShoppingCartItem>("ShoppingCartItem/getShoppingCartItemById", dictPars);
        }
    }
}
