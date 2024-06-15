const RANGE_PAGE_DISPLAY = 5;
var arrrRecordRange = [24, 36, 48, 64];
var arrTypeRange = [1, 2, 3, 4, 5];
var $brandSearchEl = $('.input_checkbox_brand_search'),
    $sizeSearchEl = $('.input_checkbox_size_search'),
    $colorSearchEl = $('.input_checkbox_color_search'),
    $priceSearchEl = $('.input_checkbox_price_search'),
    $typeSearchEl = $("#select_type_search"),
    $recordSearchEl = $("#select_record_search");
let $keywordEl = $("#input_keyword"),
    $typeEl = $("#input_type"),
    $c1El = $("#input_category1"),
    $c2El = $("#input_category2"),
    $sizeEl = $("#input_size"),
    $colorEl = $("#input_color"),
    $brandEl = $("#input_brand"),
    $priceEl = $("#input_price"),
    $recordEl = $("#input_record"),
    $pageEl = $("#input_page"),
    $propertyFilter0El = $("#input_property_filter_0"),
    $propertyFilter1El = $("#input_property_filter_1"),
    $propertyFilter2El = $("#input_property_filter_2"),
    $propertyFilter3El = $("#input_property_filter_3"),
    $starEl = $("#input_star");
let $countRecordsProductEl = $(".h5_count_record_product");

//Data param category
const dataParmsCategory = function () {
    return {
        parentId: $c1El.val(),
        categoryId: $c2El.val()
    };
}

//Data param product
const dataParmsProduct = function () {
    return {
        keyword: $keywordEl.val(),
        type: $typeEl.val(),
        c1: $c1El.val(),
        c2: $c2El.val(),
        size: $sizeEl.val(),
        color: $colorEl.val(),
        brand: $brandEl.val(),
        price: $priceEl.val(),
        prop0: $propertyFilter0El.val(),
        prop1: $propertyFilter1El.val(),
        prop2: $propertyFilter2El.val(),
        prop3: $propertyFilter3El.val(),
        star: $starEl.val(),
        record: $recordEl.val(),
        page: $pageEl.val()
    }
}

$(document).ready(function () {

    LoadListMainData();
    //LoadListBrand();
    LoadListPropertyFilter();
    //LoadListColor();
    //LoadListSize();
    LoadListNewProduct();
    //GetBannerQCNavLeft();

    //On checked brand
    $brandSearchEl.change(function () {
        OnchangeBrand();
    });

    //On checked color
    $colorSearchEl.change(function () {
        OnchangeColor();
    });

    //On checked size
    $sizeSearchEl.change(function () {
        OnchangeSize();
    });

    //On checked price
    $priceSearchEl.change(function () {
        //Handle only one checked
        var isChecked = $(this).is(":checked");
        $priceSearchEl.prop('checked', false);
        $(this).prop('checked', isChecked);

        OnchangePrice();
    });

    //Handling filter UI when load page
    HandlingUrlToMapUI();
    lazySizesConfig.loadMode = 1;

    setTimeout(function myfunction() {
        let categoryMainId = $("#input_category1").val();
        $(`.btn_category_${categoryMainId > 0 ? categoryMainId : 0}`).addClass("text-primary");
    }, 300) 

    //ScrollToTop(".product_section_main_page", 100, 500)
});

//Get value Size
function GetSizeData() {
    var listChecked = "";
    $sizeSearchEl = $('.input_checkbox_size_search');
    $sizeSearchEl.each(function (item, index) {
        if ($(this).is(":checked")) {
            listChecked += $(this).val() + ",";
        }
    });
    if (listChecked != "") {
        listChecked = listChecked.slice(0, -1);
    }
    return listChecked;
}

//Get value Brand
function GetBrandData() {
    var listChecked = "";
    $brandSearchEl = $('.input_checkbox_brand_search');
    $brandSearchEl.each(function (item, index) {
        if ($(this).is(":checked")) {
            listChecked += $(this).val() + ",";
        }
    });
    if (listChecked != "") {
        listChecked = listChecked.slice(0, -1);
    }
    return listChecked;
}

//Get value Star
function GetStarData() {
    var listChecked = "";
    $starSearchEl = $('.input_checkbox_star_search');
    $starSearchEl.each(function (item, index) {
        if ($(this).is(":checked")) {
            listChecked += $(this).val() + ",";
        }
    });
    if (listChecked != "") {
        listChecked = listChecked.slice(0, -1);
    }
    return listChecked;
}

