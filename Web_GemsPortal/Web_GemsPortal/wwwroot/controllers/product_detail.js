var $productPrice = $('#product_price');

try {
    var laddaAddToCart = Ladda.create(document.querySelector('#btn_add_to_cart'));
} catch (e) {

}

$(document).ready(function () {

    //Init js plugin image
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

    LoadListRelatedProduct(); //Load related product
    RawPrice();//Raw price

    //Add to card evnet click
    $('#btn_add_to_cart').on('click', function (e) {
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
            supplierId: supplierId,
            productId: $('#input_product_id').val(),
            productPriceId: priceId,
            quantity: $('#input_quantity').val(),
        };
        AddToCart(data);
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

    //Init slick slide certificate
    $('.slick_certificate').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    //Init slick slide banner mid
    $('.slide_qc_mid').slick({
        dots: true,
        infinite: false,
        speed: 800,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        prevArrow: false,
        dots: false,
        nextArrow: false,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
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
    //ScrollToTop(".div_content_detail", 100, 500);
});

//Raw price html
function RawPrice() {
    if (productPriceArr == null || productPriceArr.length === 0) {
        $productPrice.html('Liên hệ');
        $('#btn_add_to_cart').hide();
        $('#div_view_price_addtocart_panel').hide();
        $('#div_quantity_box').hide();
        return false;
    }
    let html = '';
    let isDisable = false;
    for (var i = 0; i < productPriceArr.length; i++) {
        if (productPriceArr[i].isWarehouse === 1 && (productPriceArr[i].quantity === 0 || productPriceArr[i].quantity == null))
            isDisable = true;
        else
            isDisable = false;
        html +=
            `
            <div class="col-6 col-md-3 col-lg-3 px-1 mb-2 text-center custom_radio_with_image">
                <input type="radio" id="input_type_product_${i}" name="typeProduct" value="${productPriceArr[i].id}" ${isDisable ? 'disabled' : ''} />
                <label for="input_type_product_${i}" title="${IsNullOrEmty(productPriceArr[i].typeName) ? '' : productPriceArr[i].typeName}">
                    <span>${IsNullOrEmty(productPriceArr[i].typeName) ? '' : productPriceArr[i].typeName}</span>
                </label>
                ${isDisable ? '<span class="out_of_stock"><span class="text">Hết hàng</span></span>' : ''}
            </div>`;
    }
    $('#div_type_product_list').html(html);
    LoadPriceWhenClick();
    $(`input[name="typeProduct"][value="${productPriceArr[0].id}"]`).trigger('click');
}

//Load price item when click radio input
function LoadPriceWhenClick() {
    $('input[name="typeProduct"]').on('change', function () {
        let priceId = parseInt($('input[name="typeProduct"]:checked').val());
        let productPriceObj = productPriceArr.find(x => x.id === priceId);
        let discountRatio = "";
        var tmpRatio = 0;
        if (productPriceObj.discount > 0) {
            tmpRatio = CalDiscountPriceRatio(productPriceObj.discount, productPriceObj.priceOut);
            discountRatio = `<span class="discount_ratio">-${tmpRatio < 10 ? "0" + tmpRatio : tmpRatio}%</span>`;
        }
        $('#product_price').html(`<label class="text-success font-weight-bold my-2"><i class="fa fa-tags" aria-hidden="true"></i> GIÁ NIÊM YẾT</label> </br>${productPriceObj.priceOut === 0 ? _textOhterResource.contact : (productPriceObj.discount > 0 ? FormatToVND(CalDiscountPrice(productPriceObj.priceOut, productPriceObj.discount)) : FormatToVND(productPriceObj.priceOut))}
                    <del>${productPriceObj.discount > 0 ? FormatToVND(productPriceObj.priceOut) : ""}</del>
                    ${discountRatio}`);
    });
}

//Load list related product
function LoadListRelatedProduct() {
    try {
        ShowOverlayLoadingButton("#div_list_related_product");
        $.ajax({
            type: 'GET',
            url: '/Product/GetListRelatedProduct',
            data: {
                productId: $('#input_product_id').val(),
                c2: $('#input_category_id').val()
            },
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_list_related_product");
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_list_related_product").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListRelatedProduct();$(this).remove();">
                            </i>
                        </div>`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++) 
                            starHtml += `<i class="fa fa-star text-warning"></i> `;
                        tmpHtml += `<div class="col-xl-2 col-md-4 col-6">
                                        <div class="product-box">
                                            <div class="img-wrapper">
                                                ${value.supplierObj?.isMember > 0 ? CERTIFICATE_MEMBER : ''}
                                                ${RawListProductRatioDiscount(value.productPriceObjs)}
                                                <div class="front text-center">
                                                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                                                        <img data-src="${value.imageObj?.mediumUrl}" class="img-fluid-list blur-up lazyload bg-img" alt="${value.name}"
                                                        onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                                     </a>
                                                </div>
                                                <div class="cart-info cart-wrap" hidden>
                                                    <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                        <i class="ti-shopping-cart"></i>
                                                    </button> 
                                                    <a href="javascript:void(0)" title="Add to Wishlist"><i class="ti-heart" aria-hidden="true"></i></a> 
                                                    <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view" title="Quick View">
                                                        <i class="ti-search" aria-hidden="true"></i>
                                                    </a> 
                                                    <a href="compare.html" title="Compare"><i class="ti-reload" aria-hidden="true"></i></a>
                                                </div>
                                            </div>
                                            <div class="product-detail">
                                                <div class="rating">${starHtml}</div>
                                                <a href="/san-pham/${value.nameSlug}-${value.id}">
                                                    <h5 data-toggle="tooltip" data-placement="top" title="${value.name}" class="sp-line-1 mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                                </a>
                                                ${RawListProductPrice(value.productPriceObjs)}
                                            </div>
                                        </div>
                                    </div>`;
                    });
                    document.getElementById("div_list_related_product").innerHTML = tmpHtml;
                    $('[data-toggle="tooltip"]').tooltip();
                }
                else {
                    document.getElementById("div_list_related_product").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                HideOverlay("#div_list_related_product");
                document.getElementById("div_list_related_product").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListRelatedProduct();$(this).remove();">
                            </i>
                        </div >`;
                console.log("Error when load latest news!");
            }
        });
    } catch (e) {
        HideOverlayLoadingButton("#div_list_related_product");
        document.getElementById("div_list_related_product").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListRelatedProduct();$(this).remove();">
                            </i>
                        </div >`;
        console.log("Error when load related product!");
    }
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

//Add to cart
function AddToCart(dataObj) {
    let formData = new FormData();
    formData.append("supplierId", dataObj.supplierId);
    formData.append("productId", dataObj.productId);
    formData.append("productPriceId", dataObj.productPriceId);
    formData.append("quantity", dataObj.quantity);
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
            }, 3000);
            CountShoppingCartItem();
        }, error: function (err) {
            laddaAddToCart.stop();
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
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

function RawListProductPrice(priceObj) {
    let html = '';
    if (priceObj == undefined || priceObj == null || priceObj.length === 0) {
        html = `<h4>${_textOhterResource.contact}</h4>`;
    } else {
        if (priceObj.length === 1) {
            html = `<h4><del>${priceObj[0].discount > 0 ? FormatToVND(priceObj[0].priceOut) : ""}</del>  ${priceObj[0].priceOut === 0 ? _textOhterResource.contact : (priceObj[0].discount > 0 ? FormatToVND(CalDiscountPrice(priceObj[0].priceOut, priceObj[0].discount)) : FormatToVND(priceObj[0].priceOut))}</h4>`;
        } else {
            let price = priceObj.map(x => x.priceOut);
            let discount = priceObj.map(x => x.discount);
            let priceDiscount = priceObj.map(x => x.priceOut - x.discount);
            let priceIsAllEqual = price.every((val, i, arr) => val === arr[0]);
            let discountIsAllEqual = discount.every((val, i, arr) => val === arr[0]);
            let priceDiscountIsAllEqual = priceDiscount.every((val, i, arr) => val === arr[0]);
            if (priceIsAllEqual && discountIsAllEqual) {
                html = `<del>${priceObj[0].discount > 0 ? FormatToVND(priceObj[0].priceOut) : ""}</del><h4>${priceObj[0].priceOut === 0 ? _textOhterResource.contact : (priceObj[0].discount > 0 ? FormatToVND(CalDiscountPrice(priceObj[0].priceOut, priceObj[0].discount)) : FormatToVND(priceObj[0].priceOut))}</h4>`;
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
