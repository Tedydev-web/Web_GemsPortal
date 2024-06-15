

var statusProcess = -2;
var pageCurrent = 1;
var pageSize = 10;
var isHaveNewData = false;
var detailLoading = false;
var detailElmSaveClick;
var detailOrderCurrentData;
var reasonListData = [];
let _shopTelephone = "";

function handleProcessStatusToText(value) {
    let statusTmp = '';
    switch (value) {
        case 0: statusTmp = 'Chờ xác nhận'; break;
        case 1: statusTmp = 'Đã tiếp nhận'; break;
        case 2: statusTmp = 'Đang vận chuyển'; break;
        case 3: statusTmp = 'Đã giao'; break;
        case 4: statusTmp = 'Đã hủy'; break;
        case 5: statusTmp = 'Trả hàng'; break;
        default: break;
    }
    return statusTmp;
}
function rawSelectCancelOption() {
    let html = '';
    reasonListData.forEach(function (item, index) {
        html += `<option value="${item.id}">${item.name}</option>`;
    });
    return html;
}
function tableDataHtml(data) {
    var shopItem = '';
    var productItem = '';
    var statusTmp = '';
    $.each(data, function (key, value) {
        productItem = '';
        value.orderItem.forEach(function (item, index) {
            let sizeTmp = '', colorTmp = '', typeNameTmp = '', priceTmp = '';
            priceTmp = item.discount > 0 ? CalDiscountPrice(item.price, item.discount) : NumberWithCommas(item.price, ',') + 'đ';
            typeNameTmp = item.typeName != null && item.typeName.length > 30 ? item.typeName.substring(0, 30) + "..." : item.typeName;
            sizeTmp = item.sizeName != null && item.sizeName.length > 30 ? item.sizeName.substring(0, 30) + "..." : item.sizeName;
            colorTmp = item.colorName != null && item.colorName.length > 30 ? item.colorName.substring(0, 30) + "..." : item.colorName;
            productItem +=
                `<div class="col-12 row m-0 p-2">
                    <div class="col-auto p-0">
                        <img src="${item.productImage}" loading="lazy" class="img-fluid img-thumbnail" style="width:60px; height:60px;" alt="${item.productName}"
                        onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                    </div>
                    <div class="col">
                        <div class="div_desktop_custom text-muted">
                            ${item.productName != null && item.productName.length > 40 ? item.productName.substring(0, 40) + "..." : item.productName}
                            ${!IsNullOrEmty(typeNameTmp) ? `<span class="col-auto badge badge-default">${typeNameTmp}</span>` : ""}
                            ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                            ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                        </div>
                        <div class="mobile-cart-content text-center row">
                            <span class="col-12 text-muted">${item.productName != null && item.productName.length > 40 ? item.productName.substring(0, 40) + "..." : item.productName}</span>
                            ${!IsNullOrEmty(typeNameTmp) ? `<span class="col-auto badge badge-defaultr">${typeNameTmp}</span>` : ""}
                            ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                            ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                            <div class="col-12 row m-0">
                                <div class="col">
                                    <small>SL: ${item.quantity}</small>
                                </div>
                                <div class="col">
                                    <small class="m-0">${priceTmp}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xl-2 div_desktop_custom">
                        <small class="text-muted">SL: ${item.quantity}</small>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xl-2 div_desktop_custom" style="text-align:right;">
                        <span class="m-0">${priceTmp}</span>
                    </div>
                </div>`;
        });

        statusTmp = handleProcessStatusToText(value.processStatus);
        shopItem +=
            `<a href="/order/view/${value.id}" onclick="ViewDetail(event, this, '${value.id}')" class="col-12 a_row_hover div_zone_order_item">
                <div class="col-12 orderTitle">
                    <span class="mb-0">#${value.id} <small class="text-dark">${value.createdAt != null ? moment(value.createdAt).format('DD-MM-YYYY') : ""}</small></span>
                    <span class="mb-0 badge badge-info float-right">${statusTmp}</span>
                </div>
                ${productItem}
            </a>`;
    });

    return shopItem;
}
function tableCancelItemHtml(data) {
    var productItem = '';
    data.orderItem.filter(x => x.processStatus === 0).forEach(function (item, index) {
        let sizeTmp = '', colorTmp = '', priceTmp = '';
        priceTmp = item.discount > 0 ? CalDiscountPrice(item.price, item.discount) : NumberWithCommas(item.price, ',') + 'đ';
        sizeTmp = item.sizeName != null && item.sizeName.length > 30 ? item.sizeName.substring(0, 30) + "..." : item.sizeName;
        colorTmp = item.colorName != null && item.colorName.length > 30 ? item.colorName.substring(0, 30) + "..." : item.colorName;
        productItem +=
            `<tr>
                <td class="col-1">
                    <div class="d-flex align-items-center">
                        <input type="checkbox" name="input_order_item_cancel" data-id="${item.id}" id="input_order_item_cancel_${item.id}" />
                        <label for="input_order_item_cancel_${item.id}"> </label>
                    <img src="${item.productImage}" style="width:50px; height:50px;" alt="${item.productName}"
                    onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                    </div>
                </td>
                <td class="col" style="text-align:left;">
                    <label for="input_order_item_cancel_${item.id}">
                        ${item.productName != null && item.productName.length > 40 ? item.productName.substring(0, 40) + "..." : item.productName}
                        ${!IsNullOrEmty(sizeTmp) ? `<span class="badge badge-grey-color">${sizeTmp}</span>` : ""}
                        ${!IsNullOrEmty(colorTmp) ? `<span class="badge badge-default">${colorTmp}</span>` : ""}
                    </label>
                </td>
                <td class="col-4">
                    <select name="ReasonId" id="ReasonId_${item.id}" data-none-results-text="Không tìm thấy kết quả phù hợp"
                            data-none-selected-text="Vui lòng chọn lý do" title="Vui lòng chọn lý do"
                            class="selectpicker form-control show-tick reasonList" data-style="border" data-live-search="false" data-size="10">
                            ${rawSelectCancelOption()}                                
                    </select>
                </td>
            </tr>`;
    });

    return productItem;
}
function loadDetailOrder(data, dataOrderImage) {
    var divZoneOrderItem = '';
    var orderItem = '';
    productItem = '';
    var countItem = 0;
    var totalPrice = 0;
    data.orderItem.forEach(function (item, index) {
        countItem++;
        let sizeTmp = '', colorTmp = '', typeNameTmp = '', priceTmp = '', priceDiscount = 0, reasonCancel = '';
        priceDiscount = item.discount > 0 ? (item.price - item.discount) : item.price;
        priceTmp = NumberWithCommas(priceDiscount, ',') + 'đ';
        typeNameTmp = item.typeName != null && item.typeName.length > 30 ? item.typeName.substring(0, 30) + "..." : item.typeName;
        sizeTmp = item.sizeName != null && item.sizeName.length > 30 ? item.sizeName.substring(0, 30) + "..." : item.sizeName;
        colorTmp = item.colorName != null && item.colorName.length > 30 ? item.colorName.substring(0, 30) + "..." : item.colorName;
        if (item.processStatus !== 4) //check is not cancel
            totalPrice += priceDiscount * item.quantity;
        if (IsNullOrEmty(data.reasonName) || data.reasonName === "--")
            if (item.processStatus === 4 || item.processStatus === 5)
                reasonCancel =
                    `<div class="col-12">
                        <span class="m-0 text-danger">Đã hủy</span><span class="m-0"> - ${item.reasonName}</span>
                        <p class="text-break" style="font-style: italic;font-size:12px;">${IsNullOrEmty(item.reasonDescription) ? "" : item.reasonDescription}</p>
                    </div>`;

        orderItem +=
            `<div class="col-12 row m-0 p-2 border-bottom border-white ${item.processStatus === 4 ? "deleted" : ""}">
                <div class="col-auto p-0">
                    <a href="/san-pham/${item.productNameSlug}-${item.productId}">
                        <img src="${item.productImage}" class="img-fluid img-thumbnail" style="width:60px; height:60px;" alt="${item.productName}" loading="lazy"
                                onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                    </a>
                </div>
                <div class="col">
                    <a href="/san-pham/${item.productNameSlug}-${item.productId}">
                        <div class="div_desktop_custom text-muted">
                            ${item.productName != null && item.productName.length > 40 ? item.productName.substring(0, 40) + "..." : item.productName}
                            ${!IsNullOrEmty(typeNameTmp) ? `<span class="col-auto badge badge-default">${typeNameTmp}</span>` : ""}
                            ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                            ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                        </div>
                        <div class="mobile-cart-content text-right row">
                            <span class="col-12 px-1 text-muted">${item.productName != null && item.productName.length > 40 ? item.productName.substring(0, 40) + "..." : item.productName}</span>
                            ${!IsNullOrEmty(typeNameTmp) ? `<span class="col-auto badge badge-default">${typeNameTmp}</span>` : ""}
                            ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                            ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                            <div class="col-12 m-0 p-0 row">
                                <div class="col px-1">
                                    <small>SL: ${item.quantity}</small>
                                </div>
                                <div class="col px-1">
                                    <small class="m-0">${priceTmp}</small>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-2 col-lg-2 col-xl-2 div_desktop_custom">
                    <small class="text-muted">SL: ${item.quantity}</small>
                </div>
                <div class="col-md-2 col-lg-2 col-xl-2 div_desktop_custom" style="text-align:right;">
                    <span class="m-0">${priceTmp}</span>
                </div>
                ${reasonCancel}
            </div>`;
    });

    var statusTmp = handleProcessStatusToText(data.processStatus);
    var cancelButonOrder = data.processStatus === 0 ? `<a href="javascript:void(0)" class="float-right text-danger" onclick="ShowCancelModal(this)"
                            style="width:24px;font-size:12px;text-decoration:underline;">Hủy</a>` : '';
    var reasonAll = '';
    if (!IsNullOrEmty(data.reasonName) && data.reasonName !== "--")
        reasonAll =
            `<div class="col-12 m-0 p-2">
                <span class="m-0 text-danger">Lý do hủy:</span><span class="m-0"> ${data.reasonName}</span>
                <p class="text-break" style="font-style: italic;font-size:12px;">${IsNullOrEmty(data.reasonDescription) ? "" : data.reasonDescription}</p>
            </div>`;
    //divZoneOrderItem = <div class="col-12 orderTitle">
    //    <span class="mb-0"><img src="/assets/images/icon/shops.png" width="17" height="17" alt="" /> ${data.shopName} <a style="padding-left:6px;" href="${data.shopUrl}"><i class="fa fa-link"></i></a></span>
    //    <span class="mb-0 badge badge-info float-right">${statusTmp}</span>
    //    ${cancelButonOrder}
    //</div>
    divZoneOrderItem = `<div class="div_order_list_custom row mt-2">
                <div class="col-12 div_zone_order_item">
                  <div class="col-12 orderTitle">
                        <span class="mb-0"><img src="/assets/images/icon/shops.png" width="17" height="17" alt="" /> ${data.shopName} <a style="padding-left:6px;" href="${data.shopUrl}"><i class="fa fa-link"></i></a></span>
                        <span class="mb-0 badge badge-info float-right">${statusTmp}</span>
                        ${cancelButonOrder}
                    </div>
                    ${orderItem}
                    ${reasonAll}
                </div>
            </div>`;
    let discountAmount = data.discountAmount ?? 0;
    let supplierOrderDiscountAmount = data.supplierOrderDiscountAmount ?? 0;
    let totalMustPay = data.totalMustPay ?? 0;
    let totalPay = totalPrice + data.feeship - discountAmount - supplierOrderDiscountAmount;

    var zoneTotalPay =
        `<div class="checkout-details row">
            <div class="order-box col-12">
                <ul class="qty">
                    <li class="text-muted">
                        Tạm tính (<b style="font-weight:normal;">${countItem}</b> sản phẩm)
                        <span class="float-right">${NumberWithCommas(totalPrice, ',')}đ</span>
                    </li>
                    <li class="text-muted">
                        Giảm giá
                        <span class="float-right text-danger">-${NumberWithCommas(discountAmount, ',')}đ</span>
                    </li>
                    <li class="text-muted">
                        Giảm giá thanh toán
                        <span class="float-right text-danger">-${NumberWithCommas(supplierOrderDiscountAmount, ',')}đ</span>
                    </li>
                     <li class="text-muted">
                          Đã thanh toán
                          <span class="float-right text-danger">${NumberWithCommas(totalMustPay, ',')}đ</span>
                      </li>
                    <li class="text-muted">
                        Phí vận chuyển/Lắp đặt
                        <span class="float-right">${data.processStatus === 0 && data.feeship === 0 && (data.carrierId === 0 || data.carrierId == null) ? "(chưa tính)" : NumberWithCommas(data.feeship, ',') + 'đ'}</span>
                    </li>
                </ul>
                <ul class="total">
                    <li class="m-0">Tổng cộng <span class="count">${NumberWithCommas(totalPay, ',')}đ</span></li>
                    <li> <span class="text-muted" style="font-size:12px;"><i>(Đã bao gồm VAT)</i></span></li>
                </ul>
                <i class="text-success"><i class="fa fa-info-circle" aria-hidden="true"></i> Tổng cộng = Tạm Tính + Phí vận chuyển/Lắp đặt - Giảm giá</i>
            </div>
        </div>`;

    var title =
        `<div class="col-12 border p-2">
            <h5 class="mb-0 text-dark font-weight-bold">
                Đơn hàng #${data.id}
                <a href="javascript:void(0)" onclick="CloseDetailPanel()" title="Đóng" class="float-right" style="line-height:0;"><i class="fa fa-times-circle text-danger"></i></a>
            </h5>
            <span class="mb-0 text-muted col-12">Ngày đặt hàng: ${moment(data.createdAt).format('DD-MM-YYYY')}</span><br />
            <span class="mb-0 text-success col-12" style="font-weight:500;">${data.processStatus === 3 ? 'Ngày nhận hàng: ' + moment(data.doneAt).format('DD-MM-YYYY') : ''}</span>
            <span class="mb-0 text-success col-12" style="font-weight:500;">${data.processStatus === 4 ? 'Ngày hủy đơn: ' + moment(data.doneAt).format('DD-MM-YYYY') : ''}</span>
            <span class="mb-0 text-success col-12" style="font-weight:500;">${data.processStatus === 5 ? 'Ngày trả hàng: ' + moment(data.doneAt).format('DD-MM-YYYY') : ''}</span>
        </div>`;

    var buttonShowBankList = parseInt(data.paymentMethodId) === 2 ?
        `<div>
            <button type="button" data-id="${data.shopId}" onclick="ShowBankPayment(this,'${data.id}','${totalPay}')"
                class="btn btn-sm btn-danger font-weight-bold ladda-button" dir="ltr" data-style="zoom-in">THANH TOÁN</button>
        </div>` : "";
    var infoOrder =
        `<div class="div_order_list_custom row mt-2">
            <div class="col-12 col-md-12 col-lg-3 p-1">
                <div class="p-2 h-100 div_zone_order_item">
                    <div>
                        <p class="header_card_order_detail">Địa chỉ nhận hàng</p>
                    </div>
                    <div>
                        <b class="text-break">${data.receiverFullname}</b>
                    </div>
                    <div>
                        <span>
                            <i class="fa fa-map-marker text-success"></i>
                            <span class="text-break"> ${data.addressText}</span>
                        </span>
                    </div>
                    <div>
                        <span><i class="fa fa-phone text-success"></i> ${data.receiverPhoneNumber}</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-12 col-lg-3 p-1">
                <div class="p-2 h-100 div_zone_order_item">
                    <div>
                        <p class="header_card_order_detail">Hình thức giao hàng</p>
                    </div>
                    <div>
                        <b class="text-break">${data.shipMethodName}</b>
                    </div>
                    <div>
                        <span>
                            <span class="text-break">Phí vận chuyển/Lắp đặt: <b class="text-danger">${data.processStatus === 0 && data.feeship === 0 && (data.carrierId === 0 || data.carrierId == null) ? "(chưa tính)" : NumberWithCommas(data.feeship, ',') + 'đ'}</b></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-12 col-lg-3 p-1">
                <div class="p-2 h-100 div_zone_order_item">
                    <div>
                        <p class="header_card_order_detail">Hình thức thanh toán</p>
                    </div>
                    <div>
                        <b class="text-break">${data.paymentMethodName} </b>
                    </div>
                    ${buttonShowBankList}
                </div>
            </div>
            <div class="col-12 col-md-12 col-lg-3 p-1">
                <div class="p-2 h-100 div_zone_order_item">
                    <div>
                        <p class="header_card_order_detail">Thông tin khác</p>
                    </div>
                    <div>
                        <b>Ghi chú:</b>
                        <br/>
                        <i style="white-space: break-spaces;">${IsNullOrEmty(data.remark) ? "" : data.remark}</i>
                    </div>
                </div>
            </div>
        </div>`;
    /* <span class="text-success">(Chuyển trước ${data.paymentPercent}% ${NumberWithCommas(totalPay * data.paymentPercent / 100, ',')}đ)</span>*/
    var orderComment = "";
    let orderImageItem = "";
    let starHtml = "";
    let orderImageHtml = "";
    if (data.processStatus == 3) {
        if (dataOrderImage != null && dataOrderImage.length > 0) {
            $.each(dataOrderImage, function (key, item) {
                starHtml = "";
                if (item.star > 0) {
                    for (var i = 1; i <= item.star; i++) {
                        starHtml += `<i class="fa fa-star text-warning px-1" aria-hidden="true"></i>`
                    }
                }
                orderImageItem += `<div class="col-12 p-4 card_order_image_${item.id}" style="${key % 2 ? `background:#f9f9f9` : ''}">
                                       <div class="row">
                                           <div class="col-12 col-md-4">
                                               <a id="a_revew_order_image_${item.id}" class="image-popup" href="${!IsNullOrEmty(item.imageObj?.relativeUrl) ? item.imageObj?.relativeUrl : '/assets/images/error/product_1x1_medium.png'}">
                                                   <img id="img_revew_order_image_${item.id}"src="${!IsNullOrEmty(item.imageObj?.relativeUrl) ? item.imageObj?.relativeUrl : '/assets/images/error/product_1x1_medium.png'}" loading="lazy" class="img-fluid img-thumbnail" alt="GEMS GROUP" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                               </a>
                                           </div>
                                           <div class="col-12 col-md-8 position-relative">
                                               <p class="text-left p_delete_order_image my-2">
                                                   <i role="button" onclick="ShowModalEditOrderImage(${item.id})" class="fa fs-5 fa-pencil-square-o px-2 text-success" aria-hidden="true"></i>
                                                   <i role="button" onclick="ShowModalDeleteOrderImage(${item.id})" class="fa fs-5 fa-trash-o text-danger" aria-hidden="true"></i>
                                               </p>
                                               <div class="my-2">
                                                    <p class="div_star_order_review">${starHtml}</p>
                                                   <label for="remarkOrderImage_${item.id}" class="form-label mb-0"><i class="fa fa-comments-o" aria-hidden="true"></i> Đánh giá của bạn  <small class="text-muted"><i id="i_created_at">(${moment(item.createdAt).format("DD-MM-YYYY")})</i></small></label>
                                                   <textarea readonly class="form-control rounded bg-white" id="remarkOrderImage_${item.id}" placeholder="Hãy chia sẻ nhận xét cho sản phảm này bạn nhé !" rows="4">${item.remark}</textarea>
                                               </div>
                                           </div>
                                       </div>
                                  </div>`
            })
        }
        else {
            orderImageItem = _imgNotFoundHtml + `<p class="text-center">Hãy chia sẻ nhận xét cho sản phảm này bạn nhé !</p>`
        }


        orderImageHtml = `<div class="col-12 my-4 mb-2 border p-2 rounded">
                            <h3 class="fw-bolder mb-0 text-success">ĐÁNH GIÁ SẢN PHẨM</h3>
                              <div class="row">
                                  <i class="fs-6 mb-2">Hãy viết bình luận và chụp hình thực tế sau khi được nhân viên lắp đặt tại nơi, điều này giúp cho chúng tôi có thể hỗ trợ bạn một cách tốt nhất.</i>
                                  <div class="col-12 col-md-4">
                                      <button onclick="ShowModalAddOrderImage('${data.id}')" type="button" class="btn btn-success rounded  btn-animation">Đánh giá đơn hàng <i class="fa fa-pencil-square-o fs-6" aria-hidden="true"></i></button>
                                  </div>
                              </div>
                              <div class="row div_list_order_image">
                                 ${orderImageItem}
                              </div>
                          </div>`

    }

    if (data.processStatus >= 3) {
        let commentsItem = '';
        if (data.orderCommentObjs.length > 0) {
            data.orderCommentObjs.forEach(function (item) {
                typeComment = item.managementReplyType === 3 ? 'left' : 'right';
                userName = '';
                avatar = '';
                titleManageType = '';
                switch (item.managementType) {
                    case 0:
                        titleManageType = 'GEMS GROUP & Shop';
                    case 1:
                        titleManageType = 'GEMS GROUP';
                        break;
                    case 2:
                        titleManageType = 'Shop';
                        break;
                    default: break;
                }
                switch (item.managementReplyType) {
                    case 1:
                        userName = 'GEMS GROUP';
                        avatar = ADMIN_AVATAR;
                        break;
                    case 2:
                        userName = 'Shop';
                        avatar = data.shopAvatar;
                        break;
                    case 3:
                        userName = 'Tôi';
                        avatar = MY_AVATAR;
                        break;
                    default: break;
                }
                commentsItem +=
                    `<li>
                        <div class="media ${typeComment}"><img class="img-fluid avatar" src="${IsNullOrEmty(avatar) ? '/assets/images/error/avatar.png' : avatar}" alt="avatar" onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';">
                            <div class="media-body">
                                <div class="user"><span class="user_comment">${userName}</span><small class="px-1">(${FormatDateToViewSocialMin(item.createdAt)})</small>${item.managementReplyType === 3 ? `<i class="fa fa-trash text-danger" style="cursor:pointer;" onclick="DeleteOrderComment(this, ${item.id})"></i>` : ''}</div>
                                <p data-toggle="tooltip" title="${item.managementReplyType == 3 ? "Ai có thể xem: " + titleManageType : ''}">${item.comment ?? ''}</p>
                            </div>
                        </div>
                    </li>`;
            });
        }
        orderComment =
            `<div class="div_order_list_custom row">
                <div class="col-12 col-md-12 col-lg-12 p-1">
                    <div class="p-2 h-100 div_zone_order_item">
                        <div>
                            <a href="javascript:void(0)" onclick="ShowModalAddOrderComment()" title="Thêm phản hồi" class="float-right" style="line-height:0;"><i class="fa fa-plus text-info mr-1"></i>Thêm phản hồi</a>
                            <p class="header_card_order_detail">Phản hồi đơn hàng</p>
                        </div>
                        <ul class="mt-2 comments">${commentsItem}</ul>
                    </div>
                </div>
            </div>`;
    }

    return title + infoOrder + divZoneOrderItem + zoneTotalPay + orderComment + orderImageHtml +
        `<div class="pt-2">
            <div class="text-start">
                <a href="javascript:void(0)" onclick="CloseDetailPanel()"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i> Quay lại</a>
            </div>
        </div>`;
}

$(document).ready(function () {

    var curHref = location.pathname.split('/');
    if (curHref.length === 4) {
        let orderId = curHref[3];
        LoadDetailByUrl(orderId);
    } else {
        LoadListOrder();
    }

    $('.li_status_order').on('click', function () {
        statusProcess = parseInt($(this).data('id'));
        pageCurrent = 1;
        LoadListOrder();
    });

    $('#select_show_records_search').on('change', function () {
        pageCurrent = 1;
        LoadListOrder();
    });

    //Submit cancel item
    $('#btn_submit_cancel_item').on('click', function (e) {
        var laddaSubmitForm = Ladda.create(document.querySelector('#btn_submit_cancel_item'));

        //Get checked row
        var listChecked = [];
        var flagFailSelectReason = false;
        var itemId = 0;
        var reasonId = 0;
        var rowChecked = $('#tbody_modal_cancel_oderitem tr input[name="input_order_item_cancel"]:checked');
        rowChecked.each(function (key, value) {
            itemId = $(this).data('id');
            reasonId = parseInt($('#ReasonId_' + itemId).val());
            if (reasonId === undefined || reasonId == null || isNaN(reasonId) || reasonId === 0) {
                flagFailSelectReason = true;
                return false;
            }
            listChecked.push(`${itemId}:${reasonId}`);
        });
        if (flagFailSelectReason) {
            ShowToastNoti('warning', '', 'Vui lòng chọn lý do hủy');
            return;
        }
        if (listChecked.length === 0) {
            ShowToastNoti('info', '', 'Bạn chưa chọn sản phẩm muốn hủy');
            return;
        }
        var data = {
            orderItemId: JSON.stringify(listChecked).replace(/"/g, ''),
            description: $('#textarea_description_cancel').val()
        };

        laddaSubmitForm.start();
        $.ajax({
            url: '/Order/CancelItem',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (response) {
                laddaSubmitForm.stop();
                if (!CheckResponseIsSuccess(response)) return false;
                var curHref = location.pathname.split('/');
                if (curHref.length === 4) {
                    LoadDetailByUrl(curHref[3]);
                }
                swal.fire('Đã hủy đơn hàng', '', 'success');
                $('#modal_cancel_item').modal('hide');
                isHaveNewData = true;
            }, error: function (err) {
                laddaSubmitForm.stop();
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });

    });

    $('[maxlength]').maxlength({
        alwaysShow: !0,
        warningClass: "badge badge-success",
        limitReachedClass: "badge badge-danger"
    });

    /*Config gallery image*/
    $(".image-popup").magnificPopup({
        type: "image",
        closeOnContentClick: !1,
        closeBtnInside: !1,
        mainClass: "mfp-with-zoom mfp-img-mobile",
        image: {
            verticalFit: !0,
            titleSrc: function (e) {
                return e.el.attr("title")
            }
        },
        gallery: {
            enabled: !0
        },
        zoom: {
            enabled: !0,
            duration: 300,
            opener: function (e) {
                return e.find("img")
            }
        }
    });
  
    InitSubmitFormAddOrderComment();

    InitSubmitFormOrderImage();
});

function dataParam() {
    return {
        status: statusProcess,
        type: parseInt($("#select_show_records_search").val()),
        page: pageCurrent
    }
}

//Load List order
function LoadListOrder() {
    var data = dataParam();
    try {
        ShowOverlay("#div_order_list");
        $.ajax({
            type: 'GET',
            url: '/Order/GetListOrder',
            data: data,
            dataType: "json",
            success: function (response) {
                HideOverlay("#div_order_list");
                isHaveNewData = false;
                if (!CheckResponseIsSuccess(response)) {
                    document.getElementById("div_order_list").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListOrder();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
                    return;
                }

                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    document.getElementById("div_order_list").innerHTML = tableDataHtml(listData);
                    $("#label_count_order_item").text(`${response.data2nd != null ? response.data2nd : 0} đơn`);
                } else {
                    $("#label_count_order_item").text('');
                    document.getElementById("div_order_list").innerHTML = _imgNotFoundHtml;
                }
                var totalRecord = parseInt(response.data2nd);
                var pagination = LoadPagination(totalRecord, pageSize, pageCurrent);
                $('#ul_pagination_order_list').html(pagination);
            },
            error: function (err) {
                HideOverlay("#div_order_list");
                isHaveNewData = false;
                document.getElementById("div_order_list").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định!</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListOrder();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    } catch (e) {
        document.getElementById("div_order_list").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định!</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListOrder();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
    }
}

//Click Pagination ChangePage
function ChangePage(page, e) {
    e.preventDefault();
    ScrollToTop('.section-b-space', 700, 70);
    pageCurrent = page;

    //Get data
    LoadListOrder();
}

//Handle pagination
function LoadPagination(totalRecords, pageSize = 10, currentPage) {
    var pageDisplay = 5;
    var totalPage = Math.ceil(totalRecords / pageSize);

    //Check currentPage error
    if (currentPage > totalPage) {
        currentPage = totalPage;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }

    var startPage = parseInt(Math.max(1, Math.ceil(currentPage - pageDisplay / 2)));
    var endPage = parseInt(Math.min(totalPage, currentPage + pageDisplay / 2));

    if (totalPage >= 1) {
        var html = '';
        if (currentPage > 1) {
            html += `
                <li class="page-item">
                    <a class="page-link p-2" href="javascript:void(0);" title="Trang đầu" onclick="ChangePage(1,event)"
                    aria-label="First">
                        <span aria-hidden="true">
                            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                        </span> 
                        <span class="sr-only">First</span>
                    </a>
                </li>
                <li class="page-item">
                    <a class="page-link p-2" href="javascript:void(0);" title="Trang trước" onclick="ChangePage(${currentPage - 1},event)"
                    aria-label="Previous">
                        <span aria-hidden="true">
                            <i class="fa fa-angle-left" aria-hidden="true"></i>
                        </span> 
                        <span class="sr-only">Previous</span>
                    </a>
                </li>`;
        }
        for (var i = startPage; i <= endPage; i++) {
            if (currentPage == i) {
                html += `<li class="page-item active">
                            <a class="page-link p-2"><b>${currentPage}</b></a>
                        </li>`;
            }
            else {
                html += `<li class="page-item">
                            <a class="page-link p-2" href="javascript:void(0);" onclick="ChangePage(${i},event)" title="Trang ${i}">${i}</a>
                        </li>`;
            }
        }
        if (currentPage < totalPage) {
            html += `<li class="page-item">
                        <a class="page-link p-2" href="javascript:void(0);" title="Trang kế tiếp" onclick="ChangePage(${currentPage + 1},event)"
                            aria-label="Next">
                            <span aria-hidden="true">
                                <i class="fa fa-angle-right" aria-hidden="true"></i>
                            </span> 
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                    <li class="page-item">
                        <a class="page-link p-2" href="javascript:void(0);" title="Trang cuối" onclick="ChangePage(${totalPage},event)"
                        aria-label="Last">
                            <span aria-hidden="true">
                                <i class="fa fa-angle-double-right" aria-hidden="true"></i>
                            </span> 
                            <span class="sr-only">Last</span>
                        </a>
                    </li>`;
        }
        return html;
    }
    else {
        //NoData
        return "";
    }

}

//View detail order
function ViewDetail(e, elm, id) {
    e.preventDefault();
    if (detailLoading) return;
    detailElmSaveClick = elm;
    var loadingInElm = $($(elm).children().eq(0).children().eq(0));
    var htmlTmp = loadingInElm.html();
    loadingInElm.html(_loadAnimationSmallHtml);
    detailLoading = true;

    $.ajax({
        type: 'GET',
        url: '/Order/ViewDetail',
        data: {
            id: id
        },
        dataType: "json",
        success: function (response) {
            detailLoading = false;
            loadingInElm.html(htmlTmp);
            if (response.result === -2 && response.error.code === 404) {
                location.href = "/error/404";
                return;
            }
            if (!CheckResponseIsSuccess(response)) return false;

            var newHref = $(elm).attr("href");
            ChangeURLWithOut("", newHref);
            detailOrderCurrentData = response.data;
            dataOrderImage = response.data2nd;
            _shopTelephone = detailOrderCurrentData.shopPhone;
            document.getElementById("div_order_detail").innerHTML = loadDetailOrder(detailOrderCurrentData, dataOrderImage);
            $('[data-toggle="tooltip"]').tooltip();
            $('#form_data_add_order_comment [name="orderId"]').val(response.data.id);

            /*Config gallery image*/
            $(".image-popup").magnificPopup({
                type: "image",
                closeOnContentClick: !1,
                closeBtnInside: !1,
                mainClass: "mfp-with-zoom mfp-img-mobile",
                image: {
                    verticalFit: !0,
                    titleSrc: function (e) {
                        return e.el.attr("title")
                    }
                },
                gallery: {
                    enabled: !0
                },
                zoom: {
                    enabled: !0,
                    duration: 300,
                    opener: function (e) {
                        return e.find("img")
                    }
                }
            });

            //Change UI when success
            $('#div_zone_order_list').fadeOut(200);
            $('#div_zone_order_view_detail').fadeIn(200);
            ScrollToTop('#div_zone_order_list', 200, 1);
        },
        error: function (err) {
            detailLoading = false;
            loadingInElm.html(htmlTmp);
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

//Load detail by url
function LoadDetailByUrl(id) {
    $('#div_zone_order_list').fadeOut(200);
    $('#div_zone_order_view_detail').fadeIn(200);
    ScrollToTop('#div_zone_order_list', 200, 1);
    ShowOverlay("#div_zone_order_view_detail");
    $.ajax({
        type: 'GET',
        url: '/Order/ViewDetail',
        data: {
            id: id
        },
        dataType: "json",
        success: function (response) {
            HideOverlay("#div_zone_order_view_detail");
            if (response.result === -2 && response.error.code === 404) {
                location.href = "/error/404";
                return;
            }
            if (!CheckResponseIsSuccess(response)) return false;

            detailOrderCurrentData = response.data;
            dataOrderImage = response.data2nd;
            _shopTelephone = detailOrderCurrentData.shopPhone;
            document.getElementById("div_order_detail").innerHTML = loadDetailOrder(detailOrderCurrentData, dataOrderImage);
            $('[data-toggle="tooltip"]').tooltip();
            $('#form_data_add_order_comment [name="orderId"]').val(response.data.id);

            /*Config gallery image*/
            $(".image-popup").magnificPopup({
                type: "image",
                closeOnContentClick: !1,
                closeBtnInside: !1,
                mainClass: "mfp-with-zoom mfp-img-mobile",
                image: {
                    verticalFit: !0,
                    titleSrc: function (e) {
                        return e.el.attr("title")
                    }
                },
                gallery: {
                    enabled: !0
                },
                zoom: {
                    enabled: !0,
                    duration: 300,
                    opener: function (e) {
                        return e.find("img")
                    }
                }
            });
        },
        error: function (err) {
            HideOverlay("#div_zone_order_view_detail");
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

//Close detail panel
function CloseDetailPanel() {
    let href = "/order/view";
    ChangeURLWithOut("", href);
    $('#div_zone_order_list').fadeIn(200);
    $('#div_zone_order_view_detail').fadeOut(200);
    if (detailElmSaveClick === undefined) {
        LoadListOrder();
        ScrollToTop("#div_zone_order_list", 200, 1);
    } else {
        if (isHaveNewData)
            LoadListOrder();
        ScrollToTop($(detailElmSaveClick).children('div').eq(0), 200, 1);
    }
}

//Show cancel modal
function ShowCancelModal(elm) {
    var htmlElm = $(elm).html();
    if (reasonListData.length === 0) {
        $(elm).attr('onclick', '');
        $(elm).html(_loadAnimationSmallHtml);
        $.ajax({
            type: 'GET',
            url: '/Order/GetReasonForCancel',
            success: function (response) {
                $(elm).html(htmlElm);
                $(elm).attr('onclick', 'ShowCancelModal(this)');
                if (!CheckResponseIsSuccess(response)) return false;
                reasonListData = response.data;
                document.getElementById('tbody_modal_cancel_oderitem').innerHTML = tableCancelItemHtml(detailOrderCurrentData);
                $('#modal_cancel_item').modal('show');
                $('.selectpicker').selectpicker();
            },
            error: function (err) {
                $(elm).html(htmlElm);
                $(elm).attr('onclick', 'ShowCancelModal(this)');
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    } else {
        document.getElementById('tbody_modal_cancel_oderitem').innerHTML = tableCancelItemHtml(detailOrderCurrentData);
        $('#modal_cancel_item').modal('show');
        $('.selectpicker').selectpicker();
    }
}

//Show bank payment
function ShowBankPayment(elm, orderId, totalPay) {
    var id = $(elm).data('id');
    var laddaGetBank = Ladda.create(elm);
    laddaGetBank.start();
    $.ajax({
        type: 'GET',
        url: '/Checkout/GetBankList',
        data: { id: id },
        success: function (response) {
            laddaGetBank.stop();
            if (!CheckResponseIsSuccess(response)) return false;

            var listData = response.data;
            var itemBank = ``;
            let resultHtml = '';
            if (listData != null && listData.length > 0) {
                let totalPayHtml = NumberWithCommas(totalPay, ",");
                $.each(listData, function (key, value) {
                    itemBank += `
                        <div class="col-12 col-md-6 col-lg-6 mb-2">
                            <ul class="list-group text-left">
                                <li class="list-group-item">
                                 <div class="d-flex">
                                       ${IsNullOrEmty(value.bankTradeName) ? '' : `<img class="w-50 mx-auto" src="https://img.vietqr.io/image/${value.bankTradeName}-${value.number}-compact.png?amount=${totalPay}&addInfo=TT GEMSGROUP ${orderId}" alt="QrCode thanh toán" />`}
                                 </div>
                                </li>
                                <li class="list-group-item">
                                    <i class="fa fa-id-card-o mr-1"></i> <span>
                                        Số tài khoản:
                                    </span>${value.number}
                                    <button type="button" class="btn btn-sm p-0 color-default" onclick="CopyText('${value.number}')" title="Sap chép">
                                         <i class="fa fa-clone"></i> <span style="text-transform:none;font-weight:normal;">Sao chép</span>
                                    </button>
                                </li>
                                <li class="list-group-item"><i class="fa fa-user mr-1"></i> <span>Tên người nhận: </span>${value.personName}</li>
                                <li class="list-group-item"><i class="fa fa-bank mr-1"></i> <span>Ngân hàng: </span>${value.bankName} - ${value.bankTradeName}</li>
                                <li class="list-group-item"><i class="fa fa-info-circle mt-1" aria-hidden="true"></i> <span>Nội dung: </span>TT GEMSGROUP ${orderId}</li>
                            </ul>
                        </div>`;
                });
                resultHtml =
                    `<h5 class="font-weight-bold text-center text-success text-uppercase"><i class="fa fa-credit-card h4"></i> Thông tin thanh toán</h5>
                        <p class="text-center mb-0">
                            <b>Số tiền: </b>${totalPayHtml}đ
                        </p>
                        <p class="text-center">
                            <b>Nội dung chuyển khoản: </b><span>TT GEMSGROUP ${orderId}</span>
                            <button type="button" class="btn btn-sm p-0 color-default" onclick="CopyText('TT GEMSGROUP ${orderId}')" title="Sap chép">
                                <i class="fa fa-clone"></i> <span style="text-transform:none;font-weight:normal;">Sao chép</span>
                            </button>
                        </p>
                        <div class="row justify-content-center">
                            ${itemBank}
                        </div>
                         <div class="col-12 mt-4">
                            <h3 class="text-danger">Hướng dẫn chuyển khoản</h3>
                             <div class="mt-3">
                                 <p class="mb-1 text-info fw-bold"><i class="fa fa-caret-right" aria-hidden="true"></i> Cách 1: Quét mã QR</p>
                                 <p><strong>Bước 1:</strong> <span>Mở ứng dụng ngân hàng</span></p>
                                 <p><strong>Bước 2:</strong> Chọn chức năng quét mã thanh toán (Có thể chụp ảnh màn hình mã Qr và chọn tải ảnh lên)</p>
                                 <p><strong>Bước 3:</strong> Kiểm tra thông tin và xác nhận thanh toán</p>
                                 <p class="mb-1 text-info fw-bold"><i class="fa fa-caret-right" aria-hidden="true"></i> Cách 2: Nhập thủ công</p>
                                 <p><strong>Bước 1:</strong> Nhập thông tin thanh toán, nội dung là mã đơn hàng</p>
                                 <p><strong>Bước 2:</strong> Kiểm tra thông tin và xác nhận thanh toán</p>
 <p class="mb-1 text-danger fw-bold"><i class="fa fa-info-circle text-danger" aria-hidden="true"></i> Lưu ý: Quý khách chụp màn hình đã chuyển khoản lưu lại khi cần đối soát.</p>
                             </div>
                        </div>`
                document.getElementById("div_body_modal_bank_list").innerHTML = resultHtml;
                $('#modal_bank_list').modal('show');
            } else {
                ShowToastNoti('warning', '', 'Shop chưa có thông tin chuyển khoản');
            }
        }, error: function (err) {
            laddaGetBank.stop();
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function CalDiscountPrice(num1, num2) {
    return NumberWithCommas(num1 - num2, ',') + 'đ';
}

//Show add order comment modal
function ShowModalAddOrderComment() {
    $('#modal_add_order_comment').modal('show');
}

function InitSubmitFormAddOrderComment() {
    $('#form_data_add_order_comment').on('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let $formElm = $(this);
        let isvalidate = $formElm[0].checkValidity();
        if (!isvalidate) { ShowToastNoti('warning', '', _resultActionResource.PleaseWrite); return false; }
        let formData = new FormData($formElm[0]);
        let laddaSubmitForm = Ladda.create($formElm.find('button[type="submit"]')[0]);
        laddaSubmitForm.start();
        $.ajax({
            url: '/Order/AddOrderComment',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                laddaSubmitForm.stop();
                if (!CheckResponseIsSuccess(response)) return false;
                swal('Đã gửi!', '', 'success');
                document.getElementById('form_data_add_order_comment').reset();
                RemoveClassValidate('#form_data_add_order_comment');
                $('#modal_add_order_comment').modal('hide');
                var curHref = location.pathname.split('/');
                if (curHref.length === 4) {
                    let orderId = curHref[3];
                    setTimeout(function () {
                        LoadDetailByUrl(orderId);
                    }, 1000);
                }
            }, error: function (err) {
                laddaSubmitForm.stop();
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    });
}

//Delete
function DeleteOrderComment(elm, id) {
    swal.fire({
        title: "Bạn có muốn xóa phản hồi này?",
        text: "",
        type: "warning",
        showCancelButton: !0,
        confirmButtonText: "Xóa",
        cancelButtonText: "Không",
        confirmButtonClass: "btn btn-danger mx-1 mt-2",
        cancelButtonClass: "btn btn-outline-secondary mx-1 mt-2",
        reverseButtons: true,
        buttonsStyling: !1,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: 'POST',
                    url: '/Order/DeleteOrderComment',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function (response) {
                        if (!CheckResponseIsSuccess(response)) {
                            resolve();
                            return false;
                        }
                        $(elm).parents('li').remove();
                        resolve();
                    },
                    error: function (err) {
                        CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                        resolve();
                    }
                });
            });
        }
    });
}

function ChangeDescripRatingStart(num) {
    let text = '';
    switch (num) {
        case 1: text = '<img src="/img/rate_face/1.png" /><span class="text-danger">Quá tệ</span>'; break;
        case 2: text = '<img src="/img/rate_face/2.png" /><span class="text-warning">Không hài lòng</span>'; break;
        case 3: text = '<img src="/img/rate_face/3.png" /><span class="text-secondary">Bình thường</span>'; break;
        case 4: text = '<img src="/img/rate_face/4.png" /><span class="text-info">Tốt</span>'; break;
        case 5: text = '<img src="/img/rate_face/5.png" /><span class="text-success">Rất tốt</span>'; break;
        default:
    }
    $('#divStartDescrip').html(text);
}

function ShowModalEditOrderImage(id) {
    $.get(`/Order/P_EditOrderImage`, { id: id }).done(function (response) {
        if (response.result === -1 || response.result === 0) {
            CheckResponseIsSuccess(response); return false;
        }
        $('.div_panel_order_image').html(response);
        $('#modal_edit_order_image').modal('show');

        setTimeout(function myfunction() {

            0 < $('[data-plugins="dropify"]').length && $('[data-plugins="dropify"]').dropify({
                messages: {
                    default: '<span style="font-size:16px;">Chọn ảnh đại diện</span>',
                    replace: "Chọn ảnh",
                    remove: "Xóa",
                    error: "Ảnh không hợp lệ"
                }, error: { fileSize: "Kích thước tối đa 5MB." }
            });


            //Load default rating start
            ChangeDescripRatingStart(parseInt($('input[name="Star"]:checked').val()));

            $('.rating__label').hover(function () {
                let start = $(this).data('rate');
                ChangeDescripRatingStart(start);
            });

            $('.rating__label').mouseleave(function () {
                let start = parseInt($('input[name="Star"]:checked').val());
                ChangeDescripRatingStart(start);
            });

            $('[maxlength]').maxlength({
                alwaysShow: !0,
                warningClass: "badge badge-success",
                limitReachedClass: "badge badge-danger"
            });
        }, 300);

        InitSubmitFormOrderImage()

    }).fail(function (err) {
        CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
    });
}

function ShowModalDeleteOrderImage(id) {
    let value = id;
    swal.fire({
        title: "Xác nhận xóa đánh giá này?",
        text: "",
        type: "question",
        showCancelButton: !0,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonClass: "btn btn-danger ml-2",
        cancelButtonClass: "btn btn-outline-secondary",
        buttonsStyling: !1,
        showLoaderOnConfirm: true,
        reverseButtons: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                ShowOverlay('.div_list_order_image');
                $.ajax({
                    type: 'POST',
                    url: '/Order/DeleteOrderImage',
                    data: {
                        id: value
                    },
                    success: function (response) {
                        HideOverlay('.div_list_order_image');
                        if (response.result != 1) {
                            CheckResponseIsSuccess(response);
                            return
                        }
                        swal.fire("Đã xóa!", '', 'success');
                        $(`.card_order_image_${id}`).slideUp(400);
                    },
                    error: function (err) {
                        HideOverlay('.div_list_order_image');
                        CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                    }
                });

            });
        }
    });
}

function RemoveImageInFormEditOrderImage() {
    swal.fire({
        title: "Xóa ảnh đại diện?",
        text: "",
        type: "question",
        showCancelButton: !0,
        confirmButtonText: "Xóa",
        cancelButtonText: "Không",
        confirmButtonClass: "btn btn-danger mt-2",
        cancelButtonClass: "btn btn-light ml-2 mt-2",
        buttonsStyling: !1,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $('#form_data [name="ImageId"]').val(0);
                $('#form_data #img_avatar_image').attr('src', '/assets/images/error/avatar.png');
                resolve();
            });
        }
    });
}

function InitSubmitFormOrderImage() {
    //Submit form
    $('#form_data').on('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let $formElm = $("#form_data");
        let isvalidate = $formElm[0].checkValidity();
        if (!isvalidate) { ShowToastNoti('warning', '', _resultActionResource.PleaseWrite); return false; }
        let formData = new FormData($formElm[0]);
        let id = $formElm.find('input[name="Id"]').val();
        var laddaSubmitForm = Ladda.create($("#btn_submit_form")[0]);
        laddaSubmitForm.start();
        //Edit
        if (id > 0) {
            $.ajax({
                url: $formElm.attr("action"),
                type: $formElm.attr("method"),
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    laddaSubmitForm.stop();
                    if (response.result != 1) {
                        CheckResponseIsSuccess(response);
                        return false;
                    }
                    $("#form_data").trigger("reset");
                    RemoveClassValidate('#form_data');
                    ShowToastNoti("success", "", _resultActionResource.UpdateSuccess);

                    let data = response.data;

                    //Map value
                    $(`#remarkOrderImage_${data.id}`).text(data.remark);
                    $(`#a_revew_order_image_${data.id}`).attr("href", !IsNullOrEmty(data.imageObj?.relativeUrl) ? data.imageObj?.relativeUrl : '/assets/images/error/product_1x1_medium.png');
                    $(`#img_revew_order_image_${data.id}`).attr("src", !IsNullOrEmty(data.imageObj?.relativeUrl) ? data.imageObj?.relativeUrl : '/assets/images/error/product_1x1_medium.png');
                    let starHtml = "";
                    if (data.star > 0) {
                        starHtml = "";
                        for (var i = 1; i <= data.star; i++) {
                            starHtml += `<i class="fa fa-star text-warning px-1" aria-hidden="true"></i>`
                        }
                    }
                    $(".div_star_order_review").html(starHtml);
                    $('#modal_edit_order_image').modal('hide');
                    ChangeDescripRatingStart(parseInt($('input[name="Star"]:checked').val()));
                }, error: function (err) {
                    laddaSubmitForm.stop();
                    CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                }
            });
        } else {
            formData.set("telephone", _shopTelephone);
            $.ajax({
                url: $formElm.attr("action"),
                type: $formElm.attr("method"),
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    laddaSubmitForm.stop();
                    if (response.result != 1) {
                        CheckResponseIsSuccess(response);
                        return false;
                    }
                    $("#form_data").trigger("reset");
                    RemoveClassValidate('#form_data');
                    ShowToastNoti("success", "", _resultActionResource.UpdateSuccess);
                    $('#modal_add_order_image').modal('hide');
                    let data = response.data;

                    let starHtml = "";
                    if (data.star > 0) {
                        for (var i = 1; i <= data.star; i++) {
                            starHtml += `<i class="fa fa-star text-warning px-1" aria-hidden="true"></i>`
                        }
                    }
                    let orderImageItem =
                        `<div class="col-12 p-4 card_order_image_${data.id}">
                                       <div class="row">
                                           <div class="col-12 col-md-4">
                                               <a id="a_revew_order_image_${data.id}" class="image-popup" href="${!IsNullOrEmty(data.imageObj?.relativeUrl) ? data.imageObj?.relativeUrl : '/assets/images/error/product_1x1_medium.png'}">
                                                   <img id="img_revew_order_image_${data.id}"src="${!IsNullOrEmty(data.imageObj?.relativeUrl) ? data.imageObj?.relativeUrl : '/assets/images/error/product_1x1_medium.png'}" loading="lazy" class="img-fluid img-thumbnail" alt="GEMS GROUP" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                               </a>
                                           </div>
                                           <div class="col-12 col-md-8 position-relative">
                                               <p class="text-left p_delete_order_image my-2">
                                                   <i role="button" onclick="ShowModalEditOrderImage(${data.id})" class="fa fs-5 fa-pencil-square-o px-2 text-success" aria-hidden="true"></i>
                                                   <i role="button" onclick="ShowModalDeleteOrderImage(${data.id})" class="fa fs-5 fa-trash-o text-danger" aria-hidden="true"></i>
                                               </p>
                                               <div class="my-2">
                                                    <p class="div_star_order_review">${starHtml}</p>
                                                   <label for="remarkOrderImage_${data.id}" class="form-label mb-0"><i class="fa fa-comments-o" aria-hidden="true"></i> Đánh giá của bạn <small class="text-muted"><i>${moment(data.createdAt).format("DD-MM-YYYY")}</i></small></label>
                                                   <textarea readonly class="form-control rounded bg-white" id="remarkOrderImage_${data.id}" placeholder="Hãy chia sẻ nhận xét cho sản phảm này bạn nhé !" rows="4">${data.remark}</textarea>
                                               </div>
                                           </div>
                                       </div>
                                  </div>`


                    $(".div_list_order_image").append(orderImageItem)

                    ChangeDescripRatingStart(parseInt($('input[name="Star"]:checked').val()));
                }, error: function (err) {
                    laddaSubmitForm.stop();
                    CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                }
            });
        }
    });
}

