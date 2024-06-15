using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using Web_GemsPortal.ViewModels.Member;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web_GemsPortal.ExtensionMethods;
using Microsoft.Extensions.Options;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;
using Web_GemsPortal.ViewModels.Product;

namespace Web_GemsPortal.Controllers
{
    public class MemberController : BaseController<MemberController>
    {
        private readonly IS_ContactType _s_ContactType;
        private readonly IS_Post _s_Post;
        private readonly IS_Product _s_Product;
        private readonly IOptions<Config_MetaSEO> _metaSEO;
        private readonly int MAX_POST = 10;
        private const int MAX_PRODUCT = 24;

        public MemberController(IS_ContactType contactType, IS_Post post, IS_Product product, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_ContactType = contactType;
            _s_Post = post;
            _s_Product = product;
            _metaSEO = metaSEO;
        }

        public IActionResult Index()
        {
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.MemberList);
            return View();
        }

        public async Task<JsonResult> GetList()
        {
            M_JResult jResult = new M_JResult();
            var res = await _s_Supplier.getListSupplierByParentId(_supplierId);
            jResult.result = res.result;
            jResult.data2nd = res.data2nd ?? 0;
            if (res.result == 1 && res.data != null)
                jResult.data = _mapper.Map<List<VM_MemberList>>(res.data);
            return Json(jResult);
        }
        private async Task<M_Supplier> GetInfoShop(string identity)
        {
            var res = await _s_Supplier.getSupplierByMemberUrlIdentity(identity);
            if (res.data != null)
            {
                return res.data;
            }
            return new M_Supplier();
        }
        [HttpGet]
        public async Task<JsonResult> GetListProduct(string supplierId)
        {
            var res = await _s_Product.getListProductRegisBySupplierId("1", supplierId, 0, 0);
            return Json(new M_JResult(res));
        }

        public async Task<IActionResult> ViewDetail(string identity)
        {
            try
            {
                var res = await _s_Supplier.getSupplierByMemberUrlIdentity(identity);
                switch (res.result)
                {
                    case -1: return Redirect("/error/500");
                    case 0: return Redirect("/error/404");
                    case 1:
                        if (res.data != null)
                        {
                            VM_MemberDetail data = _mapper.Map<VM_MemberDetail>(res.data);
                            ViewBag.SupplierId = Lib.Encryptor.Encrypt(res.data.id.ToString());
                            ViewBag.RecordsProduct = MAX_PRODUCT;
                            await SetDropDownListContactType(1);
                            ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEOCustom(this, new VM_ViewDataSEO
                            {
                                Title = data.ShopName + " | " + data.Address,
                                Description = data.ShopName + " | " + data.Address,
                                Keywords = data.ShopName + " | " + data.Address,
                                Image = data.Avatar,
                            });
                            return View(data);
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

        public async Task<JsonResult> GetListPostInNews(int page, string shopId)
        {
            M_JResult jResult = new M_JResult();
            var res = await _s_Post.getListPostBySequenceStatusPageRecorNumber(page, MAX_POST);
            jResult.result = res.result;
            jResult.data2nd = res.data2nd ?? 0;
            if (res.result == 1 && res.data != null)
                jResult.data = _mapper.Map<List<VM_ProfilePostList>>(res.data);
            return Json(jResult);
        }

        public async Task<JsonResult> GetListProfilePost(int page, string shopId)
        {
            M_JResult jResult = new M_JResult();
            var res = await _s_Post.getListPostBySupplierIdSequenceStatusPageRecorNumber(Encryptor.Decrypt(shopId), page, MAX_POST);
            jResult.result = res.result;
            jResult.data2nd = res.data2nd ?? 0;
            if (res.result == 1 && res.data != null)
                jResult.data = _mapper.Map<List<VM_ProfilePostList>>(res.data);
            return Json(jResult);
        }

        public async Task SetDropDownListContactType(int selectedId = 0, int type = 1)
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            var res = await _s_ContactType.getListContactTypeByStatusBranch(type);
            if (res.result == 1 && res.data != null)
                result = _mapper.Map<List<VM_SelectDropDown>>(res.data);
            ViewBag.ContactTypeId = new SelectList(result, "Id", "Name", selectedId);
        }

        //Detail Product
        [HttpGet]
        public async Task<IActionResult> P_ProductDetail(int id, int supplierValue)
        {
            var res = await _s_Product.getHubProductByIdSupplierId(id, supplierValue);
            if (res.data != null)
            {

                VM_ProductDetail result = _mapper.Map<VM_ProductDetail>(res.data);
                var listImageObj = new List<VM_ImageObj>();
                listImageObj.Add(result.ImageObj);
                listImageObj.AddRange(result.ImageListObj);
                result.ImageListObj = listImageObj;
                result.ProductColorSizeJsonObj = "[]";
                ExtensionMethods.SetViewDataSEOExtensionMethod.SetViewDataSEOCustom(this, new ViewModels.VM_ViewDataSEO
                {
                    Title = result.Name,
                    Description = result.SummaryInfo,
                    Keywords = result.Name,
                    Image = result.ImageObj?.MediumUrl,
                });
                return PartialView(result);
            }
            return Redirect("/");
        }
    }
}
