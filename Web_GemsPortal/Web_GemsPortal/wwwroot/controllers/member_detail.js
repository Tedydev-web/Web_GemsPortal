
const RANGE_PAGE_DISPLAY = 5;
var pageProduct = 1;
let $countRecordsProductEl = $(".count_record_product");

var page = 1;
var countPosts = 0;
var maxPosts = null;
var currentSession = "";
var isMaximumRecords = false;
var isLoadingFlag = false;
const MAX_IMAGE_VIEW = 4;
const MAX_LENGTH_CONTENT_POST = 400;
var laddaSubmitFormFeedback;
let _productPriceArr = "";

try {
    $(`.gallery_certificate a`).simpleLightbox({
        loop: false,
        alertError: false,
        //alertErrorMessage: 'Ảnh bạn chọn bị lỗi, ảnh kế tiếp sẽ được tải (nếu có).',
    });
} catch (e) {

}

//On resize screen to set new width height ratio 1x1
window.addEventListener('resize', function (event) {
    var cw = $('.gallery .col-6').width();
    $('.gallery .col-6').css({ 'height': cw + 'px' });
}, true);

$(document.body).on('touchmove', OnScrollAppendData); // for mobile
$(window).scroll(OnScrollAppendData);
//document.addEventListener('touchmove', OnScrollAppendData);
//window.addEventListener('scroll', OnScrollAppendData);
//$(document).on('scroll', OnScrollAppendData);

function OnScrollAppendData() {
    if ((window.innerHeight + window.pageYOffset) >= (document.body.scrollHeight - 2) && !isLoadingFlag && !isMaximumRecords) {
        LoadListPost();
    }
}

$(document).ready(function () {

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

    //Init slick slide certificate
    $('.slick_certificate').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 2000,
    });


    //Init width height ratio 1x1
    var cw = $('.gallery .col-6').width();
    $('.gallery .col-6').css({ 'height': cw + 'px' });

    currentSession = $('#currentSession').val();

    //Find tab in url when load page
    //SwitchDataTab(location.search);

    ////Menu top click event
    //$('.menu-top-tab a').on('click', function (e) {
    //    e.preventDefault();
    //    let href = $(this).attr('href');
    //    if ($($(this).parent()).hasClass('active') || $(this).hasClass('active')) //Disabled click when tab is active
    //        return false;

    //    if ($(this).attr('data-toggle') === "dropdown") {
    //        console.log('dropdown view more click');
    //    } else {
    //        if (href !== "javascript:void(0)" && href !== "javascript:void(0);") {
    //            //Change url don't redirect
    //            ChangeURLWithOut($('title').text(), href);
    //            let targetId = $(this).data('target');
    //            if (!IsNullOrEmty(targetId)) {
    //                SwitchDataTab(location.search)
    //            }
    //        }
    //    }
    //});

    //-----------Feedback start-----------
    //Init validate form feedback
    $('#form_data_feedback').parsley();
    laddaSubmitFormFeedback = Ladda.create(document.querySelector('#btn_submit_form_feedbacl'));
    $('#form_data_feedback').on('submit', function (event) {
        event.preventDefault();
        let formElm = $('#form_data_feedback');
        let formDataElm = document.getElementById('form_data_feedback');
        let isvalidate = formElm[0].checkValidity();
        if (!isvalidate) { ShowToastNoti('warning', '', _resultActionResource.PleaseWrite); return false; }
        let formData = new FormData(formDataElm);
        laddaSubmitFormFeedback.start();
        $.ajax({
            url: formElm.attr('action'),
            type: formElm.attr('method'),
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                laddaSubmitFormFeedback.stop();
                if (response.result !== 1) {
                    CheckResponseIsSuccess(response);
                    return false;
                }
                $('#modal_feedback').modal('hide');
                $('#modal_send_success').modal('show');
                document.getElementById('form_data_feedback').reset();
                ChangeDescripRatingStart(parseInt($('input[name="RatingStart"]:checked').val()));
                RemoveClassValidate('#form_data_feedback');
            }, error: function (err) {
                laddaSubmitFormFeedback.stop();
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
        //grecaptcha.ready(function () {
        //    grecaptcha.execute(reCATPCHA_Site_Key, { action: 'submit' }).then(function (token) {
        //        // Add your logic to submit to your backend server here.
        //        document.getElementById("TokenReCAPTCHA").value = token;

        //        let formElm = $('#form_data_feedback');
        //        let formDataElm = document.getElementById('form_data_feedback');
        //        let isvalidate = formElm[0].checkValidity();
        //        if (!isvalidate) { ShowToastNoti('warning', '', _resultActionResource.PleaseWrite); return false; }
        //        let formData = new FormData(formDataElm);
        //        laddaSubmitFormFeedback.start();
        //        $.ajax({
        //            url: formElm.attr('action'),
        //            type: formElm.attr('method'),
        //            data: formData,
        //            contentType: false,
        //            processData: false,
        //            success: function (response) {
        //                laddaSubmitFormFeedback.stop();
        //                if (response.result !== 1) {
        //                    CheckResponseIsSuccess(response);
        //                    return false;
        //                }
        //                $('#modal_feedback').modal('hide');
        //                $('#modal_send_success').modal('show');
        //                document.getElementById('form_data_feedback').reset();
        //                ChangeDescripRatingStart(parseInt($('input[name="RatingStart"]:checked').val()));
        //                RemoveClassValidate('#form_data_feedback');
        //            }, error: function (err) {
        //                laddaSubmitFormFeedback.stop();
        //                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        //            }
        //        });
        //    });
        //});
    });

    //Load default rating start
    ChangeDescripRatingStart(parseInt($('input[name="RatingStart"]:checked').val()));
    $('.rating__label').hover(function () {
        let start = $(this).data('rate');
        ChangeDescripRatingStart(start);
    });
    $('.rating__label').mouseleave(function () {
        let start = parseInt($('input[name="RatingStart"]:checked').val());
        ChangeDescripRatingStart(start);
    });
    //-----------Feedback end-----------

    //Init bootstrap max length
    $('#form_data_feedback input[type="text"],input[type="email"],textarea').maxlength({
        alwaysShow: !0,
        warningClass: "badge badge-success",
        limitReachedClass: "badge badge-danger"
    });
    LoadListPost(1);
    LoadListProduct();
    HandleSetCookier();
});