//Get value PropertyFilter
function GetPropertyFilterData(type) {
    var listChecked = "";
    $(`.input_checkbox_property_filter_${type}_search`).each(function (item, index) {
        if ($(this).is(":checked")) {
            listChecked += $(this).val() + ",";
        }
    });
    if (listChecked != "") {
        listChecked = listChecked.slice(0, -1);
    }
    return listChecked;
}

//Get value cColor
function GetColorData() {
    var listChecked = "";
    $colorSearchEl = $('.input_checkbox_color_search');
    $colorSearchEl.each(function (item, index) {
        if ($(this).is(":checked")) {
            listChecked += $(this).val() + ",";
        }
    });
    if (listChecked != "") {
        listChecked = listChecked.slice(0, -1);
    }
    return listChecked;
}

//Get value price
function GetPriceData() {
    var listChecked = "";
    $priceSearchEl = $('.input_checkbox_price_search');
    $priceSearchEl.each(function (item, index) {
        if ($(this).is(":checked")) {
            listChecked += $(this).val() + ",";
        }
    });
    if (listChecked != "") {
        listChecked = listChecked.slice(0, -1);
    }
    return listChecked;
}

//Onchange vrand
function OnchangeBrand() {
    var brandData = GetBrandData();
    $pageEl.val(1);
    $brandEl.val(brandData);
    var record = $recordEl.val();

    //Change Link
    var newHref = `${GetLink(1, "brand=", brandData)}record=${record}&page=1`;
    ChangeURLWithOut("", newHref); //not refresh page

    //Get data
    LoadListMainData();
}

//Onchange star
function OnchangeStar() {
    var starData = GetStarData();
    $pageEl.val(1);
    $starEl.val(starData);
    var record = $recordEl.val();

    //Change Link
    var newHref = `${GetLink(1, "star=", starData)}record=${record}&page=1`;
    ChangeURLWithOut("", newHref); //not refresh page

    //Get data
    LoadListMainData();
}

//Onchange PropertyFilter
function OnchangePropertyFilter(type) {
    var propertyFilterData = GetPropertyFilterData(type);
    $pageEl.val(1);
    $(`#input_property_filter_${type}`).val(propertyFilterData);
    var record = $recordEl.val();

    //Change Link
    var newHref = `${GetLink(1, `prop${type}=`, propertyFilterData)}record=${record}&page=1`;
    ChangeURLWithOut("", newHref); //not refresh page

    //Get data
    LoadListMainData();
    HandlingUrlToMapUI();
}

//Onchange size
function OnchangeSize() {
    var sizeData = GetSizeData();
    $pageEl.val(1);
    $sizeEl.val(sizeData);
    var record = $recordEl.val();

    //Change Link
    var newHref = `${GetLink(1, "size=", sizeData)}record=${record}&page=1`;
    ChangeURLWithOut("", newHref); //not refresh page

    //Get data
    LoadListMainData();
    HandlingUrlToMapUI();
}

//Onchange color
function OnchangeColor() {
    var colorData = GetColorData();
    $pageEl.val(1);
    $colorEl.val(colorData);
    var record = $recordEl.val();

    //Change Link
    var newHref = `${GetLink(1, "color=", colorData)}record=${record}&page=1`;
    ChangeURLWithOut("", newHref); //not refresh page

    //Get data
    LoadListMainData();
    HandlingUrlToMapUI();
}

//Onchange price
function OnchangePrice() {
    var priceData = GetPriceData();
    $pageEl.val(1);
    $priceEl.val(priceData);
    var record = $recordEl.val();

    //Change Link
    var newHref = `${GetLink(1, "price=", priceData)}record=${record}&page=1`;
    ChangeURLWithOut("", newHref); //not refresh page

    //Get data
    LoadListMainData();
    HandlingUrlToMapUI();
}

//Onchange type
function OnchangeType() {
    var typeData = $typeSearchEl.val();
    $pageEl.val(1);
    $typeEl.val(typeData);
    var record = $recordEl.val();

    //Change Link
    var newHref = `${GetLink(1, "type=", typeData)}record=${record}&page=1`;
    ChangeURLWithOut("", newHref); //not refresh page

    //Get data
    LoadListMainData();
    HandlingUrlToMapUI();
}

//Onchange record
function OnchangeRecord() {
    var recordData = $recordSearchEl.val();
    $pageEl.val(1);
    $recordEl.val(recordData);

    //Change Link
    //var newHref = `${GetLink(1, "record=", recordData)}&page=1`;
    var newHref = `${GetLink()}record=${recordData}&page=1`;
    ChangeURLWithOut("", newHref); //not refresh page

    //Get data
    LoadListMainData();
    HandlingUrlToMapUI();
}

