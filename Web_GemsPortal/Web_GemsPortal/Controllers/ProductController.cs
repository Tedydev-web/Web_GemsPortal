using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using Web_GemsPortal.ViewModels.Product;
using Microsoft.AspNetCore.Mvc;
using static System.String;
using System.Diagnostics;
using Web_GemsPortal.ViewModels.Banner;

namespace Web_GemsPortal.Controllers
{
    public class ProductController : BaseController<ProductController>
    {
        private readonly IS_Product _s_Product;
        private readonly IS_Unit _s_Unit;
        private readonly IS_PackingForm _s_PackingForm;
        private readonly IS_News _s_News;
        private readonly IS_PropertyFilter _s_PropertyFilter;
        private static List<int> typeRange = new List<int> { 1, 2, 3, 4, 5 };
        private const int MAX_RECORDS = 64;
        private const int NEW_PRODUCT = 9;
        private const int RELATED_PRODUCT = 10;

        public ProductController(IS_Product product, IS_Unit unit, IS_PackingForm packingForm, IS_News news, IS_PropertyFilter propertyFilter)
        {
            _s_Product = product;
            _s_Unit = unit;
            _s_PackingForm = packingForm;
            _s_News = news;
            _s_PropertyFilter = propertyFilter;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string keyword, int type = 1, int c1 = 0, int c2 = 0, string unit = "", string pac = "", string prop0 = "", string prop1 = "", string prop2 = "", string prop3 = "", string star = "", int price = 0, int record = 24, int page = 1)
        {
            ViewBag.category1 = c1;
            ViewBag.category2 = c2;
            ViewBag.type = type;
            ViewBag.keyword = keyword;
            ViewBag.unit = unit;
            ViewBag.packingForm = pac;
            ViewBag.propertyFilter0 = prop0;
            ViewBag.propertyFilter1 = prop1;
            ViewBag.propertyFilter2 = prop2;
            ViewBag.propertyFilter3 = prop3;
            ViewBag.star = star;
            ViewBag.price = price;
            ViewBag.record = record;
            ViewBag.page = page;
            int? idLv1 = 0;
            string nameLv1 = Empty;
            string nameLv2 = Empty;

            if (c2 != 0)
            {
                var res = await _s_Category.getCategoryByIdStatus(c2);
                if (res.result == 1 && res.data != null)
                {
                    idLv1 = res.data.parentId;
                    nameLv1 = res.data.parentObj?.name;
                    nameLv2 = res.data.name;
                }
            }
            else if (c1 != 0 && c2 == 0)
            {
                var res = await _s_Category.getCategoryByIdStatus(c1);
                if (res.result == 1 && res.data != null)
                {
                    nameLv1 = res.data.name;
                    idLv1 = res.data.id;
                }
            }

            keyword = !IsNullOrEmpty(keyword) && keyword.Length > 50 ? keyword.Substring(0, 50) + "..." : keyword;
            var breadCrumb = new VM_BreadCrumb();
            if (!IsNullOrEmpty(keyword))
            {
                breadCrumb.currentName = keyword;
                breadCrumb.lv1Name = "Sản phẩm";
                breadCrumb.lv1Url = "/san-pham";
            }
            else
            {
                if (!IsNullOrEmpty(nameLv2))
                {
                    breadCrumb.currentName = nameLv2;
                    breadCrumb.lv1Name = "Sản phẩm";
                    breadCrumb.lv1Url = "/san-pham";
                    breadCrumb.lv2Name = nameLv1;
                    breadCrumb.lv2Url = $"/san-pham?c1={idLv1}";
                }
                else if (!IsNullOrEmpty(nameLv1))
                {
                    breadCrumb.currentName = nameLv1;
                    breadCrumb.lv1Name = "Sản phẩm";
                    breadCrumb.lv1Url = "/san-pham";
                }
                else
                {
                    breadCrumb.currentName = "Sản phẩm";
                }
            }
            ViewBag.BreadCrumb = breadCrumb;
            ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new ViewModels.VM_ViewDataSEO
            {
                Title = breadCrumb.currentName + " | GEMS GROUP",
                Description = breadCrumb.currentName + " | GEMS GROUP",
                Keywords = breadCrumb.currentName + " | GEMS GROUP",
            });
            return View();
        }

        [HttpGet]
        public IActionResult Search(string keyword)
        {
            keyword = CleanXSSHelper.CleanXSS(keyword);
            return Redirect($"/san-pham?keyword={keyword}");
        }

        [HttpGet]
        public async Task<JsonResult> QuickSearch(string keyword)
        {
            var res = await _s_Product.getListHubProductByProductConditionSecond(keyword, 0, "", "", "", "", "", "", "", default(int?), default(int?), 1, 1, 20);
            return Json(new M_JResult(res));
        }

