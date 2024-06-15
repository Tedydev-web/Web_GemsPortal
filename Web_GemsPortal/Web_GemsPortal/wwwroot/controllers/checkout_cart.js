var $btnConfrim = $('#btn-comfirm');
var taskUpdateQuantity, flagQuantityId;
const MAX_QUANTITY = 999;

function tableDataHtml(data) {
    //Get header
    let thead =
        `<div class="col-sm-12 table-responsive-xs">
            <table class="table cart-table tableHeader">
                <thead>
                    <tr class="table-head">
                        <th scope="col" style="padding-left:0">
                            <input class="checkbox-effect checkbox-effect-1" id="table-checkAll" type="checkbox" hidden />
                            <label class="mb-0" for="table-checkAll" hidden>Tất cả</label>
                        </th>
                        <th scope="col" class="d-none d-md-table-cell">Sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thành tiền</th>
                        <th scope="col" style="width: 10px !important;padding-left:0;padding-right:0;">
                            <a href="javascript:void(0)" class="icon" onclick="DeleteMulti()" title="Xoá mục đã chọn">
                                <i class="ti-trash"></i>
                            </a>
                        </th>
                    </tr>
                </thead>
            </table>
        </div>`;

    //Get record
    var shopItem = '';
    var productItem = '';
    var shopUrl = '', shopId = 0;
    $.each(data, function (key, value) {
        productItem = '';
        shopUrl = IsNullOrEmty(value.shopUrl) ? "#" : value.shopUrl;
        shopId++;
        value.productItem.forEach(function (item, index) {
            let typeNameTmp = '', sizeTmp = '', colorTmp = '', priceDiscount = 0, priceTmp = '', discountTmp = '', totalPriceTmp = '', unitNameTmp = '', isDisabled = false;
            if (item.status !== 1) isDisabled = true;
            let productPriceObj = item.productPriceObj;
            if (productPriceObj == null) {
                isDisabled = true;
            } else {
                if (productPriceObj.status !== 1) isDisabled = true;
                priceDiscount = productPriceObj.discount > 0 ? (productPriceObj.priceOut - productPriceObj.discount) : productPriceObj.priceOut;
                priceTmp = productPriceObj.discount > 0 ? CalDiscountPrice(productPriceObj.priceOut, productPriceObj.discount) : FormatToVNDCustom(productPriceObj.priceOut);
                discountTmp = productPriceObj.discount > 0 ? `<del>${FormatToVNDCustom(productPriceObj.priceOut)}</del>` : "";
                typeNameTmp = IsNullOrEmty(productPriceObj?.typeName) ? "" : productPriceObj?.typeName;
                totalPriceTmp = FormatToVNDCustom(priceDiscount * item.quantity);
            }
            sizeTmp = item.sizeName != null && item.sizeName.length > 30 ? item.sizeName.substring(0, 30) + "..." : item.sizeName;
            colorTmp = item.colorName != null && item.colorName.length > 30 ? item.colorName.substring(0, 30) + "..." : item.colorName;
            productItem +=
                ` <tr class="productItem ${isDisabled ? "disabled" : ""}" data-id="${item.cartId}">
                    <td class="col-2 d-flex align-items-center" style="padding-left:12px;">
                        <input class="checkbox-effect checkbox-effect-1 checkItemShop checkShop_${shopId}" data-shop-id="${shopId}" data-sup="${value.id}" ${isDisabled ? "disabled" : ""} id="product_${item.cartId}" type="checkbox" />
                        <label class="label_checkbox mb-0" for="product_${item.cartId}"> </label>
                        <a href="/san-pham/${item.nameSlug}-${item.id}"><img src="${item.imageUrl}" alt="${item.name}" class="img-fluid" loading="lazy" style="width:80px;height:80px;" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';"></a>
                    </td>
                    <td class="col-10" data-id="1">
                        <a href="/san-pham/${item.nameSlug}-${item.id}" style="padding-right:10px;">
                            <div class="desktop-div-custom">
                                <h5 class="sp-line-3">${item.name}</h5>
                                ${!IsNullOrEmty(typeNameTmp) ? `<span class="col-auto badge badge-success">${typeNameTmp}</span>` : ""}
                                ${!IsNullOrEmty(unitNameTmp) ? `<span class="col-auto badge badge-success">${unitNameTmp}</span>` : ""}
                                ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                                ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                            </div>
                            <div class="mobile-cart-content row">
                                <span class="col-12">
                                <h5 class="sp-line-3">${item.name}</h5></span>
                                ${!IsNullOrEmty(typeNameTmp) ? `<span class="col-auto badge badge-success">${typeNameTmp}</span>` : ""}
                                ${!IsNullOrEmty(unitNameTmp) ? `<span class="col-auto badge badge-success">${unitNameTmp}</span>` : ""}
                                ${!IsNullOrEmty(sizeTmp) ? `<span class="col-auto badge badge-grey-color">${sizeTmp}</span>` : ""}
                                ${!IsNullOrEmty(colorTmp) ? `<span class="col-auto badge badge-default">${colorTmp}</span>` : ""}
                            </div>
                        </a>
                        <div class="mobile-cart-content row">
                            <div class="col">
                                <div class="qty-box">
                                    <div class="input-group group-quantity-custom">
                                        <span class="input-group-prepend">
                                            <button type="button" ${isDisabled ? "disabled" : ""} class="btn btn-sm quantity-left-minus p-1" data-id="${item.cartId}" data-type="minus" data-field="">
                                                <i class="ti-angle-left"></i>
                                            </button>
                                        </span>
                                        <input type="text" name="quantity" ${isDisabled ? "readonly" : ""} data-id="${item.cartId}" max="${item.supplyQuantity > 0 ? item.supplyQuantity : MAX_QUANTITY}" style="width:50px;" old-value="${item.quantity}"
                                                class="qty-input-card form-control form-control-sm input-number quantity_${item.cartId}" onchange="OnChangeRangeQuantityWithMinMax(this)" onkeypress="return IsNumberKey(event)" value="${item.quantity}">
                                        <span class="input-group-prepend">
                                            <button type="button" ${isDisabled ? "disabled" : ""} class="btn btn-sm quantity-right-plus p-1" data-id="${item.cartId}" data-type="plus" data-field="">
                                                <i class="ti-angle-right"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                ${discountTmp}
                                <h5 class="td-color fs-4 my-2">
                                    ${priceTmp}
                                </h5>
                            </div>
                        </div>
                        <div class="mobile-cart-content" style="max-width:24px;position:absolute;z-index:90;right:4px;top:-3px;">
                            <h2 class="td-color">
                                <a href="javascript:void(0)" class="icon delete" onclick="Delete(${item.cartId})"> <i class="ti-trash"></i></a>
                            </h2>
                        </div>
                    </td>
                    <td class="td_hidden_when_mobile">
                        ${discountTmp}
                        <h5 id="price_${item.cartId}">${priceTmp}</h5>
                    </td>
                    <td class="td_hidden_when_mobile">
                        <div class="qty-box">
                            <div class="input-group group-quantity-custom">
                                <span class="input-group-prepend">
                                    <button type="button" ${isDisabled ? "disabled" : ""} class="btn btn-sm quantity-left-minus p-1" data-id="${item.cartId}" data-type="minus" data-field="">
                                        <i class="ti-angle-left"></i>
                                    </button>
                                </span>
                                <input type="text" name="quantity" ${isDisabled ? "readonly" : ""} data-id="${item.cartId}" max="${item.supplyQuantity > 0 ? item.supplyQuantity : MAX_QUANTITY}" style="width:50px;" old-value="${item.quantity}"
                                        class="qty-input-card form-control form-control-sm input-number quantity_${item.cartId}" onchange="OnChangeRangeQuantityWithMinMax(this)" onkeypress="return IsNumberKey(event)" value="${item.quantity}">
                                <span class="input-group-prepend">
                                    <button type="button" ${isDisabled ? "disabled" : ""} class="btn btn-sm quantity-right-plus p-1" data-id="${item.cartId}" data-type="plus" data-field="">
                                        <i class="ti-angle-right"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </td>
                    <td class="td_hidden_when_mobile">
                        <h5 class="td-color totalItem" data-id="${item.cartId}" id="totalItem_${item.cartId}">${totalPriceTmp}</h5>
                    </td>
                    <td class="td_hidden_when_mobile"><a href="javascript:void(0)" class="icon" onclick="Delete(${item.cartId})"><i class="ti-trash"></i></a></td>
                </tr>`;
        });

        shopItem +=
            `<div class="col-sm-12 table-responsive-xs card-checkout-custom zoneShop">
                <div style="padding:6px 12px 6px 12px;">
                    <input type="checkbox" class="checkbox-effect checkbox-effect-1 checkAllShop" data-id="${shopId}" id="check-shopAll_${shopId}" />
                    <label class="mb-0" for="check-shopAll_${shopId}"><b class="text-success">${value.shopName}</b><a style="padding-left:6px;" href="${shopUrl}"><i class="fa fa-link"></i></a></label>

                </div>
                <table class="table cart-table">
                    <tbody>
                        <tr>
                            ${productItem}
                        </tr>
                    </tbody>
                </table>
            </div>`;
    });

    //Get footer
    var tfoot =
        ` <div class="col-sm-12 table-responsive-xs">
                <div class="table-responsive-md">
                    <table class="table cart-table ">
                        <tfoot>
                            <tr>
                                <td class="pr-0 pt-2">Tổng cộng:</td>
                                <td class="pr-0 pt-2">
                                    <h2 class="text-lowercase text-success" id="totalPay">0đ</h2>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>`;
    return `${thead} ${shopItem} ${tfoot}`;
}

