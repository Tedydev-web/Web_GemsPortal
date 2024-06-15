using Web_GemsPortal.EditModels;
using Web_GemsPortal.EditModels.DeliveryAddress;
using Web_GemsPortal.EditModels.Order;
using Web_GemsPortal.ExtensionMethods;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Models.FarmConfigure;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using Web_GemsPortal.ViewModels.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using NuGet.Common;
using System.Reflection;
using static System.String;

namespace Web_GemsPortal.Controllers
{
    [Authorize]
    public class CheckoutController : BaseController<CheckoutController>
    {
        private readonly IS_Address _s_Address;
        private readonly IS_Account _s_Account;
        private readonly IS_DeliveryAddress _s_DeliveryAddress;
        private readonly IS_Payment _s_Payment;
        private readonly IS_BankPerson _s_BankPerson;
        private readonly IS_BankSupplier _s_BankSupplier;
        private readonly IS_ShoppingCart _s_ShoppingCart;
        private readonly IS_ShoppingCartItem _s_ShoppingCartItem;
        private readonly IS_Order _s_Order;
        private readonly IS_GHTK _s_GHTK;
        private readonly IS_GHN _s_GHN;
        private readonly IS_SupplierCarrier _s_SupplierCarrier;
        private readonly IS_SupplierOrderDiscount _s_SupplierOrderDiscount;
        private readonly IS_Utilities _s_Utilities;
        private readonly IOptions<Config_ApiSettings> _apiSettings;
        private readonly int MAX_QUANTITY = Int32.MaxValue;

        public CheckoutController(IS_Address address, IS_Account account, IS_DeliveryAddress deliveryAddress, IS_Payment payment, IS_BankPerson bankPerson, IS_BankSupplier bankSupplier, IS_ShoppingCart shoppingCart, IS_ShoppingCartItem shoppingCartItem, IS_Order order, IS_GHTK gHTK, IS_GHN gHN, IS_SupplierCarrier supplierCarrier, IS_SupplierOrderDiscount supplierOrderDiscount, IS_Utilities utilities, IOptions<Config_ApiSettings> apiSettings)
        {
            _s_Address = address;
            _s_Account = account;
            _s_DeliveryAddress = deliveryAddress;
            _s_Payment = payment;
            _s_BankPerson = bankPerson;
            _s_BankSupplier = bankSupplier;
            _s_ShoppingCart = shoppingCart;
            _s_ShoppingCartItem = shoppingCartItem;
            _s_Order = order;
            _s_GHTK = gHTK;
            _s_GHN = gHN;
            _s_SupplierCarrier = supplierCarrier;
            _s_SupplierOrderDiscount = supplierOrderDiscount;
            _s_Utilities = utilities;
            _apiSettings = apiSettings;
        }


