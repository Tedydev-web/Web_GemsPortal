using Web_GemsPortal.EditModels.Order;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Order
    {
        Task<ResponseData<List<M_OrderGetList>>> getListHubOrderByCustomerIdProcessStatusPage(string access_token, int? processStatus, string customerId, int? fdate = 7, int page = 1, int recordNumber = 10);
        Task<ResponseData<List<M_Order>>> getListOrderBySequenceStatusByCustomerId(string sequenceStatus, string customerId);
        Task<ResponseData<List<M_Order>>> CreateOrderHub(string access_token, EM_Order model);
        Task<ResponseData<M_Order>> UpdateStatus(string id, int updatedBy, int status, DateTime? timer);
        Task<ResponseData<M_OrderDetail>> getHubOrderByIdCustomerId(string access_token, string id, string customerId);
        Task<ResponseData<object>> SendSmsNotification(string name, string phoneNumber);
        Task<ResponseData<List<M_CheckPromotionCode>>> CheckPromotionCode(string access_token, string supplierId, string sequenceShoppingCartItemId, string sequencePromotionCode);
    }
    public class S_Order : IS_Order
    {
        private readonly ICallBaseApi _callApi;
        public S_Order(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_OrderGetList>>> getListHubOrderByCustomerIdProcessStatusPage(string access_token, int? processStatus, string customerId, int? fdate = 7, int page = 1, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"processStatus", !processStatus.HasValue ? "-2" : processStatus.ToString()},
                {"customerId", customerId},
                {"fdate", fdate},
                {"page", page},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_OrderGetList>>("Order/getListHubOrderByCustomerIdProcessStatusPage", dictPars);
        }
        public async Task<ResponseData<List<M_Order>>> getListOrderBySequenceStatusByCustomerId(string sequenceStatus, string customerId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
                {"customerId", customerId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Order>>("Order/getListOrderBySequenceStatusByCustomerId", dictPars);
        }
        public async Task<ResponseData<List<M_Order>>> CreateOrderHub(string access_token, EM_Order model)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"sequenceShoppingCartItemId", model.SequenceShoppingCartItemId},
                {"receiverFullName", model.ReceiverFullName},
                {"receiverPhoneNumber", model.ReceiverPhoneNumber},
                {"addressText", model.AddressText},
                {"addressieText", model.AddressieText},
                {"countryId", model.CountryId},
                {"supplierId", model.SupplierId},
                {"provinceId", model.ProvinceId},
                {"districtId", model.DistrictId},
                {"wardId", model.WardId},
                {"paymentId", model.PaymentId},
                {"companyName", model.CompanyName},
                {"companyTaxNumber", model.CompanyTaxNumber},
                {"companyAddress", model.CompanyAddress},
                {"remark", model.Remark},
                {"deliveryOption", model.DeliveryOption},
                {"feeShip", model.FeeShip},
                {"carrierId", model.CarrierId},
                {"sequencePromotionCode", model.SequencePromotionCode},
                {"sequenceDiscountAmount", model.DiscountAmount},
                {"supplierOrderDiscountAmount", model.supplierOrderDiscountAmount},
                {"paymentPercent", model.paymentPercent = 0},
            };
            return await _callApi.PostResponseDataAsync<List<M_Order>>("Order/CreateOrderHub", dictPars);
        }
        public async Task<ResponseData<M_Order>> UpdateStatus(string id, int updatedBy, int status, DateTime? timer)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
                {"status", status},
                {"updatedBy", updatedBy},
                {"timer", timer?.ToString("O")},
            };
            return await _callApi.PostResponseDataAsync<M_Order>("Order/UpdateStatus", dictPars);
        }
        public async Task<ResponseData<M_OrderDetail>> getHubOrderByIdCustomerId(string access_token, string id, string customerId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
                {"customerId", customerId},
            };
            return await _callApi.GetResponseDataAsync<M_OrderDetail>("Order/getHubOrderByIdCustomerId", dictPars);
        }
        public async Task<ResponseData<object>> SendSmsNotification(string name, string phoneNumber)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"name", name},
                {"phoneNumber", StringHelper.ToTelephoneNumerSendSMS(phoneNumber)},
            };
            return await _callApi.PostResponseDataAsync<object>("Order/SendSmsNotification", dictPars);
        }
        public async Task<ResponseData<List<M_CheckPromotionCode>>> CheckPromotionCode(string access_token, string supplierId, string sequenceShoppingCartItemId, string sequencePromotionCode)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"supplierId", supplierId},
                {"sequenceShoppingCartItemId", sequenceShoppingCartItemId},
                {"sequencePromotionCode", sequencePromotionCode},
            };
            return await _callApi.PostResponseDataAsync<List<M_CheckPromotionCode>>("Order/CheckPromotionCode", dictPars);
        }
    }
}
