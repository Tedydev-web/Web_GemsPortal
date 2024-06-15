var $categoryIdEl = $('#input_category_id'),
    $newsIdEl = $('#input_news_id');

const dataParms = function () {
    return {
        c: IsNullOrEmty($categoryIdEl.val()) ? null : parseInt($categoryIdEl.val()),
    }
}

$(document).ready(function () {
    LoadListRelatedNews();

    ScrollToTop(".blog_page ", 10, 500);
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
                            `<div class="">
                                <a href="/tin-tuc/${value.titleSlug}-${value.id}">
                                    <div class="classic-effect">
                                        <div>
                                            <img data-src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/assets/images/error/news.png" : value.imageObj?.mediumUrl}"
                                                 class="img-fluid blur-up lazyload bg-img img_news" alt="${value.title}"
                                                    onerror="this.onerror=null;this.src='/assets/images/error/news.png';">
                                        </div>
                                        <span></span>
                                    </div>
                                </a>
                                <div class="blog-details">
                                 
                                    <a href="/tin-tuc/${value.titleSlug}-${value.id}">
                                      <h5 class="text-center my-1">${date}</h5>
                                        <p class="sp-line-2 my-1" title="${IsNullOrEmty(value.title) ? "" : value.title}">${IsNullOrEmty(value.title) ? "" : value.title}</p>
                                    </a>
                                    <hr class="style1">
                                    <span class="sp-line-2" title="${IsNullOrEmty(value.description) ? "" : value.description}">${IsNullOrEmty(value.description) ? "" : value.description}</span>
                                  
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