function SwitchDataTab(url) {
    let targetId = '';
    switch (url) {
        case "": targetId = '#posts-tab'; break;
        case "?tab=posts": targetId = '#posts-tab'; break;
        case "?tab=product": targetId = '#product-tab'; break;
        default: break;
    }
    $('.tab-pane').removeClass('show active');
    $('.tab-pane').css({ "display": "none" });
    $(targetId).addClass("show active");
    $(targetId).css({ "display": "block" });
}

function GenerateImageListObj(data, count) {
    let html = '';
    if (data != null && data.length > 0) {
        let itemImage = '';
        for (var i = 0; i < data.length; i++) {
            if (i < 3) {
                itemImage +=
                    `<div class="col-6 col-md-4 col-lg-3 p-0">
                        <a href="${IsNullOrEmty(data[i].imagePostObj?.relativeUrl) ? "" : data[i].imagePostObj?.relativeUrl}" class="big container-image" rel="rel_${count}">
                            <img src="${IsNullOrEmty(data[i].imagePostObj?.smallUrl) ? "" : data[i].imagePostObj?.smallUrl}" alt="Ảnh" title="${IsNullOrEmty(data[i].title) ? "" : data[i].title}" style="height:100%; width:100%;" />
                        </a>
                    </div>`;
            } else if (i === MAX_IMAGE_VIEW - 1) {
                itemImage +=
                    `<div class="col-6 col-md-4 col-lg-3 p-0">
                        <a href="${IsNullOrEmty(data[i].imagePostObj?.relativeUrl) ? "" : data[i].imagePostObj?.relativeUrl}" class="big container-image" rel="rel_${count}">
                            <img src="${IsNullOrEmty(data[i].imagePostObj?.smallUrl) ? "" : data[i].imagePostObj?.smallUrl}" alt="Ảnh" title="${IsNullOrEmty(data[i].title) ? "" : data[i].title}" style="height:100%; width:100%;" />
                        </a>
                        <div class="centered"><h2 class="text-white">${data.length === MAX_IMAGE_VIEW ? "" : "+" + (data.length - MAX_IMAGE_VIEW)}</h2></div>
                    </div>`;
            } else {
                itemImage +=
                    `<div class="col-6 col-md-4 col-lg-3 p-0">
                        <a href="${IsNullOrEmty(data[i].imagePostObj?.relativeUrl) ? "" : data[i].imagePostObj?.relativeUrl}" class="big container-image" rel="rel_${count}">
                            <img src="${IsNullOrEmty(data[i].imagePostObj?.smallUrl) ? "" : data[i].imagePostObj?.smallUrl}" alt="Ảnh" title="${IsNullOrEmty(data[i].title) ? "" : data[i].title}" style="height:100%; width:100%;display:none;" />
                        </a>
                    </div>`;
            }
        }
        html = `<div class="gallery gallery_${count} mt-2 row justify-content-center">${itemImage}</div>`;
    }
    return html;
}

