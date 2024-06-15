
//$(".counter_service1").countMe(40, 5); //delay,speed
//$(".counter_service2").countMe(40, 10);
//$(".counter_service3").countMe(40, 10);


$('.slide_top_main').slick({
    dots: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
});
$('.slide_top_right').slick({
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3000,
});
/*--- responsive_sale_2 ---*/
$('.responsive_sale_1').slick({
    dots: true,
    infinite: false,
    speed: 3000,
    slidesToShow: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: true,
    prevArrow: false,
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
/*--- responsive_sale_2 ---*/
$('.responsive_sale_2').slick({
    dots: true,
    infinite: false,
    speed: 3000,
    slidesToShow: 1,
    autoplay: false,
    autoplaySpeed: 5500,
    infinite: true,
    prevArrow: false,
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

$(document).ready(function () {
    // animate text in popup register https://codepen.io/erikjung/pen/XdWEKE
    const signs = document.querySelectorAll('x-sign')
    const randomIn = (min, max) => (
        Math.floor(Math.random() * (max - min + 1) + min)
    )
    const mixupInterval = el => {
        const ms = randomIn(2000, 4000)
        el.style.setProperty('--interval', `${ms}ms`)
    }
    signs.forEach(el => {
        mixupInterval(el)
        el.addEventListener('webkitAnimationIteration', () => {
            mixupInterval(el)
        })
    })

    new Swiper(".banner_slide_top_left", {
        dots: false,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
        loop: false,
        slidesPerView: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        effect: "fade",
    });

    new Swiper(".banner_slide_location_1", {
        dots: false,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
        loop: false,
        slidesPerView: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        effect: "fade",
    });

    new Swiper(".banner_slide_location_2", {
        dots: false,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
        loop: false,
        slidesPerView: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        effect: "fade",
    });

    new Swiper(".banner_slide_top_right1", {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
        loop: false,
        slidesPerView: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    new Swiper(".banner_slide_top_right2", {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
        loop: false,
        slidesPerView: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    //LoadProductDiscount();
    //LoadProductPopular();
    //LoadProductSelling();
    //LoadListProductSale()
    LoadListLatestNews();
    //LoadListNewProduct();
    //LoadListHotProduct();
    LoadListSupplierList();
    //LoadListProductByCategory(0)
    LoadNewsIntroduce()

    /*--- responsive_product_by_option ---*/
    $('.responsive_product_by_option').slick({
        dots: true,
        infinite: false,
        speed: 2000,
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


    $('.slider_supplier').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
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
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    $('.slider_category').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [{
            breakpoint: 1467,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 3,
                infinite: true
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 3,
                infinite: true
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }

        ]
    });

    var swiper = new Swiper(".swiper_btn_product_by_category", {
        //spaceBetween: 30,
        slidesPerView: 2,
        spaceBetween: 10,
        centeredSlides: false,
        nextEl: false,
        prevEl: false,
        pagination: {
            el: ".swiper-pagination",
            clickable: false,
        },
        navigation: {
            nextEl: false,
            prevEl: false,
        },
        autoplay: true,
        autoplaySpeed: 3000,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
                nextEl: false,
                prevEl: false,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1450: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        }
    });

    $('.div_supplier_list').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [{
            breakpoint: 1367,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
        ]
    });

    $('[data-toggle="tooltip"]').tooltip();

    lazySizes.init();
});

function CalDiscountPrice(num1, num2) {
    return num1 - num2;
}

function CalDiscountPriceRatio(num1, num2) {
    if (num1 == null || num1 === 0) return 0;
    let result = parseInt(num1 * 100 / num2);
    return result > 0 ? result : 1;
}

function LoadProductDiscount() {
    try {
        var listData = JSON.parse(listProductDiscount);
        if (listData != null && listData.length > 0) {
            let tmpHtml = '';
            $.each(listData, function (key, value) {
                let starHtml = '';
                for (var i = 0; i < value.star; i++)
                    starHtml += `<i class="fa fa-star text-warning"></i> `;
                tmpHtml += `<div class="product-box product-wrap product-style-1">
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
                                    <!--<a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"
                                        title="Quick View"><i class="ti-search" aria-hidden="true"></i></a>-->
                                </div>
                                <div class="addtocart_btn">
                                    <!--<button class="add-button add_cart" title="Add to cart">
                                        Add to Cart
                                    </button>-->
                                    <div class="qty-box cart_qty">
                                        <div class="input-group">
                                            <button type="button" class="btn quantity-left-minus"
                                                    data-type="minus" data-field="">
                                                <i class="fa fa-minus" aria-hidden="true"></i>
                                            </button>
                                            <input type="text" name="quantity"
                                                    class="form-control input-number qty-input" value="1">
                                            <button type="button" class="btn quantity-right-plus"
                                                    data-type="plus" data-field="">
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail text-center">
                                <div class="rating">${starHtml}</div>
                                <a href="/san-pham/${value.nameSlug}-${value.id}">
                                    <h5 class="sp-line-2 mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                </a>
                                ${RawListProductPrice(value.productPriceObjs)}
                            </div>
                        </div>`;
            });
            document.getElementById("div_discount_product_slide").innerHTML = tmpHtml;

            //Init slick in product discount
            $('.div_discount_product_slide').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 5,
                slidesToScroll: 5,
                autoplay: true,
                autoplaySpeed: 3000,
                responsive: [{
                    breakpoint: 1367,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
                ]
            });
        }
        else {
            $('#div_discount_product_slide').parents('section').remove();
            //document.getElementById("div_discount_product_slide").innerHTML = _imgNotFoundHtml;
        }
    } catch (e) {

    }
}

function LoadProductPopular() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetProductPopular',
            dataType: "json",
            success: function (response) {
                if (response.result !== 1) {
                    document.getElementById("div_popular_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadProductPopular();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                    return false;
                }

                //Success
                var listData = response.data;
                var tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i> `;
                        tmpHtml += `
                          <div class="product-box product-wrap product-style-1">
                            <div class="img-wrapper">
                                ${value.supplierObj?.isMember > 0 ? CERTIFICATE_MEMBER : ''}
                                ${RawListProductRatioDiscount(value.productPriceObjs)}
                                <div class="front text-center">
                                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                                        <img src="${value.imageObj?.mediumUrl}" loading="lazy" class="img-fluid bg-img" alt="${value.name}"
                                        onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                    </a>
                                </div>
                                <div class="back text-center">
                                    <a href="/san-pham/${value.nameSlug}-${value.id}" class="spotlight">
                                        <img src="${value.imageObj?.mediumUrl}" class="img-fluid bg-img" loading="lazy" alt="${value.name}"
                                        onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                    </a>
                                </div>
                                <div class="cart-info cart-wrap">
                                    <!--<a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"
                                        title="Quick View"><i class="ti-search" aria-hidden="true"></i></a>-->
                                </div>
                                <div class="addtocart_btn">
                                    <!--<button class="add-button add_cart" title="Add to cart">
                                        Add to Cart
                                    </button>-->
                                    <div class="qty-box cart_qty">
                                        <div class="input-group">
                                            <button type="button" class="btn quantity-left-minus"
                                                    data-type="minus" data-field="">
                                                <i class="fa fa-minus" aria-hidden="true"></i>
                                            </button>
                                            <input type="text" name="quantity"
                                                    class="form-control input-number qty-input" value="1">
                                            <button type="button" class="btn quantity-right-plus"
                                                    data-type="plus" data-field="">
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail text-center">
                                <div class="rating">${starHtml}</div>
                                <a href="/san-pham/${value.nameSlug}-${value.id}">
                                    <h5 class="sp-line-2 mb-0 name_product" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                </a>
                                ${RawListProductPrice(value.productPriceObjs)}
                            </div>
                        </div>`;
                    });
                    document.getElementById("div_popular_product").innerHTML = tmpHtml;
                    lazySizes.init();
                }
                else {
                    document.getElementById("div_popular_product").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                document.getElementById("div_popular_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadProductPopular();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load product popular!");
            }
        });
    } catch (e) {
        document.getElementById("div_popular_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadProductPopular();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
        console.log("Error when load product popular!");
    }
}

function LoadProductSelling() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetProductSelling',
            dataType: "json",
            success: function (response) {
                //Check error code
                if (response.result !== 1) {
                    document.getElementById("div_selling_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadProductSelling();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                    return;
                }

                //Success
                var listData = response.data;
                var tmpHtml = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i> `;
                        tmpHtml +=
                            `<div class="product-box product-wrap product-style-1">
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
                                    <!--<a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"
                                        title="Quick View"><i class="ti-search" aria-hidden="true"></i></a>-->
                                </div>
                                <div class="addtocart_btn">
                                    <!--<button class="add-button add_cart" title="Add to cart">
                                        Add to Cart
                                    </button>-->
                                    <div class="qty-box cart_qty">
                                        <div class="input-group">
                                            <button type="button" class="btn quantity-left-minus"
                                                    data-type="minus" data-field="">
                                                <i class="fa fa-minus" aria-hidden="true"></i>
                                            </button>
                                            <input type="text" name="quantity"
                                                    class="form-control input-number qty-input" value="1">
                                            <button type="button" class="btn quantity-right-plus"
                                                    data-type="plus" data-field="">
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="product-detail text-center">
                                <div class="rating">${starHtml}</div>
                                <a href="/san-pham/${value.nameSlug}-${value.id}">
                                    <h5 class="sp-line-2 mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                </a>
                                ${RawListProductPrice(value.productPriceObjs)}
                            </div>
                        </div>`;
                    });
                    document.getElementById("div_selling_product").innerHTML = tmpHtml;
                }
                else {
                    document.getElementById("div_selling_product").innerHTML = _imgNotFoundHtml;

                }
            },
            error: function (error) {
                document.getElementById("div_selling_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadProductSelling();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load product selling!");
            }
        });
    } catch (e) {
        document.getElementById("div_selling_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadProductSelling();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
        console.log("Error when load product selling!");
    }
}

