
var $btnPlaceOrder = $('#btn-placeOrder');
var promotionCodeApply = [];
var addressDefaultData;
var addressListData = [];
var cartItemData = [];
var shopAddresData = [];
var shopAddresFilterData = [];
var listCarrierData = [];
var timeoutSearch = null;
var xhrGetFeeShip_GHTK;
var addressCustomer = "";
var dataOptionGHN = "";
var listOrder = [];
var listTotalOrder = [];
var listFeeShip = [];
let listProductSelected = [];
var laddaPlaceOrder = Ladda.create(document.querySelector('#btn-placeOrder'));
const MAX_COST_DELIVERY_GHTK = 20000000; //VND
const MAX_TOTAL_WEIGHT_DELIVERY_GHTK = 20; //KG
const noneShopConnectShipping = '<p class="text-center text-danger">Shop chưa liên kết đơn vị giao hàng. Nếu tiếp tục mua hàng phí giao hàng sẽ được Shop cập nhật sau...</p>';
const noChooseShip = '<p class="text-center text-danger">Bạn chưa chọn đơn vị giao hàng. Nếu tiếp tục mua hàng phí giao hàng sẽ được Shop cập nhật sau...</p>';
//const noneShopConnectShipping = '<p class="text-center text-danger">Phí giao hàng sẽ được Shop cập nhật sau...</p>';
//const noChooseShip = '<p class="text-center text-danger">Phí giao hàng sẽ được Shop cập nhật sau...</p>';
let _tokenLrGHN = "c7c3cd8b-d913-11ed-9eaf-eac62dba9bd9";
let _tokenDevGHN = "ea9844cc-d447-11ed-ab31-3eeb4194879e";
var htmlCartSelect = [];
var listPaymentMethod = [];
var listSupplierBanking = [];

var listDiscountSupplier = [];
var admin = 0;
var shop = 0;

function tableDataHtml() {
    //Get record
    var shopItem = '';
    var promotionHtml = '';
    var totalHtml = '';
    var productItem = '';
    var paymentObj = '';
    var shopUrl = '', shopId = 0;
    var countPackage = 0;
    var countItem = 0;
    var totalPriceItem = 0;
    var checkAllowBanking = 0;

    $.each(cartItemData, function (key, value) {
        var orderMoney = 0;
        var totalMustPay = 0;
        var totalOrderSupplier = 0;
        productItem = '';
        paymentObj = '';
        shopUrl = value.shopUrl;
        shopId = value.code;
        checkAllowBanking = 0;
        countPackage++;
        value.productItem.forEach(function (item, index) {
            countItem++;
            let typeNameTmp = '', sizeTmp = '', colorTmp = '', priceDiscount = 0, priceTmp = '', discountTmp = '', unitNameTmp = '';
            let productPriceObj = item.productPriceObj;
            if (productPriceObj != null) {
                priceDiscount = productPriceObj.discount > 0 ? (productPriceObj.priceOut - productPriceObj.discount) : productPriceObj.priceOut;
                priceTmp = productPriceObj.discount > 0 ? CalDiscountPrice(productPriceObj.priceOut, productPriceObj.discount) : NumberWithCommas(productPriceObj.priceOut, ',') + 'đ';
                discountTmp = productPriceObj.discount > 0 ? `<del>${NumberWithCommas(productPriceObj.priceOut, ',')}đ</del>` : "";
                typeNameTmp = IsNullOrEmty(productPriceObj?.typeName) ? "" : productPriceObj?.typeName;
                totalPriceItem += priceDiscount * item.quantity;
                //ManySupplier
                totalOrderSupplier += priceDiscount * item.quantity;
            }


            sizeTmp = item.sizeName != null && item.sizeName.length > 30 ? item.sizeName.substring(0, 30) + "..." : item.sizeName;
            colorTmp = item.colorName != null && item.colorName.length > 30 ? item.colorName.substring(0, 30) + "..." : item.colorName;
            productItem +=
                `<div class="col-12 row m-0 p-2 border-bottom border-white">
                    <div class="col-3 col-md-2 px-0">
                        <a href="/san-pham/${item.nameSlug}-${item.id}"><img src="${item.imageUrl}" loading="lazy" class="img-fluid" alt="${item.name}" style="border-radius:4px;" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';"></a>
                    </div>
                    <div class="col-9 col-md-7">
                        <a href="/san-pham/${item.nameSlug}-${item.id}">
                            <div class="desktop-div-custom text-muted">
                                <h5 class="sp-line-3">${item.name}</h5>
                                ${!IsNullOrEmty(typeNameTmp) ? `<span class="col-auto badge badge-success">${typeNameTmp}</span>` : ""}
                                ${!IsNullOrEmty(unitNameTmp) ? `<span class="col-auto badge badge-success">${unitNameTmp}</span>` : ""}
                                ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                                ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                            </div>
                            <div class="mobile-cart-content m-0">
                                <span class="p-0 sp-line-3">${item.name}</span>
                                ${!IsNullOrEmty(typeNameTmp) ? `<span class="col-auto badge badge-success">${typeNameTmp}</span>` : ""}
                                ${!IsNullOrEmty(unitNameTmp) ? `<span class="col-auto badge badge-success">${unitNameTmp}</span>` : ""}
                                ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                                ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                                <div class="m-0">
                                    <h5 class="m-0 text-break" style="color:#81ba00">${priceTmp} x <b class="text-muted">${item.quantity}</b></h5>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3 text-right desktop-div-custom">
                        <span class="m-0 h6 color-default">${priceTmp}</span> x <b>${item.quantity}</b>
                    </div>
                </div>`;

            orderMoney += (parseInt(item.productPriceObj?.priceOut) ?? 0 - parseInt(item.productPriceObj?.discount) ?? 0) * parseInt(item.quantity);
        });

        let carrierOption = `<option value="0">--Chọn đơn vị giao hàng--</option>`;
        listCarrierData.forEach(function (item, index) {
            if (item.supplierId === value.id)
                carrierOption += `<option value="${item.id}" selected>${item.carrierObj?.carrierCode} - ${item.carrierObj?.name}</option>`;
        });

        let carrierHtml = `<select  class="form-control form-control-sm bg-white w-auto select_carrier" style="height:30px;" id="select-carrier-${shopId}" onchange="OnChangeCarrier(this, ${key}, '${value.id}','${shopId}');">
                            ${carrierOption}
                        </select>
                        <div id="dropdown_ghn"></div>`;
        let deliveryOptionHtml =
            `<input class="checkbox-tools deliveryPackingInput" type="radio" name="delivery_package_${shopId}" data-id="${shopId}" value="1" id="delivery_${shopId}_1" checked />
            <label class="for-checkbox-tools" for="delivery_${shopId}_1">
                <b>GH tiêu chuẩn</b> <br />
                <span>Phí vận chuyển NCC sẽ liên hệ bạn</span>
            </label>`;

        //Check Allow Banking
        if (listSupplierBanking != null && listSupplierBanking.length > 0) {
            paymentObj = listSupplierBanking.find(x => x.supplierId == value.supplierId)
            if (paymentObj != null && paymentObj?.id > 0) {
                checkAllowBanking = 1 //Allow Banking
            }
        }
        promotionHtml = `<hr />
                             <div class="form-group mb-0">
                                 <div style="display: flex; justify-content: space-between; align-items: center;">
                                     <div><img src="/img/icon/ticket.png" height="32" alt="ticket" /><span>Mã giảm giá</span></div>
                                     <a href="javascript:void(0);" id="a_${value.supplierId}" data-id="${value.code}" onclick="ShowModalPromotionList(this,'${value.supplierId}','${value.code}')" class="color-default">Chọn hoặc nhập mã <i class="fa fa-angle-right" style="font-size:18px;"></i></a>
                                 </div>
                                 <div class="promotion_list" id="div_list_promotion_apply_${value.code}">
                                </div>
                       </div>`

        methodPaymentHtml = `<hr />
                             <div class="form-group mb-0" hidden>
                               <div><i class="fa fa-credit-card-alt text-info px-2" aria-hidden="true"></i><span> Phương thức thanh toán</span></div>
                                 <div class="row">
                                  <div class="payment-options px-4" style="overflow-x: auto;">
                                              <ul>
                                                  <li>
                                                      <div class="pretty p-default p-curve">
                                                          <input class="input_method_payment_${shopId}" type="radio" name="paymentGroup${shopId}" id="input_${shopId}_1" checked="checked" value="1" />
                                                          <div class="state p-success-o">
                                                              <label>Thanh toán khi shipper giao hàng đến</label>
                                                          </div>
                                                      </div>
                                                  </li>
                                                  <li>
                                                      <div class="pretty p-default p-curve">
                                                          <input class="input_method_payment_${shopId} input_payment_banking_by_qr_${value.supplierId}" type="radio" name="paymentGroup${shopId}" id="input_${shopId}_2" value="2" ${checkAllowBanking > 0 ? '' : 'disabled'}/>
                                                          <div class="state p-success-o">
                                                              <label>Chuyển khoản qua ngân hàng (Thanh toán sau khi đặt hàng)</label>
                                                          </div>
                                                      </div>
                                                  </li>
                                              </ul>
                                        </div>
                                 </div>
                                 <div class="promotion_list" id="div_list_promotion_apply_${value.code}">
                                </div>
                       </div>`
        totalHtml = `<hr />
                      <div class="form-group mb-0 p-2">
                          <div style="display: flex; justify-content: space-between; align-items: center;">
                              <div><span>Tạm tính</span></div>
                              <p class="color-default" id="order_total_${shopId}">${NumberWithCommas(totalOrderSupplier, ',')}</p>
                          </div>
                          <div style="display: flex; justify-content: space-between; align-items: center;" hidden>
                              <div><span>Phí ship</span></div>
                              <p class="color-default" id="review_fee_ship_${value.code}">(Chưa tính)</p>
                          </div>
                            <div style="display: flex; justify-content: space-between; align-items: center;" hidden>
                              <div><span class="text-info">Giảm giá</span></div>
                              <p id="discount_${value.code}" class="color-default text-info">0</p>
                          </div>
                          <div style="display: flex; justify-content: space-between; align-items: center;" hidden>
                              <div><span class="text-danger fw-bolder">Tổng tiền</span></div>
                              <p id="total_${value.code}" class="color-default fw-bolder text-danger">(Chưa tính)</p>
                          </div>
                     </div>
        `
        /*  listFee.push({
              supplierId: value.supplierId,
              totalOrderSupplier: totalOrderSupplier,
          })*/


        listTotalOrder.push(
            {
                shopCode: shopId,
                orderMoney: totalOrderSupplier,
                codeDiscount: 0,
                feeShip: 0
            }
        )

        //disable button banking
        if (checkAllowBanking == 0)
            $("#payment_2").attr("disabled", true)

        shopItem +=
            `<div class="col-12 zoneShop" id="zoneShop_${shopId}">
                <div class="col-12" style="padding:6px 12px 6px 12px;">
                    <label class="mb-0"><b class="text-success">${value.shopName ?? ''}</b></label>
                   <span hidden> ${carrierHtml}</span>
                </div>
                <div hidden class="col-12 px-2 section over-hide z-bigger row div_alert_not_connect_delivery_${key}" id="deliveryOptionZone_${shopId}" style="padding:4px;">
                    <p class="text-center"></p>
                </div>
                <div class="col-12 px-2 section over-hide z-bigger row" id="errorMessageDeliveryOption_${shopId}" style="padding:4px;display:none;">
                    <p class="text-danger">Vui lòng chọn cách thức vận chuyển!</p>
                </div>
                ${productItem}
                ${totalHtml}
            </div>`;

        /* ${ methodPaymentHtml }*/
    });    /* ${ promotionHtml }*/
    /*htmlCartSelect.forEach(function (item, key) {
        $('#zoneCart').append(item).ready(function () {
            InitGetFeeGHN(`${shopId}`, `${shopId}`);
        });
    })*/

    /*
        $('#zoneCart').append(shopItem).ready(function () {
            InitGetFeeGHN(`${shopId}`, `${shopId}`);
        });*/

    document.getElementById("zoneCart").innerHTML = shopItem;

    //Load default delivery option
    //setTimeout(function myfunction() {
    //    LoadFeeShippAllOrder();
    //}, 500)

    LoadListSupplier();

    RefreshTotalItem(totalPriceItem, countItem);
    /*   RefreshTotalPay();*/
    return shopItem;
}