function HandleDate(date) {
    let res = '';
    let cur = new Date(date);
    let dateNow = new Date();
    let dateMonth = dateNow.getMonth();
    let dateDate = dateNow.getDate();
    let minus = Number((dateNow - cur) / 1000);
    let minusHours = Math.floor(minus / 3600);
    let minusMinutes = Math.floor(minus % 3600 / 60);
    let minusSeconds = Math.floor(minus % 3600 % 60);
    if (dateNow < cur) //Exception
        return moment(date).format('DD/MM/YYYY HH:mm');

    if (cur.getFullYear() === dateNow.getFullYear()) { //Year now
        if (cur.getMonth() === dateMonth) { //Month now
            if (cur.getDate() === dateDate) { //Date now
                if (minusHours === 0) { //Hours now
                    if (minusMinutes === 0) { //Minutes now
                        res = "Vừa xong";
                    } else { //Minutes ago
                        res = minusMinutes + " phút trước";
                    }
                } else { //Hours ago
                    res = minusHours + " giờ trước";
                    //res = "Hôm nay " + moment(date).format('HH:mm');
                }
            } else if (cur.getDate() === (dateDate - 1)) { //Yesterday
                res = "Hôm qua " + moment(date).format('HH:mm');
            } else { //Current month
                res = moment(date).format('DD') + " tháng " + moment(date).format('MM') + " lúc " + moment(date).format('HH:mm');
            }
        } else { //Month ago
            res = moment(date).format('DD') + " tháng " + moment(date).format('MM') + " lúc " + moment(date).format('HH:mm');
        }
    } else { //Year ago
        res = moment(date).format('DD/MM/YYYY HH:mm');
    }
    return res;
}

