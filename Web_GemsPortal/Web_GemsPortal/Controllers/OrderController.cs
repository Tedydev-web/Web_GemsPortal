using Web_GemsPortal.EditModels;
using Web_GemsPortal.EditModels.Contact;
using Web_GemsPortal.ExtensionMethods;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using Web_GemsPortal.ViewModels.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static System.String;
using Web_GemsPortal.EditModels.Product;
using Web_GemsPortal.ViewModels.Product;
using Web_GemsPortal.EditModels.Order;
using Org.BouncyCastle.Tls.Crypto.Impl;

namespace Web_GemsPortal.Controllers
{
    [Authorize]
    public class OrderController : BaseController<OrderController>
    {
        private readonly IS_Order _s_Order;
        private readonly IS_OrderItem _s_OrderItem;
        private readonly IS_OrderComment _s_OrderComment;
        private readonly IS_Reason _s_Reason;
        private readonly IS_Account _s_Account;
        private readonly IS_OrderImage _s_OrderImage;
        private readonly IS_Utilities _s_Utilities;
        private const int RECORDS_NUMBER = 6;

        public OrderController(IS_Order order, IS_OrderItem orderItem, IS_OrderComment orderComment, IS_Reason reason, IS_Account account, IS_OrderImage orderImage, IS_Utilities utilities)
        {
            _s_Order = order;
            _s_OrderItem = orderItem;
            _s_OrderComment = orderComment;
            _s_Reason = reason;
            _s_Account = account;
            _s_OrderImage = orderImage;
            _s_Utilities = utilities;
        }

        public IActionResult Views(string id)
        {
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new VM_ViewDataSEO
            {
                Keywords = "Đơn hàng của tôi",
                Title = "Đơn hàng của tôi",
                Description = "Đơn hàng của tôi",
            });
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> GetListOrder(int type = 1, int status = 0, int page = 1)
        {
            var res = await _s_Order.getListHubOrderByCustomerIdProcessStatusPage(_accessToken, status, _userId, SetFDateFilter(type), page, RECORDS_NUMBER);
            return res.result == 1 && res.data != null ? Json(new M_JResult(res, _mapper.Map<List<VM_OrderList>>(res.data))) : Json(new M_JResult(res, new List<VM_OrderList>(), 0));
        }

        [HttpGet]
        public async Task<JsonResult> ViewDetail(string id)
        {
            if (IsNullOrEmpty(id)) return Json(new M_JResult(-2, new error(404, Empty), default(dynamic)));
            var res = await _s_Order.getHubOrderByIdCustomerId(_accessToken, id, _userId);
            if (res.result == 1 && res.data != null)
            {
                var resOrderImage = await _s_OrderImage.GetListByTypeOrderId(1, id);
                if (resOrderImage.result == 1 && resOrderImage.data != null)
                {
                    return Json(new M_JResult(res, _mapper.Map<VM_OrderView>(res.data), resOrderImage.data));
                }
                return Json(new M_JResult(res, _mapper.Map<VM_OrderView>(res.data), new M_JResult(new M_OrderImage())));
            }
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<JsonResult> GetReasonForCancel()
        {
            var res = await _s_Reason.getListReasonByType(2);
            return Json(new M_JResult(res));
        }

        [HttpPost]
        public async Task<JsonResult> CancelItem(string orderItemId, string description)
        {
            var res = await _s_OrderItem.DeleteHub(_accessToken, orderItemId, description);
            return Json(new M_JResult(res));
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<JsonResult> AddOrderComment(EM_OrderComment model)
        {
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(ModelState));
                return Json(jResult);
            }
            model.managementReplyType = EN_OrderCommentManagementReplyType.Buyer;
            var res = await _s_OrderComment.Create(_accessToken, model, _userId);
            if (res.result == 1)
            {
                await SendEmailNewOrderComment(res.data.orderId, model.managementType);
            }
            return Json(new M_JResult(res));
        }

