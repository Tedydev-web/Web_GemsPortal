using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_ShoppingCart
    {
        Task<ResponseData<M_ShoppingCart>> getHubShoppingCartByIdStatus(string access_token, string id);
        Task<ResponseData<M_ShoppingCart>> getHubShoppingCartByIdStatusMember(string access_token, string id);
    }
    public class S_ShoppingCart : IS_ShoppingCart
    {
        private readonly ICallBaseApi _callApi;
        public S_ShoppingCart(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<M_ShoppingCart>> getHubShoppingCartByIdStatus(string access_token, string id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_ShoppingCart>("ShoppingCart/getHubShoppingCartByIdStatus", dictPars);
        }
        public async Task<ResponseData<M_ShoppingCart>> getHubShoppingCartByIdStatusMember(string access_token, string id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_ShoppingCart>("ShoppingCart/getHubShoppingCartByIdStatusMember", dictPars);
        }
    }
}
