var laddaSubmitForm;

$(document).ready(function () {

    //Init bootstrap max length
    $('#form_data input[type="text"],input[type="email"],textarea').maxlength({
        alwaysShow: !0,
        warningClass: "badge badge-success",
        limitReachedClass: "badge badge-danger"
    });

    //Init validation form parsley
    $('#form_data').parsley();

    laddaSubmitForm = Ladda.create(document.querySelector('#btn_submit_form'));

    //Submit form
    $('#form_data').on('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let $formElm = $(this);
        let isvalidate = $formElm[0].checkValidity();
        if (!isvalidate) { ShowToastNoti('warning', '', _resultActionResource.PleaseWrite); return false; }
        let formData = new FormData($formElm[0]);
        laddaSubmitForm.start();
        $.ajax({
            url: '/Contact/SubmitContact',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                laddaSubmitForm.stop();
                if (!CheckResponseIsSuccess(response)) return false;
                document.getElementById('form_data').reset();
                RemoveClassValidate('#form_data');
                $('#modal_send_success').modal('show');
                ChangeDescripRatingStart(parseInt($('input[name="RatingStart"]:checked').val()));
            }, error: function (err) {
                laddaSubmitForm.stop();
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
        //grecaptcha.ready(function () {
        //    grecaptcha.execute(reCATPCHA_Site_Key, { action: 'submit' }).then(function (token) {
        //        // Add your logic to submit to your backend server here.
        //        document.getElementById("TokenReCAPTCHA").value = token;

        //        let isvalidate = $formElm[0].checkValidity();
        //        if (!isvalidate) { ShowToastNoti('warning', '', _resultActionResource.PleaseWrite); return false; }
        //        let formData = new FormData($formElm[0]);
        //        laddaSubmitForm.start();
        //        $.ajax({
        //            url: '/Contact/SubmitContact',
        //            type: 'POST',
        //            data: formData,
        //            contentType: false,
        //            processData: false,
        //            success: function (response) {
        //                laddaSubmitForm.stop();
        //                if (!CheckResponseIsSuccess(response)) return false;
        //                document.getElementById('form_data').reset();
        //                RemoveClassValidate('#form_data');
        //                $('#modal_send_success').modal('show');
        //                ChangeDescripRatingStart(parseInt($('input[name="RatingStart"]:checked').val()));
        //            }, error: function (err) {
        //                laddaSubmitForm.stop();
        //                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        //            }
        //        });
        //    });
        //});
    });

    //Load default rating start
    ChangeDescripRatingStart(parseInt($('input[name="RatingStart"]:checked').val()));

    $('.rating__label').hover(function () {
        let start = $(this).data('rate');
        ChangeDescripRatingStart(start);
    });

    $('.rating__label').mouseleave(function () {
        let start = parseInt($('input[name="RatingStart"]:checked').val());
        ChangeDescripRatingStart(start);
    });

    //ScrollToTop(".contact-page", 50, 500);
});

function ChangeDescripRatingStart(num) {
    let text = '';
    switch (num) {
        case 1: text = '<img src="/img/rate_face/1.png" /><span class="text-danger">Quá tệ</span>'; break;
        case 2: text = '<img src="/img/rate_face/2.png" /><span class="text-warning">Không hài lòng</span>'; break;
        case 3: text = '<img src="/img/rate_face/3.png" /><span class="text-secondary">Bình thường</span>'; break;
        case 4: text = '<img src="/img/rate_face/4.png" /><span class="text-info">Tốt</span>'; break;
        case 5: text = '<img src="/img/rate_face/5.png" /><span class="text-success">Rất tốt</span>'; break;
        default:
    }
    $('#divStartDescrip').html(text);
}

function InitMap() {
    var marker, i, infowindow;

    var locations = [
        ['', LATITUDE, LONGITUDE, 1],
        //['<b>OFFICE <span style="color:#f2c21a">H2A</span></b>', 10.959761222941351, 106.81142493967435, 2]
    ];
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new google.maps.LatLng(LATITUDE, LONGITUDE),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            animation: google.maps.Animation.BOUNCE,
            //icon: '~/images/icon/map-marker2.png',
            map: map
        });

        if (!IsNullOrEmty(locations[i][0])) {
            google.maps.event.addListener(marker, 'onload', (function (marker, i) {
                infowindow = new google.maps.InfoWindow();
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            })(marker, i));
        }
    }
}