        #region Cart
        [HttpGet]
        public IActionResult Cart()
        {
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new VM_ViewDataSEO
            {
                Keywords = "Giỏ hàng | GEMS GROUP",
                Title = "Giỏ hàng | GEMS GROUP",
                Description = "Giỏ hàng | GEMS GROUP",
            });
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetCartData()
        {
            M_JResult jResult = new M_JResult();
            if (IsNullOrEmpty(_shoppingCartId))
                return Json(new
                {
                    result = -1,
                    message = "Vui lòng đăng nhập lại"
                });

            var res = await _s_ShoppingCart.getHubShoppingCartByIdStatusMember(_accessToken, _shoppingCartId);
            if (res.result == 1 && res.data != null)
            {
                List<VM_ShoppingCartObj> data = new List<VM_ShoppingCartObj>();
                VM_ShoppingCartObj dataItem;
                foreach (var item in res.data.shoppingCartItemObj)
                {
                    dataItem = new VM_ShoppingCartObj();
                    dataItem = _mapper.Map<VM_ShoppingCartObj>(item);
                    dataItem.productItem = _mapper.Map<List<VM_ShoppingCartObj.ProductItem>>(item.supplierObj.splitShoppingCartObj);
                    data.Add(dataItem);
                }
                jResult.data = data;
            }
            jResult.result = res.result;
            jResult.error = res.error;
            return Json(jResult);
        }

        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> AddToCart(EM_ShoppingCardItem model)
        {
            M_JResult jResult = new M_JResult();
            if (!User.Identity.IsAuthenticated)
            {
                jResult.result = -1;
                jResult.error.code = StatusCodes.Status401Unauthorized;
                return Json(jResult);
            }

            if (model.quantity < 1 || model.quantity > MAX_QUANTITY)
            {
                jResult.error = new error(0, "Số lượng bạn chọn không hợp lệ!");
                return Json(jResult);
            }

            if (IsNullOrEmpty(_supplierId))
            {
                jResult.error = new error(0, "Xảy ra lỗi, vui lòng thử lại!");
                return Json(jResult);
            }

            model.shoppingCartId = _shoppingCartId;
            model.supplierId = Encryptor.Decrypt(model.supplierId);
            model.isBigShop = 0;
            var res = await _s_ShoppingCartItem.Create(_accessToken, model, _userId);
            return Json(jResult.MapData(res));
        }
        [HttpPost]
        public async Task<JsonResult> DeleteMultiple(string id)
        {
            var res = await _s_ShoppingCartItem.DeleteSequenceId(_accessToken, id);
            return Json(new M_JResult(res));
        }

        [HttpPost]
        public async Task<JsonResult> Delete(int id)
        {
            var res = await _s_ShoppingCartItem.Delete(_accessToken, id);
            return Json(new M_JResult(res));
        }

        [HttpPost]
        public async Task<JsonResult> UpdateQuantity(int id, int quantity = 1)
        {
            var res = await _s_ShoppingCartItem.UpdateQuantity(_accessToken, id, quantity, _userId);
            return Json(new M_JResult(res));
        }

        public async Task<JsonResult> CountShoppingCartItem()
        {
            M_JResult jResult = new M_JResult();
            if (IsNullOrEmpty(_shoppingCartId))
            {
                jResult.error = new error(0, "Vui lòng đăng nhập lại");
                return Json(jResult);
            }
            var res = await _s_ShoppingCartItem.getShoppingCartItemCountProduct(_accessToken, _shoppingCartId);
            return Json(new M_JResult(res));
        }
        #endregion

        #region Payment
        public IActionResult Check(string i, string sup)
        {
            if (IsNullOrEmpty(i))
                return Redirect("/checkout/cart");
            return RedirectToAction("Payment", "Checkout", new { i = Encryptor.Encrypt(i), sup = sup });
        }