        [HttpPost]
        public async Task<JsonResult> DeleteOrderComment(string id)
        {
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(ModelState));
                return Json(jResult);
            }
            var res = await _s_OrderComment.Delete(_accessToken, id, _userId);
            return Json(new M_JResult(res));
        }

        #region Function support
        public int? SetFDateFilter(int value)
        {
            switch (value)
            {
                //days
                case 1: return 7;
                case 2: return 30;
                case 3: return 30 * 6;
                case 4: return default(int?); //All
                default: return 7;
            }
        }
        private async Task SendEmailNewOrderComment(string orderId, EN_OrderCommentManagementType type)
        {
            var resShop = await _s_Supplier.getHubSupplierById(_supplierId);
            if (resShop.result == 1 && resShop.data != null)
            {
                M_Supplier shopInfo = resShop.data;
                string content = System.IO.File.ReadAllText("wwwroot/html/email_order_comment.html");
                content = content.Replace("{{orderId}}", orderId);
                content = content.Replace("{{orderCreated}}", DateTime.Now.ToString("HH:mm dd/MM/yyyy"));
                content = content.Replace("{{logoUrl}}", shopInfo.imageObj?.mediumUrl);
                content = content.Replace("{{shopName}}", shopInfo.name);
                content = content.Replace("{{homeUrl}}", shopInfo.supplierConfigureObj?.domainName);
                content = content.Replace("{{hotlineNumber}}", IsNullOrEmpty(shopInfo.hotlineNumber) ? "" : "Hotline: " + shopInfo.hotlineNumber);
                content = content.Replace("{{email}}", IsNullOrEmpty(shopInfo.email) ? "" : "<br />Email: " + shopInfo.email);
                string address = shopInfo.addressObj?.addressText + " " + (IsNullOrEmpty(shopInfo.addressObj?.wardObj?.name) ? "" : shopInfo.addressObj?.wardObj?.name + ", ") + (IsNullOrEmpty(shopInfo.addressObj?.districtObj?.name) ? "" : shopInfo.addressObj?.districtObj?.name + ", ") + shopInfo.addressObj?.provinceObj?.name;
                content = content.Replace("{{address}}", IsNullOrWhiteSpace(address) ? "" : "<br />" + address);

                var resOrderDetail = await _s_Order.getHubOrderByIdCustomerId(_accessToken, orderId, _userId);
                string contactName = IsNullOrEmpty(shopInfo.contactName) ? (IsNullOrEmpty(shopInfo.nameEn) ? shopInfo.name : shopInfo.nameEn) : shopInfo.contactName;
                switch (type)
                {
                    case EN_OrderCommentManagementType.All:
                        if (resOrderDetail.data != null)
                            if (!IsNullOrEmpty(resOrderDetail.data.supplierObj?.email))
                            {
                                EM_SendMail emailModel = new EM_SendMail
                                {
                                    Subject = "GEMS GROUP - Bạn nhận được phản hồi từ đơn hàng #" + orderId,
                                    RecipientEmail = resOrderDetail.data.supplierObj?.email,
                                    Message = content
                                };
                                await _s_Account.SendAccountEmail(_accessToken, emailModel);
                            }
                        if (!IsNullOrEmpty(shopInfo.email))
                        {
                            EM_SendMail emailModel = new EM_SendMail
                            {
                                Subject = "GEMS GROUP - Bạn nhận được phản hồi từ đơn hàng #" + orderId,
                                RecipientEmail = shopInfo.email,
                                Message = content
                            };
                            await _s_Account.SendAccountEmail(_accessToken, emailModel);
                        }
                        break;
                    case EN_OrderCommentManagementType.Admin:
                        if (!IsNullOrEmpty(shopInfo.email))
                        {
                            EM_SendMail emailModel = new EM_SendMail
                            {
                                Subject = "GEMS GROUP - Bạn nhận được phản hồi từ đơn hàng #" + orderId,
                                RecipientEmail = shopInfo.email,
                                Message = content
                            };
                            await _s_Account.SendAccountEmail(_accessToken, emailModel);
                        }
                        break;
                    case EN_OrderCommentManagementType.Member:
                        if (resOrderDetail.data != null)
                            if (!IsNullOrEmpty(resOrderDetail.data.supplierObj?.email))
                            {
                                EM_SendMail emailModel = new EM_SendMail
                                {
                                    Subject = "GEMS GROUP - Bạn nhận được phản hồi từ đơn hàng #" + orderId,
                                    RecipientEmail = resOrderDetail.data.supplierObj?.email,
                                    Message = content
                                };
                                await _s_Account.SendAccountEmail(_accessToken, emailModel);
                            }
                        break;
                    default:
                        break;
                }
            }
        }
        #endregion

        [HttpPost]
        public async Task<JsonResult> DeleteOrderImage(string id)
        {
            if (IsNullOrEmpty(id)) return Json(new M_JResult(-2, new error(500, "ID OrderImage Not Found"), default(dynamic)));
            var res = await _s_OrderImage.Delete(int.Parse(id));
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public async Task<IActionResult> P_EditOrderImage(string id)
        {
            if (IsNullOrEmpty(id)) return Json(new M_JResult(-2, new error(500, "ID OrderImage Not Found"), default(dynamic)));
            var res = await _s_OrderImage.GetById(int.Parse(id));
            if (res.data != null)
            {
                EM_OrderImage data = _mapper.Map<EM_OrderImage>(res.data);
                return PartialView(data);
            }
            return Json(new M_JResult(res));
        }

        [HttpGet]
        public IActionResult P_AddOrderImage()
        {
            return PartialView();
        }

        [HttpPost]
        public async Task<IActionResult> P_EditOrderImage(EM_OrderImage model)
        {
            model.Type = 1; //Customer
            var res = await _s_OrderImage.Update(model, _userId);
            return Json(new M_JResult(res));
        }

        [HttpPost]
        public async Task<IActionResult> P_AddOrderImage(EM_OrderImage model, string telephone)
        {
            model.Type = 1; //Customer
            var res = await _s_OrderImage.Create(model, _userId);
            if (res.result == 1)
            {
                try
                {
                    if (!IsNullOrEmpty(telephone))
                    {
                        string telephoneNumber = telephone.Replace(" ", Empty);
                        EM_SendSms smsObj = new EM_SendSms
                        {
                            templateId = CommonConstants.TEMPLATE_NEW_ORDER,
                            phone = telephone,
                            param1 = CommonConstants.BRAND_NAME,
                            param2 = model.OrderId,
                            param3 = "KH danh gia don hang"
                        };
                        await _s_Utilities.SendSmsList(_accessToken, smsObj);
                    }
                }
                catch (Exception)
                {

                }
            }
            return Json(new M_JResult(res));
        }
    }
}
