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
using Microsoft.AspNetCore.Hosting;
using System.Security.Policy;
using Microsoft.AspNetCore.Mvc.Formatters;

namespace Web_GemsPortal.Controllers
{
    public class HomeController : BaseController<HomeController>
    {

        private readonly IOptions<Config_MetaSEO> _metaSEO;
        private readonly IS_News _s_News;
        private readonly IS_ConfigHome _s_ConfigHome;
        private readonly IS_CustomerTestimonial _s_CustomerTestimonial;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public HomeController(IOptions<Config_MetaSEO> metaSEO, IS_News news, IS_ConfigHome configHome, IS_CustomerTestimonial customerTestimonial, IWebHostEnvironment webHostEnvironment)
        {
            _metaSEO = metaSEO;
            _s_News = news;
            _s_ConfigHome = configHome;
            _s_CustomerTestimonial = customerTestimonial;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                Task task1 = GetBanner(),
                     task2 = GetListIntroduce(),
                     task3 = GetListQuantity(),
                     task4 = GetConfigHomeLocation1(),
                     task5 = GetConfigHomeLocation2(),
                     task6 = GetConfigHomeLocation3(),
                     task7 = GetConfigHomeLocation4(),
                     task8 = GetListCustomerTestimonial();
                await Task.WhenAll(task1, task2, task3, task4, task5, task6, task7, task8);
                ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Home);
            }
            catch (Exception)
            {
                throw;
            }
            return View();
        }

        public async Task GetBanner()
        {
            List<VM_BannerList> listData = new List<VM_BannerList>();
            try
            {
                Task<ResponseData<List<M_Banner>>> location1 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location1, 10),
                    location2 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location2, 10),
                    location3 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location3, 10);
                    //location4 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location4, 10),
                    //location5 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location5, 10),
                    //location6 = _s_Banner.getListHubBannerByLocationIdPageName(_supplierId, "home", EN_BannerLocation.Location6, 10);
                await Task.WhenAll(location1, location2, location3);/*, location4, location5, location6*/

                ViewBag.BannerLocation1 = location1.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location1.Result.data) : new List<VM_BannerList>();
                ViewBag.BannerLocation2 = location2.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location2.Result.data) : new List<VM_BannerList>();
                ViewBag.BannerLocation3 = location3.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location3.Result.data) : new List<VM_BannerList>();
                //ViewBag.BannerLocation4 = location4.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location4.Result.data) : new List<VM_BannerList>();
                //ViewBag.BannerLocation5 = location5.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location5.Result.data) : new List<VM_BannerList>();
                //ViewBag.BannerLocation6 = location6.Result.data != null ? _mapper.Map<List<VM_BannerList>>(location6.Result.data) : new List<VM_BannerList>();
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Log banner bottom:" + ex.Message);
            }
        }

        [HttpGet]
        public async Task GetListIntroduce()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, 6, EN_NewsCategoryTypeId.Introduce, 1);
            if (res.result == 1 && res.data != null)
            {
                ViewBag.ListIntroduce = res.data;
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
        private async Task GetListQuantity()
        {
            var res = await _s_News.getListHubNewsByNews(_supplierId, 6, EN_NewsCategoryTypeId.quantity);
            if (res.result == 1 && res.data != null)
            {
                ViewBag.ListQuantity = res.data;
            }
        }

        private async Task GetConfigHome1()
        {
            HttpClient client = new HttpClient();
            var response = await client.GetAsync("https://admin-gemsgroup.tmdt247.vn/config/config-home1.json");
            response.EnsureSuccessStatusCode();
            var jsonres = await response.Content.ReadAsStringAsync();
            var res = JsonConvert.DeserializeObject<List<M_ConfigHome>>(jsonres);
            if (res != null)
            {
                ViewBag.ListConfigHome1 = res;
            }
            ViewBag.ListConfigHome1 = new List<M_ConfigHome>();
        }

        private async Task GetConfigHome2()
        {
            HttpClient client = new HttpClient();
            var response = await client.GetAsync("https://admin-gemsgroup.tmdt247.vn/config/config-home2.json");
            response.EnsureSuccessStatusCode();
            var jsonres = await response.Content.ReadAsStringAsync();
            var res = JsonConvert.DeserializeObject<List<M_ConfigHome>>(jsonres);
            if (res != null)
            {
                ViewBag.ListConfigHome1 = res;
            }
            ViewBag.ListConfigHome2 = new List<M_ConfigHome>();
        }

        private async Task GetConfigHomeLocation4()
        {
            HttpClient client = new HttpClient();
            var response = await client.GetAsync("https://admin-gemsgroup.tmdt247.vn/config/config-home-location4.json");
            response.EnsureSuccessStatusCode();
            var jsonres = await response.Content.ReadAsStringAsync();
            var res = JsonConvert.DeserializeObject<string>(jsonres);
            if (res != null)
            {
                ViewBag.ListConfigHome1 = res;
            }
        }

        private async Task GetConfigHomeLocation1()
        {
            var res = await _s_ConfigHome.GetListBySequenceStatusSupplierIdLocation("1", int.Parse(_supplierId), 1);
            if (res.result == 1 && res.data != null)
            {
                ViewBag.ListConfigHomeLocation1 = res.data;
            }
        }

        private async Task GetConfigHomeLocation3()
        {
            var res = await _s_ConfigHome.GetListBySequenceStatusSupplierIdLocation("1", int.Parse(_supplierId), 3);
            if (res.result == 1 && res.data != null)
            {
                ViewBag.ListConfigHomeLocation3 = res.data;
            }
        }

        private async Task GetConfigHomeLocation2()
        {
            var res = await _s_ConfigHome.GetListBySequenceStatusSupplierIdLocation("1", int.Parse(_supplierId), 2);
            if (res.result == 1 && res.data != null)
            {
                ViewBag.ListConfigHomeLocation2 = res.data;
            }
        }

        private async Task GetListCustomerTestimonial()
        {
            var res = await _s_CustomerTestimonial.GetListBySequenceStatusSupplierId("1", int.Parse(_supplierId));
            if (res.result == 1 && res.data != null)
            {
                ViewBag.ListCustomerTestimonial = res.data;
            }
        }

    }
}