        public async Task<IActionResult> Payment(string i, string sup)
        {
            if (IsNullOrEmpty(i))
                return Redirect("/checkout/cart");

            var resDefaultAddress = await _s_DeliveryAddress.getDeliveryAddressByCustomerIdStatusIsDefault(_accessToken, _userId);
            if (resDefaultAddress.result == 1 && resDefaultAddress.data != null)
            {
                ViewBag.DefaultAddress = JsonConvert.SerializeObject(_mapper.Map<VM_DeliveryAddress>(resDefaultAddress.data));
            }
            //TempData["PlaceOrderFail"] = true;
            ViewBag.CartItemSelected = i;
            ViewBag.SupplierId = sup;
            ViewBag.SupplierIdAdmin = Encryptor.Encrypt(CommonConstants.OWNER_SUPPLIER_ID.ToString());
            var supplierIdNoHash = Encryptor.Decrypt(sup);
            ViewBag.SupplierIdNoHash = supplierIdNoHash;
            var resSupplierOrderDiscount = await _s_SupplierOrderDiscount.getListSupplierOrderDiscountBySupplierId(supplierIdNoHash);
            ViewBag.OrderDiscount100 = JsonConvert.SerializeObject(resSupplierOrderDiscount.data?.FirstOrDefault() ?? new M_SupplierOrderDiscount());
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new VM_ViewDataSEO
            {
                Keywords = "Mua hàng | GEMS GROUP",
                Title = "Mua hàng | GEMS GROUP",
                Description = "Mua hàng | GEMS GROUP",
            });
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetCartSelectData(string listItem)
        {
            M_JResult jResult = new M_JResult();
            if (IsNullOrEmpty(_shoppingCartId))
            {
                jResult.error = new error(0, "Vui lòng đăng nhập lại");
                return Json(jResult);
            }

            //Check fail decrypt
            try
            {
                listItem = Encryptor.Decrypt(listItem);
            }
            catch (Exception)
            {
                jResult.error = new error(0, "Xảy ra lỗi, hãy thử lại sau!");
                return Json(jResult);
            }

            List<int> listCartSelect = JsonConvert.DeserializeObject<List<int>>(listItem);
            var res = await _s_ShoppingCart.getHubShoppingCartByIdStatusMember(_accessToken, _shoppingCartId);
            if (res.result == 1 && res.data != null)
            {
                List<VM_ShoppingCartObj> data = new List<VM_ShoppingCartObj>();
                VM_ShoppingCartObj dataItem;
                int code = 0;
                foreach (var item in res.data.shoppingCartItemObj)
                {
                    code++;
                    dataItem = new VM_ShoppingCartObj();
                    dataItem = _mapper.Map<VM_ShoppingCartObj>(item);
                    dataItem.code = code.ToString();

                    //Check status product & productPrice == 1
                    var producItemTmps = _mapper.Map<List<VM_ShoppingCartObj.ProductItem>>(item.supplierObj.splitShoppingCartObj)
                        .Where(x => listCartSelect.Contains(x.cartId) && x.status == 1).ToList();
                    List<VM_ShoppingCartObj.ProductItem> productItemData = new List<VM_ShoppingCartObj.ProductItem>();
                    VM_ShoppingCartObj.ProductItem productData;
                    foreach (var proItem in producItemTmps)
                    {
                        if (proItem.status == 1 && proItem.productPriceObj != null)
                        {
                            productData = proItem;
                            productData.productPriceObj = proItem.productPriceObj;
                            productItemData.Add(productData);
                        }
                    }
                    dataItem.productItem = productItemData;

                    if (dataItem.productItem.Count > 0)
                    {
                        data.Add(dataItem);
                    }
                }

                List<int> listSupplierId = res.data.shoppingCartItemObj.Select(x => x.supplierObj.id.Value).ToList();
                string sequenceSupplier = JsonConvert.SerializeObject(listSupplierId).Replace("[", "").Replace("]", "");
                var resCarrier = await _s_SupplierCarrier.getListSupplierCarrierBySequenceSupplier(sequenceSupplier);


                var data2nd = _mapper.Map<List<VM_SupplierCarrier>>(resCarrier.data);

                jResult.data = data;
                jResult.data2nd = data2nd;
            }
            jResult.result = res.result;
            jResult.error = res.error;
            return Json(jResult);
        }

        [HttpGet]
        public JsonResult GetBankList(string id)
        {
            M_JResult jResult = new M_JResult();
            try
            {
                id = Encryptor.Decrypt(id);
                Task<ResponseData<List<M_BankPerson>>> resBankPer = _s_BankPerson.getListHubBankPersonBySupplierId(id);
                Task<ResponseData<List<M_BankSupplier>>> resBankSupp = _s_BankSupplier.getListBankSupplierBySupplierId(id);
                Task.WaitAll(resBankPer, resBankSupp);
                if (resBankPer.Result.result == 1 && resBankSupp.Result.result == 1)
                {
                    var bankPerData = _mapper.Map<List<VM_BankList>>(resBankPer.Result.data);
                    var bankSupData = _mapper.Map<List<VM_BankList>>(resBankSupp.Result.data);
                    List<VM_BankList> data = bankPerData;
                    data.AddRange(bankSupData);
                    jResult.result = 1;
                    jResult.data = data;
                }
                else
                {
                    jResult.result = 0;
                    jResult.error = new error(0, "Xảy ra lỗi, hãy thử lại sau!");
                }
            }
            catch (Exception ex)
            {
                jResult.result = -1;
                jResult.error = new error(0, $"Exception: {ex.Message}");
            }
            return Json(jResult);
        }