function LoadListProductRecently() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetProductRecently',
            dataType: "json",
            success: function (response) {
                //Check error code
                if (response.result !== 1) {
                    document.getElementById("div_recently_product").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductRecently();ShowOverlayLoadingButton(this);">
                            </i>
                    </div >`;
                    return;
                }

                //Success
                var listData = response.data;
                var tmpHtml = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i> `;
                        tmpHtml += `
                                <div class="product-box product-wrap product-style-1 style-respon-div">
                                    <div class="img-wrapper">
                                        ${value.supplierObj?.isMember > 0 ? CERTIFICATE_MEMBER : ''}
                                        ${RawListProductRatioDiscount(value.productPriceObjs)}
                                        <div class="front text-center">
                                            <a href="/san-pham/${value.nameSlug}-${value.id}">
                                                <img src="${value.imageObj?.mediumUrl}" class="img-fluid blur-up lazyload bg-img" alt="${value.name}"
                                                onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';">
                                            </a>
                                        </div>
                                        <div class="cart-info cart-wrap">
                                            <a href="#" data-bs-toggle="modal" data-bs-target="#quick-view"
                                               title="Quick View"><i class="ti-search" aria-hidden="true"></i></a>
                                        </div>
                                        <div class="addtocart_btn">
                                            <button class="add-button add_cart" title="Add to cart" hidden>
                                                Add to Cart
                                            </button>
                                            <div class="qty-box cart_qty">
                                                <div class="input-group">
                                                    <button type="button" class="btn quantity-left-minus"
                                                            data-type="minus" data-field="">
                                                        <i class="fa fa-minus" aria-hidden="true"></i>
                                                    </button>
                                                    <input type="text" name="quantity"
                                                           class="form-control input-number qty-input" value="1">
                                                    <button type="button" class="btn quantity-right-plus"
                                                            data-type="plus" data-field="">
                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="product-detail text-center">
                                        <div class="rating">${starHtml}</div>
                                        <a href="/san-pham/${value.nameSlug}-${value.id}">
                                            <h5 class="sp-line-2 mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                        </a>
                                        ${RawListProductPrice(value.productPriceObjs)}
                                    </div>
                                </div>`;
                    });
                    document.getElementById("div_recently_product").innerHTML = tmpHtml;
                    //Init Slick Js
                    $('.product-5').slick({
                        dots: false,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        responsive: [{
                            breakpoint: 1367,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                        ]
                    });
                }
                else {
                    document.getElementById("div_recently_product").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                document.getElementById("div_recently_product").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductRecently();ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
                console.log("Error when load product recently!");
            }
        });
    } catch (e) {
        document.getElementById("div_recently_product").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductRecently();ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load product recently!");
    }
}

