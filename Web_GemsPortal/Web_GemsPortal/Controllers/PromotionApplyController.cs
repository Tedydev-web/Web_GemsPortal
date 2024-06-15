using Web_GemsPortal.ExtensionMethods;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web_GemsPortal.Controllers
{
    [Authorize]
    public class PromotionApplyController : BaseController<PromotionApplyController>
    {
        private readonly IS_PromotionApply _s_PromotionApply;
        private readonly IS_Order _s_Order;
        private const int RECORD_PROMOTION_MEMBER = 12;

        public PromotionApplyController(IS_PromotionApply promotionApply, IS_Order order)
        {
            _s_PromotionApply = promotionApply;
            _s_Order = order;
        }

        public IActionResult Index()
        {
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new VM_ViewDataSEO
            {
                Keywords = "Ví Voucher/Coupon",
                Title = "Ví Voucher/Coupon",
                Description = "Ví Voucher/Coupon",
            });
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetList(int isManage, int typeSearch = 0, int page = 1, int? supplierId = 0, string sequencePromotionExclude = "")
        {
            var res = await _s_PromotionApply.getListPromotionApplyByPersonPaging(_accessToken, _userId, isManage, typeSearch, page, RECORD_PROMOTION_MEMBER, supplierId, sequencePromotionExclude);
            return Json(new M_JResult(res));
        }

        [HttpPost]
        public async Task<JsonResult> Delete(string id)
        {
            var res = await _s_PromotionApply.Delete(_accessToken, id);
            return Json(new M_JResult(res));
        }

        [HttpPost]
        public async Task<JsonResult> ApplyCode(string supplierId, string listCartId, string promotionCode)
        {
            var res = await _s_Order.CheckPromotionCode(_accessToken, Encryptor.Decrypt(supplierId), listCartId, promotionCode);
            return Json(res);
        }
    }
}
