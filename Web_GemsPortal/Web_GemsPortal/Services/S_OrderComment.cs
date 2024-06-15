using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_OrderComment
    {
        Task<ResponseData<M_OrderComment>> getOrderCommentById(string access_token, string id);
        Task<ResponseData<M_OrderComment>> Create(string access_token, EM_OrderComment model, string createdBy);
        Task<ResponseData<M_OrderComment>> Update(string access_token, EM_OrderComment model, string updatedBy);
        Task<ResponseData<M_OrderComment>> Delete(string access_token, string id, string personId);
    }
    public class S_OrderComment : IS_OrderComment
    {
        private readonly ICallBaseApi _callApi;
        public S_OrderComment(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<M_OrderComment>> getOrderCommentById(string access_token, string id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
            };
            return await _callApi.GetResponseDataAsync<M_OrderComment>("OrderComment/getOrderCommentById", dictPars);
        }
        public async Task<ResponseData<M_OrderComment>> Create(string access_token, EM_OrderComment model, string createdBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model); //Clean XSS
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"parentId", model.parentId},
                {"orderId", model.orderId},
                {"comment", model.comment},
                {"managementType", (int)model.managementType},
                {"managementReplyType", (int)model.managementReplyType},
                {"remark", model.remark},
                {"createdBy", createdBy},
            };
            return await _callApi.PostResponseDataAsync<M_OrderComment>("OrderComment/Create", dictPars);
        }
        public async Task<ResponseData<M_OrderComment>> Update(string access_token, EM_OrderComment model, string updatedBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model); //Clean XSS
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", model.id},
                {"parentId", model.parentId},
                {"orderId", model.orderId},
                {"comment", model.comment},
                {"managementType", (int)model.managementType},
                {"managementReplyType", (int)model.managementReplyType},
                {"remark", model.remark},
                {"status", model.status},
                {"timer", model.timer?.ToString("O")},
                {"updatedBy", updatedBy},
            };
            return await _callApi.PostResponseDataAsync<M_OrderComment>("OrderComment/Update", dictPars);
        }
        public async Task<ResponseData<M_OrderComment>> Delete(string access_token, string id, string personId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"id", id},
                {"personId", personId},
            };
            return await _callApi.DeleteResponseDataAsync<M_OrderComment>("OrderComment/Delete", dictPars);
        }
    }
}