function orderReviewHtml(data, orderList) {
    //Get record
    var shopItem = '';
    var productItem = '';
    var totalPriceItem = 0;
    var totalPriceOneOrder = 0;
    var supplierId = 0;
    //var paymentMethod = $('input[type="radio"][name="payment-group"]:checked').val();
    var paymentMethodPercent = parseInt($('[name="payment-group"]:checked').data('value'));
    var htmlQrBanking = '';
    let methodPayment = 1;
    let feeShip = 0;
    $.each(data, function (key, value) {
        productItem = '';
        totalPriceOneOrder = 0;
        supplierId = value.supplierId;
        htmlQrBanking = '';
        methodPayment = 1;
        value.productItem.forEach(function (item, index) {
            let typeNameTmp = '', sizeTmp = '', colorTmp = '', priceDiscount = 0, priceTmp = '', discountTmp = '', unitNameTmp = '';
            let productPriceObj = item.productPriceObj;
            if (productPriceObj != null) {
                priceDiscount = productPriceObj.discount > 0 ? (productPriceObj.priceOut - productPriceObj.discount) : productPriceObj.priceOut;
                priceTmp = productPriceObj.discount > 0 ? CalDiscountPrice(productPriceObj.priceOut, productPriceObj.discount) : NumberWithCommas(productPriceObj.priceOut, ',') + 'đ';
                discountTmp = productPriceObj.discount > 0 ? `<del>${NumberWithCommas(productPriceObj.priceOut, ',')}đ</del>` : "";
                /* unitNameTmp = productPriceObj.unitId === 0 ? "" : '<span class="badge badge-success">' + productPriceObj.unitObj.name + '</span>';*/
                typeNameTmp = IsNullOrEmty(productPriceObj?.typeName) ? "" : '<span class="badge badge-success">' + productPriceObj.typeName + '</span>';
                totalPriceItem += priceDiscount * item.quantity;
                totalPriceOneOrder += priceDiscount * item.quantity;
            }

            //let sizeTmp = '', colorTmp = '', priceDiscount = 0, priceTmp = '';
            //priceDiscount = item.discount > 0 ? (item.price - item.discount) : item.price;
            //priceTmp = item.discount > 0 ? CalDiscountPrice(item.price, item.discount) : FormatToVNDCustom(item.price);
            //totalPriceItem += priceDiscount * item.quantity;
            //totalPriceOneOrder += priceDiscount * item.quantity;
            sizeTmp = item.sizeName != null && item.sizeName.length > 30 ? item.sizeName.substring(0, 30) + "..." : item.sizeName;
            colorTmp = item.colorName != null && item.colorName.length > 30 ? item.colorName.substring(0, 30) + "..." : item.colorName;
            productItem +=
                `<div class="row product-order-detail">
                    <div class="col-3 col-md-2 col-lg-2 col-xl-2">
                        <img src="${item.imageUrl}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';"
                                class="img-fluid blur-up lazyload">
                    </div>
                    <div class="col-9 col-md-5 col-lg-5 col-xl-5 order_detail zoneShop">
                        <div class="desktop-div-custom">
                            <h4 class="sp-line-3">${item.name}</h4>
                            <h5>
                                ${typeNameTmp}
                                ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                                ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                            </h5>
                        </div>
                        <div class="row w-100 d-md-none">
                            <div class="col-7 px-0">
                                <h4 class="sp-line-3">${item.name}</h4>
                                <h5>
                                    ${typeNameTmp}
                                   ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                                   ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                                </h5>
                            </div>
                            <div class="col-5 px-0 text-right">
                                <h4>SL: <span>${item.quantity}</span></h4>
                                <h4 class="text-dark" style="font-weight:600;">${priceTmp}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="d-none d-md-flex col-md-2 col-lg-2 col-xl-2 order_detail">
                        <div>
                            <h4>SL: <span>${item.quantity}</span></h4>
                        </div>
                    </div>
                    <div class="d-none d-md-flex col-md-3 col-lg-3 col-xl-3 order_detail">
                        <div class="w-100">
                            <h4 class="text-dark float-right" style="font-weight:600;">${priceTmp}</h4>
                        </div>
                    </div>
                </div>`;
        });
        let orderCode = orderList[0].id;
        var listDiscountBySup = []
        let buttonShowBankList = '';
        let feeShipText = '';
        feeShip = 0;
        let discount = 0;

        let discountPayment = 0;

        //Banking Qr
        methodPayment = orderList?.find(x => x.supplierId == value.supplierId)
        //if (methodPayment.feeshipReview > 0) {
        //    feeShipText = NumberWithCommas(methodPayment.feeshipReview, ',') + 'đ';
        //    feeShip = methodPayment.feeshipReview
        //} else {
        //    feeShipText = "(Chưa tính)"
        //}

        let totalPay = totalPriceOneOrder + feeShip - discount - discountPayment;
        if (methodPayment.paymentId == 2) {
            htmlQrBanking = ''
            if (listSupplierBanking != null && listSupplierBanking.length > 0) {
                $.each(listSupplierBanking, function (key, item) {
                    var qrBankingSupplierObj = listSupplierBanking.find(x => x.supplierId == value.supplierId)
                    if (qrBankingSupplierObj != null) {
                        htmlQrBanking = `
                         <div class="col-12 col-md-6 mb-2">
                            <ul class="list-group text-left">
                                <li class="list-group-item">
                                   <div class="d-flex"> ${IsNullOrEmty(qrBankingSupplierObj?.bankObj?.tradeName) ? '' : `<img class="w-50 mx-auto" src="https://img.vietqr.io/image/${qrBankingSupplierObj?.bankObj?.tradeName}-${qrBankingSupplierObj?.number}-compact.png?amount=${totalPay}&addInfo=TT GEMSGROUP ${orderCode}" alt="QrCode thanh toán" />`}</div>
                                </li>
                                <li class="list-group-item">
                                    <i class="fa fa-id-card-o mr-1"></i> <span>
                                        STK:
                                    </span><span class="color-default mx-2 text-danger" style="font-size: 15px">
                                        ${qrBankingSupplierObj?.number}
                                        <button style="float: right" type="button" class="btn btn-sm p-0 color-default mx-2" onclick="CopyText('${qrBankingSupplierObj?.number}')" title="Sap chép">
                                         <i class="fa fa-clone"></i> <span style="text-transform:none;font-weight:normal;"></span>
                                    </button>
                                    </span>

                                </li>
                                <li class="list-group-item"><i class="fa fa-user mr-1"></i> <span>Tên người nhận: </span><span class="color-default mx-2 text-danger">${qrBankingSupplierObj?.nameCard}</span></li>
                                <li class="list-group-item"><i class="fa fa-bank mr-1"></i> <span>Ngân hàng: </span><span class="color-default mx-2 text-danger">${qrBankingSupplierObj?.bankObj?.tradeName} - ${qrBankingSupplierObj?.bankObj?.name}</span></li>
                                <li class="list-group-item"><i class="fa fa-info-circle" aria-hidden="true"></i> <span>Nội dung: </span><span class="color-default mx-2 text-danger">TT GEMSGROUP ${orderCode}</span></li>
                            </ul>
                        </div>
                        <div class="col-12 col-md-6 mb-2 div_diretion_banking">
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
                        </div>
                        `
                    }
                })
            }
        }

        shopItem +=
            `<div class="zoneTrackItem">
                <div class="col-12" style="margin-bottom:-10px;margin-top:-6px;">
                    <h3 class="color-default text-danger"><b><i class="fa fa-tags" aria-hidden="true"></i> Đơn hàng: #${orderCode} <button type="button" class="btn btn-sm p-0 color-default mx-2" onclick="CopyText('${orderCode}')" title="Sap chép"> <i class="fa fa-clone"></i> <span style="text-transform:none;font-weight:normal;">Sao chép</span></button> </b>  <a href="/order/view/${orderCode}" class="float-right">Xem đơn hàng</a></p>
                </div>
                ${productItem}
                <div class="total-sec p-2">
                    <ul>
                        <li class="text-primary fw-bolder">Tạm tính <span>${NumberWithCommas(totalPriceOneOrder, ',')}đ</span></li>
                        <li hidden hidden>Giảm giá <span>-${NumberWithCommas(discount, ',')}đ</span></li>
                        <li hidden hidden>Giảm giá thanh toán <span>-${NumberWithCommas(discountPayment, ',')}đ</span></li>
                        <li hidden hidden>Tổng phí vận chuyển <span>${feeShipText}</span></li>
                        <li hidden>Thành tiền <span>${NumberWithCommas(totalPay, ',')}đ</span></li>
                        
                    </ul>
                </div>
                <div class="row">
                     ${htmlQrBanking}
                </div>
            </div>`;/*${ buttonShowBankList }*/
        totalPriceItem += feeShip - discount - discountPayment;
        //let paymentMethod = $('input[type="radio"][name="payment-group"]:checked').val();

        //listOrder.push(
        //    {
        //        id: orderCode,
        //        total: totalPay
        //    },
        //);

        //if (parseInt(paymentMethod) === 2) {
        //    ShowBankPayment2(SUPPLIER_ID_ADMIN, $('#totalMustPay').text(), paymentMethodPercent);
        //} else {
        //    $('#payment_info').hide();
        //    $('#btn_confirm_payment').hide();
        //}
    });
    $('#orderReviewTotalPay').text(NumberWithCommas(totalPriceItem, ',') + 'đ');
    return shopItem;
}

ChangeURLWithOut("Mua hàng", "/checkout/payment");

$(document).ready(function () {

    //Init bootstrap max length
    $(".input-custom").maxlength({
        alwaysShow: !0,
        warningClass: "badge badge-success",
        limitReachedClass: "badge badge-danger"
    });
    //Load cart checked data
    LoadListCart();

    //Run js button place order
    RunJs();

    var defaultAddressJsonString = $('#defaultAddress').val();

    if (!IsNullOrEmty(defaultAddressJsonString) && defaultAddressJsonString != "null")
        addressDefaultData = JSON.parse(defaultAddressJsonString), RawDataAddressInView(addressDefaultData), addressCustomer = defaultAddressJsonString;

    else
        $('#address-location').text('Vui lòng chọn địa chỉ nhận hàng'),
            $('#address-phone').text('...');

    $('#searchAddressShop').on('keyup', function () {
        let value = $(this).val();
        if (timeoutSearch)
            clearTimeout(timeoutSearch);

        timeoutSearch = setTimeout(function () {
            SearchByKeywordInArray(shopAddresData, value);
        }, 800);
    });

    $('#searchAddressShopFilter').on('keyup', function () {
        let value = $(this).val();
        if (timeoutSearch)
            clearTimeout(timeoutSearch);

        timeoutSearch = setTimeout(function () {
            SearchByKeywordInArrayFilter(shopAddresFilterData, value);
        }, 800);
    });

    $('[name="payment-group"]').on('change', function () {
        RefreshTotalPay();
    });

    ScrollToTop(".checkout_payment_wrapper", 0, 500);
});