//Load list product
function LoadListMainData() {
    var data = dataParmsProduct();
    try {
        ShowOverlay("#div_main_data");
        $.ajax({
            type: 'GET',
            url: '/Product/GetList',
            data: data,
            dataType: "json",
            success: function (response) {
                HideOverlay("#div_main_data");
                //Check Error code
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
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i> `;
                        tmpHtml += `
                         <div class="col-xl-3 col-6 col-grid-box">
                            <div class="product-box mt-2">
                                <div class="img-wrapper">
                                    ${value.supplierObj?.isMember > 0 ? CERTIFICATE_MEMBER : ''}
                                    ${RawListProductRatioDiscount(value.productPriceObjs)}
                                    <div class="front text-center">
                                        <a href="/san-pham/${value.nameSlug}-${value.id}">
                                           <img src="${value.imageObj?.mediumUrl}" class="img-fluid blur-up lazyload bg-img" alt="${value.name}"
                                            onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                        </a>
                                    </div>
                                    <div class="back text-center">
                                        <a href="/san-pham/${value.nameSlug}-${value.id}">
                                           <img src="${value.imageObj?.mediumUrl}" class="img-fluid blur-up lazyload bg-img" alt="${value.name}"
                                            onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                        </a>
                                    </div>
                                    <div class="cart-info cart-wrap">
                                        <button data-bs-toggle="modal"
                                                data-bs-target="#addtocart" title="Add to cart" hidden>
                                            <i class="ti-shopping-cart"></i>
                                        </button>
                                        <a href="javascript:void(0)" title="Add to Wishlist" hidden>
                                            <i class="ti-heart" aria-hidden="true"></i>
                                        </a>
                                        <a href="#" data-bs-toggle="modal"
                                            data-bs-target="#quick-view" title="Quick View" hidden>
                                            <i class="ti-search" aria-hidden="true"></i>
                                        </a>
                                        <a href="compare.html" title="Compare" hidden>
                                            <i class="ti-reload" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="product-detail text-center">
                                    <div class="rating">${starHtml}</div>
                                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                                        <h5 class="sp-line-2 mb-0 name_product" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                    </a>
                                    ${RawListProductPrice(value.productPriceObjs)}
                                </div>
                            </div>
                        </div>`;
                    });
                    document.getElementById("div_main_data").innerHTML = tmpHtml;
                    if (IsNullOrEmty(data.keyword))
                        $countRecordsProductEl.html(`${response.data2nd != null ? response.data2nd : 0} kết quả`);
                    else
                        $countRecordsProductEl.html(`<span title="${data.keyword}">'${data.keyword.length > 50 ? data.keyword.substring(0, 50) + "..." : data.keyword}'</span>: ${response.data2nd != null ? response.data2nd : 0} kết quả`);
                }
                else {
                    if (IsNullOrEmty(data.keyword))
                        $countRecordsProductEl.html(`${response.data2nd != null ? response.data2nd : 0} kết quả`);
                    else
                        $countRecordsProductEl.html(`<span title="${data.keyword}">'${data.keyword.length > 50 ? data.keyword.substring(0, 50) + "..." : data.keyword}'</span>: ${response.data2nd != null ? response.data2nd : 0} kết quả`);
                    document.getElementById("div_main_data").innerHTML = `<div class="notifica-not-found text-center"><img src="/img/notFound.png"/></div>`;
                }
                var listData = response.data;
                if (response.data2nd > 24) {
                    $(".product-pagination").show()
                } else {
                    $(".product-pagination").hide()
                }
                var totalRecord = parseInt(response.data2nd);
                var pageSize = parseInt(data.record);
                var currentPage = parseInt(data.page);
                LoadPagination(totalRecord, pageSize, currentPage);
            },
            error: function (error) {
                HideOverlay("#div_main_data");
                document.getElementById("div_main_data").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định!</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListMainData();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
                console.log("Error when load product!");
            }
        });
    } catch (e) {
        document.getElementById("div_main_data").innerHTML = ` 
                    <div class="text-center p-2">
                        <h4>Kết nối không ổn định!</h4>
                        <button type="button" class="btn btn-primary" 
                            style="width:200px;height:45px;border-radius:4px;" 
                            onclick="LoadListMainData();$(this).parent().remove();">Tải lại
                        </button>
                    </div>`;
        console.log("Error when load product!");
    }
}

//Load list new product
function LoadListNewProduct() {
    try {
        ShowOverlayLoadingButton(".div_list_new_product");
        $.ajax({
            type: 'GET',
            url: '/Product/GetListNewProduct',
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton(".div_list_new_product");
                //Check error code
                if (response.result !== 1) {
                    document.querySelector(".div_list_new_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListNewProduct();$(this).remove();">
                        </i>
                    </div>`;
                    return;
                }

                //Success
                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    var getThreeElementOfList1 = listData.splice(0, 3);
                    var getThreeElementOfList2 = listData.splice(0, 3);
                    var getThreeElementOfList3 = listData.splice(0, 3);
                    var tmplistHtml1 = '';
                    var tmplistHtml2 = '';
                    var tmplistHtml3 = '';
                    $.each(getThreeElementOfList1, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i> `;
                        tmplistHtml1 += `
                                <div class="media position-relative">
                                    ${value.supplierObj?.isMember > 0 ? CERTIFICATE_MEMBER : ''}
                                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                                        <img class="img-fluid blur-up lazyload" data-src="${value.imageObj?.mediumUrl}" alt="${value.name}" style="width:113px;"
                                           onerror="this.onerror=null;this.src='/assets/images/error/product_1x2.png';">
                                    </a>
                                    <div class="media-body align-self-center">
                                        <div class="rating">${starHtml}</div>
                                        <a href="/san-pham/${value.nameSlug}-${value.id}">
                                            <h5 class="sp-line-2 name_product mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                        </a>
                                        ${RawListProductPrice(value.productPriceObjs)}
                                    </div>
                                </div>`;
                    });
                    $.each(getThreeElementOfList2, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i> `;
                        tmplistHtml2 += `
                                <div class="media position-relative">
                                    ${value.supplierObj?.isMember > 0 ? CERTIFICATE_MEMBER : ''}
                                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                                        <img class="img-fluid blur-up lazyload" data-src="${value.imageObj?.mediumUrl}" alt="${value.name}" style="width:113px;"
                                            onerror="this.onerror=null;this.src='/assets/images/error/product_1x2.png';">
                                    </a>
                                    <div class="media-body align-self-center">
                                        <div class="rating">${starHtml}</div>
                                        <a href="/san-pham/${value.nameSlug}-${value.id}">
                                            <h5 class="sp-line-2 name_product mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                        </a>
                                        ${RawListProductPrice(value.productPriceObjs)}
                                    </div>
                                </div>`;
                    });
                    $.each(getThreeElementOfList3, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i> `;
                        tmplistHtml3 += `
                                <div class="media position-relative">
                                    ${value.supplierObj?.isMember > 0 ? CERTIFICATE_MEMBER : ''}
                                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                                        <img class="img-fluid blur-up lazyload"
                                             data-src="${value.imageObj?.mediumUrl}" alt="${value.name}" style="width:113px;"
                                            onerror="this.onerror=null;this.src='/assets/images/error/product_1x2.png';">
                                    </a>
                                    <div class="media-body align-self-center">
                                        <div class="rating">${starHtml}</div>
                                        <a href="/san-pham/${value.nameSlug}-${value.id}">
                                            <h5 class="sp-line-2 name_product mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                        </a>
                                        ${RawListProductPrice(value.productPriceObjs)}
                                    </div>
                                </div>`;
                    });
                    document.querySelector(".div_list_new_product").innerHTML = (IsNullOrEmty(tmplistHtml1) ? '' : `<div>${tmplistHtml1}</div>`) + (IsNullOrEmty(tmplistHtml2) ? '' : `<div>${tmplistHtml2}</div>`) + (IsNullOrEmty(tmplistHtml3) ? '' : `<div>${tmplistHtml3}</div>`);
                    $('.div_list_new_product').slick({});
                } else {
                    document.querySelector(".div_list_new_product").innerHTML = `<div class="notifica-not-found text-center"><img src="/img/notFound.png"/></div>`;
                }
            },
            error: function (error) {
                HideOverlayLoadingButton(".div_list_new_product");
                document.querySelector(".div_list_new_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListNewProduct();$(this).remove();">
                        </i>
                    </div>`;
                console.log("Error when load new product!");
            }
        });
    } catch (e) {
        console.log("Error when load new product!");
    }
}

