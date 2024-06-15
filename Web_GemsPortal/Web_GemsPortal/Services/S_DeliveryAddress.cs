using Web_GemsPortal.EditModels.DeliveryAddress;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_DeliveryAddress
    {
        Task<ResponseData<List<M_DeliveryAddress>>> getListDeliveryAddressByCustomerIdStatus(string access_token, string customerId);
        Task<ResponseData<M_DeliveryAddress>> getDeliveryAddressByCustomerIdStatusIsDefault(string access_token, string customerId);
        Task<ResponseData<M_DeliveryAddress>> getDeliveryAddressByIdStatus(string access_token, string id);
        Task<ResponseData<M_DeliveryAddress>> Create(string access_token, EM_DeliveryAddress model, string createdBy);
        Task<ResponseData<M_DeliveryAddress>> Update(string access_token, EM_DeliveryAddress model, string updatedBy);
        Task<ResponseData<M_DeliveryAddress>> Delete(string access_token, string id);
    }
    public class S_DeliveryAddress : IS_DeliveryAddress
    {
        private readonly ICallBaseApi _callApi;
        public S_DeliveryAddress(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_DeliveryAddress>>> getListDeliveryAddressByCustomerIdStatus(string access_token, string customerId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"customerId", customerId},
            };
            return await _callApi.GetResponseDataAsync<List<M_DeliveryAddress>>("DeliveryAddress/getListDeliveryAddressByCustomerIdStatus", dictPars);
        }
        public async Task<ResponseData<M_DeliveryAddress>> getDeliveryAddressByCustomerIdStatusIsDefault(string access_token, string customerId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"customerId", customerId},
            };
            return await _callApi.GetResponseDataAsync<M_DeliveryAddress>("DeliveryAddress/getDeliveryAddressByCustomerIdStatusIsDefault", dictPars);
        }
        public async Task<ResponseData<M_DeliveryAddress>> getDeliveryAddressByIdStatus(string access_token, string id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_DeliveryAddress>("DeliveryAddress/getDeliveryAddressByIdStatus", dictPars);
        }
        public async Task<ResponseData<M_DeliveryAddress>> Create(string access_token, EM_DeliveryAddress model, string createdBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model); //Clean XSS
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"customerId", model.customerId},
                {"typeId", model.typeId},
                {"name", model.name},
                {"phoneNumber", model.phoneNumber},
                {"addressNumber", model.addressNumber},
                {"addressText", model.addressText},
                {"isDefault", model.isDefault ? 1 : 0},
                {"countryId", model.countryId},
                {"provinceId", model.provinceId},
                {"districtId", model.districtId},
                {"wardId", model.wardId},
                {"createdBy", createdBy},
            };
            return await _callApi.PostResponseDataAsync<M_DeliveryAddress>("DeliveryAddress/Create", dictPars);
        }
        public async Task<ResponseData<M_DeliveryAddress>> Update(string access_token, EM_DeliveryAddress model, string updatedBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model); //Clean XSS
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", model.id},
                {"customerId", model.customerId},
                {"typeId", model.typeId},
                {"name", model.name},
                {"phoneNumber", model.phoneNumber},
                {"addressNumber", model.addressNumber},
                {"addressText", model.addressText},
                {"isDefault", model.isDefault ? 1 : 0},
                {"countryId", model.countryId},
                {"provinceId", model.provinceId},
                {"districtId", model.districtId},
                {"wardId", model.wardId},
                {"status", model.status},
                {"timer", model.timer?.ToString("O")},
                {"updatedBy", updatedBy},
            };
            return await _callApi.PostResponseDataAsync<M_DeliveryAddress>("DeliveryAddress/Update", dictPars);
        }
        public async Task<ResponseData<M_DeliveryAddress>> Delete(string access_token, string id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
            };
            return await _callApi.PostResponseDataAsync<M_DeliveryAddress>("DeliveryAddress/Delete", dictPars);
        }
    }
}
