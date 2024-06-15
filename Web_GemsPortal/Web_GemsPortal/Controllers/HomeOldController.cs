using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels.Banner;
using Web_GemsPortal.ViewModels.Member;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Text.RegularExpressions;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Web_GemsPortal.Controllers
{
    public class HomeOdlController : BaseController<HomeOdlController>
    {
        private readonly IS_Product _s_Product;
        private readonly IS_News _s_News;
        private readonly IS_PartnerList _s_PartnerList;
        private readonly IS_Supplier _s_Supplier;
        private readonly IOptions<Config_MetaSEO> _metaSEO;
        private const int DISCOUNT_PRODUCT_RECORDS = 12; //Sp đang khuyến mãi
        private const int SELLING_PRODUCT_RECORDS = 24; //Sp bán chạy (nổi bật)
        private const int POPULAR_PRODUCT_RECORDS = 24; //Sp phổ biến (xem nhiều)
        private const int SLIDE_PARTNER_RECORDS = 20; //Slide thành viên
        private const int NEWS_LATEST_RECORDS = 10; //Tin tức mới
        private const int TRANING_LATEST_RECORDS = 10; //Đào tạo
        private const int CONSULTING_LATEST_RECORDS = 10; //Tư vấn

        public HomeOdlController(IS_Product product, IS_News news, IS_PartnerList partnerList, IS_Supplier supplier, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_Product = product;
            _s_News = news;
            _s_PartnerList = partnerList;
            _s_Supplier = supplier;
            _metaSEO = metaSEO;
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                Task task1 = GetBanner(),
                     task2 = GetListSupplierNews(),
                     task3 = GetListCategory(),
                task4 = GetListPartnerList();
                await Task.WhenAll(task1, task2, task3, task4);
                ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Home);
            }
            catch (Exception)
            {
                throw;
            }
            return View();
        }

        public IActionResult Policy(string path)
        {
            try
            {
                string PDFpath = $"wwwroot/PDF/policy/{path}";
                byte[] fileByte = System.IO.File.ReadAllBytes(PDFpath);
                MemoryStream ms = new MemoryStream(fileByte);
                return new FileStreamResult(ms, "application/pdf");
            }
            catch (Exception)
            {
                return Redirect("/error/404");
            }
        }

        //public async Task GetBannerTop()
        //{
        //    List<VM_BannerList> listData = new List<VM_BannerList>();
        //    try
        //    {
        //        var res = await _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.TopMain, 10);
        //        if (res.result == 1 && res.data != null && res.data.Count > 0)
        //            listData = _mapper.Map<List<VM_BannerList>>(res.data);
        //    }
        //    catch (Exception ex)
        //    {
        //        Debug.WriteLine("Log banner bottom:" + ex.Message);
        //    }
        //    ViewBag.BannerTop = listData;
        //}

        public async Task GetBanner()
        {
            List<VM_BannerList> listData = new List<VM_BannerList>();
            try
            {
                Task<ResponseData<List<M_Banner>>> location1 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location1, 10),
                    location2 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location2, 10),
                    location3 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location3, 10),
                    location4 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location4, 10),
                    location5 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location5, 10),
                    location6 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location6, 10);
                await Task.WhenAll(location1, location2, location3, location4, location5, location6);

                ViewBag.BannerLocation1 = location1.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location1.Result.data) : new List<VM_BannerList>();
                ViewBag.BannerLocation2 = location2.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location2.Result.data) : new List<VM_BannerList>();
                ViewBag.BannerLocation3 = location3.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location3.Result.data) : new List<VM_BannerList>();
                ViewBag.BannerLocation4 = location4.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location4.Result.data) : new List<VM_BannerList>();
                ViewBag.BannerLocation5 = location5.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location5.Result.data) : new List<VM_BannerList>();
                ViewBag.BannerLocation6 = location6.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location6.Result.data) : new List<VM_BannerList>();
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Log banner bottom:" + ex.Message);
            }
        }

        //public async Task GetBannerMid()
        //{
        //    List<VM_BannerList> listData = new List<VM_BannerList>();
        //    try
        //    {
        //        var res = await _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Mid, 10);
        //        if (res.result == 1 && res.data != null && res.data.Count > 0)
        //            listData = _mapper.Map<List<VM_BannerList>>(res.data);
        //    }
        //    catch (Exception ex)
        //    {
        //        Debug.WriteLine("Log banner bottom:" + ex.Message);
        //    }
        //    ViewBag.BannerMid = listData;
        //}

        //public async Task GetBannerBottom()
        //{
        //    List<VM_BannerList> listData = new List<VM_BannerList>();
        //    try
        //    {
        //        var res = await _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Bottom, 10);
        //        if (res.result == 1 && res.data != null && res.data.Count > 0)
        //            listData = _mapper.Map<List<VM_BannerList>>(res.data);
        //    }
        //    catch (Exception ex)
        //    {
        //        Debug.WriteLine("Log banner bottom:" + ex.Message);
        //    }
        //    ViewBag.BannerBottom = listData;
        //}

        private async Task GetProductDiscount()
        {
            var res = await _s_Product.getListHubProductByProductDiscount(DISCOUNT_PRODUCT_RECORDS);
            if (res.data != null)
            {
                res.data.Select(x =>
                {
                    x.summaryInfo = string.Empty;
                    return x;
                }).ToList();
            }
            ViewBag.ProductDiscount = res.result == 1 && res.data != null ? Regex.Replace(JsonConvert.SerializeObject(res.data), @"\t|\n|\r", "") : "";
        }

        //Load Product By Selling
        [HttpGet]
        public async Task<JsonResult> GetProductSelling()
        {
            var res = await _s_Product.getListHubProductByProductSelling(SELLING_PRODUCT_RECORDS);
            return Json(new M_JResult(res));
        }

        //Load Product By Featured 
        [HttpGet]
        public async Task<JsonResult> GetProductPopular()
        {
            var res = await _s_Product.getListHubProductByProductHighlights(POPULAR_PRODUCT_RECORDS);
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetProductRecently()
        {
            var res = await _s_Product.getListHubProductByProductHighlights(POPULAR_PRODUCT_RECORDS);
            return Json(new M_JResult(res));
        }

        [HttpGet]
        private async Task GetListPartnerList()
        {
            var res = await _s_PartnerList.getListPartnerListBySequenceStatus("1", 0);//1 đối tác
            ViewBag.ListPartner = res.data;
        }
        [HttpGet]
        public async Task<JsonResult> GetListSupplierList()
        {
            var res = await _s_PartnerList.getListPartnerListBySequenceStatus("1", 1); //1 chủ thể
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetListLatestTraning()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, TRANING_LATEST_RECORDS, EN_NewsCategoryTypeId.Training);
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetListLatestConsulting()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, CONSULTING_LATEST_RECORDS, EN_NewsCategoryTypeId.Consulting);
            return Json(new M_JResult(res));
        }

      
        [HttpGet]
        public async Task<JsonResult> GetListLatestNews()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, NEWS_LATEST_RECORDS, EN_NewsCategoryTypeId.News);
            return Json(new M_JResult(res));
        }

        //[HttpGet]
        //public async Task<JsonResult> GetListSlidePartner()
        //{
        //    var res = await _s_Supplier.getListSupplierFromProduct(_supplierId, SLIDE_PARTNER_RECORDS);
        //    return res.data != null ? Json(new M_JResult(res), _mapper.Map<List<VM_MemberList>>(res.data)) : Json(new M_JResult(res));
        //}

        public async Task GetListSupplierNews()
        {
            var res = await _s_Supplier.GetListSupplierBySlevelParentIdSequenceStatusFdateTdateProvinceIdDistrictIdWardId("2,3", 0, default, default, "1", 0, 0, 0);
            if (res.result == 1 && res.data != null && res.data.Count > 0)
            {
                res.data = res.data.OrderBy(x => x.createdAt).Take(10).ToList();
                ViewBag.ListSupplier = res.data;
            }
        }
        public async Task GetListCategory()
        {
            var res = await _s_Category.getListMenu(_supplierId);
            if (res.result == 1 && res.data != null && res.data.Count > 0)
            {
                res.data = res.data;
                ViewBag.ListCategory = res.data;
            }
        }
        public async Task<JsonResult> GetListProductByCategory(int categoryId)
        {
            var res = await _s_Product.getListHubProductByProductConditionSecond("", categoryId, "", "", "", "", "", "", "", 0, 0, 3, 1, 8);
            return Json(new M_JResult(res));
        }

        public async Task<JsonResult> GetProductSale()
        {
            var res = await _s_Product.getListHubProductByProductDiscount(DISCOUNT_PRODUCT_RECORDS);
            if (res.result == 1 && res.data != null)
            {
                res.data.Select(x =>
                {
                    x.summaryInfo = string.Empty;
                    return x;
                }).ToList();
                return Json(new M_JResult(res));
            }
            return Json(new M_JResult(res));
        }
    }
}
