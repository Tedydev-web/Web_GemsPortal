using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Supplier
    {
        Task<ResponseData<M_Supplier>> getHubSupplierById(string id);
        Task<ResponseData<M_Supplier>> getSupplierByMemberUrlIdentity(string memberUrlIdentity);
        Task<ResponseData<List<M_Supplier>>> getListSupplierByParentId(string parentId);
        Task<ResponseData<List<M_Supplier>>> getListSupplierFromProduct(string parentId, int recordNumber = 10, int page = 1);
        Task<ResponseData<List<M_Supplier>>> GetListSupplierBySlevelParentIdSequenceStatusFdateTdate(int? slevel, int? parentId, DateTime? fdate, DateTime? tdate, string sequenceStatus);
        Task<ResponseData<List<M_Supplier>>> GetListSupplierBySlevelParentIdSequenceStatusFdateTdateProvinceIdDistrictIdWardId(string slevel, int? parentId, DateTime? fdate, DateTime? tdate, string sequenceStatus, int? provinceId, int? districtId, int? wardId);
    }
    public class S_Supplier : IS_Supplier
    {
        private readonly ICallBaseApi _callApi;
        public S_Supplier(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<M_Supplier>> getHubSupplierById(string id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_Supplier>("Supplier/getHubSupplierById", dictPars);
        }
        public async Task<ResponseData<M_Supplier>> getSupplierByMemberUrlIdentity(string memberUrlIdentity)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"memberUrlIdentity", memberUrlIdentity},
            };
            return await _callApi.GetResponseDataAsync<M_Supplier>("Supplier/getSupplierByMemberUrlIdentity", dictPars);
        }
        public async Task<ResponseData<List<M_Supplier>>> getListSupplierByParentId(string parentId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
                {"accountId", 0},
            };
            return await _callApi.GetResponseDataAsync<List<M_Supplier>>("Supplier/getListSupplierByParentId", dictPars);
        }
        public async Task<ResponseData<List<M_Supplier>>> getListSupplierFromProduct(string parentId, int recordNumber = 10, int page = 1)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"parentId", parentId},
                {"recordNumber", recordNumber},
                {"page", page},
            };
            return await _callApi.GetResponseDataAsync<List<M_Supplier>>("Supplier/getListSupplierFromProduct", dictPars);
        }
        public async Task<ResponseData<List<M_Supplier>>> GetListSupplierBySlevelParentIdSequenceStatusFdateTdate(int? slevel, int? parentId, DateTime? fdate, DateTime? tdate, string sequenceStatus)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"slevel", slevel},
                {"parentId", parentId > 0 ? parentId : default},
                {"fdate", fdate},
                {"tdate", tdate},
                {"sequenceStatus", sequenceStatus},
            };
            return await _callApi.GetResponseDataAsync<List<M_Supplier>>("Supplier/GetListSupplierBySlevelParentIdSequenceStatusFdateTdate", dictPars);
        }
        public async Task<ResponseData<List<M_Supplier>>> GetListSupplierBySlevelParentIdSequenceStatusFdateTdateProvinceIdDistrictIdWardId(string slevel, int? parentId, DateTime? fdate, DateTime? tdate, string sequenceStatus, int? provinceId, int? districtId, int? wardId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"slevel", "2,3"},
                //{"parentId", parentId > 0 ? parentId : default},
                {"fdate", fdate},
                {"tdate", tdate},
                {"sequenceStatus", sequenceStatus},
                {"provinceId", provinceId},
                {"districtId", districtId},
                {"wardId", wardId},
            };
            return await _callApi.GetResponseDataAsync<List<M_Supplier>>("Supplier/GetListSupplierBySlevelParentIdSequenceStatusFdateTdateProvinceIdDistrictIdWardId", dictPars);
        }
    }
}