//Load list post
function LoadListPost(reset = 0) {
    if (reset === 1) {
        page = 1, countPosts = 0, isMaximumRecords = false;
        $('#div_post_list').empty();
    }

    try {
        $('.loader_post_item').addClass('show');
        if (countPosts !== 0) $("html, body").animate({ scrollTop: $(document).height() }, 0); //Go to bottom page if except first load
        //ShowLoading2("#div_post_list");
        isLoadingFlag = true;
        $.ajax({
            type: 'GET',
            url: '/Member/GetListProfilePost',
            dataType: "json",
            data: { page: page, shopId: shopId },
            success: function (response) {
                isLoadingFlag = false;
                $('.loader_post_item').removeClass('show');
                //HideLoading2("#div_post_list");
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_post_list").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListPost();$(this).remove();">
                            </i>
                        </div >`;
                    CheckResponseIsSuccess(response);
                    return;
                }
                page++;
                var listData = response.data;
                var tmpHtml = ``;
                let moreOption = '';
                let content = '';
                if (listData != null && listData.length > 0) {
                    countPosts += listData.length; //Add countPosts
                    $.each(listData, function (key, value) {
                        if (currentSession === value.identityCre) {
                            moreOption =
                                `<div class="dropdown">
                                    <button class="btn p-0" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal icon-lg pb-3px">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-custom">
                                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0)">
                                            <i class="fa fa-eye-slash mr-1"></i><span>Ẩn</span>
                                        </a>
                                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0)">
                                            <i class="ti-trash mr-1"></i><span>Xoá</span>
                                        </a>
                                    </div>
                                </div>;`
                        }

                        if (!IsNullOrEmty(value.content)) {
                            if (value.content.length > MAX_LENGTH_CONTENT_POST)
                                content = value.content.substring(0, MAX_LENGTH_CONTENT_POST) +
                                    `<span id="content_3dot_${key}">... </span>` +
                                    `<span id="content_hidden_${key}" style="display:none;">${value.content.substring(MAX_LENGTH_CONTENT_POST, value.content.length)}</span>` +
                                    `<a href="javascript:void(0)" onclick="$('#content_3dot_${key}').hide();$('#content_hidden_${key}').show();$(this).remove();">Xem thêm</a>`;
                            else
                                content = value.content;
                        } else content = '';

                        tmpHtml =
                            `<div class="col-md-12 grid-margin">
                                <div class="card rounded">
                                    <div class="card-header">
                                        <div class="d-flex align-items-center justify-content-between">
                                            <div class="d-flex align-items-center">
                                                <a href="/${MEMBER_HREF_PATH}/${shopIdentity}"><img class="img-xs rounded-circle" src="${shopAvatar}" alt="avatar" onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';" /></a>
                                                <div class="ml-1">
                                                    <a href="/${MEMBER_HREF_PATH}/${shopIdentity}" class="font-weight-5 text-dark mb-1">${IsNullOrEmty(shopName) ? "" : shopName}</a>
                                                    <p class="mb-0 text-muted">${HandleDate(value.createdAt)}</p>
                                                </div>
                                            </div>
                                            ${moreOption}
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="content-post" style="white-space: break-spaces;">${content}</div>
                                        ${GenerateImageListObj(value.postImagePostObjs, value.id)}
                                    </div>
                                </div>
                            </div>`;
                        $('#div_post_list').append(tmpHtml);
                        $(`.gallery_${value.id} a`).simpleLightbox({
                            loop: false,
                            alertError: false,
                            //alertErrorMessage: 'Ảnh bạn chọn bị lỗi, ảnh kế tiếp sẽ được tải (nếu có).',
                        });
                    });
                }
                else {
                    isMaximumRecords = true;
                    document.getElementById("div_post_list").innerHTML = `
                        <div class="notifica-not-found text-center">
                            Không tìm thấy bài viết nào
                        </div>`;
                }

                if (maxPosts === null)
                    maxPosts = parseInt(response.data2nd);

                if (countPosts >= maxPosts)
                    isMaximumRecords = true;
            },
            error: function (err) {
                isLoadingFlag = false;
                $('.loader_post_item').removeClass('show');
                //HideLoading2("#div_post_list");
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                document.getElementById("div_post_list").innerHTML =
                    `<div class="text-center p-2" >
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListPost();$(this).remove();">
                        </i>
                    </div >`;
            }
        });
    } catch (e) {
        $('.loader_post_item').removeClass('show');
        console.log("Error load post: " + e.message);
        HideOverlayLoadingButton("#div_post_list");
        document.getElementById("div_post_list").innerHTML =
            `<div class="text-center p-2" >
                <i type="button" class="fa fa-refresh"
                    style="border-radius:4px;font-size:24px;"
                    onclick="LoadListPost();$(this).remove();">
                </i>
            </div >`;
    }
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

//Load list product
function LoadListProduct() {
    try {
        ShowOverlay("#div_product_list");
        $.ajax({
            type: 'GET',
            url: '/Member/GetListProduct',
            data: {
                supplierId: supplierId
            },
            dataType: "json",
            success: function (response) {
                HideOverlay("#div_product_list");
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_product_list").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListProduct();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i>`;
                        tmpHtml += `
                         <div class="col-xl-3 col-6 px-0 col-grid-box mx-auto">
                            <div class="product-box mt-0">
                                <div class="img-wrapper">
                                    ${RawListProductRatioDiscount(value.productPriceObjs)}
                                    <div class="front text-center">
                                        <a dir="ltr" data-style="zoom-in" class="ladda-button" href="javascript:void(0)" onclick="ShowModalDetail(this, ${value.id})">
                                           <img data-src="${value.imageObj?.mediumUrl}" class="img-fluid blur-up lazyload bg-img" alt="${value.name}"
                                            onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                        </a>
                                    </div>
                                    <div class="back text-center">
                                        <a dir="ltr" data-style="zoom-in" class="ladda-button" href="javascript:void(0)" onclick="ShowModalDetail(this, ${value.id})">
                                           <img data-src="${value.imageObj?.mediumUrl}" class="img-fluid blur-up lazyload bg-img" alt="${value.name}"
                                            onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                        </a>
                                    </div>
                                    <div class="cart-info cart-wrap">
                                        <button data-bs-toggle="modal"
                                                data-bs-target="#addtocart" title="Add to cart" hidden>
                                            <i class="ti-shopping-cart px-2"></i>
                                        </button>
                                        <a dir="ltr" data-style="zoom-in" class="ladda-button" href="javascript:void(0)" title="Xem chi tiết" onclick="ShowModalDetail(this, ${value.id})">
                                            <i class="ti-search  px-2" aria-hidden="true"></i>
                                        </a>
                                        <a href="compare.html" title="Compare" hidden>
                                            <i class="ti-reload" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="product-detail text-center pb-2">
                                    <div class="rating">${starHtml}</div>
                                    <a href="javascript:void(0)">
                                        <h3 class="sp-line-2 fs-6 fw-bold mb-1" onclick="ShowModalDetail(this, ${value.id})" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h3>
                                    </a>
                                    ${RawListProductPrice(value.productPriceObjs)}
                                </div>
                            </div>
                        </div>`;
                    });
                    document.getElementById("div_product_list").innerHTML = tmpHtml;
                    $countRecordsProductEl.html(`${response.data2nd != null ? response.data2nd : 0} sản phẩm`);
                }
                else {
                    $countRecordsProductEl.html(`${response.data2nd != null ? response.data2nd : 0} sản phẩm`);
                }
                var totalRecord = parseInt(response.data2nd);
                var pageSize = parseInt(recordsProduct);
                var currentPage = parseInt(pageProduct);
                LoadPagination(totalRecord, pageSize, currentPage);
            },
            error: function (error) {
                HideOverlay("#div_product_list");
                document.getElementById("div_product_list").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định!</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListProduct();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
                console.log("Error when load product!");
            }
        });
    } catch (e) {
        document.getElementById("div_product_list").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định!</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListProduct();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
        console.log("Error when load product!");
    }
}

