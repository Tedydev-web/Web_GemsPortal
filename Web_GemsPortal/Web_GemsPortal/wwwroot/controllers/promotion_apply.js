let isManage = -2;
var pagePromotionAdmin = 1;
var countPromotionAdmin = 0;
var maxPromotionAdmin = null;
var isMaximum = false;
var isLoadingFlag = false;
var timeFirstLoad = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
const DAY_WARNING_EXPIRED = 2;

$(document).ready(function () {

    LoadListData(1);

    $('.li_tab').on('click', function () {
        isManage = parseInt($(this).data('id'));
        pagePromotionAdmin = 1;
        LoadListData(1);
    });

    $('input[name="typeSearch"]').on('change', function () {
        isManage = parseInt($('.li_tab .nav-link.active').parent().data('id'));
        pagePromotionAdmin = 1;
        LoadListData(1);
    });

});

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

function dataParam() {
    return {
        isManage: isManage,
        typeSearch: $('input[name="typeSearch"]:checked').val(),
        page: pagePromotionAdmin,
        timer: timeFirstLoad,
    }
}

function LoadListData(reset = 0) {
    if (reset === 1) {
        pagePromotionAdmin = 1, countPromotionAdmin = 0, isMaximum = false; maxPromotionAdmin = null;
        timeFirstLoad = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
        $('#btn_load_more').show();
        $('#div_list_data').empty();
    }

    try {
        //if (count !== 0) $("html, body").animate({ scrollTop: $(document).height() }, 0); //Go to bottom page if except first load
        isLoadingFlag = true;
        let laddaLoad = Ladda.create($('#btn_load_more')[0]);
        laddaLoad.start();
        $('#btn_load_more').attr('disabled', true);
        ShowOverlay('#div_list_data');
        $.ajax({
            type: 'GET',
            url: '/PromotionApply/GetList',
            dataType: "json",
            data: dataParam(),
            success: function (response) {
                isLoadingFlag = false;
                laddaLoad.stop();
                $('#btn_load_more').attr('disabled', false);
                HideOverlay('#div_list_data');
                if (response.result !== 1) {
                    CheckResponseIsSuccess(response);
                    return;
                }
                pagePromotionAdmin++;
                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    var tmpHtml = '';
                    let imageSupplier = '';
                    let promotionConditionApply = '';
                    let timer = '';
                    let promotionCategoryProduct = '';
                    countPromotionAdmin += listData.length;
                    for (var i = 0; i < listData.length; i++) {
                        let value = listData[i].promotionObj;
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

                        tmpHtml =
                            `<div class="col-sm-6 col-md-4 d-flex justify-content-center" id="promotion_item_${listData[i].id}">
                                <div class="card-voucher ${value.isManage === 0 ? "card-purple-blue" : "card-green-blue"} mb-3 ${value.limitNumber > 0 && value.limitNumber == value.usedNumber ? "disabled" : ""}">
                                    ${promotionCategoryProduct}
                                    <a href="javascript:void(0)" onclick="Delete(${listData[i].id})" class="icon-delete-promotion"><i class="fa fa-trash" aria-hidden="true"></i></a>
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
                                        <button onclick="CopyText('${value.promotionCode ?? ''}')" class="copybtn">SAO CHÉP</button>
                                    </div>
                                </div>
                            </div>`;
                        $('#div_list_data').append(tmpHtml);
                    };
                    ListeningEventClickQuestionIcon();
                }
                else {
                    isMaximum = true;
                    $('#btn_load_more').hide();
                    document.getElementById("div_list_data").innerHTML = `
                        <div class="notifica-not-found text-center">
                            Không có mã nào trong ví
                        </div>`;
                }

                if (maxPromotionAdmin === null)
                    maxPromotionAdmin = parseInt(response.data2nd);

                if (countPromotionAdmin >= maxPromotionAdmin) {
                    isMaximum = true;
                    $('#btn_load_more').hide();
                }
            },
            error: function (err) {
                isLoadingFlag = false;
                laddaLoad.stop();
                $('#btn_load_more').attr('disabled', false);
                HideOverlay('#div_list_data');
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    } catch (e) {
        isLoadingFlag = false;
        laddaLoad.stop();
        $('#btn_load_more').attr('disabled', false);
    }
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

function Delete(id) {
    swal.fire({
        title: "Bạn có muốn mã khuyến mãi này khỏi ví của bạn?",
        text: "",
        type: "question",
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
                    url: '/PromotionApply/Delete',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function (response) {
                        if (!CheckResponseIsSuccess(response)) {
                            resolve();
                            return false;
                        }
                        $(`#promotion_item_${id}`).fadeOut(500);
                        setTimeout(function () {
                            $(`#promotion_item_${id}`).remove();
                        }, 500);
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
