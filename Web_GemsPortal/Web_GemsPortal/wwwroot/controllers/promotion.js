const DAY_WARNING_EXPIRED = 2;

$('.banner_top').slick({
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
});

$('.banner_mid').slick({
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
});

$('.voucher_aft,.coupon_aft').slick({
    variableWidth: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 3000,
    dots: false,
    arrows: true,
    prevArrow: '<button class="slide-arrow prev-arrow"><i class="fa fa-angle-left"></i></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><i class="fa fa-angle-right"></i></button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

$(document).ready(function () {
    ListeningEventClickQuestionIcon();
    LoadListVoucherMember(1);
    LoadListCouponMember(1);
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


var pageVoucherMember = 1;
var countVoucherMember = 0;
var maxVoucherMember = null;
var isMaximumVoucherMember = false;
var isLoadingFlagVoucherMember = false;
var timeFirstLoadVoucherMember = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');

function LoadListVoucherMember(reset = 0) {
    if (reset === 1) {
        pageVoucherMember = 1, countVoucherMember = 0, isMaximumVoucherMember = false; maxVoucherMember = null;
        timeFirstLoadVoucherMember = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
        $('#div_voucher_member').empty();
    }

    try {
        //if (countVoucherMember !== 0) $("html, body").animate({ scrollTop: $(document).height() }, 0); //Go to bottom page if except first load
        isLoadingFlagVoucherMember = true;
        let laddaLoad = Ladda.create($('#btn_voucher_member_load_more')[0]);
        laddaLoad.start();
        $('#btn_voucher_member_load_more').attr('disabled', true);
        $.ajax({
            type: 'GET',
            url: '/Promotion/GetListPromotionMember',
            dataType: "json",
            data: {
                promotionType: "Voucher",
                page: pageVoucherMember,
                timer: timeFirstLoadVoucherMember,
            },
            success: function (response) {
                isLoadingFlagVoucherMember = false;
                laddaLoad.stop();
                $('#btn_voucher_member_load_more').attr('disabled', false);
                if (response.result !== 1) {
                    CheckResponseIsSuccess(response);
                    return;
                }
                pageVoucherMember++;
                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    var tmpHtml = '';
                    let imageSupplier = '';
                    let promotionConditionApply = '';
                    let timer = '';
                    let promotionCategoryProduct = '';
                    let btnSavePromotion = '';
                    countVoucherMember += listData.length; //Add countPosts
                    $.each(listData, function (key, value) {
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
                                            <b>${NumberWithCommas(item.voucherAmount, ',')}<sup>đ</sup></b>
                                            ${item.orderPriceThreshold > 0 ? `<span>Đơn hàng từ ${NumberWithCommas(item.orderPriceThreshold, ',')}<sup>đ</sup></span>` : ''}
                                        </p>
                                    </li>`;
                            });
                            promotionConditionApply = `<ul class="ul-list-promotion scrollbar style-1">${itemCondition}</ul>`;
                        }
                        
                        timer = HandleTimer(value.startDate, value.endDate);

                        promotionCategoryProduct = '';
                        if (value.promotionSupplierObj.length > 0 || value.promotionCategoryObj.length > 0 || value.promotionProductObj.length > 0) {
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
                                    <div class="card-body scrollbar style-1">${promotionCategory}${promotionProduct}</div>
                                </div>`;
                        }

                        if (PROMOTION_CODE_COLECTION.indexOf(value.promotionCode) === -1)
                            btnSavePromotion = `<button onclick="SavePromotionCode(this, '${value.promotionCode ?? ''}')" class="copybtn">THU THẬP</button>`;
                        else
                            btnSavePromotion = `<button disabled class="copybtn">ĐÃ THU THẬP</button>`;
                        tmpHtml =
                            `<div class="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                <div class="card-voucher card-purple-blue mb-3 ${value.limitNumber > 0 && value.limitNumber == value.usedNumber ? "disabled" : ""}">
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
                                        ${btnSavePromotion}
                                    </div>
                                </div>
                            </div>`;
                        $('#div_voucher_member').append(tmpHtml);
                    });
                    ListeningEventClickQuestionIcon();
                }
                else {
                    isMaximumVoucherMember = true;
                    $('#btn_voucher_member_load_more').hide();
                    document.getElementById("div_voucher_member").innerHTML = `
                        <div class="notifica-not-found text-center">
                            Không có khuyến mãi nào
                        </div>`;
                }

                if (maxVoucherMember === null)
                    maxVoucherMember = parseInt(response.data2nd);

                if (countVoucherMember >= maxVoucherMember) {
                    isMaximumVoucherMember = true;
                    $('#btn_voucher_member_load_more').hide();
                }
            },
            error: function (err) {
                isLoadingFlagVoucherMember = false;
                laddaLoad.stop();
                $('#btn_voucher_member_load_more').attr('disabled', false);
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    } catch (e) {
        isLoadingFlagVoucherMember = false;
        laddaLoad.stop();
        $('#btn_voucher_member_load_more').attr('disabled', false);
    }
}


var pageCouponMember = 1;
var countCouponMember = 0;
var maxCouponMember = null;
var isMaximumCouponMember = false;
var isLoadingFlagCouponMember = false;
var timeFirstLoadCouponMember = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');

function LoadListCouponMember(reset = 0) {
    if (reset === 1) {
        pageCouponMember = 1, countCouponMember = 0, isMaximumCouponMember = false; maxCouponMember = null;
        timeFirstLoadCouponMember = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS');
        $('#div_coupon_member').empty();
    }

    try {
        //if (countCouponMember !== 0) $("html, body").animate({ scrollTop: $(document).height() }, 0); //Go to bottom page if except first load
        isLoadingFlagCouponMember = true;
        let laddaLoad = Ladda.create($('#btn_coupon_member_load_more')[0]);
        laddaLoad.start();
        $('#btn_coupon_member_load_more').attr('disabled', true);
        $.ajax({
            type: 'GET',
            url: '/Promotion/GetListPromotionMember',
            dataType: "json",
            data: {
                promotionType: "Coupon",
                page: pageCouponMember,
                timer: timeFirstLoadCouponMember,
            },
            success: function (response) {
                isLoadingFlagCouponMember = false;
                laddaLoad.stop();
                $('#btn_coupon_member_load_more').attr('disabled', false);
                if (response.result !== 1) {
                    CheckResponseIsSuccess(response);
                    return;
                }
                pageCouponMember++;
                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    var tmpHtml = '';
                    let imageSupplier = '';
                    let promotionConditionApply = '';
                    let timer = '';
                    let promotionCategoryProduct = '';
                    countCouponMember += listData.length; //Add countPosts
                    $.each(listData, function (key, value) {
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
                                            <b>${item.couponPercent}%</b>
                                            ${item.orderPriceThreshold > 0 ? `<span>Đơn hàng từ ${NumberWithCommas(item.orderPriceThreshold, ',')}<sup>đ</sup></span>` : ''}
                                        </p>
                                    </li>`;
                            });
                            promotionConditionApply = `<ul class="ul-list-promotion scrollbar style-1">${itemCondition}</ul>`;
                        }

                        timer = HandleTimer(value.startDate, value.endDate);

                        promotionCategoryProduct = '';
                        if (value.promotionSupplierObj.length > 0 || value.promotionCategoryObj.length > 0 || value.promotionProductObj.length > 0) {
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
                                    <div class="card-body scrollbar style-1">${promotionCategory}${promotionProduct}</div>
                                </div>`;
                        }
                        if (PROMOTION_CODE_COLECTION.indexOf(value.promotionCode) === -1)
                            btnSavePromotion = `<button onclick="SavePromotionCode(this, '${value.promotionCode ?? ''}')" class="copybtn">THU THẬP</button>`;
                        else
                            btnSavePromotion = `<button disabled class="copybtn">ĐÃ THU THẬP</button>`;
                        tmpHtml =
                            `<div class="col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                <div class="card-voucher card-purple-blue mb-3 ${value.limitNumber > 0 && value.limitNumber == value.usedNumber ? "disabled" : ""}">
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
                                        ${btnSavePromotion}
                                    </div>
                                </div>
                            </div>`;
                        $('#div_coupon_member').append(tmpHtml);
                    });
                    ListeningEventClickQuestionIcon();
                }
                else {
                    isMaximumCouponMember = true;
                    $('#btn_coupon_member_load_more').hide();
                    document.getElementById("div_coupon_member").innerHTML = `
                        <div class="notifica-not-found text-center">
                            Không có khuyến mãi nào
                        </div>`;
                }

                if (maxCouponMember === null)
                    maxCouponMember = parseInt(response.data2nd);

                if (countCouponMember >= maxCouponMember) {
                    isMaximumCouponMember = true;
                    $('#btn_coupon_member_load_more').hide();
                }
            },
            error: function (err) {
                isLoadingFlagCouponMember = false;
                laddaLoad.stop();
                $('#btn_coupon_member_load_more').attr('disabled', false);
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    } catch (e) {
        isLoadingFlagCouponMember = false;
        laddaLoad.stop();
        $('#btn_coupon_member_load_more').attr('disabled', false);
    }
}


function SavePromotionCode(elm, code) {
    $(elm).attr('disabled', true);
    $.ajax({
        type: 'POST',
        url: '/Promotion/SavePromotionCode',
        dataType: "json",
        data: {
            code: code,
        },
        success: function (response) {
            $(elm).attr('disabled', false);
            if (response.result !== 1) {
                CheckResponseIsSuccess(response);
                return;
            }
            ShowToastNoti('success', '', 'Đã thêm vào bộ sưu tập Voucher/Coupon', 2000, 'bottomRight');
            $(elm).attr('disabled', true);
            $(elm).text('ĐÃ THU THẬP');
            $(elm).removeAttr('onclick');
        },
        error: function (err) {
            $(elm).attr('disabled', false);
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}