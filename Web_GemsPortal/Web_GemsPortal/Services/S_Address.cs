using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Address
    {
        Task<ResponseData<M_Address>> create(string supplierId,
                    string title, string addressNumber, string addressText, string countryId, string provinceId, string districtId,
                    string wardId, string latitude, string longitude);
        Task<ResponseData<List<M_Country>>> getListCountry();
        Task<ResponseData<List<M_Province>>> getListProvinceByCountryId(string countryId = "1");
        Task<ResponseData<List<M_District>>> getListDistrictByProvinceId(string provinceId = "0");
        Task<ResponseData<List<M_Ward>>> getListWardByDisctrictId(string districtId = "0");
        Task<ResponseData<List<M_Address>>> getListAddressByProductIdProvinceId(int? status, string parentId, string provinceId, int? productId);
        Task<ResponseData<List<M_Address>>> getListAddressByProductIdAddressCondition(int? status, string parentId, string provinceId, string districtId, string wardId, int? productId);
        Task<ResponseData<List<M_Address>>> getListAddressConditionAddress(int? status, string parentId, string provinceId, string districtId, string wardId);
        Task<ResponseData<List<M_Address>>> getListAddressByProvinceId(int? status, string parentId, string provinceId);
        Task<ResponseData<List<M_Province>>> getListProvinceActive(string parentId);
        Task<ResponseData<List<M_District>>> getListDistrictActiveByProvinceId(string parentId, string provinceId);
        Task<ResponseData<List<M_Ward>>> getListWardActiveByDisctrictId(string parentId, string districtId);
    }
    public class S_Address : IS_Address
    {
        private readonly ICallBaseApi _callApi;
        public S_Address(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }
        public async Task<ResponseData<M_Address>> create(string supplierId,
                    string title, string addressNumber, string addressText, string countryId, string provinceId, string districtId,
                    string wardId, string latitude, string longitude)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"title", title},
                {"addressNumber", addressNumber},
                {"addressText", addressText},
                {"countryId", countryId},
                {"provinceId", provinceId},
                {"districtId", districtId},
                {"wardId", wardId},
                {"latitude", latitude},
                {"longitude", longitude},
            };
            return await _callApi.GetResponseDataAsync<M_Address>("Address/Create", dictPars);
        }
        public async Task<ResponseData<List<M_Country>>> getListCountry()
        {
            return await _callApi.GetResponseDataAsync<List<M_Country>>("Country/CreateCustomer", default(Dictionary<string, dynamic>));
        }
        public async Task<ResponseData<List<M_Province>>> getListProvinceByCountryId(string countryId = "1")
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"countryId", countryId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Province>>("Province/getListProvinceByCountryId", dictPars);
        }
        public async Task<ResponseData<List<M_District>>> getListDistrictByProvinceId(string provinceId = "0")
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"provinceId", provinceId},
            };
            return await _callApi.GetResponseDataAsync<List<M_District>>("District/getListDistrictByProvinceId", dictPars);
        }
        public async Task<ResponseData<List<M_Ward>>> getListWardByDisctrictId(string districtId = "0")
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"districtId", districtId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Ward>>("Ward/getListWardByDisctrictId", dictPars);
        }
        public async Task<ResponseData<List<M_Address>>> getListAddressByProductIdProvinceId(int? status, string parentId, string provinceId, int? productId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
                {"status", status},
                {"provinceId", provinceId},
                {"productId", productId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Address>>("Address/getListAddressByProductIdProvinceId", dictPars);
        }
        public async Task<ResponseData<List<M_Address>>> getListAddressByProductIdAddressCondition(int? status, string parentId, string provinceId, string districtId, string wardId, int? productId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
                {"status", status},
                {"provinceId", provinceId},
                {"districtId", districtId},
                {"wardId", wardId},
                {"productId", productId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Address>>("Address/getListAddressByProductIdAddressCondition", dictPars);
        }
        public async Task<ResponseData<List<M_Address>>> getListAddressConditionAddress(int? status, string parentId, string provinceId, string districtId, string wardId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
                {"status", status},
                {"provinceId", provinceId},
                {"districtId", districtId},
                {"wardId", wardId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Address>>("Address/getListAddressConditionAddress", dictPars);
        }
        public async Task<ResponseData<List<M_Address>>> getListAddressByProvinceId(int? status, string parentId, string provinceId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
                {"status", status},
                {"provinceId", provinceId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Address>>("Address/getListAddressByProvinceId", dictPars);
        }
        public async Task<ResponseData<List<M_Province>>> getListProvinceActive(string parentId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Province>>("Province/getListProvinceActive", dictPars);
        }
        public async Task<ResponseData<List<M_District>>> getListDistrictActiveByProvinceId(string parentId, string provinceId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
                {"provinceId", provinceId},
            };
            return await _callApi.GetResponseDataAsync<List<M_District>>("District/getListDistrictActiveByProvinceId", dictPars);
        }
        public async Task<ResponseData<List<M_Ward>>> getListWardActiveByDisctrictId(string parentId, string districtId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
                {"districtId", districtId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Ward>>("Ward/getListWardActiveByDisctrictId", dictPars);
        }
    }
}
