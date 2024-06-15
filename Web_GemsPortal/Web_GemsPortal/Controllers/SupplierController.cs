using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using Web_GemsPortal.ViewModels.Member;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Web_GemsPortal.ExtensionMethods;
using Microsoft.Extensions.Options;
using Web_GemsPortal.ViewModels.Order;
using Web_GemsPortal.EditModels.Contact;

namespace Web_GemsPortal.Controllers
{
    public class SupplierController : BaseController<SupplierController>
    {

        private readonly IOptions<Config_MetaSEO> _metaSEO;
        private readonly IConfiguration _configuration;
        private readonly IS_Supplier _s_Supplier;
        private readonly IS_Account _s_Account;
        private readonly IS_Address _s_Address;

        public SupplierController(IOptions<Config_MetaSEO> metaSEO, IConfiguration configuration, IS_Supplier supplier, IS_Account account, IS_Address address)
        {
            _metaSEO = metaSEO;
            _configuration = configuration;
            _s_Supplier = supplier;
            _s_Account = account;
            _s_Address = address;
        }

        public async Task<IActionResult> Index()
        {
            await SetDropDownListProvince();
            ViewData["KeyGoogleMap"] = _configuration.GetValue<string>("KeyGoogleMap");
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.MemberList);
            return View();
        }
        public async Task<JsonResult> GetListByArea(int provinceId = 0, int districtId = 0)
        {
            var res = await _s_Supplier.GetListSupplierBySlevelParentIdSequenceStatusFdateTdateProvinceIdDistrictIdWardId("2,3",0,default, default, "1", provinceId, districtId, 0);
            return res.result == 1 && res.data != null ? Json(new M_JResult(res, _mapper.Map<List<VM_SupplierObj>>(res.data))) : Json(new M_JResult(res));
        }

        //public async Task<JsonResult> GetListByArea(int slevel = 0, int parentId = 0, int provinceId = 0, int districtId = 0)
        //{
        //    var res = await _s_Supplier.GetListSupplierBySlevelParentIdSequenceStatusFdateTdateProvinceIdDistrictIdWardId(slevel, parentId, default, default, "1", provinceId, districtId, 0);
        //    return res.result == 1 && res.data != null ? Json(new M_JResult(res, _mapper.Map<List<VM_SupplierObj>>(res.data))) : Json(new M_JResult(res));
        //}

        public async Task<JsonResult> GetListByParent(int slevel = 0, int parentId = 0)
        {
            var res = await _s_Supplier.GetListSupplierBySlevelParentIdSequenceStatusFdateTdate(slevel, parentId, default, default, "1");
            return res.result == 1 && res.data != null ? Json(new M_JResult(res, _mapper.Map<List<VM_SupplierObj>>(res.data))) : Json(new M_JResult(res));
        }

        [HttpGet] //Supplier Distributor
        public async Task<PartialViewResult> P_RegisterDistributor()
        {
            await SetDropDownListProvinceFormRegister();
            return PartialView();
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<JsonResult> P_RegisterDistributor(EM_Account_RegisterAccountAndSupplier model)
        {
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(ModelState));
                return Json(jResult);
            }
            model.Slevel = 0;//Slevel 0 is Distributor;
            model.UserName = model.PhoneNumber;
            model.PersonType = "C";
            var res = _s_Account.RegisterAccountAndSupplier(model);
            return Json(new M_JResult(res));
        }

        [HttpGet] //AgentsAndCollaborators
        public async Task<PartialViewResult> P_AgentsAndCollaborators()
        {
            await SetDropDownListProvinceFormRegister();
            return PartialView();
        }

        protected async Task SetDropDownListProvinceFormRegister(string selectedId = "0", string countryId = "1")
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            if (countryId != "0")
            {
                var res = await _s_Address.getListProvinceByCountryId(countryId);
                if (res.result == 1 && res.data != null)
                    result = _mapper.Map<List<VM_SelectDropDown>>(res.data);
            }
            ViewBag.ProvinceIdFormRegister = new SelectList(result, "Id", "Name", selectedId);
        }

    }
}