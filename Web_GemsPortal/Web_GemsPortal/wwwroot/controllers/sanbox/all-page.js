$(document).ready(function () {

    //Disabled iframe out site
    if (top.location != self.location) { top.location = self.location; }

    let widthWindow = $(document).width();
    if (widthWindow > 991) {
        $('.menu_header .dropdown-toggle').removeAttr('data-bs-toggle');
    }

    particlesJS.load('particles_div_footer', '/lib/particles/particles.json', function () {
        //console.log('callback - particles.js config loaded');
    });

    particlesJS.load('particles_div_header', '/lib/particles/particlesjs-config-header.json', function () {
        //console.log('callback - particles.js config loaded'particlesjs-config-header.json);
    });
});