//Event onclick button place order
function RunJs() {
    try {
        //Button place order
        $btnPlaceOrder.on('click', function () {
            var listId = [];
            var listCartId = [];
            var deliveryPackingList = [];
            $('.deliveryPackingInput').each(function (i) {
                if ($(this).is(':checked')) {
                    deliveryPackingList.push({
                        id: parseInt($(this).val()),
                        supplierCode: $(this).data('id')
                    });
                }
            });

            var type = $('.receiveType.active').data('value');

            //Check choose shiping and handle SequenceShoppingCartItemId
            let feeShip = 0;

            let paymentMethod = $('input[type="radio"][name="payment-group"]:checked').val();
            let deliveryOption = null;
            let isNotChooseShip = [];
            let listDataFeeShip = null;
            let carrierCode = null;
            let carrierId = 0;
            let carrierSupplierObj = "";
            let carrierIdShop = 0;
            let tokenCarrier = null;
            let supplierId = "1";
            //let supplierId = $(`input[name="inputChooseShop"]:checked`).attr("data-id"); //Choose shop delivery;

            let memberjsonObj = GetCookie("memberjsonObj");
            if (!IsNullOrEmty(memberjsonObj)) {
                let memberObj = JSON.parse(memberjsonObj);
                if (IsNullOrEmty(memberObj?.supplierId)) {
                    ShowToastNoti("warning", "Có lỗi trong quá trình tạo đơn", "Hãy tải lại trang"); return false;
                }

                supplierId = memberObj?.supplierId;
            } else {
                ShowToastNoti("warning", "Có lỗi trong quá trình tạo đơn", "Hãy tải lại trang"); return false;
            }

            listProductSelected = [];
            cartItemData.forEach((item, index) => {
                carrierIdShop = 0;

                carrierSupplierObj = listCarrierData?.find(x => x.supplierId == item.id)
                if (carrierSupplierObj != null) {
                    carrierIdShop = carrierSupplierObj?.id
                }

                deliveryOption = IsNullOrEmty($(`[name="delivery_package_${item.code}"]:checked`).attr('data-service-option')) ? '' : $(`[name="delivery_package_${item.code}"]`).attr('data-service-option');
                if ($(`[name="delivery_package_${item.code}"]`).length > 0) {
                    if ($(`[name="delivery_package_${item.code}"]:checked`).length === 0) {
                        isNotChooseShip.push(parseInt(item.code));
                    }
                }

                item.productItem.forEach((value) => { listId.push(`${value.cartId}:${type}:${feeShip}:${paymentMethod}:${carrierIdShop}`); listCartId.push(value.cartId); });

                listProductSelected.push({
                    shopId: item.code,
                    methodPayment: $(`.input_method_payment_${item.code}:checked`).val(),
                })

            });
            var discountAmount = [];
            var member = [];
            var admin = [];
            var lstDicount = [];

            //Function GroupBy
            var groupBy = function (xs, key) {
                return xs.reduce(function (rv, x) {
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, []);
            };

            ////List PromotionGroupBy
            //var listPromotionGroupBy = groupBy(listDiscountSupplier, "supplierId")

            ////Set value for param SequencePromotionCode
            //listPromotionGroupBy.forEach(function (item, key) {
            //    var discount = 0;
            //    item.forEach(function (value) {
            //        discount += value.discount
            //        if (value.isManage == 0) {
            //            member.push({
            //                promotionCode: value.promotionCode,
            //                supplierId: value.supplierId,
            //            });
            //        } else {
            //            admin.push({
            //                promotionCode: value.promotionCode,
            //                supplierId: value.supplierId,
            //            })
            //        }
            //    })

            //    lstDicount.push({
            //        id: key,
            //        discount: discount
            //    })
            //})

            //Set value for param DiscountAmount
            cartItemData.forEach(function (item, key) {
                if (FindItemByKeyValueInArrayObjToGetDiscount(lstDicount, 'id', item.supplierId) != null) {
                    discountAmount.push(FindItemByKeyValueInArrayObjToGetDiscount(lstDicount, 'id', item.supplierId));
                } else {
                    discountAmount.push(0);
                }
            })
            var stringPromotionCode = '';
            cartItemData.forEach(function (item, key) {
                if (FindItemByKeyValueInArrayToGetPromotionCode(member, 'supplierId', item.supplierId) != null && FindItemByKeyValueInArrayToGetPromotionCode(admin, 'supplierId', item.supplierId) != null) {
                    stringPromotionCode += `${FindItemByKeyValueInArrayToGetPromotionCode(member, 'supplierId', item.supplierId)}:${FindItemByKeyValueInArrayToGetPromotionCode(admin, 'supplierId', item.supplierId)},`
                } else if (FindItemByKeyValueInArrayToGetPromotionCode(admin, 'supplierId', item.supplierId) != null) {
                    stringPromotionCode += `:${FindItemByKeyValueInArrayToGetPromotionCode(admin, 'supplierId', item.supplierId)},`
                } else if (FindItemByKeyValueInArrayToGetPromotionCode(member, 'supplierId', item.supplierId) != null) {
                    stringPromotionCode += `${FindItemByKeyValueInArrayToGetPromotionCode(member, 'supplierId', item.supplierId)}:,`
                } else {
                    stringPromotionCode += `:,`
                }
            })

            //Show error message when not choose delivery
            if (isNotChooseShip.length > 0) {
                cartItemData.forEach((item, index) => {
                    if (isNotChooseShip.indexOf(parseInt(item.code)) != -1) {
                        //ScrollToTop(`#zoneShop_${item.code}`, 0, 200);
                        $(`#errorMessageDeliveryOption_${item.code}`).slideDown(200);
                        setTimeout(function () {
                            $(`#errorMessageDeliveryOption_${item.code}`).slideUp(200);
                        }, 2000);
                    }
                });
                cartItemData.every((element, index) => {
                    if (isNotChooseShip.indexOf(parseInt(element.code)) != -1) {
                        ScrollToTop(`#zoneShop_${element.code}`, 0, 200);
                        return false;
                    } else return true;
                });
                return;
            }

            let addressName = $('#addressDeliveryName').val().trim();
            let addressPhone = $('#addressDeliveryPhoneNumber').val().trim();
            let addressLocation = $('#addressDeliveryLocation').val().trim();
            let addressAddressText = $('#addressDeliveryAddressText').val().trim();
            let addressProvinceId = $('#addressDeliveryProvinceId').val();
            let addressDistrictId = $('#addressDeliveryDistrictId').val();
            let addressWardId = $('#addressDeliveryWardId').val();
            /*  var paymentMethodPercent = !isNaN(parseInt($('[name="payment-group"]:checked').data('value'))) ? parseInt($('[name="payment-group"]:checked').data('value')) : 0;*/

            if (listId.length > 0) {
                if (!IsNullOrEmty(addressName) && !IsNullOrEmty(addressLocation) && !IsNullOrEmty(addressPhone)) {
                    let businessCode = $('#BusinessCode').val();
                    let businessName = $('#BusinessName').val();
                    let businessAddress = $('#BusinessAddress').val();
                    if ($('#issueCompanyInvoice').is(':checked')) {//Xuat hoa don cong ty
                        let flagFalse = false;
                        if (IsNullOrEmty(businessAddress)) {
                            ShowToastNoti('warning', '', 'Vui lòng nhập địa chỉ công ty!', 3000);
                            flagFalse = true;
                            $('#BusinessAddress').focus();
                        }
                        if (IsNullOrEmty(businessName)) {
                            ShowToastNoti('warning', '', 'Vui lòng nhập tên công ty!', 3000);
                            flagFalse = true;
                            $('#BusinessName').focus();
                        }
                        if (IsNullOrEmty(businessCode)) {
                            ShowToastNoti('warning', '', 'Vui lòng nhập mã số thuế!', 3000);
                            flagFalse = true;
                            $('#BusinessCode').focus();
                        }
                        if (flagFalse)
                            return false;
                    } else {
                        businessCode = '', businessName = '', businessAddress = '';
                    }

                    var data = {
                        cartItem: JSON.stringify(listId).replace(/"/g, ''),
                        listDataFeeShip: JSON.stringify(listDataFeeShip) ?? "",
                        carrierCode: !IsNullOrEmty(carrierCode) ? carrierCode : "GHN",
                        tokenCarrier: tokenCarrier,
                        feeShip: 0,
                        /*     carrierId: !carrierId == 0 ? carrierId : 2,*/
                        deliveryOption: deliveryOption,
                        name: addressName,
                        phone: addressPhone,
                        address: addressLocation,
                        addressAddressText: addressAddressText,
                        addressProvinceId: addressProvinceId,
                        addressDistrictId: addressDistrictId,
                        addressWardId: addressWardId,
                        paymentMethod: paymentMethod,
                        businessCode: businessCode,
                        businessName: businessName,
                        businessAddress: businessAddress,
                        remark: $('#RemarkOrder').val(),
                        /* paymentPercent: paymentMethodPercent,*/
                    };

                    //if (paymentMethod == 1) {
                    //    if (data.carrierCode == null) {
                    //        ShowToastNoti('warning', '', 'Vui lòng chọn đơn vị giao hàng');
                    //        return false;
                    //    }
                    //}

                    let formData = new FormData();
                    formData.append("SequenceShoppingCartItemId", data.cartItem); //CartID : Type : Feeship
                    formData.append("ReceiverFullName", data.name);
                    formData.append("ReceiverPhoneNumber", data.phone);
                    formData.append("AddressText", data.address);
                    formData.append("AddressIeText", data.addressAddressText);
                    formData.append("ProvinceId", data.addressProvinceId);
                    formData.append("DistrictId", data.addressDistrictId);
                    formData.append("WardId", data.addressWardId);
                    /* formData.append("PaymentId", data.paymentMethod);*/
                    formData.append("CompanyTaxNumber", data.businessCode);
                    formData.append("CompanyName", data.businessName);
                    formData.append("CompanyAddress", data.businessAddress);
                    formData.append("Remark", data.remark);
                    formData.append("FeeShip", data.feeShip); //Không sử dụng
                    /* formData.append("CarrierId", data.carrierId);*/
                    formData.append("DeliveryOption", data.deliveryOption);
                    formData.append("SupplierId", supplierId);

                    formData.append("listDataFeeShip", data.listDataFeeShip); //Không sử dụng
                    formData.append("carrierCode", data.carrierCode);
                    formData.append("tokenCarrier", data.tokenCarrier);

                    formData.append("listCartId", listCartId.toString());
                    formData.append("supplierId", SUPPLIER_ID);
                    formData.append("DiscountAmount", discountAmount);
                    formData.append("SequencePromotionCode", stringPromotionCode.slice(0, -1));
                    /*       formData.append("paymentPercent", data.paymentPercent != NaN ? data.paymentPercent : 100);*/

                    laddaPlaceOrder.start(); $.ajax({
                        type: 'POST',
                        url: '/Checkout/PlaceOrder',
                        data: formData,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        success: function (response) {
                            laddaPlaceOrder.stop();
                            //Check error code
                            if (response.result !== 1) {
                                CheckResponseIsSuccess(response);
                                return;
                            }
                            var listData = response.data;
                            //ShowToastNoti('info', `Đặt thành công ${listData.length} trong ${cartItemData.length} đơn hàng`, '', 3000);
                            ShowToastNoti('success', `Đặt hàng thành công`, 'Chúng tôi sẽ liên hệ bạn trong thời gian sớm nhất', 9000);

                            document.getElementById("listOrderItem").innerHTML = orderReviewHtml(cartItemData, listData);
                            $("html, body").animate({
                                scrollTop: 0
                            }, 0);
                            $('.orderConfirm').fadeOut(300).remove().delay(100);
                            $('.orderSuccess').fadeIn(300);
                            CountShoppingCartItem();
                        },
                        error: function (err) {
                            laddaPlaceOrder.stop();
                            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                        }
                    });

                } else {
                    ShowToastNoti('warning', '', 'Vui lòng chọn địa chỉ nhận hàng');
                }
            } else {
                ShowToastNoti('info', '', 'Không có sản phẩm nào được chọn. Vui lòng chọn sản phẩm ở giỏ hàng', 5000);
            }
        });
    } catch (e) {
        ShowToastNoti('error', 'ERROR', 'Có lỗi trong quá trình xử lý, vui lòng liên hệ kỹ thuật.', 5000);
    }
}

function LoadFeeShippAllOrder() {
    $.each(cartItemData, function (key, value) {
        OnChangeCarrier(`#select-carrier-${value.code}`, value.code, value.id);
    });
}

function OnChangeCarrier(elm, key, supplierId, shopCode) {
    let selectId = $(elm).val();
    if (selectId > 0) {
        var supplierCount = key;
        //if (selectId == 0) {
        //    $('#deliveryOptionZone_' + supplierCount).html(noChooseShip);
        //    swal.fire('Không thể tính phí vận chuyển!', 'Lưu ý: Phí vận chuyển sẽ được tính sau khi shipper vận đơn đến!', 'info')
        //    try {
        //        if (xhrGetFeeShip_GHTK) {
        //            xhrGetFeeShip_GHTK.abort();
        //            $btnPlaceOrder.attr('disabled', false);
        //            LoadTotalFeeShip();
        //        }
        //    } catch (e) {
        //        console.log('abort err: ' + e.message);
        //    }
        //    return;
        //}
        let findObj = listCarrierData.find(x => x.id == selectId);

        if (findObj == undefined) {
            $('#select-carrier-' + supplierCount).remove();
            $('#deliveryOptionZone_' + supplierCount).html(noneShopConnectShipping);
            return;
        }
        let carrierCode = findObj.carrierObj?.carrierCode;
        let token = findObj.token;
        let shopId = findObj.shopCode; //id shop GHN
        /*    GetAddressGHN(token, key, shopId, findObj.carrierId, shopCode);*/
        switch (carrierCode) {
            case 'GHTK': GetFeeShipGHTK(token, supplierCount, supplierId, findObj.carrierId); break;
            case 'GHN': GetAddressGHN(token, shopId, findObj.carrierId); break;
            default: $('#select-carrier-' + supplierCount).remove(); $('#deliveryOptionZone_' + supplierCount).html(noneShopConnectShipping);
                break;
        }
    }
    else {
        $(`#deliveryOptionZone_${key}`).html(noneShopConnectShipping);
        $(`#input_${key}_2`).attr("disabled", true)
    }
}

function LoadQrBankingAllOrder() {
    $.each(cartItemData, function (key, item) {
        $.ajax({
            type: 'POST',
            url: '/Checkout/GetListBankSupplier',
            data: {
                id: item.supplierId,
            },
            success: function (response) {
                if (response.result == -1 || response.data == null) {
                    CheckResponseIsSuccess(response);
                    return false;
                }
                listSupplierBanking = response.data
            },
            error: function (err) {
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    });
}

//function RawUIDeliveryOption(isRefresh, shopId, carrierId, arr, funcReload = "") {

//    if (isRefresh === 1) {
//        HideOverlay('#zoneCart')
//        $('#deliveryOptionZone_' + shopId).html('<p class="text-center">Đang tải...</p>');
//        LoadTotalFeeShip();
//        return;
//    }
//    let carrierCode = listCarrierData.find(x => x.id == carrierId)?.carrierObj?.carrierCode;

//    let html = '';
//    if (arr != null && arr.length > 0) {
//        $(`#review_fee_ship_${shopId}`).html(NumberWithCommas(arr[0].fee, ','))
//        arr.forEach(function (item, index) {
//            html +=
//                `${index === 0 ? '<p class="mb-2 color-default">GHN - Giao Hàng Nhanh</p><p><img style="width: 91px;" src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Slogan-En.png"></p>' : ''}
//                <input class="checkbox-tools deliveryPackingInput" onclick="LoadTotalFeeShip()" type="radio" name="delivery_package_${shopId}" data-id="${shopId}" data-carrierid="${carrierId}" data-carrier-code="${carrierCode}" data-service-option="${item.serviceOption}" value="${item.fee}" id="delivery_${shopId}_${index}" />
//                <label class="for-checkbox-tools" for="delivery_${shopId}_${index}">
//                    ${!IsNullOrEmty(item.name) ? `<b>${item.name}</b> <br />` : `<b>${item.short_name}</b> <br />`}
//                    ${!IsNullOrEmty(item.fee) ? `<span id="span_fee_ship_${shopId}">${NumberWithCommas(item.fee, ',')}đ</span> <br />` : ""}
//                     ${!IsNullOrEmty(item.deliveryDate) ? `<span>${item.deliveryDate}</span>` : ""}
//                </label>`;
//        });
//    } else {
//        html = `<p class="text-center">Không có dữ liệu. <a href="javascript:void(0)" onclick="${funcReload}">Tải lại...</a></p>`;
//    }

//    $('#deliveryOptionZone_' + shopId).html(html)
//    $('#deliveryOptionZone_' + shopId).fadeTo("fast", 1);
//    TotalMustPay();
//    HideOverlay('#zoneCart')
//    $(`#delivery_${shopId}_0`).click(); // Choose first option delivery
//    $btnPlaceOrder.attr('disabled', false);
//    LoadTotalFeeShip();
//}

function RawUIDeliveryOption(isRefresh, shopId, carrierId, arr, funcReload = "") {
    if (isRefresh === 1) {
        $('#deliveryOptionZone_' + shopId).html('<p class="text-center">Đang tải...</p>');
        LoadTotalFeeShip();
        return;
    }
    let carrierCode = listCarrierData.find(x => x.id == carrierId)?.carrierObj?.carrierCode;
    let html = '';
    if (arr != null && arr.length > 0) {
        $(`#review_fee_ship_${shopId}`).html(NumberWithCommas(arr[0].fee, ','))
        arr.forEach(function (item, index) {
            html +=
                `${index === 0 ? '<p class="mb-2 color-default">Chọn phương thức vận chuyển</p>' : ''}
                <input class="checkbox-tools deliveryPackingInput" onclick="LoadTotalFeeShip()" type="radio" name="delivery_package_${shopId}" data-id="${shopId}" data-carrierid="${carrierId}" data-carrier-code="${carrierCode}" data-service-option="${item.serviceOption}" value="${item.fee}" id="delivery_${shopId}_${index}" />
                <label class="for-checkbox-tools" for="delivery_${shopId}_${index}">
                    <b>${item.name}</b> <br />
                    <span>${NumberWithCommas(item.fee, ',')}đ</span> <br />
                    <span>${item.deliveryDate}</span>
                </label>`;
        });
    } else {
        html = `<p class="text-center">Không có dữ liệu. <a href="javascript:void(0)" onclick="${funcReload}">Tải lại...</a></p>`;
    }
    $('#deliveryOptionZone_' + shopId).html(html);
    $(`#delivery_${shopId}_0`).click(); // Choose first option delivery
    TotalMustPay()
    $btnPlaceOrder.attr('disabled', false);
    HideOverlay('#zoneCart')
    LoadTotalFeeShip();
}

function GetFeeShipGHTK(token, shopId, supplierId, carrierId) {
    let data = ParamFeeShipGHTK(token, supplierId, carrierId);

    if (data == null) return false;

    try {
        if (xhrGetFeeShip_GHTK) {
            xhrGetFeeShip_GHTK.abort();
        }
    } catch (e) {
        console.log('abort err: ' + e.message);
    }
    RawUIDeliveryOption(1, shopId, carrierId, []);
    $btnPlaceOrder.attr('disabled', 'disabled');
    xhrGetFeeShip_GHTK = $.ajax({
        type: "GET",
        url: "/Checkout/GetFeeShip_GHTK",
        data: data,
        dataType: 'json',
        success: function (response) {
            $btnPlaceOrder.attr('disabled', false);
            if (response.result != 1) {
                RawUIDeliveryOption(0, shopId, carrierId, [], `GetFeeShipGHTK('${token}', ${shopId}, '${supplierId}', ${carrierId})`);
                CheckResponseIsSuccess(response);
                return;
            }
            if (!response.data.delivery) {
                $('#deliveryOptionZone_' + shopId).html('<p class="text-center">GTHK chưa hỗ trợ giao đến khu vực này.</p>');
                return false;
            }

            let arr = [
                {
                    name: "Tiêu chuẩn",
                    serviceOption: "none",
                    fee: response.data.fee,
                    deliveryDate: ""
                }
            ];
            RawUIDeliveryOption(0, shopId, carrierId, arr);
        },
        error: function (err) {
            $btnPlaceOrder.attr('disabled', false);
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function ParamFeeShipGHTK(token, supplierId, carrierId) {
    let cartItem = cartItemData.find(x => x.id == supplierId);
    let totalWeight = cartItem.productItem.map(function (i) {
        return parseFloat((i.productPriceObj.weight ?? 0) * i.quantity);
    }).reduce((a, b) => a + b, 0);
    let totalPrice = cartItem.productItem.map(function (i) {
        return (i.productPriceObj.priceOut - (i.productPriceObj.discount != null ? i.productPriceObj.discount : 0)) * i.quantity;
    }).reduce((a, b) => a + b, 0);
    var pickAddressObj = cartItem.addressObj;
    if (!IsNullOrEmty(pickAddressObj)) {
        pickAddressObj = JSON.parse(pickAddressObj);
    }
    let tags = [];
    cartItem.productItem.map(function (i) {
        if (i.feeTagProductObjs != null && i.feeTagProductObjs.length > 0) {
            i.feeTagProductObjs.forEach(function (item) {
                if (item.feeTagsObj.carrierId === parseInt(carrierId) && tags.indexOf(parseInt(item.feeTagsObj.tagValue)) === -1) {
                    tags.push(parseInt(item.feeTagsObj.tagValue));
                }
            });
        }
    });

    if (IsNullOrEmty($('#addressDeliveryProvinceName').val())) {
        swal.fire('Không thể tính phí vận chuyển!', 'Vui lòng nhập địa chỉ', 'info')
        return null;
    }

    if (totalWeight > MAX_TOTAL_WEIGHT_DELIVERY_GHTK) {
        ShowToastNoti('warning', 'Đơn hàng vượt quá khối lượng tối đa của GHTK', `Khối lượng ước tính của đơn hàng: ${totalWeight}kg<br/>Khối lượng tối đa của GHTK: ${MAX_TOTAL_WEIGHT_DELIVERY_GHTK}kg`, 5000);
        $btnPlaceOrder.attr('disabled', 'disabled');
        return null;
    }

    if (totalPrice > MAX_COST_DELIVERY_GHTK) {
        ShowToastNoti('warning', 'Đơn hàng vượt quá số tiền tối đa của GHTK', `Tiền hàng của bạn: ${NumberWithCommas(totalPrice, ',')}đ<br/>Tiền hàng tối đa của GHTK: ${NumberWithCommas(MAX_COST_DELIVERY_GHTK, ',')}đ`, 5000);
        $btnPlaceOrder.attr('disabled', 'disabled');
        return null;
    }
    let data = {
        token: token,
        pick_address_id: '',
        pick_address: IsNullOrEmty(pickAddressObj.addressText) ? "" : pickAddressObj.addressText,
        pick_province: IsNullOrEmty(pickAddressObj.provinceObj?.name) ? "" : pickAddressObj.provinceObj?.name,
        pick_district: IsNullOrEmty(pickAddressObj.districtObj?.name) ? "" : pickAddressObj.districtObj?.name,
        pick_ward: IsNullOrEmty(pickAddressObj.wardObj?.name) ? "" : pickAddressObj.wardObj?.name,
        address: $('#addressDeliveryAddressText').val(),
        province: $('#addressDeliveryProvinceName').val(),
        district: $('#addressDeliveryDistrictName').val(),
        ward: $('#addressDeliveryWardName').val(),
        weight: totalWeight * 1000, //Gram
        value: totalPrice,
        transport: "road", //road,fly
        deliver_option: 'none', //xteam,none
        tagsString: JSON.stringify(tags),
    };
    return data;
}

//Load list cart
function LoadListCart() {
    $btnPlaceOrder.attr('disabled', true);
    var listItem = $('#listCartItemSelected').val();
    try {
        ShowOverlayLoadingButton('#zoneCart');
        $.ajax({
            type: 'GET',
            url: '/Checkout/GetCartSelectData',
            data: {
                listItem: listItem
            },
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton('#zoneCart');
                //Fail link
                if (response.result === -1) {
                    switch (response.code) {
                        case -1: location.href = "/checkout/cart"; break;
                        case 408: LogoutJs(() => location.reload()); break;
                        default: break;
                    }
                    return;
                }

                //Check error code
                if (response.result !== 1) {
                    document.getElementById("zoneCart").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListCart();$(this).remove();">
                        </i>
                    </div>`;
                    $btnPlaceOrder.attr('disabled', 'disabled');
                    return;
                }

                //Success
                cartItemData = response.data;
                listCarrierData = response.data2nd;
                if (cartItemData != null && cartItemData.length > 0) {
                    LoadQrBankingAllOrder();
                    setTimeout(function myfunction() {
                        var htmlShoppingCart = tableDataHtml();
                        $('#zoneCart').html(htmlShoppingCart)
                        $btnPlaceOrder.attr('disabled', false);
                        TotalMustPay();
                    }, 300)


                    //cartItemData.forEach(function (itemCart, key) {
                    //    var idOrderItem = itemCart.code;

                    //    /*     ShowOverlay('#zoneCart');*/

                    //    //$(`#select-carrier-${idOrderItem} option`).each(function (key2, option) {
                    //    //    if (option.innerHTML == "GHN - Giao hàng nhanh") {
                    //    //        $(`#select-carrier-${idOrderItem}`).hide();
                    //    //        $(this).prop("selected", true);
                    //    //        $(`#select-carrier-${idOrderItem}`).trigger('change');
                    //    //    }
                    //    //    else {
                    //    //        HideOverlay('#zoneCart')
                    //    //    }
                    //    //})
                    //    HideOverlay('#zoneCart')
                    //})
                }
                else
                    NoneRecord();
            },
            error: function (error) {
                HideOverlayLoadingButton('#zoneCart');
                document.getElementById("zoneCart").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListCart();$(this).remove();">
                        </i>
                    </div>`;
                $btnPlaceOrder.attr('disabled', 'disabled');
            }
        });
    } catch (e) {
        HideOverlayLoadingButton('#zoneCart');
        document.getElementById("zoneCart").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListCart();$(this).remove();">
                        </i>
                    </div>`;
        $btnPlaceOrder.attr('disabled', 'disabled');
    }
}

function TotalMustPay() {
    cartItemData.forEach(function (item, key) {
        var shopCode = item.code;
        var totalOrder = parseInt($(`#order_total_${shopCode}`).html().replace(/,/g, "") > 0 ? $(`#order_total_${shopCode}`).html().replace(/,/g, "") : 0);
        var feeShip = parseInt($(`#review_fee_ship_${shopCode}`).html().replace(/,/g, "") > 0 ? $(`#review_fee_ship_${shopCode}`).html().replace(/,/g, "") : 0);
        var discountMoney = parseInt($(`#discount_${shopCode}`).html().replace(/,/g, "") > 0 ? $(`#discount_${shopCode}`).html().replace(/,/g, "") : 0);
        $(`#total_${shopCode}`).html(NumberWithCommas(feeShip + totalOrder - discountMoney, ','))
    });
}

//Show address list modal
function ShowAddressListModal(elm) {
    var htmlElm = $(elm).html();
    $(elm).attr('onclick', '');
    $(elm).html(_loadAnimationSmallHtml);
    $.ajax({
        type: 'GET',
        url: '/Address/GetListDeliveryAddress',
        success: function (response) {
            $(elm).html(htmlElm);
            $(elm).attr('onclick', 'ShowAddressListModal(this)');
            //Check error code
            if (response.result !== 1) {
                CheckResponseIsSuccess(response);
                return;
            }

            addressListData = response.data;
            var tmpHtml = ``;
            let addressTmp = '';
            let typeTmp = '';
            if (addressListData != null && addressListData.length > 0) {
                $.each(addressListData, function (key, value) {
                    switch (value.typeId) {
                        case 0: typeTmp = 'Khác'; break;
                        case 1: typeTmp = 'Nhà riêng'; break;
                        case 2: typeTmp = 'Văn phòng'; break;
                        default: break;
                    }
                    addressTmp = `${value.addressText}, ${value.wardName}, ${value.districtName}, ${value.provinceName}`;
                    tmpHtml +=
                        `<tr>
                            <td class="col-2"><label for="addressList_${value.id}">${value.name}</label></td>
                            <td class="col-5">
                                <label style="text-align:left;" for="addressList_${value.id}">
                                    ${addressTmp}
                                </label>
                            </td>
                            <td class="col-2"><label for="addressList_${value.id}">${value.phoneNumber}</label></td>
                            <td class="col-2">
                                <label for="addressList_${value.id}"><small>${typeTmp}<small></label>
                            </td>
                            <td class="col-1">
                                <div class=" d-flex align-items-center">
                                    <input type="radio" name="addressList" id="addressList_${value.id}" value="${value.id}" ${addressDefaultData != null && value.id === addressDefaultData.id ? "checked" : ""} />
                                    <label for="addressList_${value.id}"> </label>
                                </div>
                            </td>
                        </tr>`;
                });
                document.getElementById("addressList-body").innerHTML = tmpHtml;
            }
            else {
                document.getElementById("addressList-body").innerHTML =
                    `<tr>
                        <td colspan="4" class="text-center p-2">
                            Sổ địa chỉ của bạn chưa có dữ liệu. Hãy thêm địa chỉ mới.
                        </td>
                    </tr>`;
            }
            $('#addressListModal').modal('show');
        },
        error: function (err) {
            $(elm).html(htmlElm);
            $(elm).attr('onclick', 'ShowAddressListModal(this)');
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

//Save address info
function SaveAddressInfo() {
    var addressId = $('#addressListTable input[name="addressList"]:checked').val();
    addressDefaultData = addressListData.find(x => x.id == addressId);
    if (addressId == undefined || addressId == null)
        ShowToastNoti('info', '', 'Vui lòng chọn địa chỉ nhận hàng');
    else
        RawDataAddressInView(addressDefaultData), $('#addressListModal').modal('hide'), LoadFeeShippAllOrder();

    LoadListSupplier();
}

//Show add address modal
function ShowAddAddressModal(elm) {
    var htmlElm = $(elm).html();
    $(elm).attr('onclick', '');
    $(elm).html(_loadAnimationSmallHtml);
    $.ajax({
        type: 'GET',
        url: '/Checkout/P_AddAddress',
        success: function (response) {
            $(elm).html(htmlElm);
            $(elm).attr('onclick', 'ShowAddAddressModal(this)');
            $('#divAddAddress').html(response);
            $('#addressAddModal').modal('show');
            $('#addressListModal').modal('hide');
            $('.selectpicker').selectpicker();

            //Submit form event
            $('#form_data_add_address').on('submit', function (e) {
                e.preventDefault();
                let formElm = $('#form_data_add_address');
                var laddaSubmitFormAddress = Ladda.create($(this).find('button[type="submit"]')[0]);
                let formDataElm = document.getElementById('form_data_add_address');
                let isvalidate = formElm[0].checkValidity();
                let formData = new FormData(formDataElm);
                var validateDropdown = ValidateDropDownAddress(formDataElm.elements);
                let isAddNew = $(formDataElm.elements.isAddNew).is(":checked");
                var data = {
                    name: formDataElm.elements.name.value,
                    phoneNumber: formDataElm.elements.phoneNumber.value,
                    addressText: formDataElm.elements.addressText.value,
                    provinceId: (formDataElm.elements.provinceId).value,
                    districtId: (formDataElm.elements.districtId).value,
                    wardId: (formDataElm.elements.wardId).value,
                    provinceName: $(formDataElm.elements.provinceId).find('option:selected').text(),
                    districtName: $(formDataElm.elements.districtId).find('option:selected').text(),
                    wardName: $(formDataElm.elements.wardId).find('option:selected').text()
                };
                if (isvalidate && validateDropdown) {
                    if (isAddNew) {
                        laddaSubmitFormAddress.start();
                        $.ajax({
                            url: formElm.attr('action'),
                            type: formElm.attr('method'),
                            data: formData,
                            contentType: false,
                            processData: false,
                            success: function (response) {
                                laddaSubmitFormAddress.stop();
                                //Check error code
                                if (response.result !== 1) {
                                    CheckResponseIsSuccess(response);
                                    return;
                                }

                                addressDefaultData = {
                                    id: response.data.id,
                                    isDefault: response.data.isDefault,
                                    typeId: response.data.typeId,
                                    name: formDataElm.elements.name.value,
                                    phoneNumber: formDataElm.elements.phoneNumber.value,
                                    addressText: formDataElm.elements.addressText.value,
                                    provinceId: (formDataElm.elements.provinceId).value,
                                    districtId: (formDataElm.elements.districtId).value,
                                    wardId: (formDataElm.elements.wardId).value,
                                    provinceName: $(formDataElm.elements.provinceId).find('option:selected').text(),
                                    districtName: $(formDataElm.elements.districtId).find('option:selected').text(),
                                    wardName: $(formDataElm.elements.wardId).find('option:selected').text()
                                };
                                RawDataAddressInView(addressDefaultData);
                                $('#addressAddModal').modal('hide');
                                LoadFeeShippAllOrder();
                                LoadListSupplier();
                            }, error: function (err) {
                                laddaSubmitFormAddress.stop();
                                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                            }
                        });
                    }
                    else {
                        RawDataAddressInView(data);
                        $('#addressAddModal').modal('hide');
                        LoadFeeShippAllOrder();
                        LoadListSupplier();
                    }

                } else {
                    ShowToastNoti('info', '', _resultActionResource.PleaseWrite);
                }
            });
        },
        error: function (err) {
            $(elm).html(htmlElm);
            $(elm).attr('onclick', 'ShowAddAddressModal(this)');
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
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
            //Check error code
            if (response.result !== 1) {
                CheckResponseIsSuccess(response);
                return;
            }

            var listData = response.data;
            var itemBank = ``;
            let resultHtml = '';
            if (listData != null && listData.length > 0) {
                $.each(listData, function (key, value) {
                    itemBank +=
                        `<div class="col-12 col-md-6 col-lg-6 mb-2">
                            <ul class="list-group text-left">
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
                                <li class="list-group-item"><i class="fa fa-info-circle mr-1" aria-hidden="true"></i> <span>Nội dung: </span>${orderId}</li>
                            </ul>
                        </div>`;
                });
                resultHtml =
                    `<h5 class="font-weight-bold text-center text-success text-uppercase"><i class="fa fa-credit-card h4"></i> Thông tin thanh toán</h5>
                        <p class="text-center mb-0">
                            <b>Số tiền: </b>${totalPay}
                        </p>
                        <p class="text-center">
                            <b>Nội dung chuyển khoản: </b><span>TT GEMSGROUP ${orderId}</span>
                            <button type="button" class="btn btn-sm p-0 color-default" onclick="CopyText('TT GEMSGROUP ${orderId}')" title="Sap chép">
                                <i class="fa fa-clone"></i> <span style="text-transform:none;font-weight:normal;">Sao chép</span>
                            </button>
                        </p>
                        <div class="row justify-content-center">
                            ${itemBank}
                        </div>`
                document.getElementById("divBankList").innerHTML = resultHtml;
                $('#bankListModal').modal('show');
            } else {
                ShowToastNoti('warning', '', 'Shop chưa có thông tin chuyển khoản');
            }
        }, error: function (err) {
            laddaGetBank.stop();
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

//Show bank payment
function ShowBankPayment2(id, totalPay, ratio) {
    ShowOverlay('#payment_info');
    ratio = 100;
    $.ajax({
        type: 'GET',
        url: '/Checkout/GetBankList',
        data: { id: id },
        success: function (response) {
            HideOverlay('#payment_info');
            //Check error code
            if (response.result !== 1) {
                CheckResponseIsSuccess(response);
                $('#payment_info').html(`<p class="text-center"><a href="javascript:void(0)" class="h4" onclick="ShowBankPayment2(${id}, ${totalPay}, ${ratio})">Xem thông tin thanh toán</a></p>`);
                return;
            }

            var listData = response.data;
            var itemBank = ``;
            //itemBank +=
            //    `<div class="col-12 col-md-6 col-lg-6 mb-3">
            //        <ul class="list-group text-left">
            //            <li class="list-group-item text-center"><img src="https://api.qrcode-monkey.com/tmp/02d53fe5897c87dce4e9c51751adc439.svg?1670039361109" width="80" height="80" alt="Momo" /></li>
            //            <li class="list-group-item">
            //                <i class="fa fa-id-card-o mr-1"></i> <span>
            //                    Số tài khoản:
            //                </span>.....
            //                <button type="button" class="btn btn-sm p-0 color-default" onclick="CopyText('${111111111}')" title="Sap chép">
            //                        <i class="fa fa-clone"></i> <span style="text-transform:none;font-weight:normal;">Sao chép</span>
            //                </button>
            //            </li>
            //            <li class="list-group-item"><i class="fa fa-user mr-1"></i> <span>Tên người nhận: </span>GEMS GROUP</li>
            //            <li class="list-group-item"><i class="fa fa-bank mr-1"></i> <span>Đơn vị: </span><img src="/img/MoMo_Logo.png" height="30" alt="Momo" /> Momo</li>
            //        </ul>
            //    </div>`;
            //itemBank +=
            //    `<div class="col-12 col-md-6 col-lg-6 mb-3">
            //        <ul class="list-group text-left">
            //            <li class="list-group-item text-center"><img src="https://api.qrcode-monkey.com/tmp/02d53fe5897c87dce4e9c51751adc439.svg?1670039361109" width="80" height="80" alt="ZaloPay" /></li>
            //            <li class="list-group-item">
            //                <i class="fa fa-id-card-o mr-1"></i> <span>
            //                    Số tài khoản:
            //                </span>.....
            //                <button type="button" class="btn btn-sm p-0 color-default" onclick="CopyText('${111111111}')" title="Sap chép">
            //                        <i class="fa fa-clone"></i> <span style="text-transform:none;font-weight:normal;">Sao chép</span>
            //                </button>
            //            </li>
            //            <li class="list-group-item"><i class="fa fa-user mr-1"></i> <span>Tên người nhận: </span>GEMS GROUP</li>
            //            <li class="list-group-item"><i class="fa fa-bank mr-1"></i> <span>Đơn vị: </span><img src="/img/ZaloPay_Logo.png" height="30" alt="ZaloPay" /> ZaloPay</li>
            //        </ul>
            //    </div>`;
            let resultHtml = '';
            let htmlOrderBanking = '';
            if (listData != null && listData.length > 0) {
                $.each(listData, function (key, value) {
                    itemBank +=
                        `<div class="col-12 col-md-6 col-lg-6 mb-3">
                            <ul class="list-group text-left">
                                <li class="list-group-item">
                                    <i class="fa fa-id-card-o mr-1"></i> <span>
                                        Số tài khoản:
                                    </span>${NumberWithCommas(value.number, ',')}
                                    <button type="button" class="btn btn-sm p-0 color-default" onclick="CopyText('${value.number}')" title="Sap chép">

                                <i class="fa fa-clone"></i> <span style="text-transform:none;font-weight:normal;">Sao chép</span>
                                    </button>
                                </li>
                                <li class="list-group-item"><i class="fa fa-user mr-1"></i> <span>Tên người nhận: </span>${value.personName}</li>
                                <li class="list-group-item"><i class="fa fa-bank mr-1"></i> <span>Ngân hàng: </span>${value.bankName} - ${value.bankTradeName}</li>
                                <li class="list-group-item"><i class="fa fa-bank mr-1"></i> <span>Nội dung: </span>TT GEMSGROUP ${item.id}</li>
                            </ul>
                        </div>`;
                });
            } else {
                /* ShowToastNoti('warning', '', 'Shop chưa có thông tin chuyển khoản');*/
            }
            if (listOrder != null && listOrder.length > 0) {
                listOrder.forEach(function (item, key) {
                    htmlOrderBanking += `
                      <p class="text-center mb-0">
                        <b>Số tiền: </b>${item.total}
                      </p>
                      <p class="text-center">
                          <b>Nội dung chuyển khoản: </b><span>TT GEMSGROUP ${item.id}</span>
                          <button type="button" class="btn btn-sm p-0 color-default" onclick="CopyText('TT GEMSGROUP ${item.id}')" title="Sap chép">
                              <i class="fa fa-clone"></i> <span style="text-transform:none;font-weight:normal;">Sao chép</span>
                          </button>
                      </p>
                    `
                })
            }

            resultHtml =
                `<h5 class="font-weight-bold text-center text-success text-uppercase"><i class="fa fa-credit-card h4"></i> Thông tin thanh toán</h5>
                
                ${htmlOrderBanking}
              
                <div class="row justify-content-center">
                    ${itemBank}
                </div>
                <div class="row justify-content-center overflow-hidden">
                    <div class="col-12 col-md-6 text-center">
                        <img src="/img/banking_new_DGP.jpg" class="w-100" />
                        <a href="/img/banking_new_DGP.jpg" download="QrCodeThanhToanOcop247.jpg" style="font-size: 18px;text-decoration: underline;">Tải ảnh</a>
                    </div>
                </div>
                <div class="pt-2 pb-2" style="color: #FF6600;">
                    <p class="mb-0" style="font-weight: bold;">Hướng dẫn thanh toán:</p>✻ Sao chép <b>Số tài khoản</b> và <b>Nội dung chuyển khoản</b>. Mở ứng dụng ngân hàng của bạn, chọn chuyển tiền và chọn ngân hàng cần chuyển, dán các nội dung đã sao chép vào đúng vị trí, tiến hành thanh toán.
                    <br/>✻ Hoặc quét, tải về ảnh QrCode thông tin tài khoản để sử dụng tiện ích thanh toán scan QrCode trên ứng dụng Ngân Hàng và sao chép nội dung chuyển khoản tiến hành thanh toán.
                    <br/> <i class="text-info">✻Nếu bạn có nhiều đơn hàng, vui lòng chuyển khoản từng đơn bạn nhé !</i>
                </div>`;
            document.getElementById("payment_info").innerHTML = resultHtml;
            $('#btn_confirm_payment').show();
        }, error: function (err) {
            HideOverlay('#payment_info');
            $('#payment_info').html(`<p class="text-center"><a href="javascript:void(0)" class="h4" onclick="ShowBankPayment2(${id}, ${orderId}, ${totalPay}, ${ratio})">Xem thông tin thanh toán</a></p>`);
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

//Raw data address in view
function RawDataAddressInView(data) {
    var location = `${data.addressText}, ${data.wardName}, ${data.districtName}, ${data.provinceName}`;
    $('#address-name').text(data.name);
    $('#address-phone').text(data.phoneNumber);
    $('#address-location').text(location);
    $('#address-location').attr('data-province', data.provinceId);
    $('#address-location').attr('data-district', data.districtName);
    $('#address-location').attr('data-ward', data.wardName);
    $('#addressDeliveryName').val(data.name);
    $('#addressDeliveryPhoneNumber').val(data.phoneNumber);
    $('#addressDeliveryLocation').val(location);
    $('#addressDeliveryAddressText').val(data.addressText);
    $('#addressDeliveryProvinceId').val(data.provinceId);
    $('#addressDeliveryDistrictId').val(data.districtId);
    $('#addressDeliveryWardId').val(data.wardId);
    $('#addressDeliveryProvinceName').val(data.provinceName);
    $('#addressDeliveryDistrictName').val(data.districtName);
    $('#addressDeliveryWardName').val(data.wardName);
    //GetShopAddressNear('#typeShop');
}

//Check validate dropdown
function ValidateDropDownAddress(elmForm) {
    var isValid = true;
    var $name = $('#parsley-id-name');
    var $phonenumber = $('#parsley-id-phonenumber');
    var $addresstext = $('#parsley-id-addresstext');
    var $province = $('#parsley-id-province');
    var $district = $('#parsley-id-district');
    var $ward = $('#parsley-id-ward');

    $('#form_data_add_address #name').on('keyup', function () {
        let value = $(this).val();
        CheckRequired($name, value)
    });
    $('#form_data_add_address #phoneNumber').on('keyup', function () {
        let value = $(this).val();
        if (!IsNullOrEmty(value)) {
            if (!/^[0-9]{3,12}$/.test(value))
                $($phonenumber.find('li')[1]).css('display', 'block')
            else
                $($phonenumber.find('li')[1]).css('display', 'none');
            $($phonenumber.find('li')[0]).css('display', 'none');
        } else
            $($phonenumber.find('li')[0]).css('display', 'block'), $($phonenumber.find('li')[1]).css('display', 'none');
    });
    $('#form_data_add_address #addressText').on('keyup', function () {
        let value = $(this).val();
        CheckRequired($addresstext, value);
    });
    $('#form_data_add_address #provinceId').on('change', function () {
        let value = $(this).val();
        CheckRequired($province, value);
        setTimeout(function () {
            let district = $('#form_data_add_address #districtId');
            let ward = $('#form_data_add_address #wardId')
            CheckRequired($district, district.val());
            CheckRequired($ward, ward.val());
        }, 200);
    });
    $('#form_data_add_address #districtId').on('change', function () {
        let value = $(this).val();
        CheckRequired($district, value);
        setTimeout(function () {
            let ward = $('#form_data_add_address #wardId');
            CheckRequired($ward, ward.val());
        }, 200);
    });
    //$('#form_data_add_address #WardId').on('change', function () {
    //    let value = $(this).val();
    //    CheckRequired($ward, value);
    //});

    if (!CheckRequired($name, elmForm.name.value)) isValid = false;
    if (!CheckRequired($addresstext, elmForm.addressText.value)) isValid = false;
    if (!CheckRequired($province, elmForm.provinceId.value)) isValid = false;
    if (!CheckRequired($district, elmForm.districtId.value)) isValid = false;
    //if (!CheckRequired($ward, elmForm.WardId.value)) isValid = false;

    if (!IsNullOrEmty(elmForm.phoneNumber.value)) {
        if (!/^[0-9]{3,12}$/.test(elmForm.phoneNumber.value))
            $($phonenumber.find('li')[1]).css('display', 'block'), isValid = false;
        else
            $($phonenumber.find('li')[1]).css('display', 'none');
        $($phonenumber.find('li')[0]).css('display', 'none');
    } else
        $($phonenumber.find('li')[0]).css('display', 'block'), $($phonenumber.find('li')[1]).css('display', 'none'), isValid = false;

    return isValid;
}

//Check required value
function CheckRequired(elmError, value) {
    let isValid = true;
    if (IsNullOrEmty(value))
        elmError.css('display', 'block'), isValid = false;
    else
        elmError.css('display', 'none');
    return isValid;
}

//On change province form
function OnChangeProvinceFormEvent(elm, formId) {
    var currentVal = $(elm).val();
    let formElement = document.getElementById(formId).elements;
    if (parseInt(currentVal) === 0) {
        $(formElement.districtId).html('');
        $(formElement.districtId).attr('disabled', true);
        $(formElement.districtId).selectpicker("refresh");
        $(formElement.wardId).html('');
        $(formElement.wardId).attr('disabled', true);
        $(formElement.wardId).selectpicker("refresh");
    } else {
        ShowOverlay3Dot('#div_zone_district');
        $.ajax({
            type: 'GET',
            url: '/Address/GetListDistrictOptionHtml',
            data: {
                id: currentVal
            },
            dataType: 'json',
            success: function (response) {
                HideOverlay3Dot('#div_zone_district');
                if (!CheckResponseIsSuccess(response)) return false;
                if (IsNullOrEmty(response.data))
                    response = '<option value="0">Không có dữ liệu...</option>';
                $(formElement.wardId).html('');
                $(formElement.wardId).attr('disabled', true);
                $(formElement.wardId).selectpicker("refresh");
                $(formElement.districtId).html('<option value="0">--Chọn--</option>' + response.data);
                $(formElement.districtId).attr('disabled', false);
                $(formElement.districtId).selectpicker("refresh");
                let firstOption = $(formElement.districtId).children('option:not(.bs-title-option)').eq(0).val();
                $(formElement.districtId).selectpicker('val', firstOption);
            },
            error: function (err) {
                HideOverlay3Dot('#div_zone_district');
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    }
}

//On change district form
function OnChangeDistrictFormEvent(elm, formId) {
    var currentVal = $(elm).val();
    let formElement = document.getElementById(formId).elements;
    if (parseInt(currentVal) === 0) {
        $(formElement.wardId).html('');
        $(formElement.wardId).attr('disabled', true);
        $(formElement.wardId).selectpicker("refresh");
    } else {
        ShowOverlay3Dot('#div_zone_ward');
        $.ajax({
            type: 'GET',
            url: '/Address/GetListWardOptionHtml',
            data: {
                id: currentVal
            },
            dataType: 'json',
            success: function (response) {
                HideOverlay3Dot('#div_zone_ward');
                if (!CheckResponseIsSuccess(response)) return false;
                if (IsNullOrEmty(response.data))
                    response = '<option value="0">Không có dữ liệu...</option>';
                $(formElement.wardId).html(response.data);
                $(formElement.wardId).attr('disabled', false);
                $(formElement.wardId).selectpicker("refresh");
                let firstOption = $(formElement.wardId).children('option:not(.bs-title-option)').eq(0).val();
                $(formElement.wardId).selectpicker('val', firstOption);
            },
            error: function (err) {
                HideOverlay3Dot('#div_zone_ward');
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    }
}

//On change province main page
function OnChangeProvinceMainEvent(elm) {
    var currentVal = $(elm).val();
    if (parseInt(currentVal) === 0) {
        $('#districtIdMain').html('');
        $('#districtIdMain').attr('disabled', true);
        $('#districtIdMain').selectpicker("refresh");
        $('#wardIdMain').html('');
        $('#wardIdMain').attr('disabled', true);
        $('#wardIdMain').selectpicker("refresh");
    } else {
        ShowOverlay3Dot('#divDistrictMain');
        $.ajax({
            type: "GET",
            url: "/Address/OnChangeProvinceActive",
            data: {
                id: currentVal
            },
            dataType: 'json',
            success: function (response) {
                HideOverlay3Dot('#divDistrictMain');
                if (response == '')
                    response = '<option value="0">Không có dữ liệu...</option>';

                $('#wardIdMain').html('');
                $('#wardIdMain').attr('disabled', true);
                $('#wardIdMain').selectpicker("refresh");
                $('#districtIdMain').html(response);
                $('#districtIdMain').attr('disabled', false);
                $('#districtIdMain').selectpicker("refresh");
            },
            error: function (err) {
                HideOverlay3Dot('#divDistrictMain');
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    }
}

//On change district main page
function OnChangeDistrictMainEvent(elm) {
    var currentVal = $(elm).val();
    if (parseInt(currentVal) === 0) {
        $('#wardIdMain').html('');
        $('#wardIdMain').attr('disabled', true);
        $('#wardIdMain').selectpicker("refresh");
    } else {
        ShowOverlay3Dot('#divWardMain');
        $.ajax({
            type: "GET",
            url: "/Address/OnChangeDistrictActive",
            data: {
                id: currentVal
            },
            dataType: 'json',
            success: function (response) {
                HideOverlay3Dot('#divWardMain');
                if (response == '')
                    response = '<option value="0">Không có dữ liệu...</option>';

                $('#wardIdMain').html(response);
                $('#wardIdMain').attr('disabled', false);
                $('#wardIdMain').selectpicker("refresh");
            },
            error: function (err) {
                HideOverlay3Dot('#divWardMain');
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    }
}

//Raw html no data
function NoneRecord() {
    var html = `<div class="col-sm-12 text-center p-2">
                    <img src="/assets/images/empty-cart.png" style="width:150px;" alt="No data" />
                    <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                    <a href="javascript:void(0)" onclick="ReturnMemberPage()" class="btn btn-solid">Tiếp tục mua sắm</a>
                </div>`;
    $('#zoneCart').html(html);
    $btnPlaceOrder.attr('disabled', 'disabled');
}

//Load total fee ship
function LoadTotalFeeShip() {
    let feeShip = 0;
    let isNotCounted = true;
    cartItemData.forEach(function (item, index) {
        feeShip += IsNullOrEmty($(`[name="delivery_package_${item.code}"]:checked`).val()) ? 0 : parseInt($(`[name="delivery_package_${item.code}"]:checked`).val());
        if ($(`[name="delivery_package_${item.code}"]:checked`).length > 0)
            isNotCounted = false;
    });

    //Check if not choose shipping to show text (chưa tính)
    if (isNotCounted) {
        $('#transportFee').text('(chưa tính)');
    } else {
        $('#transportFee').text(NumberWithCommas(feeShip, ',') + 'đ');
    }
}

//Calulate total price item
function RefreshTotalItem(totalPay, countItem) {
    $('#totalPriceAllItem').text(NumberWithCommas(totalPay, ',') + 'đ');
    $('#countCartItem').text(countItem);
}

//Calulate total pay
function RefreshTotalPay(supplierId, id) {
    var toalItem = FormatToNumerCustom($('#totalPriceAllItem').text());
    var transportFee = FormatToNumerCustom($('#transportFee').text());
    var paymentMethod = 100 /*parseInt($('[name="payment-group"]:checked').data('value'))*/;
    $('#ratioPayment').text(`(${paymentMethod}%)`);
    let discountAll = 0;
    let discountSupplier = 0;
    let discountSupplierWhenUpdate = 0;
    let promotionApplyHtml = '';
    var shopCode = 0;

    if (supplierId > 0) {
        shopCode = id;
    }
    else {
        shopCode = $(`#input_shop_code`).val();
    }

    if (supplierId != null && supplierId > 0) {
        if (promotionCodeApply.length > 0) {
            discountSupplier = 0;
            for (var i = 0; i < promotionCodeApply.length; i++) {
                discountSupplier += promotionCodeApply[i].discount;
                /* promotionApplyHtml +=
                     `<div id="item_${promotionCodeApply[i].promotionCode}" class="item p-2">
                         <span class="code">${promotionCodeApply[i].promotionCode}</span>
                         <span class="discount">-${NumberWithCommas(promotionCodeApply[i].discount, ',')}đ  <button class="btn btn-sm btn-danger" onclick="DisposePromotion(this, '${promotionCodeApply[i].promotionCode ?? ''}', 'admin', '${promotionCodeApply[i].supplierId}')">Bỏ chọn</button></span>
                      </div>
                 `;
                 $(`#div_list_promotion_apply_${shopCode}`).html(promotionApplyHtml);*/
            }
        }
        discountSupplierWhenUpdate = 0
        for (var i = 0; i < listDiscountSupplier.length; i++) {
            if (listDiscountSupplier[i].supplierId == supplierId) {
                discountSupplierWhenUpdate += listDiscountSupplier[i].discount;
            }
        }
        $(`#discount_${parseInt(shopCode)}`).html(NumberWithCommas(discountSupplierWhenUpdate, ','))
        $(`#discount_${shopCode}`).html(NumberWithCommas(discountSupplierWhenUpdate, ','))
        swal.fire("Đã bỏ chọn!", '', 'success');
    } else {
        if (listDiscountSupplier.length > 0) {
            var id = $(`#input_shop_code`).val();
            var listSupplierId = listDiscountSupplier.map(x => x.supplierId);

            promotionCodeApply.forEach(function (value) {
                discountSupplier = 0;
                if (listSupplierId.includes(value.supplierId)) {
                    listDiscountSupplier.forEach(function (item) {
                        if (value.supplierId == item.supplierId) {
                            discountSupplier += item.discount;
                        }
                    })

                    promotionApplyHtml +=
                        `<div id="item_${value.promotionCode}" class="item p-2">
                               <span class="code">${value.promotionCode}</span>
                               <span class="discount">-${NumberWithCommas(value.discount, ',')}đ  <button data-id="${id}" class="btn btn-sm btn-danger" onclick="DisposePromotion(this, '${value.promotionCode ?? ''}', 'admin', '${value.supplierId}')">Bỏ chọn</button></span>
                             </div>`;
                }
            })

            /* for (var i = 0; i < listDiscountSupplier.length; i++) {
                 for (var n = 0; n < promotionCodeApply.length; n++)
                     if (listDiscountSupplier[i].supplierId == promotionCodeApply[n].supplierId) {
                         discountSupplier += listDiscountSupplier[i].discount;
                         console.log("1");
                         promotionApplyHtml +=
                             `<div id="item_${promotionCodeApply[i].promotionCode}" class="item p-2">
                                <span class="code">${promotionCodeApply[i].promotionCode}</span>
                                <span class="discount">-${NumberWithCommas(promotionCodeApply[i].discount, ',')}đ  <button data-id="${id}" class="btn btn-sm btn-danger" onclick="DisposePromotion(this, '${promotionCodeApply[i].promotionCode ?? ''}', 'admin', '${promotionCodeApply[i].supplierId}')">Bỏ chọn</button></span>
                              </div>`;
                     }
             }*/
            $(`#discount_${shopCode}`).html(NumberWithCommas(discountSupplier, ','))

            $(`#div_list_promotion_apply_${shopCode}`).append(promotionApplyHtml);
        }
    }


    if (listDiscountSupplier.length > 0) {
        for (var i = 0; i < listDiscountSupplier.length; i++) {
            discountAll += listDiscountSupplier[i].discount;
        }

    }


    $('#discountPercentPayment').text('');
    $('#li_discount_payment').hide();
    let discountPayment = 0;
    if (paymentMethod === 100) {
        if (ORDER_DISCOUNT_100.discount > 0) {
            discountPayment = ORDER_DISCOUNT_100.discount;
            $('#li_discount_payment').show();
        } else if (ORDER_DISCOUNT_100.discountPercent > 0) {
            discountPayment = ORDER_DISCOUNT_100.discountPercent * toalItem / 100;
            $('#li_discount_payment').show();
            $('#discountPercentPayment').text(`(${ORDER_DISCOUNT_100.discountPercent}%)`);
        }
    }

    $('#discountPaymentFee').text(`-${NumberWithCommas(discountPayment, ',')}đ`);
    $('#countPromotionCode').text(listDiscountSupplier.length);
    $('#discountFee').html('-' + NumberWithCommas(discountAll, ',') + 'đ');
    var totalPay = toalItem + transportFee - discountAll - discountPayment;
    var totalMustPay = totalPay > 0 ? totalPay * paymentMethod / 100 : 0;
    $('#totalPricePayment').text(NumberWithCommas(totalPay <= 0 ? 0 : totalPay, ',') + 'đ');
    $('#totalMustPay').text(NumberWithCommas(totalMustPay, ',') + 'đ');
}

//Get shop adddataOptionGHNress near
function GetShopAddressNear(elm) {
    if (parseInt($(elm).val()) === 2) {
        let itemCartProductId = cartItemData.length === 1 && cartItemData[0].productItem.length === 1 ? cartItemData[0].productItem[0].id : null;
        ShowOverlay3Dot('#divTypeShopZone');
        $('#searchAddressShop').show();
        $.ajax({
            type: "GET",
            url: "/Checkout/GetShopByNearAddress",
            data: {
                productId: itemCartProductId,
                provinceId: $('#address-location').attr('data-province'),
                districtName: $('#address-location').attr('data-district'),
                wardName: $('#address-location').attr('data-ward'),
            },
            dataType: 'json',
            success: function (response) {
                HideOverlay3Dot('#divTypeShopZone');
                if (response.result !== 1) {
                    CheckResponseIsSuccess(response);
                    return;
                }

                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    $('#shopAddressZone').slideDown(200);
                    $('#messageShopAddress').empty();
                    shopAddresData = listData;
                    var html = '';
                    let itemCartIsOneItem = cartItemData.length === 1 && cartItemData[0].productItem.length === 1 ? true : false;
                    listData.forEach(function (item, index) {
                        let status = '';
                        //if (itemCartIsOneItem) {
                        //    if (item.quantityProduct === 0) {
                        //        status = '<small class="px-1 text-danger">Hết hàng</small>';
                        //    } else if (item.quantityProduct >= cartItemData[0].productItem[0].quantity) {
                        //        status = '<small class="px-1 text-success">Còn hàng</small>';
                        //    } else {
                        //        status = '<small class="px-1 text-warning">Không đủ hàng</small>';
                        //    }
                        //}
                        html += `<div class="form-check">
                                    <input class="form-check-input" type="radio" name="ReceivedInShop" value="${item.shopId}" id="ReceivedInShop_${item.shopId}">
                                    <label class="form-check-label" for="ReceivedInShop_${item.shopId}">
                                        <span class="text-break px-1">${IsNullOrEmty(item.addressText) ? "" : item.addressText + ","} ${IsNullOrEmty(item.wardName) ? "" : item.wardName + ","} ${IsNullOrEmty(item.districtName) ? "" : item.districtName + ","} ${IsNullOrEmty(item.provinceName) ? "" : item.provinceName} | <b>${IsNullOrEmty(item.shopName) ? "" : item.shopName}</b></span> ${status}
                                    </label>
                                </div>`;
                    });
                    document.getElementById('shopAddressZone').innerHTML = html;
                    document.getElementById('shopAddressZone').scrollTop = 0;
                } else {
                    document.getElementById('shopAddressZone').innerHTML = '';
                    document.getElementById('messageShopAddress').innerHTML = 'Không có Shop nào trong khu vực của bạn. Vui lòng chọn "Đặt hàng từ công ty".';
                }
            },
            error: function (err) {
                HideOverlay3Dot('#divTypeShopZone');
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    } else {
        $('#searchAddressShop').hide();
        $('#messageShopAddress').empty();
        $('#shopAddressZone').slideUp(200);
    }
}

//Get shop address filter
function GetShopAddressFilter() {
    ShowOverlay3Dot('#top-tab2');
    $('#searchAddressShopFilter').show();
    let itemCartProductId = cartItemData.length === 1 && cartItemData[0].productItem.length === 1 ? cartItemData[0].productItem[0].id : null;
    $.ajax({
        type: "GET",
        url: "/Checkout/GetShopByFilterAddress",
        data: {
            productId: itemCartProductId,
            provinceId: $('#provinceIdMain').val(),
            districtId: $('#districtIdMain').val(),
            wardId: $('#wardIdMain').val()
        },
        dataType: 'json',
        success: function (response) {
            HideOverlay3Dot('#top-tab2');
            if (response.result !== 1) {
                CheckResponseIsSuccess(response);
                return;
            }

            var listData = response.data;
            if (listData != null && listData.length > 0) {
                $('#shopAddressFilterZone').slideDown(200);
                $('#messageShopAddressFilter').empty();
                var html = '';
                shopAddresFilterData = listData;
                let itemCartIsOneItem = cartItemData.length === 1 && cartItemData[0].productItem.length === 1 ? true : false;
                listData.forEach(function (item, index) {
                    let status = '';
                    //if (itemCartIsOneItem) {
                    //    if (item.quantityProduct === 0) {
                    //        status = '<small class="px-1 text-danger">Hết hàng</small>';
                    //    } else if (item.quantityProduct >= cartItemData[0].productItem[0].quantity) {
                    //        status = '<small class="px-1 text-success">Còn hàng</small>';
                    //    } else {
                    //        status = '<small class="px-1 text-warning">Không đủ hàng</small>';
                    //    }
                    //}
                    html += `<div class="form-check">
                                <input class="form-check-input" type="radio" name="FilterInShop" value="${item.shopId}" id="FilterInShop_${item.shopId}">
                                <label class="form-check-label" for="FilterInShop_${item.shopId}">
                                    <span class="text-break px-1">${IsNullOrEmty(item.addressText) ? "" : item.addressText + ","} ${IsNullOrEmty(item.wardName) ? "" : item.wardName + ","} ${IsNullOrEmty(item.districtName) ? "" : item.districtName + ","} ${IsNullOrEmty(item.provinceName) ? "" : item.provinceName} | <b>${IsNullOrEmty(item.shopName) ? "" : item.shopName}</b></span> ${status}
                                </label>
                            </div>`;
                });
                document.getElementById('shopAddressFilterZone').innerHTML = html;
                document.getElementById('shopAddressFilterZone').scrollTop = 0;
            } else {
                document.getElementById('shopAddressFilterZone').innerHTML = '';
                document.getElementById('messageShopAddressFilter').innerHTML = 'Không có Shop nào trong khu vực bạn chọn.';
            }
        },
        error: function (err) {
            HideOverlay3Dot('#top-tab2');
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function CalDiscountPrice(num1, num2) {
    return NumberWithCommas(num1 - num2, ',') + 'đ';
}

function FormatToVNDCustom(value) {
    if (IsNullOrEmty(value))
        return "NaN";
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' }).replace(/\s₫/g, 'đ');
}

function FormatToNumerCustom(value) {
    return Number(value.replace(/\D+/g, ""));
}

function SearchByKeywordInArray(array, q) {
    q = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var substrRegex = new RegExp(q, 'i');
    $('#shopAddressZone').empty();
    let isNotFoundData = true;
    let fullAddress = '';
    let itemCartIsOneItem = cartItemData.length === 1 && cartItemData[0].productItem.length === 1 ? true : false;
    $.each(array, function (i, item) {
        fullAddress = item.addressText + ', ' + item.wardName + ', ' + item.districtName + ', ' + item.provinceName + ' | ' + item.shopName;
        if (substrRegex.test(fullAddress) || substrRegex.test(item.shopName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || substrRegex.test(item.addressText.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || substrRegex.test(item.wardName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || substrRegex.test(item.districtName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || substrRegex.test(item.provinceName.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
            let status = '';
            //if (itemCartIsOneItem) {
            //    if (item.quantityProduct === 0) {
            //        status = '<small class="px-1 text-danger">Hết hàng</small>';
            //    } else if (item.quantityProduct >= cartItemData[0].productItem[0].quantity) {
            //        status = '<small class="px-1 text-success">Còn hàng</small>';
            //    } else {
            //        status = '<small class="px-1 text-warning">Không đủ hàng</small>';
            //    }
            //}
            $('#shopAddressZone').append(
                `<div class="form-check">
                    <input class="form-check-input" type="radio" name="ReceivedInShop" value="${item.shopId}" id="ReceivedInShop_${item.shopId}">
                    <label class="form-check-label" for="ReceivedInShop_${item.shopId}">
                    <span class="text-break px-1">${IsNullOrEmty(item.addressText) ? "" : item.addressText}, ${IsNullOrEmty(item.wardName) ? "" : item.wardName + ","} ${IsNullOrEmty(item.districtName) ? "" : item.districtName + ","} ${IsNullOrEmty(item.provinceName) ? "" : item.provinceName} | <b>${IsNullOrEmty(item.shopName) ? "" : item.shopName}</b></span> ${status}
                    </label>
                </div>`);
            isNotFoundData = false;
        }
    });
    document.getElementById('shopAddressZone').scrollTop = 0;
    if (isNotFoundData) $('#shopAddressZone').html('<p class="text-center">Không tìm thấy dữ liệu.</p>');
}

function SearchByKeywordInArrayFilter(array, q) {
    q = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var substrRegex = new RegExp(q, 'i');
    $('#shopAddressFilterZone').empty();
    let isNotFoundData = true;
    let fullAddress = '';
    let itemCartIsOneItem = cartItemData.length === 1 && cartItemData[0].productItem.length === 1 ? true : false;
    $.each(array, function (i, item) {
        fullAddress = item.addressText + ', ' + item.wardName + ', ' + item.districtName + ', ' + item.provinceName + ' | ' + item.shopName;
        if (substrRegex.test(fullAddress) || substrRegex.test(item.shopName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || substrRegex.test(item.addressText.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || substrRegex.test(item.wardName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || substrRegex.test(item.districtName.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) || substrRegex.test(item.provinceName.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
            let status = '';
            //if (itemCartIsOneItem) {
            //    if (item.quantityProduct === 0) {
            //        status = '<small class="px-1 text-danger">Hết hàng</small>';
            //    } else if (item.quantityProduct >= cartItemData[0].productItem[0].quantity) {
            //        status = '<small class="px-1 text-success">Còn hàng</small>';
            //    } else {
            //        status = '<small class="px-1 text-warning">Không đủ hàng</small>';
            //    }
            //}
            $('#shopAddressFilterZone').append(
                `<div class="form-check">
                    <input class="form-check-input" type="radio" name="FilterInShop" value="${item.shopId}" id="FilterInShop_${item.shopId}">
                    <label class="form-check-label" for="FilterInShop_${item.shopId}">
                        <span class="text-break px-1">${IsNullOrEmty(item.addressText) ? "" : item.addressText + ","} ${IsNullOrEmty(item.wardName) ? "" : item.wardName + ","} ${IsNullOrEmty(item.districtName) ? "" : item.districtName + ","} ${IsNullOrEmty(item.provinceName) ? "" : item.provinceName} | <b>${IsNullOrEmty(item.shopName) ? "" : item.shopName}</b></span> ${status}
                    </label>
                </div>`);
            isNotFoundData = false;
        }
    });
    document.getElementById('shopAddressFilterZone').scrollTop = 0;
    if (isNotFoundData) $('#shopAddressFilterZone').html('<p class="text-center">Không tìm thấy dữ liệu.</p>');
}


const DAY_WARNING_EXPIRED = 2;
var sequencePromotionExclude = [];
var pagePromotionAdmin = 1;
var countPromotionAdmin = 0;
var maxPromotionAdmin = null;
var isMaximumPromotionAdmin = false;
var isLoadingFlagPromotionAdmin = false;
var timeFirstLoadPromotionAdmin = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');

var pagePromotionMember = 1;
var countPromotionMember = 0;
var maxPromotionMember = null;
var isMaximumPromotionMember = false;
var isLoadingFlagPromotionMember = false;
var timeFirstLoadPromotionMember = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');

function ListeningEventClickQuestionIcon() {
    $('.icon-view-condition-promotion').off('click').on('click', function () {
        if ($('.card-voucher .card-condition-promotion.active').length > 0)
            $('.card-voucher .card-condition-promotion').removeClass('active');
        $(this).parents('.card-voucher').find('.card-condition-promotion').toggleClass('active');
    });
    $('.icon-view-condition-promotion').on('mouseover', function () {
        if ($('.card-voucher .card-condition-promotion.active').length > 0)
            $('.card-voucher .card-condition-promotion').removeClass('active');
        $(this).parents('.card-voucher').find('.card-condition-promotion').toggleClass('active');
    });
    $(window).off('click').on('click', function (e) {
        if (!$(e.target).parent().hasClass('icon-view-condition-promotion'))
            $('.card-voucher .card-condition-promotion').removeClass('active');
    });
}

function HandleTimer(fDate, tDate) {
    let timer = '';
    let timeNow = new Date();
    let startDate = new Date(fDate);
    let endDate = new Date(tDate);
    var diffHours = Math.abs(endDate - timeNow) / 36e5;
    if (diffHours <= DAY_WARNING_EXPIRED * 24)
        return `<span style="color:#FF0000 !important;">Còn ${parseInt(diffHours)} giờ</span>`;
    if (startDate.getFullYear() === endDate.getFullYear()) {
        if (startDate.getMonth() === endDate.getMonth()) {
            timer = `${startDate.getDate()}-${endDate.getDate()} thg ${endDate.getMonth() + 1}, ${endDate.getFullYear()}`;
        } else {
            timer = `${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}, ${startDate.getFullYear()}`;
        }
    } else {
        timer = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()} - ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
    }
    return timer;
}

function LoadListPromotionAdmin(reset = 0, supplierId) {
    if (reset === 1) {
        pagePromotionAdmin = 1, countPromotionAdmin = 0, isMaximumPromotionAdmin = false; maxPromotionAdmin = null;
        timeFirstLoadPromotionAdmin = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
        $('#div_promotion_admin').empty();
    }

    try {
        promotionCodeApply.forEach(function (item) {
            if (!sequencePromotionExclude.includes(item.promotionCode)) {
                sequencePromotionExclude.push(item.promotionCode)
            }
        })



        isLoadingFlagPromotionAdmin = true;
        let laddaLoad = Ladda.create($('#btn_promotion_admin_load_more')[0]);
        laddaLoad.start();
        $('#btn_promotion_admin_load_more').attr('disabled', true);
        $.ajax({
            type: 'GET',
            url: '/PromotionApply/GetList',
            dataType: "json",
            data: {
                isManage: 1,
                typeSearch: 0,
                page: pagePromotionAdmin,
                timer: timeFirstLoadPromotionAdmin,
                supplierId: supplierId,
                sequencePromotionExclude: sequencePromotionExclude.toString(),
            },
            success: function (response) {
                isLoadingFlagPromotionAdmin = false;
                laddaLoad.stop();
                $('#btn_promotion_admin_load_more').attr('disabled', false);
                if (response.result !== 1) {
                    CheckResponseIsSuccess(response);
                    return;
                }
                pagePromotionAdmin++;
                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    admin = 0;
                    let categoryInCart = GetListCategoryIdCart(supplierId);
                    let productInCart = GetListProductIdCart(supplierId);
                    let totalPrice = FormatToNumerCustom($('#totalPriceAllItem').text());
                    var tmpHtml = '';
                    let imageSupplier = '';
                    let promotionConditionApply = '';
                    let timer = '';
                    let promotionCategoryProduct = '';
                    countPromotionAdmin += listData.length;

                    var listPromotionAd = [];
                    var listPromotionAdBySup = []
                    for (var i = 0; i < listData.length; i++) {

                        var listPromotionCategoryId = [];
                        var listProductId = [];
                        var listCategoryApply = [];
                        var listProductApply = [];
                        var disabled = false;
                        let value = listData[i].promotionObj;

                        //Check Category
                        if (value.promotionCategoryObj != null && value.promotionCategoryObj.length > 0) {
                            value.promotionCategoryObj.forEach(function (item) {
                                if (!listPromotionCategoryId.includes(item.categoryId)) {
                                    listPromotionCategoryId.push(item.categoryId)
                                }
                            })
                        };

                        if (listPromotionCategoryId.length > 0) {
                            categoryInCart.forEach(function (item) {
                                if (categoryInCart.includes(FindItemInArrayWithoutKey(listPromotionCategoryId, '', item))) {
                                    listCategoryApply.push(1);
                                }
                                else {
                                    listCategoryApply.push(0);
                                }
                            })
                            if (listCategoryApply.includes(0)) {
                                disabled = true;
                            }
                        }

                        //Check Product
                        if (value.promotionProductObj != null && value.promotionProductObj.length > 0) {
                            value.promotionProductObj.forEach(function (item) {
                                if (!listProductId.includes(item.productId)) {
                                    listProductId.push(item.productId)
                                }
                            })
                        };

                        if (listProductId.length > 0) {
                            listProductId.forEach(function (item) {
                                if (productInCart.includes(FindItemInArrayWithoutKey(listProductId, '', item))) {
                                    listProductApply.push(1);
                                } else {
                                    listProductApply.push(0);
                                }
                            })
                            if (listProductApply.includes(0)) {
                                disabled = true;
                            }
                        }

                        //Check Product


                        /*  console.log(value.promotionSupplierObj);*/
                        /*   if (value.limitNumber > 0 && value.limitNumber == value.usedNumber)
                               disabled = true;*/
                        /* if (value.isManage === 1 && value.promotionSupplierObj.length > 0 && value.promotionSupplierObj.find(x => x.supplierId === SUPPLIER_ID_NO_HASH) == null)
                             disabled = true;*/
                        //if (value.promotionCategoryObj.length > 0 && value.promotionCategoryObj.filter(x => categoryInCart.some(y => y === x.categoryId)).length != categoryInCart.length)
                        //   disabled = true;        
                        /*  if (value.promotionProductObj.length > 0 && value.promotionProductObj.filter(x => productInCart.some(y => y === x.productId)).length != productInCart.length)
                            disabled = true;
                        if (value.promotionConditionApplyObj.length > 0 && totalPrice < GetArrayMin(value.promotionConditionApplyObj.map(x => x.orderPriceThreshold)))
                            disabled = true;*/

                        if (value == null) continue;
                        if (!IsNullOrEmty(value.supplierObj?.imageObj?.mediumUrl))
                            imageSupplier = `<img src="${value.supplierObj?.imageObj?.mediumUrl}" alt="Logo" onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';" />`
                        else
                            imageSupplier = `<img src="/img/icon/promotion.png" alt="Promotion" onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';" />`

                        promotionConditionApply = '';
                        if (value.promotionConditionApplyObj != null && value.promotionConditionApplyObj.length > 0) {
                            let itemCondition = '';
                            value.promotionConditionApplyObj.forEach(function (item) {
                                itemCondition +=
                                    `<li>
                                        <p class="mb-0">
                                            <b>${value.promotionTypeId === 2 ? NumberWithCommas(item.voucherAmount, ',') + '<sup>đ</sup>' : item.couponPercent + '%'}</b>
                                            ${item.orderPriceThreshold > 0 ? `<span>Đơn hàng từ ${NumberWithCommas(item.orderPriceThreshold, ',')}<sup>đ</sup></span>` : ''}
                                        </p>
                                    </li>`;
                            });
                            promotionConditionApply = `<ul class="ul-list-promotion scrollbar style-1">${itemCondition}</ul>`;
                        }

                        timer = HandleTimer(value.startDate, value.endDate);

                        promotionCategoryProduct = '';
                        if (value.promotionSupplierObj.length > 0 || value.promotionCategoryObj.length > 0 || value.promotionProductObj.length > 0) {
                            let promotionSupplier = '';
                            if (value.isManage === 1) {
                                if (value.promotionSupplierObj != null && value.promotionSupplierObj.length > 0) {
                                    value.promotionSupplierObj.forEach(function (item) {
                                        promotionSupplier += `<li><p class="mb-0"><a href="/npp/${item.supplierObj?.memberUrlIdentity ?? ''}">${item.supplierObj?.name ?? ''}</a></p></li>`;
                                    });
                                    promotionSupplier =
                                        `<h5 class="sp-line-1 mb-0">Khi mua hàng</h5>
                                    <ul class="ul-list-promotion">${promotionSupplier}</ul>`;
                                }
                            }
                            let promotionCategory = '';
                            if (value.promotionCategoryObj != null && value.promotionCategoryObj.length > 0) {
                                value.promotionCategoryObj.forEach(function (item) {
                                    promotionCategory += `<li><p class="mb-0">${item.categoryObj?.name ?? ''}</p></li>`;
                                });
                                promotionCategory =
                                    `<h5 class="sp-line-1 mb-0">Danh mục áp dụng</h5>
                                    <ul class="ul-list-promotion">${promotionCategory}</ul>`;
                            }
                            let promotionProduct = '';
                            if (value.promotionProductObj != null && value.promotionProductObj.length > 0) {
                                value.promotionProductObj.forEach(function (item) {
                                    promotionProduct += `<li><p class="mb-0"><a href="/san-pham/${item.productObj?.nameSlug ?? ''}-${item.productId ?? ''}">${item.productObj?.name ?? ''}</a></p></li>`;
                                });
                                promotionProduct =
                                    `<h5 class="sp-line-1 mb-0">Sản phẩm áp dụng</h5>
                                    <ul class="ul-list-promotion">${promotionProduct}</ul>`;
                            }
                            promotionCategoryProduct =
                                `<a href="javascript:void(0)" class="icon-view-condition-promotion"><i class="fa fa-question-circle" aria-hidden="true"></i></a>
                                <div class="card card-condition-promotion">
                                    <div class="card-body scrollbar style-1">${promotionSupplier}${promotionCategory}${promotionProduct}</div>
                                </div>`;
                        }
                        let buttonChoosePromotion = '';
                        if (promotionCodeApply.find(x => x.promotionCode === value.promotionCode) == null) {
                            buttonChoosePromotion = `<button onclick="ChoosePromotion(this, '${value.promotionCode ?? ''}', 'admin','')" data-code="${value.promotionCode ?? ''}" class="copybtn btn_promotion_admin">CHỌN</button>`;
                        } /*else {
                            buttonChoosePromotion = `<button onclick="DisposePromotion(this, '${value.promotionCode ?? ''}', 'admin','')" data-code="${value.promotionCode ?? ''}" class="copybtn btn_promotion_admin active">ĐÃ CHỌN</button>`;
                        }*/

                        //One voucher admin apply 
                        listDiscountSupplier.forEach(function (item) {
                            if (item.isManage == 1) {
                                listPromotionAd.push(item)
                            }
                        })

                        if (listPromotionAd.length > 0) {
                            listPromotionAd.forEach(function (item) {
                                if (item.supplierId == supplierId) {
                                    listPromotionAdBySup.push(item)
                                }
                            })
                        }
                        if (listPromotionAdBySup.length > 0) {
                            disabled = true;
                        }
                        /*  if (listPromotionAd.length > 0) { disabled = true; }*/



                        tmpHtml =
                            `<div class="col-md-6 d-flex justify-content-center" id="promotion_item_${listData[i].id}">
                                <div class="card-voucher ${value.isManage === 0 ? "card-purple-blue" : "card-green-blue"} mb-3 ${disabled ? "disabled" : ""}">
                                    ${promotionCategoryProduct}
                                    <div class="main-voucher">
                                        <img class="icon-expired" src="/img/icon/forbidden.png" alt="Expired" />
                                        <div class="co-img">
                                            ${imageSupplier}
                                        </div>
                                        <div class="vertical"></div>
                                        <div class="content-voucher">
                                            <h2 class="sp-line-1" title="${value.name ?? ''}">${value.name ?? ''}</h2>
                                            ${promotionConditionApply}
                                            <h6 class="mb-0 sp-line-1"><i class="ti-calendar mr-1"></i>${timer}</h6>
                                        </div>
                                    </div>
                                    <div class="copy-button">
                                        <input type="text" readonly value="${value.promotionCode ?? ''}" />
                                        ${buttonChoosePromotion}
                                    </div>
                                </div>
                            </div>`;



                        $('#div_promotion_admin').append(tmpHtml);
                        /*     $('#div_promotion_admin').append(`<div class="notifica-not-found text-center">
                                 Không có mã khả dụng
                             </div>`);*/
                    };



                    ListeningEventClickQuestionIcon();
                }
                else {
                    admin = 1;
                    isMaximumPromotionAdmin = true;
                    $('#btn_promotion_admin_load_more').hide();
                    $('#div_promotion_admin').html(
                        `<div class="notifica-not-found text-center">
                            Không có mã nào trong ví
                        </div>`);
                }

                if (maxPromotionAdmin === null)
                    maxPromotionAdmin = parseInt(response.data2nd);

                if (countPromotionAdmin >= maxPromotionAdmin) {
                    isMaximumPromotionAdmin = true;
                    $('#btn_promotion_admin_load_more').hide();
                }

            },
            error: function (err) {
                isLoadingFlagPromotionAdmin = false;
                laddaLoad.stop();
                $('#btn_promotion_admin_load_more').attr('disabled', false);
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    } catch (e) {
        isLoadingFlagPromotionAdmin = false;
        laddaLoad.stop();
        $('#btn_promotion_admin_load_more').attr('disabled', false);
    }
}

function LoadListPromotionMember(reset = 0, supplierId) {
    if (reset === 1) {
        pagePromotionMember = 1, countPromotionMember = 0, isMaximumPromotionMember = false; maxPromotionMember = null;
        timeFirstLoadPromotionMember = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
        $('#div_promotion_member').empty();
    }
    try {
        promotionCodeApply.forEach(function (item) {
            if (!sequencePromotionExclude.includes(item.promotionCode)) {
                sequencePromotionExclude.push(item.promotionCode)
            }
        })

        isLoadingFlagPromotionMember = true;
        let laddaLoad = Ladda.create($('#btn_promotion_member_load_more')[0]);
        laddaLoad.start();
        $('#btn_promotion_member_load_more').attr('disabled', true);
        $.ajax({
            type: 'GET',
            url: '/PromotionApply/GetList',
            dataType: "json",
            data: {
                isManage: 0,
                typeSearch: 1,
                page: pagePromotionMember,
                timer: timeFirstLoadPromotionMember,
                supplierId: supplierId,
                sequencePromotionExclude: sequencePromotionExclude.toString(),
            },
            success: function (response) {
                isLoadingFlagPromotionMember = false;
                laddaLoad.stop();
                $('#btn_promotion_member_load_more').attr('disabled', false);
                if (response.result !== 1) {
                    CheckResponseIsSuccess(response);
                    return;
                }
                pagePromotionMember++;
                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    shop = 0;
                    let categoryInCart = GetListCategoryIdCart(supplierId);
                    let productInCart = GetListProductIdCart();
                    let totalPrice = FormatToNumerCustom($('#totalPriceAllItem').text());
                    var tmpHtml = '';
                    let imageSupplier = '';
                    let promotionConditionApply = '';
                    let timer = '';
                    let promotionCategoryProduct = '';
                    countPromotionMember += listData.length;


                    var listPromotionMember = []
                    var listPromotionMemberBySup = []
                    for (var i = 0; i < listData.length; i++) {
                        let value = listData[i].promotionObj;

                        let disabled = false;
                        /*  if (value.limitNumber > 0 && value.limitNumber == value.usedNumber)
                              disabled = true;
                          if (value.isManage === 0 && value.supplierId !== SUPPLIER_ID_NO_HASH)
                              disabled = true;
                          if (value.promotionCategoryObj.length > 0 && value.promotionCategoryObj.filter(x => categoryInCart.some(y => y === x.categoryId)).length != categoryInCart.length)
                              disabled = true;
                          if (value.promotionProductObj.length > 0 && value.promotionProductObj.filter(x => productInCart.some(y => y === x.productId)).length != productInCart.length)
                              disabled = true;
                          if (value.promotionConditionApplyObj.length > 0 && totalPrice < GetArrayMin(value.promotionConditionApplyObj.map(x => x.orderPriceThreshold)))
                              disabled = true;*/

                        if (value == null) continue;
                        if (!IsNullOrEmty(value.supplierObj?.imageObj?.mediumUrl))
                            imageSupplier = `<img src="${value.supplierObj?.imageObj?.mediumUrl}" alt="Logo" onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';" />`
                        else
                            imageSupplier = `<img src="/img/icon/promotion.png" alt="Promotion" onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';" />`

                        promotionConditionApply = '';
                        if (value.promotionConditionApplyObj != null && value.promotionConditionApplyObj.length > 0) {
                            let itemCondition = '';
                            value.promotionConditionApplyObj.forEach(function (item) {
                                itemCondition +=
                                    `<li>
                                        <p class="mb-0">
                                            <b>${value.promotionTypeId === 2 ? NumberWithCommas(item.voucherAmount, ',') + '<sup>đ</sup>' : item.couponPercent + '%'}</b>
                                            ${item.orderPriceThreshold > 0 ? `<span>Đơn hàng từ ${NumberWithCommas(item.orderPriceThreshold, ',')}<sup>đ</sup></span>` : ''}
                                        </p>
                                    </li>`;
                            });
                            promotionConditionApply = `<ul class="ul-list-promotion scrollbar style-1">${itemCondition}</ul>`;
                        }

                        timer = HandleTimer(value.startDate, value.endDate);

                        promotionCategoryProduct = '';
                        if (value.promotionSupplierObj.length > 0 || value.promotionCategoryObj.length > 0 || value.promotionProductObj.length > 0) {
                            let promotionSupplier = '';
                            if (value.isManage === 1) {
                                if (value.promotionSupplierObj != null && value.promotionSupplierObj.length > 0) {
                                    value.promotionSupplierObj.forEach(function (item) {
                                        promotionSupplier += `<li><p class="mb-0"><a href="/npp/${item.supplierObj?.memberUrlIdentity ?? ''}">${item.supplierObj?.name ?? ''}</a></p></li>`;
                                    });
                                    promotionSupplier =
                                        `<h5 class="sp-line-1 mb-0">Khi mua hàng</h5>
                                    <ul class="ul-list-promotion">${promotionSupplier}</ul>`;
                                }
                            }
                            let promotionCategory = '';
                            if (value.promotionCategoryObj != null && value.promotionCategoryObj.length > 0) {
                                value.promotionCategoryObj.forEach(function (item) {
                                    promotionCategory += `<li><p class="mb-0">${item.categoryObj?.name ?? ''}</p></li>`;
                                });
                                promotionCategory =
                                    `<h5 class="sp-line-1 mb-0">Danh mục áp dụng</h5>
                                    <ul class="ul-list-promotion">${promotionCategory}</ul>`;
                            }
                            let promotionProduct = '';
                            if (value.promotionProductObj != null && value.promotionProductObj.length > 0) {
                                value.promotionProductObj.forEach(function (item) {
                                    promotionProduct += `<li><p class="mb-0"><a href="/san-pham/${item.productObj?.nameSlug ?? ''}-${item.productId ?? ''}">${item.productObj?.name ?? ''}</a></p></li>`;
                                });
                                promotionProduct =
                                    `<h5 class="sp-line-1 mb-0">Sản phẩm áp dụng</h5>
                                    <ul class="ul-list-promotion">${promotionProduct}</ul>`;
                            }
                            promotionCategoryProduct =
                                `<a href="javascript:void(0)" class="icon-view-condition-promotion"><i class="fa fa-question-circle" aria-hidden="true"></i></a>
                                <div class="card card-condition-promotion">
                                    <div class="card-body scrollbar style-1">${promotionSupplier}${promotionCategory}${promotionProduct}</div>
                                </div>`;
                        }

                        let buttonChoosePromotion = '';
                        if (promotionCodeApply.find(x => x.promotionCode === value.promotionCode) == null) {
                            buttonChoosePromotion = `<button onclick="ChoosePromotion(this, '${value.promotionCode ?? ''}', 'member','')" data-code="${value.promotionCode ?? ''}" class="copybtn btn_promotion_member">CHỌN</button>`;
                        } /*else {
                            buttonChoosePromotion = `<button onclick="DisposePromotion(this, '${value.promotionCode ?? ''}', 'member','')" data-code="${value.promotionCode ?? ''}" class="copybtn btn_promotion_member active">ĐÃ CHỌN</button>`;
                        }*/

                        listDiscountSupplier.forEach(function (item) {
                            if (item.isManage == 0) {
                                listPromotionMember.push(item)
                            }
                        })

                        if (listPromotionMember.length > 0) {
                            listPromotionMember.forEach(function (item) {
                                if (item.supplierId == supplierId) {
                                    listPromotionMemberBySup.push(item)
                                }
                            })
                        }
                        if (listPromotionMemberBySup.length > 0) {
                            disabled = true;
                        }

                        tmpHtml =
                            `<div class="col-md-6 d-flex justify-content-center" id="promotion_item_${listData[i].id}">
                                <div class="card-voucher ${value.isManage === 0 ? "card-purple-blue" : "card-green-blue"} mb-3 ${disabled ? "disabled" : ""}">
                                    ${promotionCategoryProduct}
                                    <div class="main-voucher">
                                        <img class="icon-expired" src="/img/icon/forbidden.png" alt="Expired" />
                                        <div class="co-img">
                                            ${imageSupplier}
                                        </div>
                                        <div class="vertical"></div>
                                        <div class="content-voucher">
                                            <h2 class="sp-line-1" title="${value.name ?? ''}">${value.name ?? ''}</h2>
                                            ${promotionConditionApply}
                                            <h6 class="mb-0 sp-line-1"><i class="ti-calendar mr-1"></i>${timer}</h6>
                                        </div>
                                    </div>
                                    <div class="copy-button">
                                        <input type="text" readonly value="${value.promotionCode ?? ''}" />
                                        ${buttonChoosePromotion}
                                    </div>
                                </div>
                            </div>`;
                        /*   $('#div_promotion_member').append(`<div class="notifica-not-found text-center">
                               Không có mã khả dụng
                           </div>`);*/
                        $('#div_promotion_member').append(tmpHtml);
                    };
                    ListeningEventClickQuestionIcon();
                }
                else {
                    shop = 1;
                    isMaximumPromotionMember = true;
                    $('#btn_promotion_member_load_more').hide();
                    $('#div_promotion_member').html(
                        `<div class="notifica-not-found text-center">
                            Không có mã nào trong ví
                        </div>`);
                }

                if (maxPromotionMember === null)
                    maxPromotionMember = parseInt(response.data2nd);

                if (countPromotionMember >= maxPromotionMember) {
                    isMaximumPromotionMember = true;
                    $('#btn_promotion_member_load_more').hide();
                }
            },
            error: function (err) {
                isLoadingFlagPromotionMember = false;
                laddaLoad.stop();
                $('#btn_promotion_member_load_more').attr('disabled', false);
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    } catch (e) {
        isLoadingFlagPromotionMember = false;
        laddaLoad.stop();
        $('#btn_promotion_member_load_more').attr('disabled', false);
    }
}

function ChoosePromotion(elm, code, isMange) {
    switch (isMange) {
        case 'admin':
            $('.btn_promotion_admin').removeClass('active');
            $('.btn_promotion_admin').text('CHỌN');
            $('.btn_promotion_admin').attr('onclick', `ChoosePromotion(this, '${code}', '${isMange}')`);
            break;
        case 'member':
            $('.btn_promotion_member').removeClass('active');
            $('.btn_promotion_member').text('CHỌN');
            $('.btn_promotion_member').attr('onclick', `ChoosePromotion(this, '${code}', '${isMange}')`);
            break;
        default: break;
    }
    $(elm).addClass('active');
    $(elm).text('ĐÃ CHỌN');
    $(elm).attr('onclick', `RemoveChoose(this, '${code}', '${isMange}')`);
}

function RemoveChoose(elm, code, isMange) {
    $(elm).removeClass('active');

    $(elm).text('CHỌN');
    $(elm).attr('onclick', `ChoosePromotion(this, '${code}', '${isMange}')`);
}

function ShowModalPromotionList(elm, supplierId, shopCode) {
    ShowOverlay3Dot(elm);
    HideOverlay3Dot(elm);

    LoadListPromotionAdmin(1, supplierId);
    LoadListPromotionMember(1, supplierId);

    setTimeout(function () {
        if (shop == 1 && admin == 1) {
            $('#btn_submit_apply_promotion').hide();
            $('#modal_promotion_list').modal('show');
        }
        else {
            $('#btn_submit_apply_promotion').show();
            $('#modal_promotion_list').modal('show');
        }
    }, 300)
    $('#input_supplier_id').val(supplierId)
    $('#input_shop_code').val(shopCode)
}

function DisposePromotion(elm, code, isMange, supplierId) {
    var id = $(elm).attr("data-id");
    swal.fire({
        title: "Xác nhận bỏ chọn mã khuyến mãi này?",
        text: "",
        type: "question",
        showCancelButton: !0,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonClass: "btn btn-success mt-2",
        cancelButtonClass: "btn btn-outline-secondary ml-2 mt-2",
        buttonsStyling: !1,
        showLoaderOnConfirm: true,
        inputAttributes: {
            id: `input_code_swal_${code}`,
            value: `${id}`,
        },
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                ShowOverlay('#zoneCart');
                /* if (listDiscountSupplier.includes(code)) {
                     $(`#item_${code}`).remove();
                     RemoveElementInArray(sequencePromotionExclude, code)
                     console.log(sequencePromotionExclude);
                 }*/
                /* sequencePromotionExclude.forEach(function (item) {
                     if (sequencePromotionExclude.includes(item)) {
                         RemoveElementInArray(sequencePromotionExclude, item)
                     }
                 })*/

                promotionCodeApply.forEach(function (value) {
                    if (value.promotionCode == code) {
                        RemoveElementInArray(promotionCodeApply, value)
                    }
                })


                //List Promotion to Submit
                listDiscountSupplier.forEach(function (item) {
                    if (item.promotionCode == code) {
                        $(`#item_${code}`).remove();
                        RemoveElementInArray(sequencePromotionExclude, item.promotionCode)
                        RemoveElementInArray(listDiscountSupplier, item);
                    }
                })


                $(elm).removeClass('active');

                $(elm).text('CHỌN');
                $(elm).attr('onclick', `ChoosePromotion(this, '${code}', '${isMange}')`);

                setTimeout(function () {
                    RefreshTotalPay(supplierId, id);
                    TotalMustPay();
                    HideOverlay('#zoneCart')
                }, 800)
            });
        }
    });

    /*  RefreshTotalPay();
      TotalMustPay();*/
}

function ApplyPromotion(elm) {

    let promotionCode = [];
    let listCartId = [];
    $.each($('.copy-button .copybtn.active'), function () {
        promotionCode.push($(this).attr('data-code'));
    });
    var supplierId = $('#input_supplier_id').val();
    cartItemData.forEach((item, index) => {
        if (item.supplierId == supplierId) {
            item.productItem.forEach((value) => { listCartId.push(value.cartId); });
        }
    });

    if (listCartId.length == 0) {
        ShowToastNoti('info', '', 'Không có sản phẩm nào trong giỏ của bạn');
        return false;
    }

    if (promotionCode.length == 0) {
        $('#modal_promotion_list').modal('hide');
        return false;
    }
    let laddaLoad = Ladda.create($(elm)[0]);
    laddaLoad.start();
    $.ajax({
        type: 'POST',
        url: '/PromotionApply/ApplyCode',
        data: {
            promotionCode: promotionCode.toString(),
            listCartId: listCartId.toString(),
            supplierId: SUPPLIER_ID
        },
        success: function (response) {
            laddaLoad.stop();
            if (response.result === -1 || response.data == null) {
                CheckResponseIsSuccess(response);
                return false;
            }
            let isSuccess = true;
            let messageFail = '';
            let listPromotionSuccess = [];
            var discount = 0;
            response.data.forEach(function (item) {
                if (item.result === 0) {
                    isSuccess = false;
                    messageFail += item.promotionCode + ': ' + item.message + '</br>';
                } else {
                    listPromotionSuccess.push({
                        supplierId: supplierId,
                        promotionCode: item.promotionCode,
                        discount: item.totalDiscountForThisCode,
                        isManage: item.isManage,
                    });

                    listDiscountSupplier.push({
                        supplierId: supplierId,
                        promotionCode: item.promotionCode,
                        discount: item.totalDiscountForThisCode,
                        isManage: item.isManage,
                    });
                }
            });
            if (!isSuccess) {
                ShowToastNoti('warning', '', messageFail, 4000);
                return false;
            }

            promotionCodeApply = listPromotionSuccess;
            promotionCodeApply.forEach(function (item) {
                if (!sequencePromotionExclude.includes(item.promotionCode)) {
                    sequencePromotionExclude.push(item.promotionCode)
                }
            })

            RefreshTotalPay();
            TotalMustPay();
            $('#modal_promotion_list').modal('hide');
        },
        error: function (err) {
            laddaLoad.stop();
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function GetListCategoryIdCart(supplierId) {
    let data = [];
    /*for (var i = 0; i < cartItemData.length; i++) {
        cartItemData[i].productItem.forEach(function (item) {
            data.push(item.categoryId);
        });
    }
    return data.filter(DistinctArr);*/
    for (var i = 0; i < cartItemData.length; i++) {
        if (cartItemData[i]['supplierId'] == supplierId) {
            cartItemData[i].productItem.forEach(function (item) {
                {
                    data.push(item.categoryId)
                }
            })
        }
    }
    return data;
}

function GetListProductIdCart(supplierId) {
    let data = [];
    /*for (var i = 0; i < cartItemData.length; i++) {
        cartItemData[i].productItem.forEach(function (item) {
            data.push(item.id);
        });
    }
    return data.filter(DistinctArr);*/
    for (var i = 0; i < cartItemData.length; i++) {
        if (cartItemData[i]['supplierId'] == supplierId) {
            cartItemData[i].productItem.forEach(function (item) {
                {
                    data.push(item.id)
                }
            })
        }
    }
    return data;
}

//Liên kết GHN
function GetAddressGHN(token, numberOrder, shopId, carrierId, shopCode) {
    console.log(addressCustomer);
    var address = JSON.parse(addressCustomer);
    if (!IsNullOrEmty(address.provinceName) && !IsNullOrEmty(address.districtName)) {
        $.ajax({
            type: 'POST',
            url: '/Checkout/GetAddressGNH',
            data: {
                token: token,
                shopId: shopId
            },
            success: function (response) {
                if (response.result === -1 || response.data == null) {
                    CheckResponseIsSuccess(response);
                    return false;
                }

                let isSuccess = true;
                let messageFail = '';
                GetServiceGHN(token, numberOrder, shopId, shopCode, response.data.district_id, address.provinceName, address.districtName, address.wardName, carrierId)
                if (!isSuccess) {
                    ShowToastNoti('warning', '', messageFail, 4000);
                    return false;
                }
            },
            error: function (err) {
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    }
    else {
        ShowToastNoti('warning', '', 'Vui lòng chọn địa chỉ nhận hàng !!', 4000);
    }
}

function GetServiceGHN(token, numberOrder, shopId, shopCode, fromDistrict, provinceName, districtName, wardName, carrierId) {
    $.ajax({
        type: 'POST',
        url: '/Checkout/GetServiceGNH',
        data: {
            token: token,
            shop_id: shopId,
            from_district: fromDistrict,
            provinceName: provinceName,
            districtName: districtName
        },
        success: function (response) {
            if (response.result === -1 || response.data == null) {
                CheckResponseIsSuccess(response);
                return false;
            }
            dataOptionGHN = response.data
            FeeShipGHN(dataOptionGHN, numberOrder, shopId, shopCode, fromDistrict, provinceName, districtName, wardName, carrierId)
            let isSuccess = true;
            let messageFail = '';

            if (!isSuccess) {
                ShowToastNoti('warning', '', messageFail, 4000);
                return false;
            }
        },
        error: function (err) {
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function FeeShipGHN(data, numberOrder, shopId, shopCode, fromDistrict, provinceName, districtName, wardName, carrierId) {
    var totalWeight = 0;
    var totalWidth = 0;
    var totalHeight = 0;
    var totalLength = 0;

    cartItemData[numberOrder].productItem.forEach(function (item) {
        /* console.log("-----Đơn hàng---");*/
        totalWeight += (item.productPriceObj?.weight ?? 0) * 1000 * item.quantity;
        totalWidth += (item.productPriceObj?.width ?? 0) * item.quantity;
        totalHeight += (item.productPriceObj?.height ?? 0) * item.quantity;
        totalLength += (item.productPriceObj?.length ?? 0) * item.quantity;
    })
    if (totalWeight != 0) {
        if (totalWeight <= 1600000) {
            data.forEach(function (item) {
                IntGetFee(item, numberOrder, shopId, shopCode, fromDistrict, provinceName, districtName, wardName, totalWeight, totalWidth, totalHeight, totalLength, carrierId);
            })
        }
        else {
            ShowToastNoti('warning', `Đơn hàng của shop ${cartItemData[numberOrder].shopName} vượt quá khối lượng tối đa của GHN`, `Khối lượng ước tính của đơn hàng: ${totalWeight / 1000}kg<br/>Khối lượng tối đa của GHN: 1600kg`, 5000);
            $btnPlaceOrder.attr('disabled', 'disabled');
            return false;
        }
    }
    else {
        $btnPlaceOrder.attr('disabled', false);
        ShowToastNoti('info', `Không thể tính phí ship sản phẩm của shop ${cartItemData[numberOrder].shopName}`, 'Phí ship sẽ được tính sau khi admin vận đơn bạn nhé!', 8000);
        $(`.div_alert_not_connect_delivery_${numberOrder}`).html(`<p class="text-danger">Khối lượng của sản phẩm này nhỏ hơn 0Kg, hệ thống không thể tính phí ship, phí ship sẽ được tính sau khi admin vận đơn bạn nhé!</p>`)
        return false;
    }

}

function IntGetFee(item, numberOrder, shopId, shopCode, fromDistrict, provinceName, districtName, wardName, totalWeight, totalWidth, totalHeight, totalLength, carrierId) {
    $btnPlaceOrder.attr('disabled', true);
    RawUIDeliveryOption(1, shopId, carrierId, []);
    $.ajax({
        type: 'POST',
        url: '/Checkout/GetFeeGHN',
        data: {
            token: _tokenLrGHN,
            shop_id: shopId,
            service_id: item.service_id,
            service_type_id: item.service_type_id,
            insurance_value: 0,
            from_district_id: fromDistrict,
            provinceName: provinceName,
            districtName: districtName,
            wardName: wardName,
            weight: totalWeight,
            length: totalLength,
            width: totalWidth,
            height: totalHeight,
            cod_value: 0,
        },
        success: function (response) {
            if (response.result === -1 || response.data == null) {
                CheckResponseIsSuccess(response);
                return false;
            }

            var data = response.data;
            listFeeShip.push({
                shopCode: shopCode,
                feeShip: data.service_fee
            })

            let arrGHN = [];
            dataOptionGHN.forEach(function (item) {
                arrGHN.push({
                    name: item.short_name,
                    serviceOption: "",
                    fee: data.service_fee,
                    deliveryDate: "",
                })
            })
            /*var shopId = cartItemData[0].code*/

            if (IsNullOrEmty(cartItemData[numberOrder].code)) {
                ShowToastNoti('warning', '', 'Không tìm thấy shopId của GHN', 4000);
            }
            else {
                RawUIDeliveryOption(0, cartItemData[numberOrder].code, carrierId, arrGHN);
            }
            let isSuccess = true;
            let messageFail = '';

            if (!isSuccess) {
                ShowToastNoti('warning', '', messageFail, 4000);
                return false;
            }
        },
        error: function (err) {
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function FindItemByKeyValueInArrayObjToGetDiscount(arr, key, value) {
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] == value) return arr[i]['discount'];
        }
    }
    return null;
}

function FindItemByKeyValueInArrayToGetPromotionCode(arr, key, value) {
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key] == value) return arr[i]['promotionCode'];
        }
    }
    return null;
}

function FindItemInArrayWithoutKey(arr, key, value) {
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == value) return arr[i];
        }
    }
    return null;
}

function FindItemByKeyValueInArrayToGetSupplierId(arr, key, value) {
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == value) return arr[i]['supplierId'];
        }
    }
    return null;
}

function LoadListSupplier() {
    let pronvinceId = $("#addressDeliveryProvinceId").val();
    if (pronvinceId == 0 || IsNullOrEmty(pronvinceId)) {
        return $('#ul_data_supplier').html("<strong class='text-center text-danger'>Vui lòng chọn địa chỉ nhận ở BƯỚC 1</strong>" + _imgNotFoundHtml);
    }
    try {
        $.ajax({
            type: 'GET',
            url: '/Checkout/GetListByArea',
            data: {
                provinceId: pronvinceId
            },
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("ul_data_supplier").innerHTML = ` 
                       <div class="text-center p-2" >
                                <i type="button" class="fa fa-refresh"
                                    style="border-radius:4px;font-size:24px;"
                                    onclick="LoadListSupplier();ShowOverlayLoadingButton(this);">
                                </i>
                        </div >`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, item) {
                        tmpHtml +=
                            `<li class="list-group-item btn_supplier" for="btn_choose_supplier_${item.id}">
                               <div class="media">
                                     <div class="text-center">
                                         <div class="form-check">
                                             <input class="form-check-input" type="radio" name="inputChooseShop" data-id="${item.id}" id="btn_choose_supplier_${item.id}">
                                             <label class="form-check-label" for="btn_choose_supplier_${item.id}">
                                                 <div class="media-body mx-2 text-left">
                                                     <a for="btn_choose_supplier_${item.id}" class="fw-bold fs-6">${item.name ?? ''}</a>
                                                     <p style="line-height:normal" for="btn_choose_supplier_${item.id}" class="fs-6 mb-0"><strong><i class="fa fa-map-marker text-danger fs-6"></i> </strong> ${item.addressText ?? ""}, ${item.wardName ?? ""}, ${item.districtName ?? ""} ${item.countryName ?? ""}</p>
                                                 </div>
                                             </label>
                                         </div>
                                     </div>
                                 </div>
                            </li>`;
                    });
                    $('#ul_data_supplier').html(tmpHtml);
                }
                else {
                    let defaultSupplierAdmin =
                        `<li class="list-group-item btn_supplier" for="btn_choose_supplier_1">
                               <div class="media">
                                     <div class="text-center">
                                         <div class="form-check">
                                             <input class="form-check-input" type="radio" name="inputChooseShop" data-id="1" id="btn_choose_supplier_1">
                                             <label class="form-check-label" for="btn_choose_supplier_1">
                                                 <div class="media-body mx-2 text-left">
                                                     <a for="btn_choose_supplier_1" class="fw-bold fs-6">CÔNG TY CỔ PHẦN TẬP ĐOÀN GEMS</a>
                                                     <p style="line-height:normal" for="btn_choose_supplier_1" class="fs-6 mb-0"><strong><i class="fa fa-map-marker text-danger fs-6"></i> 3/21 Đường 37, Phường Hiệp Bình Chánh, Thành phố Thủ Đức, Thành phố Hồ Chí Minh</strong></p>
                                                 </div>
                                             </label>
                                         </div>
                                     </div>
                                 </div>
                            </li>`
                    $('#ul_data_supplier').html(defaultSupplierAdmin);
                }
                $('input[name="inputChooseShop"]:first').click();
            },
            error: function (error) {
                document.getElementById("ul_data_supplier").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListSupplier();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load supplier!");
            }
        });
    } catch (e) {
        document.getElementById("ul_data_supplier").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListSupplier();ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load supplier!");
    }
}

//function HandleClickSupplier(elm,id) {

//}