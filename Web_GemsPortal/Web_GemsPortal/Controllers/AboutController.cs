using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Web_GemsPortal.ExtensionMethods;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using static System.String;

namespace Web_GemsPortal.Controllers
{
    public class AboutController : BaseController<AboutController>
    {
        private readonly IS_News _s_News;
        private readonly IOptions<Config_MetaSEO> _metaSEO;

        public AboutController(IS_News news, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_News = news;
            _metaSEO = metaSEO;
        }

        [HttpGet]
        public async Task<IActionResult> Index(int? c, int record = 12, int page = 1)
        {
            ViewBag.category = c.ToString();
            ViewBag.record = record.ToString();
            ViewBag.page = page.ToString();
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
            await Task.WhenAll(GetListNews(), GetListQuality());

            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Introduce);
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetList(int? c, int record = 12, int page = 1)
        {
            ResponseData<List<M_News>> res = await _s_News.getListHubNewsByCategoryIdTypeId(_supplierId, c, EN_NewsCategoryTypeId.Introduce, record, page);
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
                    case -1: return Redirect("/error/500");
                    case 0: return Redirect("/error/404");
                    case 1:
                        if (res.data != null)
                        {
                            var data = res.data;
                            ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEOCustom(this, new ViewModels.VM_ViewDataSEO
                            {
                                Keywords = data.title,
                                Title = data.title,
                                Description = data.description,
                                Image = data.imageObj?.mediumUrl,
                            });
                            return PartialView(data);
                        }
                        else
                            return Redirect("/error/404");
                    default: break;
                }
                return Redirect("/error/500");
            }
            catch (Exception)
            {
                return Redirect("/error/500");
            }
        }

        [HttpGet]
        public async Task GetListNews()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, 6, EN_NewsCategoryTypeId.News);
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