$(document).ready(function () {

    LoadListCart();

});

function RunJs() {

    //Disabled item
    $('.productItem.disabled').on('click', '.label_checkbox,button,input', function () {
        swal.fire("Sản phẩm này đã không còn mở bán!", "", "info");
    });

    //On check box
    $('#cart-section .checkbox-effect').change(function (e) {
        RefreshTotalPay();
    });

    //Check all item
    //$('#table-checkAll').change(function (e) {
    //    var $this = $(this);
    //    if ($this.is(':checked')) {
    //        $('.checkbox-effect:not(:disabled)').prop('checked', true);
    //    } else {
    //        $('.checkbox-effect').prop('checked', false);
    //    }
    //    RefreshTotalPay();
    //});

    //Check all in shop
    $('#cart-section .checkAllShop').change(function (e) {
        var $this = $(this);
        let id = $this.data('id');
        $(`.checkItemShop:not([data-shop-id="${id}"])`).prop('checked', false);
        $(`.checkAllShop:not([data-id="${id}"])`).prop('checked', false);
        if ($this.is(':checked')) {
            $(`.checkShop_${id}:not([disabled])`).prop('checked', true);
        } else {
            $('.checkShop_' + id).prop('checked', false);
        }
        RefreshTotalPay();
    });

    //Check item in shop
    $('#cart-section .checkItemShop').change(function (e) {
        var $this = $(this);
        let id = $this.data('shop-id');
        $(`.checkItemShop:not([data-shop-id="${id}"])`).prop('checked', false);
        $(`.checkAllShop:not([data-id="${id}"])`).prop('checked', false);
        RefreshTotalPay();
    });

    //Quantity handle event
    $('#cart-section .quantity-right-plus').on('click', function () {
        let id = $(this).data('id');
        var $qty = $('.quantity_' + id);
        if (parseInt($qty.val()) === parseInt($qty.attr('max')))
            return;
        var value = parseInt($qty.val()) + 1;
        var currentVal = parseInt($qty.val(), 10);
        if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
        }

        if (flagQuantityId == id) {
            clearTimeout(taskUpdateQuantity);
        }
        flagQuantityId = id;
        taskUpdateQuantity = setTimeout(function () {
            UpdateQuantity(id, value)
        }, 600);
    });
    $('#cart-section .quantity-left-minus').on('click', function () {
        let id = $(this).data('id');
        var $qty = $('.quantity_' + id);
        if (parseInt($qty.val()) === 1)
            return;
        var value = parseInt($qty.val()) - 1;
        var currentVal = parseInt($qty.val(), 10);
        if (!isNaN(currentVal) && currentVal > 1) {
            $qty.val(currentVal - 1);
        }

        if (flagQuantityId == id) {
            clearTimeout(taskUpdateQuantity);
        }
        flagQuantityId = id;
        taskUpdateQuantity = setTimeout(function () {
            UpdateQuantity(id, value);
        }, 600);
    });
    $('#cart-section .input-number').on('change', function () {
        let value = $(this).val();
        let id = $(this).data('id');
        $('.quantity_' + id).val(value);

        if (flagQuantityId == id) {
            clearTimeout(taskUpdateQuantity);
        }
        flagQuantityId = id;
        var taskUpdateQuantity = setTimeout(function () {
            UpdateQuantity(id, value)
        }, 600);
    });

    //Button submit cart
    $btnConfrim.on('click', function () {
        var checkedData = getCheckedRow();
        if (checkedData.length > 0) {
            let sup = $('.checkItemShop:checked').data('sup');
            location.href = `/checkout/check?i=${JSON.stringify(checkedData)}&sup=${sup}`;
        } else {
            ShowToastNoti('info', '', 'Bạn chưa chọn sản phẩm để mua');
        }
    });
}

