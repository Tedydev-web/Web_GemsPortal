﻿var $categoryIdEl = $('#input_category_id'),
    $newsIdEl = $('#input_news_id');

const dataParms = function () {
    return {
        c: IsNullOrEmty($categoryIdEl.val()) ? null : parseInt($categoryIdEl.val()),
    }
}

$(document).ready(function () {

    LoadListRelatedNews();
    
    $('#btn_register_course').on('click', function () {
        swal.fire({
            title: "Xác nhận Đăng ký tham gia?",
            text: "",
            type: "question",
            showCancelButton: !0,
            confirmButtonText: "Đăng ký",
            cancelButtonText: "Không",
            confirmButtonClass: "btn btn-success mt-2 mx-2",
            cancelButtonClass: "btn btn-outline-secondary mt-2 mx-2",
            buttonsStyling: !1,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    let categoryId = $categoryIdEl.val();
                    let id = $('#input_news_id').val();
                    var laddaSubmitForm = Ladda.create(document.querySelector('#btn_register_course'));
                    laddaSubmitForm.start();
                    $.ajax({
                        type: 'POST',
                        url: '/Consulting/Register',
                        data: {
                            categoryId: categoryId,
                            id: id,
                        },
                        dataType: "json",
                        success: function (response) {
                            laddaSubmitForm.stop();
                            if (!CheckResponseIsSuccess(response)) {resolve(); return false; }
                            swal('Đăng ký tham gia thành công!', 'Thông tin sẽ được gửi qua email của bạn.', 'success');
                        },
                        error: function (err) {
                            laddaSubmitForm.stop();
                            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                            resolve();
                        }
                    });
                });
            }
        });
    });

});

//Load list related news
function LoadListRelatedNews() {
    try {
        ShowOverlayLoadingButton("#div_news_related");
        $.ajax({
            type: 'GET',
            url: '/News/GetListNewsRelation',
            data: dataParms(),
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_news_related");
                if (response.result !== 1) {
                    document.getElementById("div_news_related").innerHTML = ` 
                    <div class="text-center p-2" >
                        <i type="button" class="fa fa-refresh"
                            style="border-radius:4px;font-size:24px;"
                            onclick="LoadListRelatedNews();$(this).remove();">
                        </i>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        var date = moment(value.createdAt).format('DD-MM-YYYY');
                        tmpHtml +=
                            `<div class="news_wrapper">
                                <a href="/tu-van/${value.titleSlug}-${value.id}">
                                    <div class="classic-effect">
                                        <div style="max-height:265px;min-height:265px;">
                                            <img data-src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/assets/images/error/news.png" : value.imageObj?.mediumUrl}"
                                                 class="img-fluid blur-up lazyload bg-img" alt="${value.title}"
                                                    onerror="this.onerror=null;this.src='/assets/images/error/news.png';" 
                                                    style="width: 100%; height: 264px; object-fit: cover;">
                                        </div>
                                        <span></span>
                                    </div>
                                </a>
                                <div class="blog-details">
                                 
                                    <a href="/tu-van/${value.titleSlug}-${value.id}">
                                        <p class="sp-line-2" title="${IsNullOrEmty(value.title) ? "" : value.title}">${IsNullOrEmty(value.title) ? "" : value.title}</p>
                                    </a>
                                    <hr class="style1">
                                    <h6 class="sp-line-2" title="${IsNullOrEmty(value.description) ? "" : value.description}">${IsNullOrEmty(value.description) ? "" : value.description}</h6>
                                   <h4>${date}</h4>
                                </div>
                            </div>`;
                    });
                    document.getElementById("div_news_related").innerHTML = tmpHtml;
                    //Init Slick Js
                    $('#div_news_related').slick({
                        infinite: true,
                        speed: 300,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        autoplay: true,
                        autoplaySpeed: 5000,
                        responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                        ]
                    });
                }
                else {
                    document.getElementById("div_news_related").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                HideOverlay("#div_news_related");
                document.getElementById("div_news_related").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListRelatedNews();$(this).parent().remove();">
                        </i>
                    </div>`;
                console.log("Error when load related news!");
            }
        });
    } catch (e) {
        HideOverlayLoadingButton("#div_news_related");
        document.getElementById("div_news_related").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListRelatedNews();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load related news!");
    }
}