//Click pagination changepage
function ChangePage(page, e, elm) {
    e.preventDefault();
    ScrollToTop('#div_product_list', 20, 200);
    pageProduct = parseInt(page);

    ////Change Link
    //var newHref = $(elm).attr("href");
    //ChangeURLWithOut("", newHref);

    //Get data
    LoadListProduct();
}

//Handle pagination
function LoadPagination(totalRecords, pageSize = 12, currentPage = 1) {
    var totalPage = Math.ceil(totalRecords / pageSize);
    //Check currentPage error
    if (currentPage > totalPage) {
        currentPage = totalPage;
    }
    if (currentPage < 1) {
        currentPage = 1;
    }

    var startPage = parseInt(Math.max(1, Math.ceil(currentPage - RANGE_PAGE_DISPLAY / 2)));
    var endPage = parseInt(Math.min(totalPage, currentPage + RANGE_PAGE_DISPLAY / 2));

    var html = '';
    if (totalPage >= 1) {
        let link = 'javascript:void(0)';
        if (currentPage > 1) {
            html += `
                <li class="page-item">
                    <a class="page-link" href="${link}record=${pageSize}&page=${currentPage - 1}" title="Trang trước" onclick="ChangePage(${currentPage - 1},event,this)"
                    aria-label="Previous">
                        <span aria-hidden="true">
                            <i class="fa fa-chevron-left" aria-hidden="true"></i>
                        </span> 
                        <span class="sr-only">Previous</span>
                    </a>
                </li>`;
        }
        for (var i = startPage; i <= endPage; i++) {
            if (currentPage == i) {
                html += `<li class="page-item active">
                            <a class="page-link">${currentPage}</a>
                        </li>`;
            }
            else {
                html += `<li class="page-item">
                            <a class="page-link" href="${link}record=${pageSize}&page=${i}" onclick="ChangePage(${i},event,this)" title="Trang ${i}">${i}</a>
                        </li>`;
            }
        }
        if (currentPage < totalPage) {
            html += `<li class="page-item">
                        <a class="page-link"  href="${link}record=${pageSize}&page=${currentPage + 1}" title="Trang kế tiếp"  onclick="ChangePage(${currentPage + 1},event,this)"
                            aria-label="Next">
                            <span aria-hidden="true">
                                <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            </span> 
                            <span class="sr-only">Next</span>
                        </a>
                    </li>`;
        }
    }
    else {
        //NoData
        html = '';
    }
    $('#pagination_product').html(html);
}

