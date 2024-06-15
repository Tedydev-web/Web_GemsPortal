using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_PromotionApply
    {
        Task<ResponseData<List<string>>> getListPromotionCodeClaimByPersonId(string access_token, string personId);
        Task<ResponseData<List<M_PromotionApply>>> getListPromotionApplyBySequenceStatus(string access_token, string sequenceStatus, string personId);
        Task<ResponseData<List<M_PromotionApply>>> getListPromotionApplyByPersonPaging(string access_token, string personId, int isManage, int typeSearch, int page = 1, int recordNumber = 10, int? supplierId  = 0, string sequencePromotionExclude = "");
        Task<ResponseData<M_PromotionApply>> Create(string access_token, EM_PromotionApply model, string createdBy);
        Task<ResponseData<M_PromotionApply>> Update(string access_token, EM_PromotionApply model, string updatedBy);
        Task<ResponseData<M_PromotionApply>> Delete(string access_token, string id);
        Task<ResponseData<M_PromotionApply>> UpdateStatus(string access_token, string id, int status, DateTime timer, string updatedBy);
    }
    public class S_PromotionApply : IS_PromotionApply
    {
        private readonly ICallBaseApi _callApi;
        public S_PromotionApply(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<string>>> getListPromotionCodeClaimByPersonId(string access_token, string personId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"personId", personId},
            };
            return await _callApi.GetResponseDataAsync<List<string>>("PromotionApply/getListPromotionCodeClaimByPersonId", dictPars);
        }

        public async Task<ResponseData<List<M_PromotionApply>>> getListPromotionApplyBySequenceStatus(string access_token, string sequenceStatus, string personId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"personId", personId},
            };
            return await _callApi.GetResponseDataAsync<List<M_PromotionApply>>("PromotionApply/getListPromotionApplyBySequenceStatus", dictPars);
        }

        public async Task<ResponseData<List<M_PromotionApply>>> getListPromotionApplyByPersonPaging(string access_token, string personId, int isManage, int typeSearch, int page = 1, int recordNumber = 10, int? supplierId = 0, string sequencePromotionExclude = "")
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"personId", personId},
                {"isManage", isManage},
                {"typeSearch", typeSearch}, //0: ngày tạo mới nhất; 1: mã sắp hết hạn
                {"page", page},
                {"recordNumber", recordNumber},
                {"supplierId", supplierId},
                {"sequencePromotionExclude", sequencePromotionExclude},
            };
            return await _callApi.GetResponseDataAsync<List<M_PromotionApply>>("PromotionApply/getListPromotionApplyByPersonPaging", dictPars);
        }

        public async Task<ResponseData<M_PromotionApply>> Create(string access_token, EM_PromotionApply model, string createdBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model);
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"orderId", model.orderId},
                {"personId", model.personId},
                {"promotionCodeClaim", model.promotionCodeClaim},
                {"isApply", model.isApply},
                {"createdBy", createdBy},
            };
            return await _callApi.PostResponseDataAsync<M_PromotionApply>("PromotionApply/Create", dictPars);
        }

        public async Task<ResponseData<M_PromotionApply>> Update(string access_token, EM_PromotionApply model, string updatedBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model);
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", model.id},
                {"orderId", model.orderId},
                {"personId", model.personId},
                {"promotionCodeClaim", model.promotionCodeClaim},
                {"isApply", model.isApply},
                {"status", model.status},
                {"timer", model.timer?.ToString("O")},
                {"updatedBy", updatedBy},
            };
            return await _callApi.PostResponseDataAsync<M_PromotionApply>("PromotionApply/Update", dictPars);
        }

        public async Task<ResponseData<M_PromotionApply>> Delete(string access_token, string id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
            };
            return await _callApi.PostResponseDataAsync<M_PromotionApply>("PromotionApply/Delete", dictPars);
        }

        public async Task<ResponseData<M_PromotionApply>> UpdateStatus(string access_token, string id, int status, DateTime timer, string updatedBy)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
                {"status", status},
                {"timer", timer.ToString("O")},
                {"updatedBy", updatedBy},
            };
            return await _callApi.PostResponseDataAsync<M_PromotionApply>("PromotionApply/UpdateStatus", dictPars);
        }
    }
}
