var laddaSubmitForm;

var filesArrAdd = [];
Dropzone.autoDiscover = false;
maxFiles = MAX_IMAGE_FILE;
$('#maxFileSizeConst').text(MAX_FILE_SIZE_IMAGE);
$('#imageListMaxFiles').text(MAX_IMAGE_FILE);
//mutiple Dropzone
//var myDropzone = new Dropzone('#multipleUploadImageAdd', {
//    autoProcessQueue: false,
//    url: "#",
//    paramName: "ListImageFile",
//    uploadMultiple: true,
//    maxFilesize: maxFiles,
//    maxFiles: maxFiles,
//    acceptedFiles: ACCEPT_EXTENSION_IMAGE_FILE,
//    init: function () {
//        this.on("maxFiles", function (file) {
//            alert(`Tối đa ${maxFiles} ảnh!`);
//            this.removeFile(file);
//        });
//        this.on("maxFilesize", function (file) {
//            alert(`Dung lượng ảnh tối đa ${maxFileSizeConst}MB.`);
//            this.removeFile(file);
//        });
//        this.on("acceptedFiles", function (file) {
//            alert("Ảnh không hợp lệ (.png, .jpg)");
//            this.removeFile(file);
//        });

//        this.on("error", function (file) {
//            var type = file.type.toLowerCase();
//            if (type != "image/png" && type != "image/jpg" && type != "image/jpeg") {
//                ShowErrorMessage("warning", "", "Ảnh không hợp lệ (.png, .jpg)!");
//                this.removeFile(file);
//            } else if (file.size > maxFileSizeConst * 1024 * 1024) {
//                ShowErrorMessage("warning", "", `Dung lượng ảnh tối đa ${maxFileSizeConst}MB.`);
//                this.removeFile(file);
//            } else if (this.files.length > maxFiles) {
//                ShowErrorMessage("warning", "", `Tối đa ${maxFiles} ảnh!`);
//                this.removeFile(file);
//            }
//        });

//        this.on("addedfile", function (file) {

//            // Push file
//            filesArrAdd.push(file);

//        });

//        this.on("removedfile", function (file) {

//            // Remove files
//            filesArrAdd.splice(file, 1);

//        });
//    },
//    previewsContainer: "#file-previews-add",
//    previewTemplate: $("#uploadPreviewTemplateAdd").html()
//});

