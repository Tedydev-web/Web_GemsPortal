var laddaSubmitForm;

$(document).ready(function () {

    //Init validation form parsley
    $('#form_data').parsley();

    //Init ladda
    laddaSubmitForm = Ladda.create($('#form_data button[type="submit"]')[0]);

    //Submit form
    $('#form_data').on('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let $formElm = $('#form_data');
        let isvalidate = $formElm[0].checkValidity();
        if (!isvalidate) { ShowToastNoti('warning', '', _resultActionResource.PleaseWrite); return false; }
        let formData = new FormData($formElm[0]);
        laddaSubmitForm.start();
        $.ajax({
            url: $formElm.attr('action'),
            type: $formElm.attr('method'),
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                laddaSubmitForm.stop();
                if (!CheckResponseIsSuccess(response)) return false;
                ShowToastNoti('success', '', 'Đăng nhập thành công. Đang chuyển hướng...', 4000, 'topCenter');
                location.href = IsNullOrEmty(response.data) ? "/" : response.data;
            }, error: function (err) {
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    });

});

function ShowPassword(elm) {
    var pass = $(elm).attr('data-forcus');
    if ($(pass).attr('type') === "password") {
        $(pass).attr('type', 'text');
        $(elm).removeClass('fa-eye-slash').addClass('fa-eye');
    } else {
        $(pass).attr('type', 'password');
        $(elm).removeClass('fa-eye').addClass('fa-eye-slash');
    }
}