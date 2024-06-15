$(document).ready(function () {

    AOS.init({ disable: 'mobile' });

    //Disabled iframe out site
    if (top.location != self.location) { top.location = self.location; }

    //Check authen to count shopping cart item
    let isShow = '@Model?.isAuthenticated';
    if (isShow === "True")
        CountShoppingCartItem();

    window.addEventListener('load', function () {
        const LOCATION_HREF = location.pathname + location.search;
        const LOCATION_PATHNAME = location.pathname;
        $('#main-nav li a').each(function () {
            if ((LOCATION_PATHNAME === $(this).attr('href') || LOCATION_PATHNAME.split('/')[1] === $(this).attr('href').split('/')[1]) && !$(this).hasClass('child'))
                $(this).addClass('active');
            if (LOCATION_HREF.indexOf($(this).attr('href')) === 0 && $(this).hasClass('child'))
                $(this).addClass('active');
        });
    })

    let memberIdentity = GetCookie("memberjsonObj");
    //console.log(memberIdentity);
    if (!IsNullOrEmty(memberIdentity)) {
        //let memberObj = JSON.parse(memberIdentity);
        //let startDate = moment(memberObj.expireTime).format("YYYY/MM/DD");
        //let endDate = moment().format("YYYY/MM/DD");
        //var math = new Date(endDate) - new Date(startDate);
        //var days = Math.floor(math / (3600000 * 24));
        //if (days > 0) {
        //    localStorage.removeItem("memberjsonObj");
        //}
        //else {
        //    $(".div_nav_profile").append(`<li class="mb-1 fs-6"><a class="text-success" href="javascript:void(0)" onclick="ReturnMemberPage()">Trang mua hàng</a></li>`)
        //    $(".div_menu_account").append(`  <li class="nav-item">
        //        <a class="text-success nav-link bg-white" href="javascript:void(0)" onclick="ReturnMemberPage()"><i class="fa fa-arrow-left" aria-hidden="true"></i> Trở lại trang mua hàng</a>
        //    </li>`)
        //    $(".div_show_when_have_local_storage").show();
        //}
        $(".div_show_when_have_local_storage").show();
    } else {
        $(".div_show_when_have_local_storage").hide();
    }

    particlesJS.load('particles_div_header', '/lib/particles/particlesjs-config-header.json', function () {
        //console.log('callback - particles.js config loaded'particlesjs-config-header.json);
    });

    //Disabled iframe out site
    if (top.location != self.location) { top.location = self.location; }


    particlesJS.load('particles_div_footer', '/lib/particles/particles.json', function () {
        //console.log('callback - particles.js config loaded');
    });

});

function CountShoppingCartItem() {
    $.ajax({
        type: 'GET',
        url: '/Checkout/CountShoppingCartItem',
        dataType: 'json',
        success: function (response) {
            if (response.result === 1)
                if (response.data === 0) {
                    $('.cart_qty_cls').text(0); $('.cart_qty_cls').fadeOut(100);
                } else if (response.data > 0 && response.data < 10) {
                    $('.cart_qty_cls').text(response.data); $('.cart_qty_cls').fadeIn(100);
                } else {
                    $('.cart_qty_cls').text('9+'); $('.cart_qty_cls').fadeIn(100);
                }
        }, error: function () {
            console.log('Error when count shopping cart item');
        }
    });
}

function openSearch() {
    document.getElementById("search-overlay").style.display = "block";
    $(".toggle-nav").css("display", "none");
}

function closeSearch() {
    document.getElementById("search-overlay").style.display = "none";
    $(".toggle-nav").css("display", "");
}

function ShowPending() {
    ShowToastNoti("info", "Chức năng đang phát triển", "Vui lòng quay lại sau nhé !");
    return;
}

function ReturnMemberPage() {
       let memberIdentity = GetCookie("memberjsonObj");;
    if (!IsNullOrEmty(memberIdentity)) {
        let memberObj = JSON.parse(memberIdentity);
        location.href = `/npp/${memberObj?.identity}`;
    } else {
        ShowToastNoti('info', 'Link mua hàng không tìm thấy', "Vui lòng chọn cửa hàng bạn muốn đặt hàng");
        return false;
    }
}