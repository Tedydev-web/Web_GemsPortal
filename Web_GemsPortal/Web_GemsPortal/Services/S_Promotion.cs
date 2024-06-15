using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_Promotion
    {
        Task<ResponseData<List<M_Promotion>>> getListPromotionByTypeIsManage(string personId, EN_PromotionType promotionTypeId, EN_PromotionIsManage isManage);
        Task<ResponseData<List<M_Promotion>>> getListPromotionByTypeIsManagePaging(string personId, EN_PromotionType promotionTypeId, EN_PromotionIsManage isManage, DateTime timer, int page = 1, int recordNumber = 10);
    }
    public class S_Promotion : IS_Promotion
    {
        private readonly ICallBaseApi _callApi;
        public S_Promotion(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_Promotion>>> getListPromotionByTypeIsManage(string personId, EN_PromotionType promotionTypeId, EN_PromotionIsManage isManage)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"personId", personId},
                {"promotionTypeId", (int)promotionTypeId},
                {"isManage", (int)isManage},
            };
            return await _callApi.GetResponseDataAsync<List<M_Promotion>>("Promotion/getListPromotionByTypeIsManage", dictPars);
        }

        public async Task<ResponseData<List<M_Promotion>>> getListPromotionByTypeIsManagePaging(string personId, EN_PromotionType promotionTypeId, EN_PromotionIsManage isManage, DateTime timer, int page = 1, int recordNumber = 10)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"personId", personId},
                {"promotionTypeId", (int)promotionTypeId},
                {"isManage", (int)isManage},
                {"page", page},
                {"recordNumber", recordNumber},
                {"timer", timer.ToString("O")},
            };
            return await _callApi.GetResponseDataAsync<List<M_Promotion>>("Promotion/getListPromotionByTypeIsManagePaging", dictPars);
        }
    }
}