//Load list brand
function LoadListBrand() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Product/GetListBrand',
            data: dataParmsCategory(),
            dataType: "json",
            success: function (response) {
                //Check error code
                if (response.result !== 1) {
                    document.getElementById("div_list_brand").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListBrand();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml += `<div class="form-check collection-filter-checkbox">
                                        <input type="checkbox" class="form-check-input input_checkbox_brand_search" onchange="OnchangeBrand()" id="inut_brand_${value.id}" value="${value.id}">
                                        <label class="form-check-label" for="inut_brand_${value.id}">${value.name}</label>
                                    </div>`;
                    });
                    document.getElementById("div_list_brand").innerHTML = tmpHtml;
                } else {
                    $('#div_list_brand').empty();
                }
                HandlingUrlToMapUI();
            },
            error: function (error) {
                document.getElementById("div_list_brand").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListBrand();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load brand!");
            }
        });
    } catch (e) {
        console.log("Error when load brand!");
    }
}

//Load list PropertyFilter
function LoadListPropertyFilter() {
    var errorLoadHtml = `<div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListPropertyFilter();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
    try {
        $.ajax({
            type: 'GET',
            url: '/Product/GetListPropertyFilter',
            dataType: "json",
            success: function (response) {
                //Check error code
                if (response.result !== 1) {
                    document.getElementById("div_list_property_filter_0").innerHTML = errorLoadHtml;
                    document.getElementById("div_list_property_filter_1").innerHTML = errorLoadHtml;
                    document.getElementById("div_list_property_filter_2").innerHTML = errorLoadHtml;
                    document.getElementById("div_list_property_filter_3").innerHTML = errorLoadHtml;
                    return;
                }

                //Clear html
                $('#div_list_property_filter_0').empty();
                $('#div_list_property_filter_1').empty();
                $('#div_list_property_filter_2').empty();
                $('#div_list_property_filter_3').empty();

                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    let listProp0 = listData.filter(x => x.typeId === 0);
                    let listProp1 = listData.filter(x => x.typeId === 1);
                    let listProp2 = listData.filter(x => x.typeId === 2);
                    let listProp3 = listData.filter(x => x.typeId === 3);
                    $.each(listProp0, function (key, value) {
                        $("#div_list_property_filter_0").append(
                            `<div class="form-check collection-filter-checkbox">
                                <input type="checkbox" class="form-check-input input_checkbox_property_filter_${value.typeId}_search" onchange="OnchangePropertyFilter(${value.typeId})" id="inut_property_filter_${value.typeId}_${value.id}" value="${value.id}">
                                <label class="form-check-label" for="inut_property_filter_${value.typeId}_${value.id}">${value.name}</label>
                            </div>`);
                    });
                    $.each(listProp1, function (key, value) {
                        $("#div_list_property_filter_1").append(
                            `<div class="form-check collection-filter-checkbox">
                                <input type="checkbox" class="form-check-input input_checkbox_property_filter_${value.typeId}_search" onchange="OnchangePropertyFilter(${value.typeId})" id="inut_property_filter_${value.typeId}_${value.id}" value="${value.id}">
                                <label class="form-check-label" for="inut_property_filter_${value.typeId}_${value.id}">${value.name}</label>
                            </div>`);
                    });
                    $.each(listProp2, function (key, value) {
                        $("#div_list_property_filter_2").append(
                            `<div class="form-check collection-filter-checkbox">
                                <input type="checkbox" class="form-check-input input_checkbox_property_filter_${value.typeId}_search" onchange="OnchangePropertyFilter(${value.typeId})" id="inut_property_filter_${value.typeId}_${value.id}" value="${value.id}">
                                <label class="form-check-label" for="inut_property_filter_${value.typeId}_${value.id}">${value.name}</label>
                            </div>`);
                    });
                    $.each(listProp3, function (key, value) {
                        $("#div_list_property_filter_3").append(
                            `<div class="form-check collection-filter-checkbox">
                                <input type="checkbox" class="form-check-input input_checkbox_property_filter_${value.typeId}_search" onchange="OnchangePropertyFilter(${value.typeId})" id="inut_property_filter_${value.typeId}_${value.id}" value="${value.id}">
                                <label class="form-check-label" for="inut_property_filter_${value.typeId}_${value.id}">${value.name}</label>
                            </div>`);
                    });
                }
                HandlingUrlToMapUI();
            },
            error: function (error) {
                document.getElementById("div_list_property_filter_0").innerHTML = errorLoadHtml;
                document.getElementById("div_list_property_filter_1").innerHTML = errorLoadHtml;
                document.getElementById("div_list_property_filter_2").innerHTML = errorLoadHtml;
                document.getElementById("div_list_property_filter_3").innerHTML = errorLoadHtml;
                console.log("Error when load propertyFilter!");
            }
        });
    } catch (e) {
        console.log("Error when load propertyFilter!");
    }
}

//Load list color
function LoadListColor() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Product/GetListColor',
            data: dataParmsCategory(),
            dataType: "json",
            success: function (response) {
                //Check error code
                if (response.result !== 1) {
                    document.getElementById("div_list_color").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListColor();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml += `<div class="form-check collection-filter-checkbox">
                                        <input type="checkbox" class="form-check-input input_checkbox_color_search" onchange="OnchangeColor()" id="inut_color_${value.id}" value="${value.id}">
                                        <label class="form-check-label" for="inut_color_${value.id}">${value.name}</label>
                                    </div>`;
                    });
                    document.getElementById("div_list_color").innerHTML = tmpHtml;
                } else {
                    $('#div_list_color').empty();
                }
                HandlingUrlToMapUI();
            },
            error: function (error) {
                document.getElementById("div_list_color").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListColor();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load color!");
            }
        });
    } catch (e) {
        console.log("Error when load color!");
    }
}

//Load list size
function LoadListSize() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Product/GetListSize',
            data: dataParmsCategory(),
            dataType: "json",
            success: function (response) {
                //Check error code
                if (response.result !== 1) {
                    document.getElementById("div_list_size").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListSize();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml += `<div class="form-check collection-filter-checkbox">
                                        <input type="checkbox" class="form-check-input input_checkbox_size_search" onchange="OnchangeSize()" id="inut_size_${value.id}" value="${value.id}">
                                        <label class="form-check-label" for="inut_size_${value.id}">${value.name}</label>
                                    </div>`;
                    });
                    document.getElementById("div_list_size").innerHTML = tmpHtml;
                } else {
                    $('#div_list_size').empty();
                }
                HandlingUrlToMapUI();
            },
            error: function (error) {
                document.getElementById("div_list_size").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListSize();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load size!");
            }
        });
    } catch (e) {
        console.log("Error when load size!");
    }
}

//Load banner left site
function GetBannerQCNavLeft() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Product/GetBannerLeftBottom',
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_list_qc_left").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="GetBannerQCNavLeft();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml =
                            `<a href="${value.url}">
                                <img src="${value.imageObj?.mediumUrl}" class="img-fluid blur-up lazyload" alt="${value.title}" 
                                onerror="this.onerror=null;this.src='/assets/images/error/product_qcleft.png';">
                            </a>`;
                    });
                    document.getElementById("div_list_qc_left").innerHTML = tmpHtml;
                }
            },
            error: function (error) {
                document.getElementById("div_list_qc_left").innerHTML = `
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="GetBannerQCNavLeft();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load banner QC left bottom!");
            }
        });
    } catch (e) {
        document.getElementById("div_list_qc_left").innerHTML = `
            <div class="text-center p-2">
                <i type="button" class="fa fa-refresh" 
                    style="border-radius:4px;font-size:24px;" 
                    onclick="GetBannerQCNavLeft();ShowOverlayLoadingButton(this);">
                </i>
            </div>`;
        console.log("Error when load banner QC left bottom!");
    }
}