function ShowModalAddOrderImage(orderId) {
    $.get(`/Order/P_AddOrderImage`).done(function (response) {
        if (response.result === -1 || response.result === 0) {
            CheckResponseIsSuccess(response); return false;
        }

        $('.div_panel_order_image').html(response);
        $('#modal_add_order_image').modal('show');

        setTimeout(function myfunction() {

            0 < $('[data-plugins="dropify"]').length && $('[data-plugins="dropify"]').dropify({
                messages: {
                    default: '<span style="font-size:16px;">Chọn ảnh đại diện</span>',
                    replace: "Chọn ảnh",
                    remove: "Xóa",
                    error: "Ảnh không hợp lệ"
                }, error: { fileSize: "Kích thước tối đa 5MB." }
            });

            //Load default rating start
            ChangeDescripRatingStart(parseInt($('input[name="Star"]:checked').val()));

            $('.rating__label').hover(function () {
                let start = $(this).data('rate');
                ChangeDescripRatingStart(start);
            });

            $('.rating__label').mouseleave(function () {
                let start = parseInt($('input[name="Star"]:checked').val());
                ChangeDescripRatingStart(start);
            });

            $('[maxlength]').maxlength({
                alwaysShow: !0,
                warningClass: "badge badge-success",
                limitReachedClass: "badge badge-danger"
            });
            $("#OrderId").val(orderId)
        }, 300);

        InitSubmitFormOrderImage();

    }).fail(function (err) {
        CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
    });
}