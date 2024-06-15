using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Caching.Memory;
using static System.String;

namespace Web_GemsPortal.Controllers
{
    public abstract class BaseController<T> : Controller where T : BaseController<T>
    {
        private IMapper mapper;
        private IHttpContextAccessor httpContextAccessor;
        private IMemoryCache memoryCache;
        private IS_Banner s_Banner;
        private IS_NewsCategory s_NewsCategory;
        private IS_Category s_Category;
        private IS_Supplier s_Supplier;
        private string supplierId = Empty;
        private string accessToken = Empty;
        private string userId = Empty;
        private string shoppingCartId = Empty;
        private string userIdentity = Empty;

        protected IMemoryCache _memoryCache => memoryCache ?? (memoryCache = HttpContext?.RequestServices.GetService<IMemoryCache>());

        protected IS_Banner _s_Banner => s_Banner ?? (s_Banner = HttpContext?.RequestServices.GetService<IS_Banner>());

        protected IS_NewsCategory _s_NewsCategory => s_NewsCategory ?? (s_NewsCategory = HttpContext?.RequestServices.GetService<IS_NewsCategory>());

        protected IS_Category _s_Category => s_Category ?? (s_Category = HttpContext?.RequestServices.GetService<IS_Category>());

        protected IS_Supplier _s_Supplier => s_Supplier ?? (s_Supplier = HttpContext?.RequestServices.GetService<IS_Supplier>());

        protected IMapper _mapper => mapper ?? (mapper = HttpContext?.RequestServices.GetService<IMapper>());

        protected IHttpContextAccessor _httpContextAccessor => httpContextAccessor ?? (httpContextAccessor = HttpContext?.RequestServices.GetService<IHttpContextAccessor>());

        protected string _supplierId => CommonConstants.OWNER_SUPPLIER_ID.ToString();

        protected string _accessToken => IsNullOrEmpty(accessToken) ? (accessToken = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "AccessToken")?.Value) : accessToken;

        protected string _userId => IsNullOrEmpty(userId) ? (userId = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value) : userId;

        protected string _userIdentity => IsNullOrEmpty(userIdentity) ? (userIdentity = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "UserIdentity")?.Value) : userIdentity;

        protected string _shoppingCartId => IsNullOrEmpty(shoppingCartId) ? (shoppingCartId = HttpContext?.User.Claims.FirstOrDefault(c => c.Type == "ShoppingCartId")?.Value) : shoppingCartId;

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!_memoryCache.TryGetValue(CommonConstants.CACHE_KEY_SUPPLIER_INFO, out ResponseData<M_Supplier> supplierInfo))
            {
                supplierInfo = _s_Supplier.getHubSupplierById(CommonConstants.OWNER_SUPPLIER_ID.ToString()).Result;
                if (supplierInfo.result == 1 && supplierInfo.data != null)
                {
                    MemoryCacheEntryOptions cacheExpiryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(10),
                        Priority = CacheItemPriority.Normal,
                        //SlidingExpiration = TimeSpan.FromMinutes(5),
                        Size = 1024
                    };
                    _memoryCache.Set(CommonConstants.CACHE_KEY_SUPPLIER_INFO, supplierInfo, cacheExpiryOptions);
                }
            }
            if (!_memoryCache.TryGetValue(CommonConstants.CACHE_KEY_CATEGORY, out ResponseData<List<M_Category>> category))
            {
                category = _s_Category.getListMenu(CommonConstants.OWNER_SUPPLIER_ID.ToString()).Result;
                if (category.result == 1 && category.data != null)
                {
                    MemoryCacheEntryOptions cacheExpiryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(10),
                        Priority = CacheItemPriority.Normal,
                        //SlidingExpiration = TimeSpan.FromMinutes(5),
                        Size = 1024
                    };
                    _memoryCache.Set(CommonConstants.CACHE_KEY_CATEGORY, category, cacheExpiryOptions);
                }
            }
            if (!_memoryCache.TryGetValue(CommonConstants.CACHE_KEY_NEWSCATEGORY, out ResponseData<List<M_NewsCategory>> newsCategory))
            {
                newsCategory = _s_NewsCategory.getListHubNewsCategoryALL(_supplierId).Result;
                if (newsCategory.result == 1 && newsCategory.data != null)
                {
                    MemoryCacheEntryOptions cacheExpiryOptions = new MemoryCacheEntryOptions
                    {
                        AbsoluteExpiration = DateTime.Now.AddMinutes(10),
                        Priority = CacheItemPriority.Normal,
                        //SlidingExpiration = TimeSpan.FromMinutes(5),
                        Size = 1024
                    };
                    _memoryCache.Set(CommonConstants.CACHE_KEY_NEWSCATEGORY, newsCategory, cacheExpiryOptions);
                }
            }
            VM_Menu menu = new VM_Menu();
            menu.Categorys = _mapper.Map<List<VM_Menu.Category>>(category.data);
            menu.NewsCategorys = _mapper.Map<List<VM_Menu.NewsCategory>>(newsCategory.data);
            ViewBag.NewsCategory = newsCategory.data ?? new List<M_NewsCategory>();
            ViewBag.SupplierInfo = supplierInfo.data ?? new M_Supplier();
            ViewBag.Menu = menu;
        }

        protected async Task SetDropDownListCountry(string selectedId = "0")
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            var res = await HttpContext?.RequestServices.GetService<IS_Address>().getListCountry();
            if (res.result == 1 && res.data != null)
                result = _mapper.Map<List<VM_SelectDropDown>>(res.data);
            ViewBag.CountryId = new SelectList(result, "Id", "Name", selectedId);
        }

        protected async Task SetDropDownListProvince(string selectedId = "0", string countryId = "1")
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            if (countryId != "0")
            {
                var res = await HttpContext?.RequestServices.GetService<IS_Address>().getListProvinceByCountryId(countryId);
                if (res.result == 1 && res.data != null)
                    result = _mapper.Map<List<VM_SelectDropDown>>(res.data);
            }
            ViewBag.ProvinceId = new SelectList(result, "Id", "Name", selectedId);
        }

        protected async Task SetDropDownListDistrict(string selectedId = "0", string provinceId = "0")
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            if (provinceId != "0")
            {
                var res = await HttpContext?.RequestServices.GetService<IS_Address>().getListDistrictByProvinceId(provinceId);
                if (res.result == 1 && res.data != null)
                    result = _mapper.Map<List<VM_SelectDropDown>>(res.data);
            }
            ViewBag.DistrictId = new SelectList(result, "Id", "Name", selectedId);
        }

        protected async Task SetDropDownListWard(string selectedId = "0", string districtId = "0")
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            if (districtId != "0")
            {
                var res = await HttpContext?.RequestServices.GetService<IS_Address>().getListWardByDisctrictId(districtId);
                if (res.result == 1 && res.data != null)
                    result = _mapper.Map<List<VM_SelectDropDown>>(res.data);
            }
            ViewBag.WardId = new SelectList(result, "Id", "Name", selectedId);
        }
    }
}
