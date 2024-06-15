using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static System.String;
using Microsoft.Extensions.Options;
using Web_GemsPortal.ExtensionMethods;

namespace Web_GemsPortal.Controllers
{
    public class TrainingController : BaseController<TrainingController>
    {
        private readonly IS_News _s_News;
        private readonly IS_RegisterCourse _s_RegisterCourse;
        private readonly IOptions<Config_MetaSEO> _metaSEO;
        private const int NEWS_RELATION_RECORDS = 5;

        public TrainingController(IS_News news, IS_RegisterCourse registerCourse, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_News = news;
            _s_RegisterCourse = registerCourse;
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
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Training);
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetList(string keyword, int? c, int record = 12, int page = 1)
        {
            ResponseData<List<M_News>> res = await _s_News.getListHubNewsByCategoryIdTypeId(_supplierId, c, EN_NewsCategoryTypeId.Training, record, page);
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetListNewsRelation(int? c)
        {
            var res = await _s_News.getListHubNewsByNewsCategoryId(_supplierId, c, NEWS_RELATION_RECORDS);
            return Json(new M_JResult(res));
        }

        [HttpPost]
        [Authorize]
        public async Task<JsonResult> Register(int categoryId, int id)
        {
            var res = await _s_RegisterCourse.Create(new EM_RegisterCourse
            {
                newsCategoryId = categoryId,
                newsId = id,
                personId = Convert.ToInt32(_userId),
                supplierId = Convert.ToInt32(_supplierId),
            }, _userId);
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
                            ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEOCustom(this, new ViewModels.VM_ViewDataSEO
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
    }
}
