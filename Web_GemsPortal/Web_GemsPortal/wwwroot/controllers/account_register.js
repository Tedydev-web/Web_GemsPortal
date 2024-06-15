var laddaSubmitForm, laddaVerifiedCode;
var countResend = 0;
var $errorMessageVerified = $('#p_error_input_verified');
var $inputVerified = $('#input_verified_code');
var $buttonVerified = $('#btn_verified_code');
var keyVerified = 0;
var telephoneNumberVerified = null;
var passwordVerified = null;
var intervalCountDown = null;

$(document).ready(function () {

    //Init validation form parsley
    $('#form_data').parsley();

    //Init ladda
    laddaSubmitForm = Ladda.create($('#form_data button[type="submit"]')[0]);
    laddaVerifiedCode = Ladda.create(document.querySelector('#btn_verified_code'));

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
                keyVerified = response.data;
                telephoneNumberVerified = $formElm.find('[name="phoneNumber"]').val();
                passwordVerified = $formElm.find('[name="password"]').val();
                document.body.scrollTop = 0;
                document.getElementById('form_data').reset();
                RemoveClassValidate($formElm);
                $('#div_verified_code').fadeIn(100);
                $('#div_register_form').fadeOut(100);
            }, error: function (err) {
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });

    });

    //On keyup input verified code
    $inputVerified.on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13)
            $buttonVerified.click();
        else
            if (IsNullOrEmty($(this).val()))
                $errorMessageVerified.text('Vui lòng nhập mã xác thực!');
            else
                $errorMessageVerified.text('');
    });

    //Submit verified code
    $buttonVerified.on('click', function () {
        var value = $inputVerified.val();
        if (IsNullOrEmty(value)) {
            $errorMessageVerified.text('Vui lòng nhập mã xác thực!');
            $inputVerified.focus();
            return;
        } else {
            $errorMessageVerified.text('');
        }

        laddaVerifiedCode.start();
        $inputVerified.prop('readonly', true);
        $.ajax({
            url: '/Account/VerifedRegister',
            type: 'POST',
            data: {
                key: keyVerified,
                code: value,
                phoneNumber: telephoneNumberVerified,
                password: passwordVerified,
            },
            dataType: 'json',
            success: function (response) {
                laddaVerifiedCode.stop();
                $inputVerified.prop('readonly', false);
                CheckResponseIsSuccess(response);
                if (response.result === 1)
                    AutoRedirectToLoginPage(response);
                else
                    $errorMessageVerified.text(response.error.message);
            }, error: function (err) {
                laddaVerifiedCode.stop();
                $inputVerified.prop('readonly', false);
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    });

});

//Resend code
function ResendCode(elm) {
    countResend++;
    $(elm).html('Đang gửi...');
    $.ajax({
        url: '/Account/ResendVerifiedRegister',
        type: 'POST',
        data: {
            key: keyVerified
        },
        dataType: 'json',
        success: function (response) {
            $(elm).html('Gửi lại.');
            if (!CheckResponseIsSuccess(response)) return false;
            ShowToastNoti('success', '', 'Đã gửi!');
            if (countResend >= 2) {
                $(elm).remove();
                return false;
            }
        }, error: function () {
            $(elm).html('Gửi lại.');
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

//Auto redirect login
function AutoRedirectToLoginPage(res) {
    if (res.data2nd) { //Sign in success
        $('#div_signin_success_auto_redirect').css('display', 'block;');
        $('#div_auto_redirect_signin').css('display', 'none;');
    } else {
        $('#div_auto_redirect_signin').css('display', 'block;');
        $('#div_signin_success_auto_redirect').css('display', 'none;');
    }
    var $timeOutEl = $('.b_time_out_auto_login');
    $timeOutEl.html(2); //Set timeout by seconds
    $('#modal_register_success').modal('show');
    intervalCountDown = setInterval(function () {
        let value = parseInt($timeOutEl.eq(0).text());
        if (value > 0)
            $timeOutEl.html(value - 1);
        else {
            clearInterval(intervalCountDown);
            if (res.data2nd) { //Sign in success
                location.href = IsNullOrEmty(GetParameterByNameInUrl("returnUrl")) ? '/' : GetParameterByNameInUrl("returnUrl");
                return false;
            } else {
                location.href = '/account/signin';
            }
        }
    }, 1000);
}

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