//Get data checked
function getCheckedRow() {
    var data = [];
    $('#cart-section table tbody tr').each(function (i) {
        if ($(this).find('.checkbox-effect').is(':checked')) {
            data.push($(this).data('id'));
        }
    });
    return data;
}

//Raw html no data
function NoneRecord() {
    var html = `<div class="col-sm-12 text-center">
                    <img src="/assets/images/empty-cart.png" style="width:150px;" alt="No data" />
                    <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                </div>`;
    $('#zoneCard').html(html);
    $btnConfrim.attr('disabled', 'disabled');
}

//Load list cart
function LoadListCart() {
    try {
        ShowOverlayLoadingButton('#zoneCard');
        $.ajax({
            type: 'GET',
            url: '/Checkout/GetCartData',
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton('#zoneCard');
                //Check error code
                if (response.result !== 1) {
                    document.getElementById("zoneCard").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListCart();$(this).remove();">
                        </i>
                    </div>`;
                    CheckResponseIsSuccess(response);
                    return;
                }

                //Success
                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    document.getElementById("zoneCard").innerHTML = tableDataHtml(listData);
                    RefreshTotalPay();
                    RunJs();
                }
                else {
                    NoneRecord();
                }
            },
            error: function (error) {
                HideOverlayLoadingButton('#zoneCard');
                document.getElementById("zoneCard").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListCart();$(this).remove();">
                        </i>
                    </div>`;
                console.log("Error when load cart!");
            }
        });
    } catch (e) {
        HideOverlayLoadingButton('#zoneCard');
        document.getElementById("zoneCard").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListCart();$(this).remove();">
                        </i>
                    </div>`;
        console.log("Error when load cart!");
    }
}

//Update quantity
function UpdateQuantity(id, quantity) {
    var oldValue = $('.quantity_' + id).attr('old-value');
    if (oldValue == quantity)
        return;
    $.ajax({
        type: 'POST',
        url: '/Checkout/UpdateQuantity',
        data: {
            id: id,
            quantity: quantity
        },
        dataType: 'json',
        success: function (response) {
            //Check error code
            if (response.result !== 1) {
                CheckResponseIsSuccess(response);
                $('.quantity_' + id).val(oldValue);
                return;
            }
            //Set new pay
            $('.quantity_' + id).attr('old-value', quantity);
            CalPayOneItem(id, quantity);
            RefreshTotalPay();
        },
        error: function (err) {
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

//Delete
function Delete(id) {
    swal.fire({
        title: "Bạn có muốn xóa sản phẩm này?",
        text: "",
        type: "question",
        showCancelButton: !0,
        confirmButtonText: "Xóa",
        cancelButtonText: "Không",
        confirmButtonClass: "btn btn-danger mt-2",
        cancelButtonClass: "btn btn-light ml-2 mt-2",
        buttonsStyling: !1,
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: 'POST',
                    url: '/Checkout/Delete',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function (response) {
                        //Check error code
                        if (response.result !== 1) {
                            CheckResponseIsSuccess(response);
                            resolve();
                            return;
                        }
                        RemoveRowUI([id]);
                        CountShoppingCartItem();
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

//DeleteMulti
function DeleteMulti() {
    var dataId = getCheckedRow();
    if (dataId.length === 0) {
        ShowToastNoti("info", "", "Vui lòng chọn sản phẩm để xóa");
        return;
    }
    swal.fire({
        title: "Bạn có muốn xóa sản phẩm đã chọn?",
        text: "",
        type: "question",
        showCancelButton: !0,
        confirmButtonText: "Xóa",
        cancelButtonText: "Không",
        confirmButtonClass: "btn btn-danger mt-2",
        cancelButtonClass: "btn btn-light ml-2 mt-2",
        buttonsStyling: !1,
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: 'POST',
                    url: '/Checkout/DeleteMultiple',
                    data: {
                        id: JSON.stringify(dataId)
                    },
                    dataType: 'json',
                    success: function (response) {
                        //Check error code
                        if (response.result !== 1) {
                            CheckResponseIsSuccess(response);
                            resolve();
                            return;
                        }
                        RemoveRowUI(dataId);
                        CountShoppingCartItem();
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

function CalPayOneItem(id, quantity) {
    let priceValue = $('#price_' + id).text();
    let cal = FormatToVNDCustom(FormatToNumerCustom(priceValue) * parseInt(quantity));
    $('#totalItem_' + id).text(cal);
}

function CalDiscountPrice(num1, num2) {
    return FormatToVNDCustom(num1 - num2);
}

function RefreshTotalPay() {
    var totalPay = 0;
    $('#cart-section table tbody tr .totalItem').each(function (i) {
        if (getCheckedRow().indexOf(parseInt($(this).data('id'))) > -1)
            totalPay += FormatToNumerCustom($(this).text());
    });
    $('#totalPay').html(FormatToVNDCustom(totalPay));
}

function RemoveRowUI(arrId) {
    //Remove row
    $('#cart-section table tbody tr').each(function (i) {
        if (arrId.indexOf($(this).data('id')) > -1) {
            $(this).remove();
        }
    });

    //Check shop zone
    $('#cart-section .zoneShop').each(function (i) {
        let productItem = $(this).find('.productItem');
        if (productItem.length === 0) {
            $(this).remove();
        }
    });

    //Check all cart
    if ($('#cart-section').find('.zoneShop').length === 0) {
        NoneRecord();
    }

    RefreshTotalPay();
}

function FormatToVNDCustom(value) {
    if (IsNullOrEmty(value))
        return "NaN";
    return value.toLocaleString('vi', { style: 'currency', currency: 'VND' }).replace(/\s₫/g, 'đ');
}

function FormatToNumerCustom(value) {
    return Number(value.replace(/[^0-9,-]+/g, ""));
}

function OnChangeRangeQuantityWithMinMax(elm) {
    let min = 1;
    let max = parseInt($(elm).attr('max'));
    if ($(elm).val() > max) {
        $(elm).val(max);
    } else if ($(elm).val() < min) {
        $(elm).val(min);
    }
}
