using Web_GemsPortal.EditModels.Contact;
using Web_GemsPortal.ExtensionMethods;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Web_GemsPortal.EditModels;

namespace Web_GemsPortal.Controllers
{
    public class ContactController : BaseController<ContactController>
    {
        private readonly IS_Contact _s_Contact;
        private readonly IS_ContactType _s_ContactType;
        private readonly IConfiguration _configuration;
        private readonly IS_GoogleReCAPTCHA _s_GoogleReCAPTCHA;
        private readonly IOptions<Config_MetaSEO> _metaSEO;

        public ContactController(IS_Contact contact, IS_ContactType contactType, IConfiguration configuration, IS_GoogleReCAPTCHA googleReCAPTCHA, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_Contact = contact;
            _s_ContactType = contactType;
            _configuration = configuration;
            _s_GoogleReCAPTCHA = googleReCAPTCHA;
            _metaSEO = metaSEO;
        }

        public async Task<IActionResult> Index()
        {
            await SetDropDownListContactType(0);
            ViewData["KeyGoogleMap"] = _configuration.GetValue<string>("KeyGoogleMap");
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.Contact);
            return View(new EM_Contact { SupplierId = Encryptor.Encrypt(_supplierId) });
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<JsonResult> SubmitContact(EM_Contact model)
        {
            M_JResult jResult = new M_JResult();
            ////Google check robot
            //var _googeRecp = await _s_GoogleReCAPTCHA.VertifyToken(model.TokenReCAPTCHA);
            //if (!_googeRecp.success && _googeRecp.score <= 0.5)
            //{
            //    jResult.result = 0;
            //    jResult.error.message = "reCAPTCHA warning: You are a robot. Denied access.";
            //    return Json(jResult);
            //}

            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(ModelState));
                return Json(jResult);
            }
            model.SupplierId = Encryptor.Decrypt(model.SupplierId);
            var res = await _s_Contact.Create(model, _userId);
            return Json(new M_JResult(res));
        }

        public async Task SetDropDownListContactType(int selectedId = 0, int type = 0)
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            var res = await _s_ContactType.getListContactTypeByStatusBranch(type);
            if (res.result == 1 && res.data != null)
                result = _mapper.Map<List<VM_SelectDropDown>>(res.data);
            ViewBag.ContactTypeId = new SelectList(result, "Id", "Name", selectedId);
        }


    }
}