        [HttpGet]
        public async Task<PartialViewResult> P_AddAddress()
        {
            await SetDropDownListProvince();
            return PartialView();
        }

        [HttpPost]
        private async Task<ResponseData<List<M_CheckPromotionCode>>> ApplyCode(string supplierId, string listCartId, string promotionCode)
        {
            var res = await _s_Order.CheckPromotionCode(_accessToken, Encryptor.Decrypt(supplierId), listCartId, promotionCode);
            return res;
        }

        [HttpPost]
        public async Task<JsonResult> PlaceOrder(EM_Order model, string listDataFeeShip, string carrierCode, string tokenCarrier, string supplierId, string listCartId)
        {
            //model.PaymentId = 2; //MCARD
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(ModelState));
                return Json(jResult);
            }

            if (IsNullOrEmpty(model.SequenceShoppingCartItemId))
            {
                jResult.error = new error(0, "Dữ liệu không hợp lệ");
                return Json(jResult);
            }

            //model.supplierOrderDiscountAmount = 0;
            //if (model.paymentPercent == 100)
            //{
            //    var resSupplierOrderDiscount = await _s_SupplierOrderDiscount.getListSupplierOrderDiscountBySupplierId(supplierId);
            //    if (resSupplierOrderDiscount.result != 1)
            //    {
            //        jResult.result = resSupplierOrderDiscount.result;
            //        jResult.error = resSupplierOrderDiscount.error;
            //        return Json(jResult);
            //    }
            //    if (resSupplierOrderDiscount.data != null && resSupplierOrderDiscount.data.Count() > 0)
            //    {
            //        var supplierOrderDiscount = resSupplierOrderDiscount.data.FirstOrDefault();
            //        if (supplierOrderDiscount.discount > 0)
            //        {
            //            model.supplierOrderDiscountAmount = supplierOrderDiscount.discount.Value;
            //        }
            //        else if (supplierOrderDiscount.discountPercent > 0)
            //        {
            //            model.supplierOrderDiscountAmount = supplierOrderDiscount.discountPercent.Value * totalPrice / 100;
            //        }
            //    }
            //}

            /*            int discountAmount = 0;*/
            //if (!IsNullOrEmpty(model.SequencePromotionCode))
            //{
            //    var resApplyCode = await ApplyCode(supplierId, listCartId, model.SequencePromotionCode);
            //    if (resApplyCode.result == -1 || resApplyCode.data == null)
            //    {
            //        jResult.error = new error(0, "Xảy ra lỗi trong quá trình áp dụng mã giảm giá");
            //        return Json(jResult);
            //    }
            //    bool isSuccess = true;
            //    string messageFail = Empty;
            //    foreach (var item in resApplyCode.data)
            //    {
            //        if (item.result == 0)
            //        {
            //            isSuccess = false;
            //            messageFail += item.promotionCode + ": " + item.message + "</br>";
            //        }
            //        else
            //        {
            //         /*   discountAmount += item.totalDiscountForThisCode;*/
            //        }
            //    }
            //    if (!isSuccess)
            //    {
            //        jResult.error = new error(0, messageFail);
            //        return Json(jResult);
            //    }
            //}
            /*    model.DiscountAmount = discountAmount;*/

            //int feeShip = 0;
            //if (carrierCode == "GHTK")
            //{
            //    EM_GetFeeShip_GHTK eM_GetFeeShip_GHTK = JsonConvert.DeserializeObject<EM_GetFeeShip_GHTK>(listDataFeeShip);
            //    var resFeeShipGHTK = await _s_GHTK.Fee2(tokenCarrier, eM_GetFeeShip_GHTK);
            //    if (resFeeShipGHTK.result != 1 || resFeeShipGHTK.data == null)
            //    {
            //        jResult.error = new error(0, "Có lỗi trong quá trình tính phí ship!");
            //        return Json(jResult);
            //    }
            //    feeShip = resFeeShipGHTK.data.fee.Value;
            //}

