using Web_GemsPortal.EditModels.DeliveryAddress;
using Web_GemsPortal.ExtensionMethods;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web_GemsPortal.Controllers
{
    public class AddressController : BaseController<AddressController>
    {
        private readonly IS_Address _s_Address;
        private readonly IS_DeliveryAddress _s_DeliveryAddress;

        public AddressController(IS_Address address, IS_DeliveryAddress deliveryAddress)
        {
            _s_Address = address;
            _s_DeliveryAddress = deliveryAddress;
        }

        [Authorize]
        public IActionResult Index()
        {
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new VM_ViewDataSEO
            {
                Keywords = "Sổ địa chỉ",
                Title = "Sổ địa chỉ",
                Description = "Sổ địa chỉ",
            });
            return View();
        }

        [HttpGet, Authorize]
        public async Task<JsonResult> GetListDeliveryAddress()
        {
            var res = await _s_DeliveryAddress.getListDeliveryAddressByCustomerIdStatus(_accessToken, _userId);
            return res.result == 1 && res.data != null ? Json(new M_JResult(res, _mapper.Map<List<VM_DeliveryAddress>>(res.data))) : Json(new M_JResult(res));
        }

        [HttpGet, Authorize]
        public async Task<PartialViewResult> P_Add()
        {
            await SetDropDownListProvince();
            return PartialView();
        }

        [HttpPost, Authorize, ValidateAntiForgeryToken]
        public async Task<JsonResult> P_Add(EM_DeliveryAddress model)
        {
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(ModelState));
                return Json(jResult);
            }
            model.customerId = _userId;
            var res = await _s_DeliveryAddress.Create(_accessToken, model, _userId);
            return Json(jResult.MapData(res));
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> P_Edit(string id)
        {
            var res = await _s_DeliveryAddress.getDeliveryAddressByIdStatus(_accessToken, id);
            if (res.result == 1 && res.data != null)
            {
                var data = _mapper.Map<EM_DeliveryAddress>(res.data);
                Task task1 = SetDropDownListProvince(data.provinceId, "1");
                Task task2 = SetDropDownListDistrict(data.districtId, data.provinceId);
                Task task3 = SetDropDownListWard(data.wardId, data.districtId);
                Task.WaitAll(task1, task2, task3);
                return PartialView(data);
            }
            return Json(new M_JResult(res));
        }

        [HttpPost, Authorize, ValidateAntiForgeryToken]
        public async Task<JsonResult> P_Edit(EM_DeliveryAddress model)
        {
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(ModelState));
                return Json(jResult);
            }
            model.timer = DateTime.UtcNow.AddHours(7);
            model.customerId = _userId;
            model.status = 1;
            var res = await _s_DeliveryAddress.Update(_accessToken, model, _userId);
            return Json(jResult.MapData(res));
        }

        [HttpPost, Authorize]
        public async Task<JsonResult> Delete(string id)
        {
            var res = await _s_DeliveryAddress.Delete(_accessToken, id);
            return Json(new M_JResult(res));
        }

        //Function support
        #region Function support
        [AllowAnonymous]
        public async Task<IActionResult> GetListCountryOptionHtml()
        {
            string htmlResult = "";
            var res = await _s_Address.getListCountry();
            if (res.result == 1 && res.data != null)
            {
                for (int i = 0; i < res.data.Count; i++)
                    htmlResult += $"<option value=\"{res.data[i].id}\">{res.data[i].name}</option>";
                return Json(new M_JResult(res, htmlResult));
            }
            return Json(res);
        }

        [AllowAnonymous]
        public async Task<IActionResult> GetListProvinceOptionHtml(string id = "0")
        {
            string htmlResult = "";
            if (id != "0" && id != "-2")
            {
                var res = await _s_Address.getListProvinceByCountryId(id);
                if (res.result == 1 && res.data != null)
                {
                    for (int i = 0; i < res.data.Count; i++)
                        htmlResult += $"<option value=\"{res.data[i].id}\">{res.data[i].name}</option>";
                    return Json(new M_JResult(res, htmlResult));
                }
                return Json(res);
            }
            return Json(new M_JResult());
        }

        [AllowAnonymous]
        public async Task<IActionResult> GetListDistrictOptionHtml(string id = "0")
        {
            string htmlResult = "";
            if (id != "0" && id != "-2")
            {
                var res = await _s_Address.getListDistrictByProvinceId(id);
                if (res.result == 1 && res.data != null)
                {
                    for (int i = 0; i < res.data.Count; i++)
                        htmlResult += $"<option value=\"{res.data[i].id}\">{res.data[i].name}</option>";
                    return Json(new M_JResult(res, htmlResult));
                }
                return Json(res);
            }
            return Json(new M_JResult());
        }

        [AllowAnonymous]
        public async Task<IActionResult> GetListWardOptionHtml(string id = "0")
        {
            string htmlResult = "";
            if (id != "0" && id != "-2")
            {
                var res = await _s_Address.getListWardByDisctrictId(id);
                if (res.result == 1 && res.data != null)
                {
                    for (int i = 0; i < res.data.Count; i++)
                        htmlResult += $"<option value=\"{res.data[i].id}\">{res.data[i].name}</option>";
                    return Json(new M_JResult(res, htmlResult));
                }
                return Json(res);
            }
            return Json(new M_JResult());
        }

        [HttpGet]
        public async Task<IActionResult> OnChangeProvinceActive(string id = "0")
        {
            string htmlResult = "";
            if (id != "0" && id != "-2")
            {
                var resultApi = await _s_Address.getListDistrictActiveByProvinceId(_supplierId, id);
                if (resultApi.result == 1 && resultApi.data != null)
                {
                    foreach (var item in resultApi.data)
                    {
                        htmlResult += $"<option value=\"{item.id}\">{item.name}</option>";
                    }
                }
            }
            return Json(htmlResult);
        }

        [HttpGet]
        public async Task<IActionResult> OnChangeDistrictActive(string id = "0")
        {
            string htmlResult = "";
            if (id != "0" && id != "-2")
            {
                var resultApi = await _s_Address.getListWardActiveByDisctrictId(_supplierId, id);
                if (resultApi.result == 1 && resultApi.data != null)
                {
                    foreach (var item in resultApi.data)
                    {
                        htmlResult += $"<option value=\"{item.id}\">{item.name}</option>";
                    }
                }
            }
            return Json(htmlResult);
        }


        [AllowAnonymous]
        public async Task<JsonResult> GetCountryJson()
        {
            var res = await _s_Address.getListCountry();
            return Json(new M_JResult(res));
        }

        [AllowAnonymous]
        public async Task<JsonResult> GetProvinceJson(string countryId = "0")
        {
            var res = await _s_Address.getListProvinceByCountryId(countryId);
            return Json(new M_JResult(res));
        }

        [AllowAnonymous]
        public async Task<JsonResult> GetDistrictJson(string provinceId = "0")
        {
            var res = await _s_Address.getListDistrictByProvinceId(provinceId);
            return Json(new M_JResult(res));
        }

        [AllowAnonymous]
        public async Task<JsonResult> GetWardJson(string districtId = "0")
        {
            var res = await _s_Address.getListWardByDisctrictId(districtId);
            return Json(new M_JResult(res));
        }
        #endregion
    }
}