//Caculate discount price
function CalDiscountPrice(num1, num2) {
    return num1 - num2;
}

//Caculate ratio discount price
function CalDiscountPriceRatio(num1, num2) {
    if (num1 == null || num1 === 0) return 0;
    let result = parseInt(num1 * 100 / num2);
    return result > 0 ? result : 1;
}

function RawListProductPrice(priceObj) {
    let html = '';
    if (priceObj == undefined || priceObj == null || priceObj.length === 0) {
        html = `<h4 class="price_normal">${_textOhterResource.contact}</h4>`;
    } else {
        if (priceObj.length === 1) {
            html = `<h4 class="${priceObj[0].discount > 0 ? "price_discount" : "price_normal"}"><del>${priceObj[0].discount > 0 ? FormatToVND(priceObj[0].priceOut) : ""}</del> ${priceObj[0].priceOut === 0 ? _textOhterResource.contact : (priceObj[0].discount > 0 ? FormatToVND(CalDiscountPrice(priceObj[0].priceOut, priceObj[0].discount)) : FormatToVND(priceObj[0].priceOut))}</h4>`;
        } else {
            let price = priceObj.map(x => x.priceOut);
            let discount = priceObj.map(x => x.discount);
            let priceDiscount = priceObj.map(x => x.priceOut - x.discount);
            let priceIsAllEqual = price.every((val, i, arr) => val === arr[0]);
            let discountIsAllEqual = discount.every((val, i, arr) => val === arr[0]);
            let priceDiscountIsAllEqual = priceDiscount.every((val, i, arr) => val === arr[0]);
            if (priceIsAllEqual && discountIsAllEqual) {
                html = `<del>${priceObj[0].discount > 0 ? FormatToVND(priceObj[0].priceOut) : ""}</del><h4 class="${priceObj[0].discount > 0 ? "price_discount" : "price_normal"}">${priceObj[0].priceOut === 0 ? _textOhterResource.contact : (priceObj[0].discount > 0 ? FormatToVND(CalDiscountPrice(priceObj[0].priceOut, priceObj[0].discount)) : FormatToVND(priceObj[0].priceOut))}</h4>`;
            } else if (priceDiscountIsAllEqual) {
                html = `<h4>${FormatToVND(priceDiscount[0])}</h4>`;
            } else {
                let min = GetArrayMin(priceDiscount);
                let max = GetArrayMax(priceDiscount);
                html = `<h4>${FormatToVND(min)} ~ ${FormatToVND(max)}</h4>`;
            }
        }
    }
    return html;
}