//single upload Dropzone
$('[data-plugins="dropify"]').length && $('[data-plugins="dropify"]').dropify({
    messages: {
        default: '<h5>Kéo thả hoặc chọn vào để tải ảnh</h5>',
        replace: "Chọn ảnh",
        remove: "Xóa",
        error: "Ảnh không hợp lệ"
    }, error: { fileSize: "Kích thước tối đa " + { maxFileSizeConst } + "MB." }
});
$(document).ready(function () {

    $(".selectpicker").selectpicker()
    //Init bootstrap max length
    $('[maxlength]').maxlength({
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
        //if (filesArrAdd.length < 1) {
        //    ShowToastNoti('warning', '', 'Vui lòng bổ sung chứng nhận OCOP'); return false;
        //}
        var checkRequiredWard = $('#input_check_toggle_attr_required_for_ward').val();
        if (checkRequiredWard < 1) {
            ShowToastNoti('warning', '', 'Bạn vui lòng chọn Phường/xã'); return false;
            return false;
        }
        let firstName = $("#FirstName");
        let lastName = $("#LastName");
        let supplierName = `Nhà Phân Phối ${lastName + " " + firstName}`


        filesArrAdd.forEach(function (item, index) {
            formData.append("Name", supplierName);
        });

        laddaSubmitForm.start();
        $.ajax({
            url: '/MemberRegister/Submit',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                laddaSubmitForm.stop();
                if (!CheckResponseIsSuccess(response)) return false;
                $('#sendContactSuccessModal').modal('show');

                //Reset and clean form
                document.getElementById('form_data').reset();
                RemoveClassValidate('#form_data');
                $('#SupplierModelId').change();
                $('#provinceId').selectpicker('val', 0);
                $('#districtId').html('<option value="0">--Chọn--</option>');
                $('#districtId').selectpicker('refresh');
                $('#districtId').selectpicker('val', 0);
                $('#wardId').html('<option value="0">--Chọn--</option>');
                $('#wardId').selectpicker('refresh');
                $('#wardId').selectpicker('val', 0);
                /*  $(".dropify-clear").trigger("click");*/
                //document.getElementById('ImageFile').value = null;
                //myDropzone.removeAllFiles(true);
                //document.getElementById('ListImageFile').value = null;
                //$(".file-upload-wrapper").attr("data-text", "Chọn ảnh chân dung");
            }, error: function (err) {
                laddaSubmitForm.stop();
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    });
});

//On change province form
function OnChangeProvinceFormEvent(elm, formId) {
    var currentVal = $(elm).val();
    let formElement = document.getElementById(formId).elements;
    if (parseInt(currentVal) === 0) {
        $(formElement.districtId).html('');
        $(formElement.districtId).attr('disabled', true);
        $(formElement.districtId).selectpicker("refresh");
        $(formElement.wardId).html('');
        $(formElement.wardId).attr('disabled', true);
        $(formElement.wardId).selectpicker("refresh");
    } else {
        ShowOverlay3Dot('#div_zone_district');
        $.ajax({
            type: 'GET',
            url: '/Address/GetListDistrictOptionHtml',
            data: {
                id: currentVal
            },
            dataType: 'json',
            success: function (response) {
                HideOverlay3Dot('#div_zone_district');
                if (!CheckResponseIsSuccess(response)) return false;
                if (IsNullOrEmty(response.data))
                    response = '<option value="0">Không có dữ liệu...</option>';
                $(formElement.wardId).html('');
                $(formElement.wardId).attr('disabled', true);
                $(formElement.wardId).selectpicker("refresh");
                $(formElement.districtId).html('<option value="0">--Chọn--</option>' + response.data);
                $(formElement.districtId).attr('disabled', false);
                $(formElement.districtId).selectpicker("refresh");
                let firstOption = $(formElement.districtId).children('option:not(.bs-title-option)').eq(0).val();
                $(formElement.districtId).selectpicker('val', firstOption);
            },
            error: function (err) {
                HideOverlay3Dot('#div_zone_district');
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    }
}

//On change district form
function OnChangeDistrictFormEvent(elm, formId) {
    var currentVal = $(elm).val();
    let formElement = document.getElementById(formId).elements;
    $(formElement.wardId).selectpicker("refresh");

    if (parseInt(currentVal) === 0) {
        $(formElement.wardId).html('');
        $(formElement.wardId).attr('disabled', true);
        $(formElement.wardId).selectpicker("refresh");
    } else {
        ShowOverlay3Dot('#div_zone_ward');
        $.ajax({
            type: 'GET',
            url: '/Address/GetListWardOptionHtml',
            data: {
                id: currentVal
            },
            dataType: 'json',
            success: function (response) {
                HideOverlay3Dot('#div_zone_ward');
                if (!CheckResponseIsSuccess(response)) return false;
                if (!IsNullOrEmty(response.data)) {
                    $('#input_check_toggle_attr_required_for_ward').val(1)
                } else {
                    $('#input_check_toggle_attr_required_for_ward').val(0)
                }
                if (IsNullOrEmty(response.data))
                    response = '<option value="0">Không có dữ liệu...</option>';
                $(formElement.wardId).html(response.data);
                $(formElement.wardId).attr('disabled', false);
                $(formElement.wardId).selectpicker("refresh");
                let firstOption = $(formElement.wardId).children('option:not(.bs-title-option)').eq(0).val();
                $(formElement.wardId).selectpicker('val', firstOption);
            },
            error: function (err) {
                HideOverlay3Dot('#div_zone_ward');
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    }
}