            //feeShip = model.FeeShip;

            //Call API
            var res = await _s_Order.CreateOrderHub(_accessToken, model);
            if (res.result != 1 || res.data == null)
                return Json(jResult.MapData(res));
            List<M_Order> data = res.data;
            try
            {
                foreach (var item in data)
                {
                    //if (!IsNullOrEmpty(item.supplierObj?.email))
                    //    await SendEmailOrderNew(item);
                    string telephone = item.supplierObj?.telephoneNumber?.Replace(" ", Empty);
                    if (!IsNullOrEmpty(telephone))
                    {
                        EM_SendSms smsObj = new EM_SendSms
                        {
                            templateId = CommonConstants.TEMPLATE_NEW_ORDER,
                            phone = telephone,
                            param1 = CommonConstants.BRAND_NAME,
                            param2 = item.id,
                            param3 = "Dang doi duyet"
                        };
                        await _s_Utilities.SendSmsList(_accessToken, smsObj);
                    }
                }
            }
            catch (Exception)
            {

            }
            return Json(jResult.MapData(res, res.data));
        }

        private async Task SendEmailOrderNew(M_Order orderObj)
        {
            var resShop = await _s_Supplier.getHubSupplierById(_supplierId);
            if (resShop.result == 1 && resShop.data != null)
            {
                M_Supplier shopInfo = resShop.data;
                string content = System.IO.File.ReadAllText("wwwroot/html/email_order_new_template.html");
                content = content.Replace("{{orderId}}", orderObj.id);
                content = content.Replace("{{orderCreated}}", DateTime.Now.ToString("HH:mm dd/MM/yyyy"));
                content = content.Replace("{{urlOrderView}}", $"{_apiSettings.Value.AdminSiteUrl}/admin/order/report");
                content = content.Replace("{{logoUrl}}", "/img/logo.jpg");
                content = content.Replace("{{shopName}}", shopInfo.name);
                content = content.Replace("{{iconUrl}}", $"{_apiSettings.Value.AdminSiteUrl}/images/email-icon/order-new.png");
                content = content.Replace("{{homeUrl}}", shopInfo.supplierConfigureObj?.domainName);
                content = content.Replace("{{hotlineNumber}}", IsNullOrEmpty(shopInfo.hotlineNumber) ? "" : "Hotline: " + shopInfo.hotlineNumber);
                content = content.Replace("{{email}}", IsNullOrEmpty(shopInfo.email) ? "" : "<br />Email: " + shopInfo.email);
                string address = shopInfo.addressObj?.addressText + " " + (IsNullOrEmpty(shopInfo.addressObj?.wardObj?.name) ? "" : shopInfo.addressObj?.wardObj?.name + ", ") + (IsNullOrEmpty(shopInfo.addressObj?.districtObj?.name) ? "" : shopInfo.addressObj?.districtObj?.name + ", ") + shopInfo.addressObj?.provinceObj?.name;
                content = content.Replace("{{address}}", IsNullOrWhiteSpace(address) ? "" : "<br />" + address);

                string contactName = IsNullOrEmpty(shopInfo.contactName) ? (IsNullOrEmpty(shopInfo.nameEn) ? shopInfo.name : shopInfo.nameEn) : shopInfo.contactName;
                EM_SendMail emailModel = new EM_SendMail
                {
                    Subject = "GEMS GROUP - Bạn nhận được đơn hàng mới #" + orderObj.id,
                    /*  RecipientEmail = orderObj.supplierObj?.email,*/
                    RecipientEmail = "phamtuanit.dev@gmail.com",
                    Message = content
                };
                await _s_Account.SendAccountEmail(_accessToken, emailModel);
            }
        }

        [HttpGet]
        public async Task<JsonResult> GetFeeShip_GHTK(string token, EM_GetFeeShip_GHTK model)
        {
            var res = await _s_GHTK.Fee2(token, model);
            return Json(new M_JResult(res));
        }
        #endregion

        //Function support
        #region Function support
        [HttpGet]
        public async Task<JsonResult> GetShopByNearAddress(int? productId, string provinceId, string districtName, string wardName)
        {
            ResponseData<List<M_Address>> res = new ResponseData<List<M_Address>>();
            if (productId.HasValue)
                res = await _s_Address.getListAddressByProductIdProvinceId(1, _supplierId, provinceId, productId);
            else
                res = await _s_Address.getListAddressByProvinceId(1, _supplierId, provinceId);
            List<VM_ShopAddress> data = new List<VM_ShopAddress>();
            if (res.result == 1 && res.data != null)
            {
                data = _mapper.Map<List<VM_ShopAddress>>(res.data);
                data = data.OrderByDescending(x => x.quantityProduct).OrderByDescending(x => x.districtName == districtName).OrderByDescending(x => x.wardName == wardName).ToList();
            }
            return Json(new M_JResult(res, data));
        }

        [HttpGet]
        public async Task<JsonResult> GetShopByFilterAddress(int? productId, string provinceId, string districtId, string wardId)
        {
            ResponseData<List<M_Address>> res = new ResponseData<List<M_Address>>();
            if (productId.HasValue)
                res = await _s_Address.getListAddressByProductIdAddressCondition(1, _supplierId, provinceId, districtId, wardId, productId);
            else
                res = await _s_Address.getListAddressConditionAddress(1, _supplierId, provinceId, districtId, wardId);
            List<VM_ShopAddress> data = new List<VM_ShopAddress>();
            if (res.result == 1 && res.data != null)
            {
                data = _mapper.Map<List<VM_ShopAddress>>(res.data);
                data = data.OrderByDescending(x => x.quantityProduct).ToList();
            }
            return Json(new M_JResult(res, data));
        }

        public async Task SetDropDownListProvinceActive(string selectedId = "0", string countryId = "1")
        {
            List<VM_SelectDropDown> result = new List<VM_SelectDropDown>();
            if (countryId != "0")
            {
                var res = await _s_Address.getListProvinceActive(_supplierId);
                if (res.result == 1 && res.data != null)
                    result = _mapper.Map<List<VM_SelectDropDown>>(res.data);
            }
            ViewBag.ProvinceIdActive = new SelectList(result, "Id", "Name", selectedId);
        }
        #endregion


        #region GHN
        public async Task<JsonResult> GetAddressGNH(string token, string shopId)
        {
            var res = await _s_GHN.GetAddresShopInGHN(token, int.Parse(shopId));
            return Json(new M_JResult(res));
        }
        public async Task<JsonResult> GetServiceGNH(string token, int shop_id, int from_district, string provinceName, string districtName)
        {
            var res = await _s_GHN.GetServiceGNH(token, shop_id, from_district, provinceName, districtName);
            return Json(new M_JResult(res));
        }
        public async Task<JsonResult> GetFeeGHN(string token, EM_GetFeeShip_GHN model)
        {
            var res = await _s_GHN.GetFee(token, model);
            return Json(new M_JResult(res));
        }
        #endregion

        public async Task<JsonResult> GetListBankSupplier(string id)
        {
            var res = await _s_BankSupplier.getListBankSupplierBySupplierId(id);
            List<M_BankSupplierCustom> lstData = new List<M_BankSupplierCustom>();
            if(res.result == 1 && res.data != null)
            {
                lstData = _mapper.Map<List<M_BankSupplierCustom>>(res.data);
                return Json(new M_JResult(res, lstData));
            }
            return Json(new M_JResult(res));
        }

        public async Task<JsonResult> GetListByArea(string slevel = "2,3", int parentId = 1, int provinceId = 0, int districtId = 0)
        {
            var res = await _s_Supplier.GetListSupplierBySlevelParentIdSequenceStatusFdateTdateProvinceIdDistrictIdWardId(slevel, parentId, default, default, "1", provinceId, districtId, 0);
            return res.result == 1 && res.data != null ? Json(new M_JResult(res, _mapper.Map<List<VM_SupplierObj>>(res.data))) : Json(new M_JResult(res));
        }
    }
}