function RawListProductRatioDiscount(priceObj) {
    let html = '';
    if (priceObj == undefined || priceObj == null || priceObj.length === 0) {
    } else {
        if (priceObj.length === 1) {
            if (priceObj[0].discount > 0) {
                tmpRatio = CalDiscountPriceRatio(priceObj[0].discount, priceObj[0].priceOut);
                html = `<div class="lable-block">
                            <span class="lable3">-${tmpRatio < 10 ? "0" + tmpRatio : tmpRatio}%</span> <span class="lable4"></span>
                        </div>`;
            }
        } else {
            let price = priceObj.map(x => x.priceOut);
            let discount = priceObj.map(x => x.discount);
            let ratioDiscount = priceObj.map(x => CalDiscountPriceRatio(x.discount, x.priceOut));
            let priceIsAllEqual = price.every((val, i, arr) => val === arr[0]);
            let discountIsAllEqual = discount.every((val, i, arr) => val === arr[0]);
            if (priceIsAllEqual && discountIsAllEqual) {
                if (priceObj[0].discount > 0) {
                    tmpRatio = CalDiscountPriceRatio(priceObj[0].discount, priceObj[0].priceOut);
                    html = `<div class="lable-block">
                            <span class="lable3">-${tmpRatio < 10 ? "0" + tmpRatio : tmpRatio}%</span> <span class="lable4"></span>
                        </div>`;
                }
            } else {
                let max = GetArrayMax(ratioDiscount);
                if (max > 0) {
                    tmpRatio = max;
                    html = `<div class="lable-block">
                                <span class="lable3">-${tmpRatio < 10 ? "0" + tmpRatio : tmpRatio}%</span> <span class="lable4"></span>
                            </div>`;
                }
            }
        }
    }
    return html;
}

function ShowModalDetail(elm, id) {
    var laddaShowViewProductDetail = Ladda.create($(elm)[0]);
    laddaShowViewProductDetail.start();
    let supplier = supplierId;
    $.get(`/Member/P_ProductDetail`, { id: id, supplierValue: supplier}).done(function (response) {

        laddaShowViewProductDetail.stop();
        if (response.result === -1 || response.result === 0) {
            CheckResponseIsSuccess(response); return false;
        }
        $('#div_view_product').html(response);
        $('#modal_detai_product').modal('show');
        setTimeout(function myfunction() {

            //Init
            $('.div_image_product_slick').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: '.div_slider_nav'
            });
            $('.div_slider_nav').slick({
                vertical: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.div_image_product_slick',
                arrows: false,
                dots: false,
                focusOnSelect: true
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

            RawPrice();
            InitChangeQuantiy();
        }, 300)

    }).fail(function (err) {
        laddaShowViewProductDetail.stop();
        CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
    });
}

//Raw price html
function RawPrice() {
    _productPriceArr = !IsNullOrEmty($("#input_list_price").val()) ? JSON.parse($("#input_list_price").val()) : "";
    if (_productPriceArr == null || _productPriceArr.length === 0) {
        $productPrice.html('Liên hệ');
        $('#btn_add_to_cart').hide();
        $('#div_view_price_addtocart_panel').hide();
        $('#div_quantity_box').hide();
        return false;
    }
    let html = '';
    let isDisable = false;
    for (var i = 0; i < _productPriceArr.length; i++) {
        if (_productPriceArr[i].isWarehouse === 1 && (_productPriceArr[i].quantity === 0 || _productPriceArr[i].quantity == null))
            isDisable = true;
        else
            isDisable = false;
        html +=
            `<div class="col-6 col-md-3 col-lg-3 px-1 mb-2 text-center custom_radio_with_image">
                <input type="radio" id="input_type_product_${i}" name="typeProduct" value="${_productPriceArr[i].id}" ${isDisable ? 'disabled' : ''} />
                <label for="input_type_product_${i}" title="${IsNullOrEmty(_productPriceArr[i].typeName) ? '' : _productPriceArr[i].typeName}">
                    <span>${IsNullOrEmty(_productPriceArr[i].typeName) ? '' : _productPriceArr[i].typeName}</span>
                </label>
                ${isDisable ? '<span class="out_of_stock"><span class="text">Hết hàng</span></span>' : ''}
            </div>`;
    }
    $('#div_type_product_list').html(html);
    LoadPriceWhenClick();
    $(`input[name="typeProduct"][value="${_productPriceArr[0].id}"]`).trigger('click');
}

