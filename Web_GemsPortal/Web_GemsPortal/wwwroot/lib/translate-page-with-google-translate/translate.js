const DEFAULT_LANGUAGE = 'vi';

setTimeout(function () {
    $('#preloader').fadeOut(1200);
}, 500);

$(document).ready(function () {

    //When click li to translate in desktop
    $('.translate_select .language_item').on('click', function () {
        let value = $(this).attr('data-id');
        const collection = document.getElementsByTagName("html")[0];
        const currentLang = collection.getAttribute("lang");
        if (value == currentLang) return false;
        TranslatePage(value);
        $('.translate_select .language_item').removeClass('active_flag');
        $('.translate_current_lang').html(`<img class="img_flag_lang" height="20" width="30" src="/img/icon_language/${value}.png" alt="${value}" />`);
        $(this).addClass('active_flag');
    });


    HideOverlayPage();
    AutoTranslate();
});

function AutoTranslate() {
    let lang = GetCookies('lang');
    lang = lang == '' || lang == null ? DEFAULT_LANGUAGE : lang;
    $(`.translate_select .language_item[data-id="${lang}"]`).addClass('active_flag');
    $('.translate_current_lang').html(`<img class="img_flag_lang" height="20" width="30" src="/img/icon_language/${lang}.png" alt="${lang}" />`);
    if (lang == DEFAULT_LANGUAGE) {
        $('html').attr('translate', 'no');
    } else {
        $('html').removeAttr('translate');
        TranslatePage(lang);
    }
}

function TriggerHtmlEvent(element, eventName) {
    let event;
    if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, true);
        element.dispatchEvent(event);
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
        element.fireEvent('on' + event.eventType, event);
    }
}

function TranslatePage(lang) {
    if (lang == DEFAULT_LANGUAGE) {
        $('html').attr('translate', 'no');
    } else {
        $('html').removeAttr('translate');
    }
    $('.goog-te-combo').val(lang);
    let select = document.querySelector('.goog-te-combo');
    TriggerHtmlEvent(select, 'change');
    DeleteCookie('lang');
    SetCookies('lang', lang, 365);
}

function HideOverlayPage() {
    let lang = GetCookies('lang');
    if (lang == DEFAULT_LANGUAGE) 
        $('#loader_container').delay(0).fadeOut(100);
     else 
        $('#loader_container').delay(800).fadeOut(200);
}

function SetCookies(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function GetCookies(cname) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == cname) {
            return unescape(y);
        }
    }
}