        //Load ListProduct
        [HttpGet]
        public async Task<JsonResult> GetList(string keyword, int type = 1, int c1 = 0, int c2 = 0, string unit = "", string pac = "", string prop0 = "", string prop1 = "", string prop2 = "", string prop3 = "", string star = "", int price = 0, int record = 24, int page = 1)
        {
            if (record > MAX_RECORDS) //maximum records
            {
                record = MAX_RECORDS;
            }

            //Check type range
            if (!typeRange.Contains(type))
                type = 1;

            //Get price data
            var priceItem = new VM_PriceList.PriceObj() { id = 0, fPrice = 0, tPrice = 0 };
            if (price != 0)
                priceItem = VM_PriceList.PriceData.FirstOrDefault(x => x.id == price);

            //Load Record Default
            ResponseData<List<M_Product>> res = new ResponseData<List<M_Product>>();

            //Check condition
            if (c1 != 0 && c2 == 0) //Return by category Lv1
                res = await _s_Product.getListHubProductByProductConditionSecond(keyword, c1, unit, pac, prop0, prop1, prop2, prop3, star, priceItem.fPrice, priceItem.tPrice, type, page, record);
            else if (c1 != 0 && c2 != 0) //Return by category Lv2
                res = await _s_Product.getListHubProductByProductConditionSecond(keyword, c2, unit, pac, prop0, prop1, prop2, prop3, star, priceItem.fPrice, priceItem.tPrice, type, page, record);
            else //Return all
                res = await _s_Product.getListHubProductByProductConditionSecond(keyword, 0, unit, pac, prop0, prop1, prop2, prop3, star, priceItem.fPrice, priceItem.tPrice, type, page, record);
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetListHotProduct()
        {
            var res = await _s_Product.getHubProductHubIsHot();
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetListNewProduct()
        {
            var res = await _s_Product.getListHubProductByProductNews(1, NEW_PRODUCT);
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetListUnit()
        {
            var res = await _s_Unit.getListUnitBySequenceStatusFromProduct("1"); //Get unit for customer
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetListPackingForm()
        {
            var res = await _s_PackingForm.getListPackingFormBySequenceStatus("1");
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetListPropertyFilter()
        {
            var res = await _s_PropertyFilter.getListPropertyFilterBySequenceStatusSequenceTypeId("1", "0,1,2,3");
            return Json(new M_JResult(res));
        }

        ////Load Banner Commercial Product
        //[HttpGet]
        //public async Task<JsonResult> GetBannerLeftBottom()
        //{
        //    var res = await _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "product", EN_BannerLocation.Bottom, 1);
        //    return Json(new M_JResult(res));
        //}

        //Detail Product
        [HttpGet]
        public async Task<IActionResult> ViewDetail(string nameSlug, int id)
        {
            try
            {
                var res = await _s_Product.getHubProductById(id);
                switch (res.result)
                {
                    case -1: return Redirect("/");
                    case 0: return Redirect("/error/404");
                    case 1:
                        if (res.data != null)
                        {
                            if (res.data.status != 1)
                                return Redirect("/");

                            VM_ProductDetail result = _mapper.Map<VM_ProductDetail>(res.data);
                            var listImageObj = new List<VM_ImageObj>();
                            listImageObj.Add(result.ImageObj);
                            listImageObj.AddRange(result.ImageListObj);
                            result.ImageListObj = listImageObj;
                            result.ProductColorSizeJsonObj = "[]";
                            //result.ProductColorSizeJsonObj = JsonConvert.SerializeObject(result.ProductColorSizeObj);
                            ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEOCustom(this, new ViewModels.VM_ViewDataSEO
                            {
                                Title = result.Name,
                                Description = result.SummaryInfo,
                                Keywords = result.Name,
                                Image = result.ImageObj?.MediumUrl,
                            });
                            ViewBag.SupplierId = Lib.Encryptor.Encrypt(result.SupplierObj?.id.ToString());
                            return PartialView(result);
                        }
                        else
                            return Redirect("/error/404");
                    default: break;
                }
                return Redirect("/");
            }
            catch (Exception)
            {
                return Redirect("/");
            }
        }

        //public async Task GetBannerMid()
        //{
        //    List<VM_BannerList> listData = new List<VM_BannerList>();
        //    try
        //    {
        //        var res = await _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "product_detail", EN_BannerLocation.Mid, 10);
        //        if (res.result == 1 && res.data != null && res.data.Count > 0)
        //            listData = _mapper.Map<List<VM_BannerList>>(res.data);
        //    }
        //    catch (Exception ex)
        //    {
        //        Debug.WriteLine("Log banner bottom:" + ex.Message);
        //    }
        //    ViewBag.BannerMid = listData;
        //}

        //Load related product
        [HttpGet]
        public async Task<JsonResult> GetListRelatedProduct(int productId, int? c2)
        {
            var res = await _s_Product.getListHubProductByCategoryIdPageSizePage(c2, 1, RELATED_PRODUCT);
            if (res.data != null)
            {
                var find = res.data.FirstOrDefault(x => x.id == productId);
                res.data.Remove(find); //Remove current product
            }
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task GetListIntroduce()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, 6, EN_NewsCategoryTypeId.Introduce);
            if (res.result == 1 && res.data != null)
            {
                ViewBag.ListNews = res.data;
            }
        }

    }
}