//Get link url
function GetLink(type, name, value) {
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
    //Handling add edit remove param
    if (type == 1) {//News value
        var findItem = FindItemByKeywordInArrayString(res, name);
        if (value == "") { //remove
            link = link.replace(`${findItem}&`, '');
        } else {
            if (findItem == "") { //add
                link += `${name}${value}&`;
            } else {
                link = link.replace(`${findItem}&`, `${name}${value}&`);
            }
        }
    }
    return window.location.pathname + "?" + link;
}

//Handling url map UI dom
function HandlingUrlToMapUI() {
    var $brandSearchEl = $('.input_checkbox_brand_search'),
        $propertyFilter0SearchEl = $(".input_checkbox_property_filter_0_search"),
        $propertyFilter1SearchEl = $(".input_checkbox_property_filter_1_search"),
        $propertyFilter2SearchEl = $(".input_checkbox_property_filter_2_search"),
        $propertyFilter3SearchEl = $(".input_checkbox_property_filter_3_search"),
        $starSearchEl = $(".input_checkbox_star_search"),
        $sizeSearchEl = $('.input_checkbox_size_search'),
        //$colorSearchEl = $('.input_checkbox_color_search'),
        //$priceSearchEl = $('.input_checkbox_price_search'),
        $typeFilterElm = $typeSearchEl,
        $recordFilterElm = $recordSearchEl;

    var urlString = window.location.search.substring(1);
    var arr = urlString.split("&");
    var c1, c2, keyword, size, color, brand, price, type, record;
    c1 = FindItemByKeywordInArrayString(arr, "c1=");
    c2 = FindItemByKeywordInArrayString(arr, "c2=");
    keyword = FindItemByKeywordInArrayString(arr, "keyword=");
    prop0 = FindItemByKeywordInArrayString(arr, "prop0=");
    prop1 = FindItemByKeywordInArrayString(arr, "prop1=");
    prop2 = FindItemByKeywordInArrayString(arr, "prop2=");
    prop3 = FindItemByKeywordInArrayString(arr, "prop3=");
    star = FindItemByKeywordInArrayString(arr, "star=");
    //size = FindItemByKeywordInArrayString(arr, "size=");
    //color = FindItemByKeywordInArrayString(arr, "color=");
    brand = FindItemByKeywordInArrayString(arr, "brand=");
    price = FindItemByKeywordInArrayString(arr, "price=");
    type = FindItemByKeywordInArrayString(arr, "type=");
    record = FindItemByKeywordInArrayString(arr, "record=");

    //Barnd
    try {
        if (brand != "") {
            let listChecked = brand.split("=")[1].split(",");
            $brandSearchEl.each(function (item, index) {
                if (listChecked.indexOf($(this).val()) > -1) {
                    $(this).prop('checked', true);
                }
            });
        }
        else { //Remove checked
            $brandSearchEl.prop('checked', false);
        }
    } catch (e) {
        $brandSearchEl.prop('checked', false);
    }

    //Property0
    try {
        if (prop0 != "") {
            let listChecked = prop0.split("=")[1].split(",");
            $propertyFilter0SearchEl.each(function (item, index) {
                if (listChecked.indexOf($(this).val()) > -1) {
                    $(this).prop('checked', true);
                }
            });
        }
        else { //Remove checked
            $propertyFilter0SearchEl.prop('checked', false);
        }
    } catch (e) {
        $propertyFilter0SearchEl.prop('checked', false);
    }

    //Property1
    try {
        if (prop1 != "") {
            let listChecked = prop1.split("=")[1].split(",");
            $propertyFilter1SearchEl.each(function (item, index) {
                if (listChecked.indexOf($(this).val()) > -1) {
                    $(this).prop('checked', true);
                }
            });
        }
        else { //Remove checked
            $propertyFilter1SearchEl.prop('checked', false);
        }
    } catch (e) {
        $propertyFilter1SearchEl.prop('checked', false);
    }

    //Property2
    try {
        if (prop2 != "") {
            let listChecked = prop2.split("=")[1].split(",");
            $propertyFilter2SearchEl.each(function (item, index) {
                if (listChecked.indexOf($(this).val()) > -1) {
                    $(this).prop('checked', true);
                }
            });
        }
        else { //Remove checked
            $propertyFilter2SearchEl.prop('checked', false);
        }
    } catch (e) {
        $propertyFilter2SearchEl.prop('checked', false);
    }

    //Property3
    try {
        if (prop3 != "") {
            let listChecked = prop3.split("=")[1].split(",");
            $propertyFilter3SearchEl.each(function (item, index) {
                if (listChecked.indexOf($(this).val()) > -1) {
                    $(this).prop('checked', true);
                }
            });
        }
        else { //Remove checked
            $propertyFilter3SearchEl.prop('checked', false);
        }
    } catch (e) {
        $propertyFilter3SearchEl.prop('checked', false);
    }

    //Star
    try {
        if (star != "") {
            let listChecked = star.split("=")[1].split(",");
            $starSearchEl.each(function (item, index) {
                if (listChecked.indexOf($(this).val()) > -1) {
                    $(this).prop('checked', true);
                }
            });
        }
        else { //Remove checked
            $starSearchEl.prop('checked', false);
        }
    } catch (e) {
        $starSearchEl.prop('checked', false);
    }

    ////Size
    //try {
    //    if (size != "") {
    //        let listChecked = size.split("=")[1].split(",");
    //        $sizeSearchEl.each(function (item, index) {
    //            if (listChecked.indexOf($(this).val()) > -1) {
    //                $(this).prop('checked', true);
    //            }
    //        });
    //    }
    //    else { //Remove checked
    //        $sizeSearchEl.prop('checked', false);
    //    }
    //} catch (e) {
    //    $sizeSearchEl.prop('checked', false);
    //}

    ////Color
    //try {
    //    if (color != "") {
    //        let listChecked = color.split("=")[1].split(",");
    //        $colorSearchEl.each(function (item, index) {
    //            if (listChecked.indexOf($(this).val()) > -1) {
    //                $(this).prop('checked', true);
    //            }
    //        });
    //    }
    //    else { //Remove checked
    //        $colorSearchEl.prop('checked', false);
    //    }
    //} catch (e) {
    //    $colorSearchEl.prop('checked', false);
    //}

    //Price
    try {
        if (price != "") {
            let listChecked = price.split("=")[1].split(",");
            $priceSearchEl.each(function (item, index) {
                if (listChecked.indexOf($(this).val()) > -1) {
                    $(this).prop('checked', true);
                }
            });
        }
        else { //Remove checked
            $priceSearchEl.prop('checked', false);
        }
    } catch (e) {
        $priceSearchEl.prop('checked', false);
    }

    //Type
    if (type != "") {
        let typeValue = type.split("=")[1];
        arrTypeRange.indexOf(parseInt(typeValue)) > -1 ? $typeFilterElm.val(typeValue) : $typeFilterElm.val(1);
    } else {
        $typeFilterElm.val(1);
    }

    //Record
    if (record != "") {
        let recordValue = record.split("=")[1];
        arrrRecordRange.indexOf(parseInt(recordValue)) > -1 ? $recordFilterElm.val(recordValue) : $recordFilterElm.val(24);
    } else {
        $recordFilterElm.val(24);
    }

}

