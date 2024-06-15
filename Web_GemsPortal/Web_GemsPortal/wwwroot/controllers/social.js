var dataMember = [];
var timeoutSearch = null;

//Post declare
var pageVoucherMember = 1;
var countVoucherMember = 0;
var maxVoucherMember = null;
var currentSession = "";
var isMaximumVoucherMember = false;
var isLoadingFlagVoucherMember = false;
const MAX_IMAGE_VIEW = 4;
const MAX_LENGTH_CONTENT_POST = 400;

//On resize screen to set new width height ratio 1x1
window.addEventListener('resize', function (event) {
    var cw = $('.gallery .col-6').width();
    $('.gallery .col-6').css({ 'height': cw + 'px' });
}, true);

$(document.body).on('touchmove', OnScrollAppendData); // for mobile
$(window).scroll(OnScrollAppendData);

function OnScrollAppendData() {
    if ((window.innerHeight + window.pageYOffset) >= (document.body.scrollHeight - 2) && !isLoadingFlagVoucherMember && !isMaximumVoucherMember) {
        LoadListPost();
    }
}

$(document).ready(function () {

    //-------------Post--------------//
    //Init width height ratio 1x1
    var cw = $('.gallery .col-6').width();
    $('.gallery .col-6').css({ 'height': cw + 'px' });
    LoadListPost(1);
    //-------------Post--------------//

    //-------------Member--------------//
    LoadListDataMember();

    $('#searchMemberInput').on('keyup', function () {
        let value = $(this).val();
        if (timeoutSearch)
            clearTimeout(timeoutSearch);

        timeoutSearch = setTimeout(function () {
            SearchByKeywordInArray(dataMember, value);
        }, 800);
    });

    $('#btnSearchMember').on('click', function (e) {
        e.preventDefault();
        let value = $('#searchMemberInput').val();
        SearchByKeywordInArray(dataMember, value);
    });
    //-------------Member--------------//
});

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
        pageVoucherMember = 1, countVoucherMember = 0, isMaximumVoucherMember = false;
        $('#divPostsList').empty();
    }

    try {
        $('.loader_post_item').addClass('show');
        if (countVoucherMember !== 0) $("html, body").animate({ scrollTop: $(document).height() }, 0); //Go to bottom page if except first load
        //ShowLoading2("#divPostsList");
        isLoadingFlagVoucherMember = true;
        $.ajax({
            type: 'GET',
            url: '/Member/GetListPostInNews',
            dataType: "json",
            data: { page: pageVoucherMember },
            success: function (response) {
                isLoadingFlagVoucherMember = false;
                $('.loader_post_item').removeClass('show');
                //HideLoading2("#divPostsList");
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("divPostsList").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListPost();$(this).remove();">
                            </i>
                        </div >`;
                    CheckResponseIsSuccess(response);
                    return;
                }
                pageVoucherMember++;
                var listData = response.data;
                var tmpHtml = ``;
                let moreOption = '';
                let content = '';
                if (listData != null && listData.length > 0) {
                    countVoucherMember += listData.length; //Add countPosts
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
                                                <a href="/${MEMBER_HREF_PATH}/${value.identityCre}"><img class="img-xs rounded-circle" src="${IsNullOrEmty(value.avatarCre) ? "/assets/images/error/avatar.png" : value.avatarCre}" alt="avatar" onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';" /></a>
                                                <div class="ml-1">
                                                    <a href="/${MEMBER_HREF_PATH}/${value.identityCre}" class="font-weight-5 text-dark mb-1">${IsNullOrEmty(value.shopName) ? "No name" : value.shopName}</a>
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
                        $('#divPostsList').append(tmpHtml);
                        $(`.gallery_${value.id} a`).simpleLightbox({
                            loop: false,
                            close: true,
                            alertError: false,
                            //alertErrorMessage: 'Ảnh bạn chọn bị lỗi, ảnh kế tiếp sẽ được tải (nếu có).',
                        });
                    });
                }
                else {
                    isMaximumVoucherMember = true;
                    document.getElementById("divPostsList").innerHTML = `
                        <div class="notifica-not-found text-center">
                            Không tìm thấy bài viết nào
                        </div>`;
                }

                if (maxVoucherMember === null)
                    maxVoucherMember = parseInt(response.data2nd);

                if (countVoucherMember >= maxVoucherMember)
                    isMaximumVoucherMember = true;
            },
            error: function (err) {
                isLoadingFlagVoucherMember = false;
                $('.loader_post_item').removeClass('show');
                //HideLoading2("#divPostsList");
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                document.getElementById("divPostsList").innerHTML =
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
        HideOverlayLoadingButton("#divPostsList");
        document.getElementById("divPostsList").innerHTML =
            `<div class="text-center p-2" >
                <i type="button" class="fa fa-refresh"
                    style="border-radius:4px;font-size:24px;"
                    onclick="LoadListPost();$(this).remove();">
                </i>
            </div >`;
    }
}

//Load List data
function LoadListDataMember(elm) {
    ShowOverlay('#divListData');
    $.ajax({
        type: "GET",
        url: "/Member/GetList",
        dataType: 'json',
        success: function (response) {
            HideOverlay('#divListData');
            if (response.result !== 1) {
                document.getElementById("divListData").innerHTML =
                    `<div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListDataMember();$(this).parent().remove();">
                        </i>
                    </div>`;
                CheckResponseIsSuccess(response);
                return;
            }

            var listData = response.data;
            if (listData != null && listData.length > 0) {
                $('#messageError').empty();
                dataMember = listData;
                var html = '';
                listData.forEach(function (item, index) {
                    let isMemberHtml = '';
                    //if (item.isMember === 1)
                    //    isMemberHtml = `<div title="Hội viên GEMS GROUP" style="position: absolute;z-index:99;">
                    //                        <svg class="m-1" style="width: 23px; height: 23px; fill: #198754;">
                    //                            <use xlink:href="/assets/svg/icons.svg#warranty"></use>
                    //                        </svg>
                    //                    </div>`;
                    html += `<div class="col-xl-3 col-md-6 xl-50 mb-2" style="padding: 0 6px;">
                                <a href="/${MEMBER_HREF_PATH}/${item.identity}">
                                    <div class="card o-hidden widget-cards h-100">${isMemberHtml}
                                        <div class="bg-custom warning card-body">
                                            <div class="media static-top-widget row">
                                                <div class="icons-widgets col-4">
                                                    <div class="align-self-center text-center"><img class="rounded-circle" alt="${item.identity}" style="width:60px;height:60px;object-fit:cover;border:solid 1.5px var(--theme-deafult);" src="${IsNullOrEmty(item.avatar) ? "/assets/images/error/avatar.png" : item.avatar}"
                                                    onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';" loading="lazy"/></div>
                                                </div>
                                                <div class="media-body col-8 pl-0">
                                                    <span class="m-0 color-default" hidden>${IsNullOrEmty(item.firstName) ? "" : item.firstName} ${IsNullOrEmty(item.lastName) ? "" : item.lastName}</span>
                                                    <h5 class="mb-0 max-line-4" style="font-weight:500;">${IsNullOrEmty(item.shopName) ? "" : item.shopName}</h5>
                                                    <span class="text-muted mb-0 max-line-2">${IsNullOrEmty(item.addressText) ? "" : item.addressText + ", "}${IsNullOrEmty(item.wardName) ? "" : item.wardName + ", "}${IsNullOrEmty(item.districtName) ? "" : item.districtName + ", "}${IsNullOrEmty(item.provinceName) ? "" : item.provinceName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>`;
                });
                document.getElementById('divListData').innerHTML = html;
                document.getElementById('divListData').scrollTop = 0;
            } else {
                document.getElementById("divListData").innerHTML = `<div class="notifica-not-found text-center"><img src="/img/notFound.png"/></div>`;
            }
        },
        error: function (err) {
            HideOverlay('#divListData');
            document.getElementById("divListData").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListDataMember();$(this).parent().remove();">
                        </i>
                    </div>`;
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            console.log("Error when load list!");
        }
    });
}

function SearchByKeywordInArray(array, q) {
    q = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    var substrRegex = new RegExp(q, 'i');
    $('#divListData').empty();
    let isNotFoundData = true;
    let fullAddress = '';
    let name = '';
    $.each(array, function (i, item) {
        name = item?.firstName + " " + item?.lastName;
        fullAddress = item?.addressText + ', ' + item?.wardName + ', ' + item?.districtName + ', ' + item?.provinceName;
        if (substrRegex.test(fullAddress) || substrRegex.test(item.shopName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
            substrRegex.test(name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
            substrRegex.test(item.addressText?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
            substrRegex.test(item.wardName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
            substrRegex.test(item.districtName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) ||
            substrRegex.test(item.provinceName?.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
            let isMemberHtml = '';
            if (item.isMember === 1)
                isMemberHtml = `<div title="Hội viên GEMS GROUP" style="position: absolute;z-index:99;">
                                            <svg class="m-1" style="width: 23px; height: 23px; fill: #198754;">
                                                <use xlink:href="/assets/svg/icons.svg#warranty"></use>
                                            </svg>
                                        </div>`;
            $('#divListData').append(
                `<div class="col-xl-3 col-md-6 xl-50 mb-2" style="padding: 0 6px;">
                    <a href="/${MEMBER_HREF_PATH}/${item.identity}">
                        <div class="card o-hidden widget-cards h-100">${isMemberHtml}
                            <div class="bg-custom warning card-body">
                                <div class="media static-top-widget row align-items-center">
                                    <div class="icons-widgets col-4">
                                        <div class="align-self-center text-center"><img class="rounded-circle" alt="${item.identity}" style="width:60px;height:60px;object-fit:cover;border:solid 1.5px var(--theme-deafult);" src="${IsNullOrEmty(item.avatar) ? "/assets/images/error/avatar.png" : item.avatar}"
                                        onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';" loading="lazy"/></div>
                                    </div>
                                    <div class="media-body col-8 pl-0">
                                        <span class="m-0 color-default" hidden>${IsNullOrEmty(item.firstName) ? "" : item.firstName} ${IsNullOrEmty(item.lastName) ? "" : item.lastName}</span>
                                        <h5 class="mb-0 max-line-4" style="font-weight:500;">${IsNullOrEmty(item.shopName) ? "" : item.shopName}</h5>
                                        <span class="text-muted mb-0 max-line-2">${IsNullOrEmty(item.addressText) ? "" : item.addressText + ", "}${IsNullOrEmty(item.wardName) ? "" : item.wardName + ", "}${IsNullOrEmty(item.districtName) ? "" : item.districtName + ", "}${IsNullOrEmty(item.provinceName) ? "" : item.provinceName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`);
            isNotFoundData = false;
        }
    });
    document.getElementById('divListData').scrollTop = 0;
    if (isNotFoundData) $('#divListData').html('<p class="text-center">Không tìm thấy dữ liệu.</p>');
}
