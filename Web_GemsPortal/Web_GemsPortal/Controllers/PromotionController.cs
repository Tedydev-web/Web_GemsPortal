using Web_GemsPortal.ExtensionMethods;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels.Banner;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Options;
using System.Diagnostics;

namespace Web_GemsPortal.Controllers
{
    public class PromotionController : BaseController<PromotionController>
    {
        private readonly IS_Promotion _s_Promotion;
        private readonly IS_PromotionApply _s_PromotionApply;
        private readonly IOptions<Config_MetaSEO> _metaSEO;
        private const int RECORD_PROMOTION_MEMBER = 12;

        public PromotionController(IS_Promotion promotion, IS_PromotionApply promotionApply, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_Promotion = promotion;
            _s_PromotionApply = promotionApply;
            _metaSEO = metaSEO;
        }

        public async Task<IActionResult> Index()
        {
            var resVoucherAdmin = await _s_Promotion.getListPromotionByTypeIsManage(_userId, EN_PromotionType.Voucher, EN_PromotionIsManage.Admin);
            var resCouponAdmin = await _s_Promotion.getListPromotionByTypeIsManage(_userId, EN_PromotionType.Coupon, EN_PromotionIsManage.Admin);
            ViewBag.VoucherAdmin = resVoucherAdmin.data ?? new List<M_Promotion>();
            ViewBag.CouponAdmin = resCouponAdmin.data ?? new List<M_Promotion>();
            List<string> promotionCodeColection = new List<string>();
            if (_httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                var resPromotionCodeColection = await _s_PromotionApply.getListPromotionCodeClaimByPersonId(_accessToken, _userId);
                promotionCodeColection = resPromotionCodeColection.data ?? new List<string>();
            }
            ViewBag.PromotionCodeColection = promotionCodeColection;
            //await Task.WhenAll(GetBannerTop(), GetBannerMid());
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Promotion);
            return View();
        }

        //public async Task GetBannerTop()
        //{
        //    List<VM_BannerList> listData = new List<VM_BannerList>();
        //    try
        //    {
        //        var res = await _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "promotion", EN_BannerLocation.TopMain, 10);
        //        if (res.result == 1 && res.data != null && res.data.Count > 0)
        //            listData = _mapper.Map<List<VM_BannerList>>(res.data);
        //    }
        //    catch (Exception ex)
        //    {
        //        Debug.WriteLine("Log banner bottom:" + ex.Message);
        //    }
        //    ViewBag.BannerTop = listData;
        //}
        
        //public async Task GetBannerMid()
        //{
        //    List<VM_BannerList> listData = new List<VM_BannerList>();
        //    try
        //    {
        //        var res = await _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "promotion", EN_BannerLocation.Mid, 10);
        //        if (res.result == 1 && res.data != null && res.data.Count > 0)
        //            listData = _mapper.Map<List<VM_BannerList>>(res.data);
        //    }
        //    catch (Exception ex)
        //    {
        //        Debug.WriteLine("Log banner bottom:" + ex.Message);
        //    }
        //    ViewBag.BannerMid = listData;
        //}

        [HttpGet]
        public async Task<JsonResult> GetListPromotionMember(EN_PromotionType promotionType, DateTime timer, int page = 1)
        {
            var res = await _s_Promotion.getListPromotionByTypeIsManagePaging(_userId, promotionType, EN_PromotionIsManage.Seller, timer, page, RECORD_PROMOTION_MEMBER);
            return Json(new M_JResult(res));
        }

        [HttpPost]
        [Authorize]
        public async Task<JsonResult> SavePromotionCode(string code)
        {
            EM_PromotionApply model = new EM_PromotionApply
            {
                promotionCodeClaim = code,
                personId = Convert.ToInt32(_userId),
                isApply = 0,
            };
            var res = await _s_PromotionApply.Create(_accessToken, model, _userId);
            return Json(new M_JResult(res));
        }
    }
}
