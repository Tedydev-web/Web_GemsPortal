$(document).ready(function () {
    $("#offcanvas-info").ripples({
        resolution: 256,
        dropRadius: 15,
        perturbance: 0.04,
    });
 

    //$("#offcanvas-info").ripples({
    //    resolution: 512,
    //    dropRadius: 20,
    //    perturbance: 0.04,
    //    interactive: true
    //});
    /*  AOS.init({ disable: 'mobile' });*/

    //Load particles json
    particlesJS.load('particles_div_1', '/lib/particles/particles.json', function () {
        //console.log('callback - particles.js config loaded');
    });

    particlesJS.load('particles_div_2', '/lib/particles/particles.json', function () {
        //console.log('callback - particles.js config loaded');
    });


    new Swiper(".slider_small_image", {
        dots: false,
        infinite: true,
        speed: 1200,
        slidesToShow: 7,
        adaptiveHeight: true,
        arrows: true,
        loop: false,
        slidesPerView: 7,
        autoplay: true,
        autoplaySpeed: 4000,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});