//Load price item when click radio input
function LoadPriceWhenClick() {
    $('input[name="typeProduct"]').on('change', function () {
        let priceId = parseInt($('input[name="typeProduct"]:checked').val());
        let productPriceObj = _productPriceArr.find(x => x.id === priceId);
        let discountRatio = "";
        var tmpRatio = 0;
        if (productPriceObj.discount > 0) {
            tmpRatio = CalDiscountPriceRatio(productPriceObj.discount, productPriceObj.priceOut);
            discountRatio = `<span class="discount_ratio">-${tmpRatio < 10 ? "0" + tmpRatio : tmpRatio}%</span>`;
        }
        $('#product_price').html(`<del class="fs-4 fw-normal">${productPriceObj.discount > 0 ? FormatToVND(productPriceObj.priceOut) : ""}</del> <strong class="fs-3">${productPriceObj.priceOut === 0 ? _textOhterResource.contact : (productPriceObj.discount > 0 ? FormatToVND(CalDiscountPrice(productPriceObj.priceOut, productPriceObj.discount)) : FormatToVND(productPriceObj.priceOut))}</strong>
                    ${discountRatio}`);
    });
}

function HanldeClickAddToCart(elm) {
    var isValid = true;

    //Check isvalid
    let priceId = $('input[name="typeProduct"]:checked').val();
    if (priceId == undefined || priceId == null) {
        swal.fire('Bạn chưa chọn loại sản phẩm!', '', 'warning');
        return false;
    }
    if (!isValid) return false;

    //When validate success
    var data = {
        supplierId: shopId,
        productId: $('#input_product_id').val(),
        productPriceId: priceId,
        quantity: $('#input_quantity').val(),
    };
    if (_isLogin == "True") {
        AddToCart(elm, data);
    } else {
        swal.fire({
            title: "Vui lòng đăng nhập",
            text: "Nếu chưa có tài khoản hãy đăng ký nhé!",
            color: "#716add",
            background: "#fff ",
            backdrop: `#3d61adba`,
        });
        setTimeout(function myfunction() {
            AddToCart(elm, data);
        }, 800)
    }
}

//Onchange quantity rang mix max value
function OnChangeRangeQuantityWithMinMax(elm) {
    let min = 1;
    let max = 9999;
    if ($(elm).val() > max) {
        $(elm).val(max);
    } else if ($(elm).val() < min) {
        $(elm).val(min);
    }
}

function InitChangeQuantiy() {
    $('input.input-qty').each(function () {
        var $this = $(this),
            qty = $this.parent().find('.is-form'),
            min = Number($this.attr('min')),
            max = Number($this.attr('max'))
        if (min == 0) {
            var d = 0
        } else d = min
        $(qty).on('click', function () {
            if ($(this).hasClass('minus')) {
                if (d > min) d += -1
            } else if ($(this).hasClass('plus')) {
                var x = Number($this.val()) + 1
                if (x <= max) d += 1
            }
            $this.attr('value', d).val(d)
        })
    })
}

//Add to cart
function AddToCart(elm, dataObj) {

    let formData = new FormData();
    formData.append("supplierId", dataObj.supplierId);
    formData.append("productId", dataObj.productId);
    formData.append("productPriceId", dataObj.productPriceId);
    formData.append("quantity", dataObj.quantity);

    var laddaAddToCart = Ladda.create($(elm)[0]);
    laddaAddToCart.start();

    $.ajax({
        url: '/Checkout/AddToCart',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            laddaAddToCart.stop();
            if (!CheckResponseIsSuccess(response)) return false;
            $('#btn_checkout').fadeIn();
            $('.added-notification').addClass("show");
            setTimeout(function () {
                $('.added-notification').removeClass("show"); //show notificate add success
                laddaAddToCart.stop();
            }, 2500);
            CountShoppingCartItem();
        }, error: function (err) {
            laddaAddToCart.stop();
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function HandleSetCookier() {
    let memberIdentity = GetCookie("memberjsonObj");

    var value = {
        identity: shopIdentity,
        supplierId: supplierId,
        shopName: shopName,
        expireTime: new Date()
    }

    if (!IsNullOrEmty(memberIdentity)) {
        //DeleteCookie("memberjsonObj");
        SetCookie("memberjsonObj", JSON.stringify(value), 1)
    }

    SetCookie("memberjsonObj", JSON.stringify(value), 1)
}
