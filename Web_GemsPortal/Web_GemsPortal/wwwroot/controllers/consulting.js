var $categoryIdEl = $('#input_category_id'),
    $pageEl = $('#input_page'),
    $recordEl = $('#input_record');

const dataParms = function () {
    return {
        c: IsNullOrEmty($categoryIdEl.val()) ? null : parseInt($categoryIdEl.val()),
        page: parseInt($pageEl.val()),
        record: parseInt($recordEl.val())
    }
}

$(document).ready(function () {

    LoadListMainData();

});

//Load list main data
function LoadListMainData() {
    var data = dataParms();
    try {
        ShowOverlay("#div_main_data");
        $.ajax({
            type: 'GET',
            url: '/Consulting/GetList',
            data: data,
            dataType: "json",
            success: function (response) {
                HideOverlay("#div_main_data");
                if (response.result !== 1) {
                    document.getElementById("div_main_data").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListMainData();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml +=
                            `<div class="row blog-media">
                                <div class="col-xl-6">
                                    <div class="blog-left">
                                        <a href="/tu-van/${value.titleSlug}-${value.id}">
                                            <img src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/assets/images/error/news.png" : value.imageObj?.mediumUrl}"
                                                 class="img-fluid blur-up lazyload bg-img" loading="lazy" alt="${value.title}"
                                                onerror="this.onerror=null;this.src='/assets/images/error/news.png';">
                                        </a>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="blog-right">
                                        <div>
                                            <h6>${IsNullOrEmty(value.createdAt) ? "" : moment(value.createdAt).format('DD-MM-YYYY')}</h6>
                                            <a href="/tu-van/${value.titleSlug}-${value.id}">
                                                <h4 class="sp-line-2" title="${IsNullOrEmty(value.title) ? "" : value.title}">${IsNullOrEmty(value.title) ? "" : value.title}</h4>
                                            </a>
                                            <p class="sp-line-4" title="${IsNullOrEmty(value.description) ? "" : value.description}">${IsNullOrEmty(value.description) ? "" : value.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                    });
                    document.getElementById("div_main_data").innerHTML = tmpHtml;

                    //Style js
                    $(".bg-top").parent().addClass('b-top');
                    $(".bg-bottom").parent().addClass('b-bottom');
                    $(".bg-center").parent().addClass('b-center');
                    $(".bg_size_content").parent().addClass('b_size_content');
                    $(".bg-img").parent().addClass('bg-size');
                    $(".bg-img.blur-up").parent().addClass('blur-up lazyload');
                    jQuery('.bg-img').each(function () {
                        var el = $(this),
                            src = el.attr('src'),
                            parent = el.parent();
                        parent.css({
                            'background-image': 'url(' + src + ')',
                            'background-size': 'cover',
                            'background-position': 'center',
                            'display': 'block'
                        });
                        el.hide();
                    });
                }
                else {
                    document.getElementById("div_main_data").innerHTML = _imgNotFoundHtml;
                }
                var totalRecord = parseInt(response.data2nd);
                var currentPage = parseInt(data.page);
                var pageSize = parseInt(data.record);
                var pagination = LoadPagination(totalRecord, pageSize, currentPage);
                $('#ul_main_pagination').html(pagination);
            },
            error: function (error) {
                HideOverlay("#div_main_data");
                document.getElementById("div_main_data").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListMainData();$(this).parent().remove();">
                        </i>
                    </div>`;
                console.log("Error when load list!");
            }
        });
    } catch (e) {
        HideOverlay("#div_main_data");
        document.getElementById("div_main_data").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListMainData();$(this).parent().remove();">
                        </i>
                    </div>`;
        console.log("Error when load list!");
    }
}

//When click pagination 
function ChangePageConsulting(page, e, elm) {
    e.preventDefault();
    ScrollToTop('.header-news', 70, 500);
    $pageEl.val(page);

    //Change Link
    var newHref = $(elm).attr("href");
    ChangeURLWithOut("", newHref);

    //Get List
    LoadListMainData();
}

//Load Pagination Page
function LoadPagination(totalRecords, pageSize = 12, currentPage) {
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
        let link = GetLink();
        if (currentPage > 1) {
            html += `
                <li class="page-item">
                    <a class="page-link" href="${link}record=${pageSize}&page=${currentPage - 1}" title="Trang trước" onclick="ChangePageConsulting(${currentPage - 1},event,this)"
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
                            <a class="page-link" href="${link}record=${pageSize}&page=${i}" onclick="ChangePageConsulting(${i},event,this)" title="Trang ${i}">${i}</a>
                        </li>`;
            }
        }
        if (currentPage < totalPage) {
            html += `<li class="page-item">
                        <a class="page-link"  href="${link}record=${pageSize}&page=${currentPage + 1}" title="Trang kế tiếp"  onclick="ChangePageConsulting(${currentPage + 1},event,this)"
                            aria-label="Next">
                            <span aria-hidden="true">
                                <i class="fa fa-chevron-right" aria-hidden="true"></i>
                            </span> 
                            <span class="sr-only">Next</span>
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

//Get Url Link
function GetLink() {
    var str = window.location.search.substring(1);
    var res = str.split("&");
    var test = res.splice(-2, 2);
    var link = "";
    if (test[0].indexOf("record") > -1 && test[1].indexOf("page") > -1) {
        res.forEach(function (item, index) {
            link += item + "&";
        });
    }
    else {
        if (str == "") {
            link = str;
        }
        else {
            link = str + "&";
        }
    }
    return window.location.pathname + "?" + link;
}