//Click pagination changepage
function ChangePage(page, e, elm) {
    e.preventDefault();
    ScrollToTop('.section_main_page', 700, 70);
    $pageEl.val(page);

    //Change Link
    var newHref = $(elm).attr("href");
    ChangeURLWithOut("", newHref);

    //Get data
    LoadListMainData();
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
        let link = GetLink();
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
    $('#ul_main_pagination').html(html);
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
            html = `<h4 class="my-1 ${priceObj[0].discount > 0 ? "price_discount" : "price_normal"}"><del class="mx-1">${priceObj[0].discount > 0 ? FormatToVND(priceObj[0].priceOut) : ""}</del>${priceObj[0].priceOut === 0 ? _textOhterResource.contact : (priceObj[0].discount > 0 ? FormatToVND(CalDiscountPrice(priceObj[0].priceOut, priceObj[0].discount)) : FormatToVND(priceObj[0].priceOut))}</h4>
                    `;
        } else {
            let price = priceObj.map(x => x.priceOut);
            let discount = priceObj.map(x => x.discount);
            let priceDiscount = priceObj.map(x => x.priceOut - x.discount);
            let priceIsAllEqual = price.every((val, i, arr) => val === arr[0]);
            let discountIsAllEqual = discount.every((val, i, arr) => val === arr[0]);
            let priceDiscountIsAllEqual = priceDiscount.every((val, i, arr) => val === arr[0]);
            if (priceIsAllEqual && discountIsAllEqual) {
                html = `<h4 class="my-1 ${priceObj[0].discount > 0 ? "price_discount" : "price_normal"}"><del class="mx-1">${priceObj[0].discount > 0 ? FormatToVND(priceObj[0].priceOut) : ""}</del>${priceObj[0].priceOut === 0 ? _textOhterResource.contact : (priceObj[0].discount > 0 ? FormatToVND(CalDiscountPrice(priceObj[0].priceOut, priceObj[0].discount)) : FormatToVND(priceObj[0].priceOut))}</h4>
                        `;
            } else if (priceDiscountIsAllEqual) {
                html = `<h4 class="my-1">${FormatToVND(priceDiscount[0])}</h4>`;
            } else {
                let min = GetArrayMin(priceDiscount);
                let max = GetArrayMax(priceDiscount);
                html = `<h4 class="my-1">${FormatToVND(min)} ~ ${FormatToVND(max)}</h4>`;
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

function ChangeCategory(elm) {
    let categoryId = $(elm).attr("value");
    let price = $("#input_price").val();
    let page = $("#input_page").val();
    let record = $("#input_record").val();
    $(".btn_category").removeClass("text-primary");
    $(elm).addClass("text-primary");
    $("#input_category1").val(categoryId);
    ChangeURLWithOut("Sản phẩm", `/san-pham?price=${price}&record=${record}&page=${page}&c1=${categoryId}`);
    LoadListMainData();
}
