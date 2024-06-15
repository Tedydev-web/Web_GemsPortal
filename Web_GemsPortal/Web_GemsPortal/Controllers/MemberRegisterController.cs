using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Web_GemsPortal.EditModels;
using Web_GemsPortal.ExtensionMethods;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Org.BouncyCastle.Tls.Crypto.Impl;

namespace Web_GemsPortal.Controllers
{
    public class MemberRegisterController : BaseController<MemberRegisterController>
    {
        private readonly IS_RegisterContact _s_RegisterContact;
        private readonly IS_SupplierModel _s_SupplierModel;
        private readonly IS_Address _s_Address;
        private readonly IS_Account _s_Account;
        private readonly IS_Utilities _s_Utilities;
        private readonly IOptions<Config_MetaSEO> _metaSEO;

        public MemberRegisterController(IS_RegisterContact registerContact, IS_SupplierModel supplierModel, IS_Address address, IS_Account account, IS_Utilities utilities, IOptions<Config_MetaSEO> metaSEO)
        {
            _s_RegisterContact = registerContact;
            _s_SupplierModel = supplierModel;
            _s_Address = address;
            _s_Account = account;
            _s_Utilities = utilities;
            _metaSEO = metaSEO;
        }

        public async Task<IActionResult> Index()
        {
            Task task1 = SetDropDownListProvince(),
             task2 = SetDropDownListSupplierModel();
            await Task.WhenAll(task1, task2);
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, _metaSEO.Value.RegisMember);
            return View();
        }


        [HttpPost, ValidateAntiForgeryToken]
        public async Task<JsonResult> Submit(EM_RegisterContact model)
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
            model.Name = model.LastName + " " + model.FirstName;
            model.Remark = "Đây là thông báo yêu cầu đăng ký trở thành Nhà Phân Phối";
            model.SupplierModelId = 0;
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(ModelState));
                return Json(jResult);
            }
            var res = await _s_RegisterContact.Create(model, _userId);
            if (res.result == 1)
            {
                try
                {
                    await SendEmail(model);

                    var resAdminInfo = await _s_Supplier.getHubSupplierById(CommonConstants.OWNER_SUPPLIER_ID.ToString());
                    if (resAdminInfo.data != null)
                    {
                        string telephone = resAdminInfo.data.telephoneNumber;
                        if (!string.IsNullOrEmpty(telephone))
                        {
                            EM_SendSms smsObj = new EM_SendSms
                            {
                                templateId = CommonConstants.TEMPLATE_NEW_REGISTER,
                                phone = telephone,
                                param1 = CommonConstants.BRAND_NAME
                            };
                            await _s_Utilities.SendSmsList(_accessToken, smsObj);
                        }
                    }

                }
                catch (Exception)
                {

                }
            }
            return Json(new M_JResult(res));
        }

        private async Task<M_Supplier> getAdminSupplier()
        {
            var res = await _s_Supplier.getHubSupplierById("1");
            if (res.data != null)
                return res.data;
            return new M_Supplier();
        }

        private async Task SendEmail(EM_RegisterContact model)
        {
            var adminInfo = await getAdminSupplier();
            if (adminInfo != null && !string.IsNullOrEmpty(adminInfo.email))
            {
                EM_SendMail emailModel = new EM_SendMail
                {
                    Subject = $"THÔNG BÁO ĐĂNG KÝ TRỞ THÀNH NHÀ PHÂN PHỐI - {model.Name}|{model.TelephoneNumber}",
                    RecipientEmail = "phamtuanit.dev@gmail.com",
                    //RecipientEmail = @adminInfo.email,
                    Message = $"Chủ thể <strong>{model.Name}|{model.TelephoneNumber}|{model.Email}</strong> đã gửi yêu cầu đăng ký trở thành Nhà Phân Phối. Hãy truy cập trang quản trị để xử lý theo đường dẫn: <a target='_blank' href='https://admin-gemsgroup.tmdt247.vn'>Tại đây</a>"
                };
                await _s_Account.SendAccountEmail(_accessToken, emailModel);
            }
        }

        public async Task SetDropDownListProvince(string selectedId = "0")
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            var res = await _s_Address.getListProvinceByCountryId();
            if (res.result == 1 && res.data != null)
                result = _mapper.Map<List<VM_SelectDropDown>>(res.data);
            ViewBag.ProvinceId = new SelectList(result, "Id", "Name", selectedId);
        }
        public async Task SetDropDownListSupplierModel(string selectedId = "0")
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            var resultApi = await _s_SupplierModel.getListSupplierModelBySequenceStatus("1");
            if (resultApi.result == 1 && resultApi.data != null)
                result = _mapper.Map<List<VM_SelectDropDown>>(resultApi.data);
            ViewBag.SupplierModelId = new SelectList(result, "Id", "Name", selectedId);
        }
    }
}