function LoadListLatestNews() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListLatestNews',
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_latest_news").innerHTML = ` 
                       <div class="text-center p-2" >
                                <i type="button" class="fa fa-refresh"
                                    style="border-radius:4px;font-size:24px;"
                                    onclick="LoadListLatestNews();ShowOverlayLoadingButton(this);">
                                </i>
                        </div >`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                var link = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        link = `/tin-tuc/${value.titleSlug}-${value.id}`;
                        var date = moment(value.createdAt).format('DD-MM-YYYY');
                        tmpHtml +=
                            ` <div class="swiper-slide">
                                <div class="col-md-12 h-100 d-flex flex-column">
                                    <a href="${link}" class="div_img_news">
                                            <div>
                                              <img style="aspect-ratio: 16/9;" src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/assets/images/error/news.png" : value.imageObj?.mediumUrl}" class="img-fluid bg-img" loading="lazy" alt="${value.title}"
                                                 onerror="this.onerror=null;this.src='/assets/images/error/home_newslatest.png';">
                                            </div>
                                            <span></span>
                                    </a>
                                    <div class="blog-details">
                                        <h4>${date}</h4>
                                        <a href="${link}">
                                            <p class="sp-line-2"  data-toggle="tooltip" data-placement="top" title="${value.title}">${IsNullOrEmty(value.title) ? "" : value.title.length > 65 ? value.title.slice(0, 60) + "..." : value.title}</p>
                                        </a>
                                        <h5 class="mb-0 sp-line-2" data-toggle="tooltip" data-placement="top" title="${value.description}">${IsNullOrEmty(value.description) ? "" : value.description.length > 105 ? value.description.slice(0, 102) + "..." : value.description}</h5>
                                    </div>
                                </div>
                                </div>
                                `;
                    });
                    document.getElementById("div_latest_news").innerHTML = tmpHtml;
                    //$('#div_latest_news').slick({
                    //    infinite: false,
                    //    speed: 300,
                    //    slidesToShow: 4,
                    //    slidesToScroll: 1,
                    //    autoplay: true,
                    //    infinite: true,
                    //    autoplaySpeed: 5000,
                    //    responsive: [{
                    //        breakpoint: 1200,
                    //        settings: {
                    //            slidesToShow: 3,
                    //            slidesToScroll: 3
                    //        }
                    //    },
                    //    {
                    //        breakpoint: 991,
                    //        settings: {
                    //            slidesToShow: 2,
                    //            slidesToScroll: 2
                    //        }
                    //    },
                    //    {
                    //        breakpoint: 586,
                    //        settings: {
                    //            slidesToShow: 1,
                    //            slidesToScroll: 1
                    //        }
                    //    }
                    //    ]
                    //});
                    var swiper = new Swiper(".swiper_latest_news", {
                        spaceBetween: 30,
                        slidesPerView: 2,
                        spaceBetween: 10,
                        centeredSlides: false,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: false,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        autoplay: true,
                        autoplaySpeed: 2000,
                        breakpoints: {
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                                nextEl: false,
                                prevEl: false,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1450: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }
                    });
                    $('[data-toggle="tooltip"]').tooltip()
                }
                else {
                    document.getElementById("div_latest_news").innerHTML = _imgNotFoundHtml;
                    $('.latest_news_zone').remove();
                }
            },
            error: function (error) {
                document.getElementById("div_latest_news").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListLatestNews();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load latest news!");
            }
        });
    } catch (e) {
        document.getElementById("div_latest_news").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListLatestNews();ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load latest news!");
    }
}

function LoadNewsIntroduce() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListNewsIntroduce',
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_latest_news").innerHTML = ` 
                       <div class="text-center p-2" >
                                <i type="button" class="fa fa-refresh"
                                    style="border-radius:4px;font-size:24px;"
                                    onclick="LoadListIntroduce();ShowOverlayLoadingButton(this);">
                                </i>
                        </div >`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                var link = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        link = `/gioi-thieu/${value.titleSlug}-${value.id}`;
                        var date = moment(value.createdAt).format('DD-MM-YYYY');
                        tmpHtml +=
                            ` <div class="swiper-slide card_introduce">
                                <div class="col-md-12 h-100 d-flex flex-column">
                                    <a href="${link}" class="div_img_news">
                                            <div>
                                              <img style="aspect-ratio: 16/9;" src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/assets/images/error/news.png" : value.imageObj?.mediumUrl}" class="img-fluid bg-img" loading="lazy" alt="${value.title}"
                                                 onerror="this.onerror=null;this.src='/assets/images/error/home_newslatest.png';">
                                            </div>
                                            <span></span>
                                    </a>
                                    <div class="blog-details">
                                        <h4>${date}</h4>
                                        <a href="${link}">
                                            <p class="sp-line-2"  data-toggle="tooltip" data-placement="top" title="${value.title}">${IsNullOrEmty(value.title) ? "" : value.title.length > 65 ? value.title.slice(0, 60) + "..." : value.title}</p>
                                        </a>
                                        <h5 class="mb-0 sp-line-2" data-toggle="tooltip" data-placement="top" title="${value.description}">${IsNullOrEmty(value.description) ? "" : value.description.length > 105 ? value.description.slice(0, 102) + "..." : value.description}</h5>
                                    </div>
                                </div>
                                </div>
                                `;
                    });
                    document.getElementById("list_popular_introduce").innerHTML = tmpHtml;
                    //$('#div_latest_news').slick({
                    //    infinite: false,
                    //    speed: 300,
                    //    slidesToShow: 4,
                    //    slidesToScroll: 1,
                    //    autoplay: true,
                    //    infinite: true,
                    //    autoplaySpeed: 5000,
                    //    responsive: [{
                    //        breakpoint: 1200,
                    //        settings: {
                    //            slidesToShow: 3,
                    //            slidesToScroll: 3
                    //        }
                    //    },
                    //    {
                    //        breakpoint: 991,
                    //        settings: {
                    //            slidesToShow: 2,
                    //            slidesToScroll: 2
                    //        }
                    //    },
                    //    {
                    //        breakpoint: 586,
                    //        settings: {
                    //            slidesToShow: 1,
                    //            slidesToScroll: 1
                    //        }
                    //    }
                    //    ]
                    //});
                    var swiper = new Swiper(".swiper_popular_introduce", {
                        spaceBetween: 30,
                        slidesPerView: 2,
                        spaceBetween: 10,
                        centeredSlides: false,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: false,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        autoplay: true,
                        autoplaySpeed: 2000,
                        breakpoints: {
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                                nextEl: false,
                                prevEl: false,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1450: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }
                    });
                    $('[data-toggle="tooltip"]').tooltip()
                }
                else {
                    document.getElementById("list_popular_introduce").innerHTML = _imgNotFoundHtml;
                    $('.div_introduce').remove();
                }
            },
            error: function (error) {
                document.getElementById("div_introduce").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListIntroduce();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load latest introduce!");
            }
        });
    } catch (e) {
        document.getElementById("div_introduce").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListIntroduce();ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load latest introduce!");
    }
}

function LoadListLatestConsulting() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListLatestConsulting',
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_latest_consulting").innerHTML = ` 
                       <div class="text-center p-2" >
                                <i type="button" class="fa fa-refresh"
                                    style="border-radius:4px;font-size:24px;"
                                    onclick="LoadListLatestConsulting();ShowOverlayLoadingButton(this);">
                                </i>
                        </div >`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        var date = moment(value.createdAt).format('DD-MM-YYYY');
                        tmpHtml +=
                            `<div>
                                <a href="/tu-van/${value.titleSlug}-${value.id}">
                                    <div class="basic-effect">
                                        <div>
                                            <img src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/assets/images/error/news.png" : value.imageObj?.mediumUrl}" class="img-fluid blur-up lazyload bg-img image-news-res" alt="${value.title}"
                                                 onerror="this.onerror=null;this.src='/assets/images/error/home_newslatest.png';"
                                                style="width: 100%; height: 215px; object-fit: cover;">
                                            <span></span>
                                        </div>
                                    </div>
                                </a>
                                <div class="blog-details">
                                    <h4>${date}</h4>
                                    <a class="sp-line-2" title="${IsNullOrEmty(value.title) ? "" : value.title}" href="/tu-van/${value.titleSlug}-${value.id}">
                                        <p>${IsNullOrEmty(value.title) ? "" : value.title}</p>
                                    </a>
                                    <span class="sp-line-2 mb-0" title="${IsNullOrEmty(value.description) ? "" : value.description}">${IsNullOrEmty(value.description) ? "" : value.description}</span>
                                </div>
                            </div>`;
                    });
                    document.getElementById("div_latest_consulting").innerHTML = tmpHtml;
                    $('#div_latest_consulting').slick({
                        infinite: false,
                        speed: 300,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        autoplay: true,
                        infinite: true,
                        autoplaySpeed: 5000,
                        responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 586,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                        ]
                    });
                }
                else {
                    document.getElementById("div_latest_consulting").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                document.getElementById("div_latest_consulting").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListLatestConsulting();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load latest Consulting!");
            }
        });
    } catch (e) {
        document.getElementById("div_latest_consulting").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListLatestConsulting();ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load latest Consulting!");
    }
}

function LoadListLatestTraning() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListLatestTraning',
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_latest_traning").innerHTML = ` 
                       <div class="text-center p-2" >
                                <i type="button" class="fa fa-refresh"
                                    style="border-radius:4px;font-size:24px;"
                                    onclick="LoadListLatestTraning();ShowOverlayLoadingButton(this);">
                                </i>
                        </div >`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        var date = moment(value.createdAt).format('DD-MM-YYYY');
                        tmpHtml +=
                            `<div>
                                <a href="/dao-tao/${value.titleSlug}-${value.id}">
                                    <div class="basic-effect">
                                        <div>
                                            <img src="${IsNullOrEmty(value.imageObj?.mediumUrl) ? "/assets/images/error/news.png" : value.imageObj?.mediumUrl}" class="img-fluid blur-up lazyload bg-img image-news-res" alt="${value.title}"
                                                 onerror="this.onerror=null;this.src='/assets/images/error/home_newslatest.png';"
                                                style="width: 100%; height: 215px; object-fit: cover;">
                                            <span></span>
                                        </div>
                                    </div>
                                </a>
                                <div class="blog-details">
                                    <h4>${date}</h4>
                                    <a class="sp-line-2" title="${IsNullOrEmty(value.title) ? "" : value.title}" href="/dao-tao/${value.titleSlug}-${value.id}">
                                        <p>${IsNullOrEmty(value.title) ? "" : value.title}</p>
                                    </a>
                                    <span class="sp-line-2 mb-0" title="${IsNullOrEmty(value.description) ? "" : value.description}">${IsNullOrEmty(value.description) ? "" : value.description}</span>
                                </div>
                            </div>`;
                    });
                    document.getElementById("div_latest_traning").innerHTML = tmpHtml;
                    $('#div_latest_traning').slick({
                        infinite: false,
                        speed: 300,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        autoplay: true,
                        infinite: true,
                        autoplaySpeed: 5000,
                        responsive: [{
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        },
                        {
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 586,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                        ]
                    });
                }
                else {
                    document.getElementById("div_latest_traning").innerHTML = _imgNotFoundHtml;
                }
            },
            error: function (error) {
                document.getElementById("div_latest_traning").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListLatestTraning();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load latest Consulting!");
            }
        });
    } catch (e) {
        document.getElementById("div_latest_traning").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListLatestTraning();ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load latest Consulting!");
    }
}

function RawListProductPrice(priceObj) {
    let html = '';
    if (priceObj == undefined || priceObj == null || priceObj.length === 0) {
        html = `<h4 class="price_normal">${_textOhterResource.contact}</h4>`;
    } else {
        if (priceObj.length === 1) {
            html = `<h4 class="${priceObj[0].discount > 0 ? "price_discount" : "price_normal"} my-1 mx-md-auto">${priceObj[0].discount > 0 ? `<del class="mx-1"><small>${FormatToVND(priceObj[0].priceOut)}</small></del>`  : ""}<p class="mb-0 text-danger">${priceObj[0].priceOut === 0 ? _textOhterResource.contact : (priceObj[0].discount > 0 ? FormatToVND(CalDiscountPrice(priceObj[0].priceOut, priceObj[0].discount)) : FormatToVND(priceObj[0].priceOut))}</p></h4>`;
        } else {
            let price = priceObj.map(x => x.priceOut);
            let discount = priceObj.map(x => x.discount);
            let priceDiscount = priceObj.map(x => x.priceOut - x.discount);
            let priceIsAllEqual = price.every((val, i, arr) => val === arr[0]);
            let discountIsAllEqual = discount.every((val, i, arr) => val === arr[0]);
            let priceDiscountIsAllEqual = priceDiscount.every((val, i, arr) => val === arr[0]);
            if (priceIsAllEqual && discountIsAllEqual) {
                html = `<h4 class="my-1 ${priceObj[0].discount > 0 ? "price_discount" : "price_normal"}" ><del class="mx-1"><small>${priceObj[0].discount > 0 ? FormatToVND(priceObj[0].priceOut) : ""}</small></del><p class="mb-0 text-danger">${priceObj[0].priceOut === 0 ? _textOhterResource.contact : (priceObj[0].discount > 0 ? FormatToVND(CalDiscountPrice(priceObj[0].priceOut, priceObj[0].discount)) : FormatToVND(priceObj[0].priceOut))}</p></h4>
                        `;
            } else if (priceDiscountIsAllEqual) {
                html = `<h4 >${FormatToVND(priceDiscount[0])}</h4>`;
            } else {
                let min = GetArrayMin(priceDiscount);
                let max = GetArrayMax(priceDiscount);
                html = `<h4 class="my-1 d-flex flex-wrap mx-auto" style="color:#4c4c4c!important"><p class="mb-0">${FormatToVND(min)} ~ </p> <p class="mb-0">${FormatToVND(max)}</p></h4>`;
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

function LoadListHotProduct() {
    try {
        ShowOverlayLoadingButton("#div_ishot_product");
        $.ajax({
            type: 'GET',
            //url: '/Product/GetListHotProduct',
            url: '/Product/GetListNewProduct',
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_ishot_product");
                //Check error code
                if (response.result !== 1) {
                    document.querySelector("#div_ishot_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListHotProduct();$(this).remove();">
                        </i>
                    </div>`;
                    return;
                }

                //Success
                var listData = response.data;
                let tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i>`;
                        tmpHtml += `
                            <div class="product-box swiper-slide">
                                <div class="img-wrapper">
                                    ${RawListProductRatioDiscount(value.productPriceObjs)}
                                    <div class="front">
                                        <a href="/san-pham/${value.nameSlug}-${value.id}" class="spotlight">
                                            <img src="${value.imageObj?.mediumUrl}" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';"
                                                class="img-fluid bg-img" loading="lazy" alt="${value.name}">
                                        </a>
                                    </div>
                                    <div class="add-button" data-bs-toggle="modal" data-bs-target="#addtocart" hidden>
                                        add to
                                        cart
                                    </div>
                                </div>
                                <div class="product-detail mb-2 text-center">
                                    <div class="rating">${starHtml}</div>
                                     <div class="rating"><i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i></div>
                                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                                        <h5 class="sp-line-2 mb-0 name_product" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                    </a>
                                    ${RawListProductPrice(value.productPriceObjs)}
                                </div>
                            </div>`;
                        //tmpHtml += `
                        //    <div class="product-box">
                        //        <div class="img-wrapper">
                        //            ${value.supplierObj?.isMember > 0 ? CERTIFICATE_MEMBER : ''}
                        //            ${RawListProductRatioDiscount(value.productPriceObjs)}
                        //            <div class="front">
                        //                <a href="/san-pham/${value.nameSlug}-${value.id}">
                        //                    <img src="${value.imageObj?.mediumUrl}" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';"
                        //                        class="img-fluid blur-up lazyload bg-img" alt="${value.name}">
                        //                </a>
                        //            </div>
                        //            <div class="add-button" data-bs-toggle="modal" data-bs-target="#addtocart" hidden>
                        //                add to
                        //                cart
                        //            </div>
                        //        </div>
                        //        <div class="product-detail mb-2 text-center">
                        //            <a href="/san-pham/${value.nameSlug}-${value.id}">
                        //                <h5 class="sp-line-2 mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                        //            </a>
                        //            ${RawListProductPrice(value.productPriceObjs)}
                        //        </div>
                        //    </div>`;
                    });
                    document.getElementById("div_ishot_product").innerHTML = tmpHtml;

                    var swiper = new Swiper(".swiper_product_hot", {
                        spaceBetween: 30,
                        slidesPerView: 2,
                        spaceBetween: 10,
                        centeredSlides: false,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: false,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        autoplay: true,
                        autoplaySpeed: 2000,
                        breakpoints: {
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                                nextEl: false,
                                prevEl: false,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1450: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }
                    });
                    lazySizes.init();
                }
                else {
                    document.getElementById("div_ishot_product").innerHTML = _imgNotFoundHtml;
                    $('.product_hot_zone').hide();
                }
            },
            error: function (error) {
                HideOverlayLoadingButton("#div_ishot_product");
                document.querySelector("#div_ishot_product").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListHotProduct();$(this).remove();">
                        </i>
                    </div>`;
                console.log("Error when load ishot product!");
            }
        });
    } catch (e) {
        console.log("Error when load ishot product!");
    }
}

function LoadListNewProduct() {
    try {
        ShowOverlayLoadingButton("#div_new_product");
        $.ajax({
            type: 'GET',
            url: '/Product/GetListNewProduct',
            dataType: "json",
            success: function (response) {
                HideOverlayLoadingButton("#div_new_product");
                //Check error code
                if (response.result !== 1) {
                    document.querySelector("#div_new_product").innerHTML = ` 
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
                let tmpHtml = '';
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        let starHtml = '';
                        for (var i = 0; i < value.star; i++)
                            starHtml += `<i class="fa fa-star text-warning"></i> `;
                        tmpHtml += `
                            <div class="product-box swiper-slide">
                                <div class="img-wrapper">
                                    ${RawListProductRatioDiscount(value.productPriceObjs)}
                                    <div class="front">
                                        <a href="/san-pham/${value.nameSlug}-${value.id}" class="spotlight">
                                            <img src="${value.imageObj?.mediumUrl}" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';" loading="lazy" class="img-fluid bg-img">
                                        </a>
                                    </div>
                                    <div class="add-button" data-bs-toggle="modal" data-bs-target="#addtocart" hidden>
                                        add to
                                        cart
                                    </div>
                                </div>
                                <div class="product-detail mb-2 text-center">
                                    <div class="rating">${starHtml}</div>
                                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                                        <h5 class="sp-line-2 mb-0 name_product" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                                    </a>
                                    ${RawListProductPrice(value.productPriceObjs)}
                                </div>
                            </div>`;
                        //tmpHtml += `
                        //    <div class="product-box">
                        //        <div class="img-wrapper">
                        //            ${RawListProductRatioDiscount(value.productPriceObjs)}
                        //            <div class="front">
                        //                <a href="/san-pham/${value.nameSlug}-${value.id}">
                        //                    <img src="${value.imageObj?.mediumUrl}" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';"
                        //                        class="img-fluid blur-up lazyload bg-img" alt="${value.name}">
                        //                </a>
                        //            </div>
                        //            <div class="add-button" data-bs-toggle="modal" data-bs-target="#addtocart" hidden>
                        //                add to
                        //                cart
                        //            </div>
                        //        </div>
                        //        <div class="product-detail mb-2 text-center">
                        //            <a href="/san-pham/${value.nameSlug}-${value.id}">
                        //                <h5 class="sp-line-2 mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                        //            </a>
                        //            ${RawListProductPrice(value.productPriceObjs)}
                        //        </div>
                        //    </div>`;
                    });

                    $("#div_new_product").html(tmpHtml)
                    lazySizes.init();
                  
                    var swiper = new Swiper(".swiper_new_product", {
                        //spaceBetween: 30,
                        slidesPerView: 2,
                        spaceBetween: 10,
                        centeredSlides: false,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: false,
                        },
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        autoplay: true,
                        autoplaySpeed: 2000,
                        breakpoints: {
                            640: {
                                nextEl: false,
                                prevEl: false,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1450: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }
                    });
                    //$('#div_new_product').slick({
                    //    infinite: true,
                    //    speed: 300,
                    //    slidesToShow: 3,
                    //    slidesToScroll: 3,
                    //    autoplay: true,
                    //    autoplaySpeed: 5000,
                    //    responsive: [{
                    //        breakpoint: 991,
                    //        settings: {
                    //            slidesToShow: 2,
                    //            slidesToScroll: 2
                    //        }
                    //    }]
                    //});
                }
                else {
                    document.getElementById("div_new_product").innerHTML = _imgNotFoundHtml;
                }


                //if (listData != null && listData.length > 0) {

                //    var getThreeElementOfList1 = listData.splice(0, 3);
                //    var getThreeElementOfList2 = listData.splice(0, 3);
                //    var getThreeElementOfList3 = listData.splice(0, 3);
                //    var tmplistHtml1 = '';
                //    var tmplistHtml2 = '';
                //    var tmplistHtml3 = '';
                //    $.each(getThreeElementOfList1, function (key, value) {
                //        tmplistHtml1 += `
                //                <div class="media">
                //                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                //                        <img class="img-fluid blur-up lazyload" src="${value.imageObj?.mediumUrl}" alt="${value.name}" style="width:86px;"
                //                           onerror="this.onerror=null;this.src='/assets/images/error/product_1x2.png';">
                //                    </a>
                //                    <div class="media-body align-self-center">
                //                        <div class="rating" hidden>
                //                            <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                //                        </div><a href="/san-pham/${value.nameSlug}-${value.id}">
                //                            <h5 class="sp-line-2 mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                //                        </a>
                //                        ${RawListProductPrice(value.productPriceObjs)}
                //                    </div>
                //                </div>`;
                //    });
                //    $.each(getThreeElementOfList2, function (key, value) {
                //        tmplistHtml2 += `
                //                <div class="media">
                //                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                //                        <img class="img-fluid blur-up lazyload" src="${value.imageObj?.mediumUrl}" alt="${value.name}" style="width:86px;"
                //                            onerror="this.onerror=null;this.src='/assets/images/error/product_1x2.png';">
                //                    </a>
                //                    <div class="media-body align-self-center">
                //                        <div class="rating" hidden>
                //                            <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                //                        </div><a href="/san-pham/${value.nameSlug}-${value.id}">
                //                            <h5 class="sp-line-2 mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                //                        </a>
                //                        ${RawListProductPrice(value.productPriceObjs)}
                //                    </div>
                //                </div>`;
                //    });
                //    $.each(getThreeElementOfList3, function (key, value) {
                //        tmplistHtml3 += `
                //                <div class="media">
                //                    <a href="/san-pham/${value.nameSlug}-${value.id}">
                //                        <img class="img-fluid blur-up lazyload"
                //                             src="${value.imageObj?.mediumUrl}" alt="${value.name}" style="width:86px;"
                //                            onerror="this.onerror=null;this.src='/assets/images/error/product_1x2.png';">
                //                    </a>
                //                    <div class="media-body align-self-center">
                //                        <div class="rating" hidden>
                //                            <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                //                        </div><a href="/san-pham/${value.nameSlug}-${value.id}">
                //                            <h5 class="sp-line-2 mb-0" title="${IsNullOrEmty(value.name) ? "" : value.name}">${IsNullOrEmty(value.name) ? "" : value.name}</h5>
                //                        </a>
                //                        ${RawListProductPrice(value.productPriceObjs)}
                //                    </div>
                //                </div>`;
                //    });
                //    document.querySelector(".div_list_new_product").innerHTML = (IsNullOrEmty(tmplistHtml1) ? '' : `<div>${tmplistHtml1}</div>`) + (IsNullOrEmty(tmplistHtml2) ? '' : `<div>${tmplistHtml2}</div>`) + (IsNullOrEmty(tmplistHtml3) ? '' : `<div>${tmplistHtml3}</div>`);
                //    $('.div_list_new_product').slick({});
                //} else {
                //    document.querySelector(".div_list_new_product").innerHTML = `<div class="notifica-not-found text-center"><img src="/img/notFound.png"/></div>`;
                //}
            },
            error: function (error) {
                HideOverlayLoadingButton("#div_new_product");
                document.querySelector("#div_new_product").innerHTML = ` 
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

//function LoadNewsIntroduce() {
//    try {
//        $.ajax({
//            type: 'GET',
//            url: '/Home/GetListNewsIntroduce',
//            dataType: "json",
//            success: function (response) {
//                //Check error code
//                if (response.result !== 1) {
//                    document.getElementById("list_popular_introduce").innerHTML = ` 
//                    <div class="text-center p-2">
//                        <i type="button" class="fa fa-refresh" 
//                            style="border-radius:4px;font-size:24px;" 
//                            onclick="LoadNewsIntroduce();ShowOverlayLoadingButton(this);">
//                        </i>
//                    </div>`;
//                    return;
//                }

//                //Success
//                var listData = response.data;
//                var tmpHtml = ``;
//                if (listData != null && listData.length > 0) {
//                    $.each(listData, function (key, value) {
//                        tmpHtml +=
//                            `<div class="something_about_us_box_1 d-flex flex-wrap container">
//                                <a href="/lien-he" class="col-md-6 something_about_us_box_img">
//                                  <img src="${value.imageObj?.mediumUrl}"> 
//                                </a>
//                                <div class="col-md-6 col-sm-12 col-xs-12 wrap-pd-infor wrap-flex-align flex-column p-5 list_popular_detail">
//                                   <div class="inf-content site-animation ">
//                                    <p style="margin-bottom:11px">
//                                        <span style="color:#2ecc71">
//                                            <strong><span style="font-size:13pt">${value.title}</span></strong>
//                                        </span>
//                                    </p>
//                                    <p style="margin-bottom:11px">
//                                        <span style="font-size:16px;">${value.description ?? ''}</span>
//                                    </p>
//                                   </div>
//                                  <div><a href="/gioi-thieu"class="btn btn-primary bg-primary btn_more_introduce">Xem thêm</a></div>
//                                </div>
//                             </div>`;
//                    });
//                    document.getElementById("list_popular_introduce").innerHTML = tmpHtml;
//                    $('.responsive_v2').slick({
//                        dots: false,
//                        infinite: false,
//                        speed: 300,
//                        slidesToShow: 1,
//                        prevArrow: false,
//                        infinite: true,
//                        nextArrow: false,
//                        autoplay: true,
//                        autoplaySpeed: 7000,
//                        slidesToScroll: 1,
//                        responsive: [
//                            {
//                                breakpoint: 1024,
//                                settings: {
//                                    slidesToShow: 1,
//                                    slidesToScroll: 1,
//                                    infinite: true,
//                                    dots: false
//                                }
//                            },
//                            {
//                                breakpoint: 600,
//                                settings: {
//                                    slidesToShow: 1,
//                                    slidesToScroll: 1
//                                }
//                            },
//                            {
//                                breakpoint: 480,
//                                settings: {
//                                    slidesToShow: 1,
//                                    slidesToScroll: 1
//                                }
//                            }
//                        ]
//                    });
//                }
//                else {
//                    document.getElementById("list_popular_introduce").innerHTML = _imgNotFoundHtml;

//                }
//            },
//            error: function (error) {
//                document.getElementById("div_selling_product").innerHTML = ` 
//                    <div class="text-center p-2">
//                        <i type="button" class="fa fa-refresh" 
//                            style="border-radius:4px;font-size:24px;" 
//                            onclick="LoadNewsIntroduce();ShowOverlayLoadingButton(this);">
//                        </i>
//                    </div>`;
//                console.log("Error when load product selling!");
//            }
//        });
//    } catch (e) {
//        document.getElementById("div_selling_product").innerHTML = ` 
//                    <div class="text-center p-2">
//                        <i type="button" class="fa fa-refresh" 
//                            style="border-radius:4px;font-size:24px;" 
//                            onclick="LoadNewsIntroduce();ShowOverlayLoadingButton(this);">
//                        </i>
//                    </div>`;
//        console.log("Error when load product selling!");
//    }
//}

function LoadListPartnerList() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListPartnerList',
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_partner_list").innerHTML = ` 
                       <div class="text-center p-2" >
                                <i type="button" class="fa fa-refresh"
                                    style="border-radius:4px;font-size:24px;"
                                    onclick="LoadListPartnerList();ShowOverlayLoadingButton(this);">
                                </i>
                        </div >`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml +=
                            `<div class="">
                               <a data-toggle="tooltip" data-placement="top" title="${value.title}" href="${value.url ?? 'javascript:void(0)'}" ${IsNullOrEmty(value.url) ? '' : 'target="_blank"'}>
                                   <div class="">
                                       <img style="aspect-ratio: 1/1" src="${value.imageObj?.smallUrl ?? '/assets/images/error/avatar.png'}" onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';" class="img-fluid bg-img"
                                            alt="${value.title ?? ''}">
                                     </div>
                                   </div>
                               </a>
                            </div>`;
                    }); 
                    document.getElementById("div_partner_list").innerHTML = tmpHtml

                    $('#div_partner_list').slick({
                        dots: false,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        autoplay: true,
                        autoplaySpeed: 4000,
                        responsive: [{
                            breakpoint: 1367,
                            settings: {
                                slidesToShow:5,
                                slidesToScroll: 5
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        }
                        ]
                    });

                    
                    $('[data-toggle="tooltip"]').tooltip()
                }
                else {
                    document.getElementById("div_partner_list").innerHTML = _imgNotFoundHtml;
                    $('.partner_list_zone').remove();
                }
            },
            error: function (error) {
                document.getElementById("div_partner_list").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListPartnerList();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load latest partnerList!");
            }
        });
    } catch (e) {
        document.getElementById("div_partner_list").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListPartnerList();ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load latest partnerList!");
    }
}

function LoadListSupplierList() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListSupplierList',
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_supplier_list").innerHTML = ` 
                       <div class="text-center p-2" >
                                <i type="button" class="fa fa-refresh"
                                    style="border-radius:4px;font-size:24px;"
                                    onclick="LoadListSupplierList();ShowOverlayLoadingButton(this);">
                                </i>
                        </div >`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        tmpHtml +=
                            `<div>
                                <a href="${value.url ?? 'javascript:void(0)'}" ${IsNullOrEmty(value.url) ? '' : 'target="_blank"'}>
                                    <div class="">
                                        <img class="img-fluid bg-img" loading="lazy" src="${value.imageObj?.smallUrl ?? '/assets/images/error/avatar.png'}" onerror="this.onerror=null;this.src='/assets/images/error/avatar.png';"
                                             alt="${value.title ?? ''}">
                                       </div>
                                    </div>
                                </a>
                            </div>`;
                        /*class="bg-img"*/
                    });/* <div class="overlay"><i class="fa fa-star" aria-hidden="true"></i>*/ 
                    document.getElementById("div_supplier_list").innerHTML = tmpHtml;
                    $('#div_supplier_list').slick({
                        dots: false,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 7,
                        slidesToScroll: 7,
                        autoplay: true,
                        autoplaySpeed: 4000,
                        responsive: [{
                            breakpoint: 1367,
                            settings: {
                                slidesToShow: 6,
                                slidesToScroll: 6
                            }
                        },
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 5,
                                slidesToScroll: 5,
                                infinite: true
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 4
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }
                        ]
                    });
                }
                else {
                    document.getElementById("div_supplier_list").innerHTML = _imgNotFoundHtml;
                    $('.supplier_list_zone').remove();
                }
            },
            error: function (error) {
                document.getElementById("div_supplier_list").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListSupplierList();ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load latest partnerList!");
            }
        });
    } catch (e) {
        document.getElementById("div_supplier_list").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListSupplierList();ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load latest partnerList!");
    }
}

function LoadListProductByCategory(id) {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetListProductByCategory',
            data: {
                categoryId: id
            },
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_product_by_category").innerHTML = ` 
                       <div class="text-center p-2" >
                                <i type="button" class="fa fa-refresh"
                                    style="border-radius:4px;font-size:24px;"
                                    onclick="LoadListProductByCategory(0);ShowOverlayLoadingButton(this);">
                                </i>
                        </div >`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                var tmpWrapperHtml = ``;
                var link = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        link = `/san-pham/${value.nameSlug}-${value.id}`;
                        tmpHtml +=
                            ` <div class="tab-box">
                                  <div class="product-box2">
                                      <div class="media">
                                          <a class="col-5 my-auto" href="${link}">
                                               <img src="${value.imageObj?.mediumUrl}" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';"
                                                class="img-fluid bg-img" loading="lazy" alt="${value.name}">
                                          </a>
                                          <div class="media-body align-self-center col-5 p-2">
                                              <div class="rating"><i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i></div>
                                              <a data-toggle="tooltip" data-placement="top" title="${value.name}" href="javascript:void(0)">
                                                  <strong class="sp-line-2">${value.name}</strong>
                                              </a>
                                              <div class="mb-0 price_product_by_category"> ${RawListProductPrice(value.productPriceObjs)}</div>
                                              <small class="sp-line-2" data-toggle="tooltip" data-placement="top" title="${!IsNullOrEmty(value.summaryInfo) ? value.summaryInfo : ""}">${!IsNullOrEmty(value.summaryInfo) ? value.summaryInfo : ""}</small>
                                              ${!IsNullOrEmty(value.supplierObj?.name) ? `<i class="sp-line-2" data-toggle="tooltip" data-placement="top" title="${!IsNullOrEmty(value.supplierObj?.name) ? value.supplierObj?.name : ""}"><i class="fa fa-tags" aria-hidden="true"></i> ${value.supplierObj?.name}</i>` : ""} 
                                          </div>
                                      </div>
                                  </div>
                              </div>`;
                    });
                    tmpWrapperHtml = `<div id="tab-7" class="tab-content active default d-block">
                                         <div class="row product-tab">
                                          ${tmpHtml}
                                         </div>
                                     </div>`

                    $("#div_product_by_category").html(tmpWrapperHtml);
                    $('[data-toggle="tooltip"]').tooltip()
                }
                else {
                    var html = `
                        <div class="text-center"> Không có dữ liệu ! </div>
                    `
                    $("#div_product_by_category").html(_imgNotFoundHtml + html);

                }
            },
            error: function (error) {
                document.getElementById("div_product_by_category").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListProductByCategory(0);ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load latest partnerList!");
            }
        });
    } catch (e) {
        document.getElementById("div_product_by_category").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductByCategory(0);ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load latest partnerList!");
    }
}

function OnchangeListProductByCategory(id, elm) {
    ShowOverlay("#div_product_by_category");
    $(".swiper_btn_product_by_category .swiper-slide").removeClass("current")
    setTimeout(function myfunction() {
        $(elm).addClass("current")
        LoadListProductByCategory(id)
        HideOverlay("#div_product_by_category");
    }, 800)
}

function RedirectToProduct() {
    let id = $(".swiper_btn_product_by_category .swiper-slide.current").attr("data-id")
    if (id > 0) {
        location.href = `/san-pham?c1=${id}`
    } else {
        location.href = `/san-pham`
    }
}

function LoadListProductSale() {
    try {
        $.ajax({
            type: 'GET',
            url: '/Home/GetProductSale',
            dataType: "json",
            success: function (response) {
                //Check Error code
                if (response.result !== 1) {
                    document.getElementById("div_product_sale").innerHTML = ` 
                       <div class="text-center p-2" >
                                <i type="button" class="fa fa-refresh"
                                    style="border-radius:4px;font-size:24px;"
                                    onclick="LoadListProductSale(0);ShowOverlayLoadingButton(this);">
                                </i>
                        </div >`;
                    return;
                }
                var listData = response.data;
                var tmpHtml = ``;
                var link = ``;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, value) {
                        link = `/san-pham/${value.nameSlug}-${value.id}`;
                        tmpHtml +=
                            `
                            <div>
                                <div class="cycle-box">
                                    <div class="product-detail">
                                        <a href="${link}">
                                            <h4  data-toggle="tooltip" data-placement="top" title="${!IsNullOrEmty(value.name) ? value.name : ""}" class="sp-line-2 mb-0"><i class="fa fa-tags" aria-hidden="true"></i> ${value.name}</h4>
                                        </a>
                                        <div class="rating">
                                            <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i> <i class="fa fa-star text-warning"></i>
                                        </div>

                                    </div>
                                    <div class="img-wrapper">
                                        <a class="spotlight" href="${link}">
                                            <img src="${value.imageObj?.mediumUrl}" onerror="this.onerror=null;this.src='/assets/images/error/product_1x1_medium.png';"
                                                class="img-fluid" loading="lazy" alt="${value.name}">
                                        </a>
                                    </div>
                                    <div class="bottom-detail mt-0">
                                        <div>
                                            <p class="sp-line-2 custom_bagde my-2" data-toggle="tooltip" data-placement="top" title="${!IsNullOrEmty(value.categoryObj?.name) ? value.categoryObj?.name : ""}">${value.categoryObj?.name}</p>
                                            <h4> <div class="mb-0 price_product_by_category"> ${RawListProductPrice(value.productPriceObjs)}</div></h4>
                                        </div>
                                    </div>
                                    ${!IsNullOrEmty(value.supplierObj?.name) ? ` 
                                    <ul class="cart-detail">
                                        <li>
                                            <small class="sp-line-2" data-toggle="tooltip" data-placement="top" title="${!IsNullOrEmty(value.supplierObj?.name) ? value.supplierObj?.name : ""}"><i class="fa fa-user" aria-hidden="true"></i><i data-feather="shopping-cart"></i> ${value.supplierObj?.name}</small>
                                        </li>
                                    </ul>` : ""
                            }
                                   
                                </div>
                             </div>
                         `;
                    });
                    var tmp = tmpHtml
                    $("#div_product_sale").html(tmp);
                    $('[data-toggle="tooltip"]').tooltip();
                    if (listData.length > 4) {
                        $('.slider_product_sale').slick({
                            centerMode: true,
                            centerPadding: '0',
                            autoplay: true,
                            autoplaySpeed: 1500,
                            slidesToShow: 5,
                            infinite: true,
                            slidesToScroll: 3,
                            responsive: [
                                {
                                    breakpoint: 1199,
                                    settings: {
                                        centerPadding: '0',
                                    }
                                },
                                {
                                    breakpoint: 991,
                                    settings: {
                                        arrows: false,
                                        centerMode: true,
                                        centerPadding: '200px',
                                        slidesToShow: 1
                                    }
                                },
                                {
                                    breakpoint: 767,
                                    settings: {
                                        arrows: false,
                                        centerMode: true,
                                        centerPadding: '100px',
                                        slidesToShow: 1
                                    }
                                },
                                {
                                    breakpoint: 480,
                                    settings: {
                                        arrows: false,
                                        centerMode: true,
                                        centerPadding: '40px',
                                        slidesToShow: 1
                                    }
                                },
                                {
                                    breakpoint: 360,
                                    settings: {
                                        arrows: false,
                                        centerMode: true,
                                        centerPadding: '15px',
                                        slidesToShow: 1
                                    }
                                }
                            ]
                        });
                    }
                    else {
                        $('.slider_product_sale').slick({
                            centerMode: true,
                            centerPadding: '0',
                            autoplay: true,
                            autoplaySpeed: 1500,
                            slidesToShow: 3,
                            infinite: false,
                            slidesToScroll: 3,
                            responsive: [
                                {
                                    breakpoint: 1199,
                                    settings: {
                                        centerPadding: '0',
                                    }
                                },
                                {
                                    breakpoint: 991,
                                    settings: {
                                        arrows: false,
                                        centerMode: true,
                                        centerPadding: '200px',
                                        slidesToShow: 1
                                    }
                                },
                                {
                                    breakpoint: 767,
                                    settings: {
                                        arrows: false,
                                        centerMode: true,
                                        centerPadding: '100px',
                                        slidesToShow: 1
                                    }
                                },
                                {
                                    breakpoint: 480,
                                    settings: {
                                        arrows: false,
                                        centerMode: true,
                                        centerPadding: '40px',
                                        slidesToShow: 1
                                    }
                                },
                                {
                                    breakpoint: 360,
                                    settings: {
                                        arrows: false,
                                        centerMode: true,
                                        centerPadding: '15px',
                                        slidesToShow: 1
                                    }
                                }
                            ]
                        });
                    }
                }
                else {
                    $(".div_product_sale").remove()
                }
            },
            error: function (error) {
                document.getElementById("div_product_sale").innerHTML = ` 
                    <div class="text-center p-2">
                        <i type="button" class="fa fa-refresh" 
                            style="border-radius:4px;font-size:24px;" 
                            onclick="LoadListProductSale(0);ShowOverlayLoadingButton(this);">
                        </i>
                    </div>`;
                console.log("Error when load latest partnerList!");
            }
        });
    } catch (e) {
        document.getElementById("div_product_by_category").innerHTML = `
                        <div class="text-center p-2" >
                            <i type="button" class="fa fa-refresh"
                                style="border-radius:4px;font-size:24px;"
                                onclick="LoadListProductSale(0);ShowOverlayLoadingButton(this);">
                            </i>
                        </div >`;
        console.log("Error when load product sale!");
    }
}