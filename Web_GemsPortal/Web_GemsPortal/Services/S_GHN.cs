using NuGet.Common;
using Web_GemsPortal.EditModels;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_GHN
    {
        Task<ResponseData<M_GHN>> GetAddresShopInGHN(string token, int shopId);
        Task<ResponseData<List<M_GHN_Service>>> GetServiceGNH(string token, int shop_id, int from_district, string provinceName, string districtName);
        Task<ResponseData<M_Fee_GHN>> GetFee(string token, EM_GetFeeShip_GHN model);
    }
    public class S_GHN : IS_GHN
    {
        private readonly ICallBaseApi _callApi;
        public S_GHN(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<M_GHN>> GetAddresShopInGHN(string token, int shopId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"token", token},
                {"shop_id", shopId},
            };
            return await _callApi.PostResponseDataAsync<M_GHN>("GHN/getShopById", dictPars);
        }

        public async Task<ResponseData<List<M_GHN_Service>>> GetServiceGNH(string token, int shop_id, int from_district, string provinceName, string districtName)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"token", token},
                {"shop_id", shop_id},
                {"from_district", from_district},
                {"provinceName", provinceName},
                {"districtName", districtName},
            };
            return await _callApi.PostResponseDataAsync<List<M_GHN_Service>>("GHN/getServiceCharge", dictPars);
        }

        public async Task<ResponseData<M_Fee_GHN>> GetFee(string token, EM_GetFeeShip_GHN model)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"token", token},
                {"shop_id", model.shop_id},
                {"service_id", model.service_id},
                {"service_type_id", model.service_type_id},
                {"insurance_value", model.insurance_value},
                {"coupon", model.coupon},
                {"from_district_id", model.from_district_id},
                {"provinceName", model.provinceName},
                {"districtName", model.districtName},
                {"wardName", model.wardName},
                {"weight", model.weight},
                {"length", model.length},
                {"width", model.width},
                {"height", model.height},
                {"cod_value", model.cod_value},
            };
            return await _callApi.PostResponseDataAsync<M_Fee_GHN>("GHN/getFee", dictPars);
        }
    }
}
