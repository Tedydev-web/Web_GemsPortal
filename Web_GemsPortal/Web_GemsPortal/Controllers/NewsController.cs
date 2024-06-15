using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Microsoft.AspNetCore.Mvc;
using static System.String;
using Web_GemsPortal.ExtensionMethods;
using Microsoft.Extensions.Options;

namespace Web_GemsPortal.Controllers
{
    public class NewsController : BaseController<NewsController>
    {
        private readonly IS_News _s_News;
        private readonly IOptions<Config_MetaSEO> _metaSEO;
        private const int NEWS_RELATION_RECORDS = 10;
        private const int NEWS_LATEST_RECORDS = 10;

        public NewsController(IS_News news, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_News = news;
            _metaSEO = metaSEO;
        }

        [HttpGet]
        public async Task<IActionResult> Index(int? c, int record = 12, int page = 1)
        {
            //ViewBag.keyword = keyword;
            ViewBag.category = c.ToString();
            ViewBag.record = record.ToString();
            ViewBag.page = page.ToString();
            //await GetList(keyword,c,record,page);
            string categoryTitle = Empty;

            if (c != null)
            {
                var res = await _s_NewsCategory.getHubNewsCategoryById(c.Value);
                if (res.result == 1 && res.data != null)
                {
                    ViewBag.categoryId = res.data.id;
                    ViewBag.categoryTitle = res.data.name;
                    categoryTitle = res.data.name;
                }
            }
            await Task.WhenAll(GetListIntroduce(), GetListQuality());
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.News);
            return View();
        }

        // List News
        [HttpGet]
        public async Task<JsonResult> GetList(string keyword, int? c, int record = 12, int page = 1)
        {
            ResponseData<List<M_News>> res = await _s_News.getListHubNewsByCategoryIdTypeId(_supplierId, c, EN_NewsCategoryTypeId.News, record, page);
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetListLatestNews()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, NEWS_LATEST_RECORDS, EN_NewsCategoryTypeId.News);
            return Json(new M_JResult(res));
        }

        //Related News
        [HttpGet]
        public async Task<JsonResult> GetListNewsRelation(int? c)
        {
            var res = await _s_News.getListHubNewsByNewsCategoryId(_supplierId, c, NEWS_RELATION_RECORDS);
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<IActionResult> ViewDetail(string nameSlug, int id)
        {
            try
            {
                var res = await _s_News.getHubNewsById(id);
                switch (res.result)
                {
                    case -1: return Redirect("/");
                    case 0: return Redirect("/error/404");
                    case 1:
                        if (res.data != null)
                        {
                            var data = res.data;
                            SetViewDataSEOExtensionMethod.SetViewDataSEOCustom(this, new ViewModels.VM_ViewDataSEO
                            {
                                Keywords = data.title,
                                Title = data.title,
                                Description = data.description,
                                Image = data.imageObj?.mediumUrl,
                            });
                            return PartialView(res.data);
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


        [HttpGet]
        public async Task GetListIntroduce()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, 6, EN_NewsCategoryTypeId.Introduce);
            if (res.result == 1 && res.data != null)
            {
                ViewBag.ListNews = res.data;
            }
        }
        [HttpGet]
        public async Task GetListQuality()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, 6, EN_NewsCategoryTypeId.quantity);
            if (res.result == 1 && res.data != null)
            {
                ViewBag.ListQuality = res.data;
            }
        }
    }
}
