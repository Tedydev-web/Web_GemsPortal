var laddaSubmitForm;

const tableDataHtml = function (data) {
    var itemHtml = '';
    let addressTmp = '';
    let typeTmp = '';
    $.each(data, function (key, value) {
        switch (value.typeId) {
            case 0: typeTmp = '<span class="badge badge-warning">Khác</span>'; break;
            case 1: typeTmp = '<span class="badge badge-danger">Nhà riêng</span>'; break;
            case 2: typeTmp = '<span class="badge badge-primary">Văn phòng</span>'; break;
            default: break;
        }
        addressTmp = `${value.addressText}, ${value.wardName}, ${value.districtName}, ${value.provinceName}`;
        itemHtml +=
            `<tr id="tr_address_item_${value.id}">
                <td class="text-left">${IsNullOrEmty(value.name) ? "" : value.name}</td>
                <td style="min-width:180px; text-align:left;">${value.isDefault === 1 ? '<span class="badge badge-success">Mặc định</span> ' : ''}${addressTmp}</td>
                <td>${IsNullOrEmty(value.phoneNumber) ? "" : value.phoneNumber}</td>
                <td>${typeTmp}</td>
                <td>
                    <a href="javascript:void(0)" onclick="ShowEditModal(this,'${value.id}')">
                        <i class="fa fa-pencil-square-o text-success m-1" aria-hidden="true"></i>
                    </a>
                    <a href="javascript:void(0)" onclick="Delete('${value.id}')">
                        <i class="fa fa-trash-o text-danger m-1" aria-hidden="true"></i>
                    </a>
                </td>
            </tr>`;
    });
    return itemHtml;
}

$(document).ready(function () {

    LoadListData();

});

//Load list data
function LoadListData() {
    try {
        ShowLoadingBody("#tbody_main_table");
        $.ajax({
            type: 'GET',
            url: '/Address/GetListDeliveryAddress',
            dataType: "json",
            success: function (response) {
                HideLoadingBody("#tbody_main_table");
                //Check Error code
                if (!CheckResponseIsSuccess(response)) {
                    document.getElementById("tbody_main_table").innerHTML =
                        `<tr>
                            <td colspan="5" class="text-center p-2">
                                <h4>Kết nối không ổn định</h4>
                                <button type="button" class="btn btn-sm btn-primary" 
                                    style="width:150px;border-radius:4px;" 
                                    onclick="LoadListData();$(this).parent().remove();">Tải lại
                                </button>
                            </td>
                        </tr>`;
                    return false;
                }

                var listData = response.data;
                if (listData != null && listData.length > 0) {
                    document.getElementById("tbody_main_table").innerHTML = tableDataHtml(listData);
                } else {
                    document.getElementById("tbody_main_table").innerHTML =
                        `<tr>
                            <td colspan="5" class="text-center p-2">
                                Sổ địa chỉ của bạn chưa có dữ liệu. Hãy thêm địa chỉ mới.
                            </td>
                        </tr>`;
                }
            },
            error: function (err) {
                HideLoadingBody("#tbody_main_table");
                document.getElementById("tbody_main_table").innerHTML =
                    `<tr>
                        <td colspan="5" class="text-center p-2">
                            <h4>Kết nối không ổn định</h4>
                            <button type="button" class="btn btn-sm btn-primary"
                                style="width:150px;border-radius:4px;"
                                onclick="LoadListData();$(this).parent().remove();">Tải lại
                                    </button>
                        </td>
                     </tr >`;
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    } catch (e) {
        document.getElementById("tbody_main_table").innerHTML =
            `<tr>
                <td colspan="5" class="text-center p-2">
                    <h4>Kết nối không ổn định</h4>
                    <button type="button" class="btn btn-sm btn-primary" 
                        style="width:150px;border-radius:4px;" 
                        onclick="LoadListData();$(this).parent().remove();">Tải lại
                    </button>
                </td>
            </tr>`;
        console.log("Error when load data!");
    }
}

//Show add address modal
function ShowAddModal(elm) {
    let laddaShow = Ladda.create(elm);
    laddaShow.start();
    $.get('/Address/P_Add').done(function (response) {
        laddaShow.stop();
        if (response.result === -1 || response.result === 0) {
            CheckResponseIsSuccess(response); return false;
        }
        $('#div_view_panel').html(response);
        $('.selectpicker').selectpicker();
        $('#div_main_table').fadeOut(200);
        $('#div_view_panel').fadeIn(200);
        InitSubmitAddForm();

        //Init bootstrap max length
        $('form input[type="text"]').maxlength({
            alwaysShow: !0,
            warningClass: "badge badge-success",
            limitReachedClass: "badge badge-danger"
        });
    }).fail(function (err) {
        laddaShow.stop();
        CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
    });
}

//Show edit address modal
function ShowEditModal(elm, id) {
    let text = $(elm).html();
    $(elm).attr('onclick', ''); $(elm).html(_loadAnimationSmallHtml);
    $.get(`/Address/P_Edit/${id}`).done(function (response) {
        $(elm).html(text); $(elm).attr('onclick', `ShowEditModal(this, '${id}')`);
        if (response.result === -1 || response.result === 0) {
            CheckResponseIsSuccess(response); return false;
        }
        $('#div_view_panel').html(response);
        $('.selectpicker').selectpicker();
        $('#div_main_table').fadeOut(200);
        $('#div_view_panel').fadeIn(200);
        InitSubmitEditForm();

        //Init bootstrap max length
        $('form input[type="text"]').maxlength({
            alwaysShow: !0,
            warningClass: "badge badge-success",
            limitReachedClass: "badge badge-danger"
        });
    }).fail(function (err) {
        $(elm).html(text); $(elm).attr('onclick', `ShowEditModal(this, '${id}')`);
        CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
    });
}

//Init submit add form
function InitSubmitAddForm() {
    $('#form_data_add').on('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let $formElm = $('#form_data_add');
        var validateDropdown = ValidateDropDownAddress(document.getElementById('form_data_add').elements, '#form_data_add');
        if (!validateDropdown) { ShowToastNoti('warning', '', _resultActionResource.PleaseWrite); return false; }
        let formData = new FormData($formElm[0]);
        laddaSubmitForm = Ladda.create(document.querySelector('#btn_submit_form_add'));
        laddaSubmitForm.start();
        $.ajax({
            url: '/Address/P_Add',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                laddaSubmitForm.stop();
                if (!CheckResponseIsSuccess(response)) return false;
                ShowToastNoti('success', '', _resultActionResource.AddSuccess);
                CloseModal();
                LoadListData();
            }, error: function (err) {
                laddaSubmitForm.stop();
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    });
}

//Init submit edit form
function InitSubmitEditForm() {
    $('#form_data_edit').on('submit', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let $formElm = $('#form_data_edit');
        var validateDropdown = ValidateDropDownAddress(document.getElementById('form_data_edit').elements, '#form_data_edit');
        if (!validateDropdown) { ShowToastNoti('warning', '', _resultActionResource.PleaseWrite); return false; }
        let formData = new FormData($formElm[0]);
        laddaSubmitForm = Ladda.create(document.querySelector('#btn_submit_form_edit'));
        laddaSubmitForm.start();
        $.ajax({
            url: '/Address/P_Edit',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                laddaSubmitForm.stop();
                if (!CheckResponseIsSuccess(response)) return false;
                ShowToastNoti('success', '', _resultActionResource.UpdateSuccess);
                CloseModal();
                LoadListData();
            }, error: function (err) {
                laddaSubmitForm.stop();
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    });
}

//Delete
function Delete(id) {
    swal.fire({
        title: "Bạn có muốn xóa địa chỉ này?",
        text: "",
        type: "warning",
        showCancelButton: !0,
        confirmButtonText: "Xóa",
        cancelButtonText: "Không",
        confirmButtonClass: "btn btn-danger mx-1 mt-2",
        cancelButtonClass: "btn btn-outline-secondary mx-1 mt-2",
        reverseButtons: true,
        buttonsStyling: !1,
        showLoaderOnConfirm: true,
        preConfirm: function () {
            return new Promise(function (resolve, reject) {
                $.ajax({
                    type: 'POST',
                    url: '/Address/Delete',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function (response) {
                        if (!CheckResponseIsSuccess(response)) {
                            resolve();
                            return false;
                        }
                        RemoveRowUI(id);
                        resolve();
                    },
                    error: function (err) {
                        CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
                        resolve();
                    }
                });
            });
        }
    });
}

//Check validate dropdown
function ValidateDropDownAddress(elmForm, form) {
    var isValid = true;
    var $name = $(form + ' #ul_parsley_name');
    var $phonenumber = $(form + ' #ul_parsley_phonenumber');
    var $addresstext = $(form + ' #ul_parsley_addresstext');
    var $province = $(form + ' #ul_parsley_province');
    var $district = $(form + ' #ul_parsley_district');
    var $ward = $(form + ' #ul_parsley_ward');

    $(form + ' #name').on('keyup', function () {
        let value = $(this).val();
        CheckRequired($name, value)
    });
    $(form + ' #phoneNumber').on('keyup', function () {
        let value = $(this).val();
        if (!IsNullOrEmty(value)) {
            if (!/^[0-9]{3,12}$/.test(value))
                $($phonenumber.find('li')[1]).css('display', 'block')
            else
                $($phonenumber.find('li')[1]).css('display', 'none');
            $($phonenumber.find('li')[0]).css('display', 'none');
        } else
            $($phonenumber.find('li')[0]).css('display', 'block'), $($phonenumber.find('li')[1]).css('display', 'none');
    });
    $(form + ' #addressText').on('keyup', function () {
        let value = $(this).val();
        CheckRequired($addresstext, value);
    });
    $(form + ' #provinceId').on('change', function () {
        let value = $(this).val();
        CheckRequired($province, value);
        setTimeout(function () {
            let district = $(form + ' #districtId');
            let ward = $(form + ' #wardId')
            CheckRequired($district, district.val());
            CheckRequired($ward, ward.val());
        }, 200);
    });
    $(form + ' #districtId').on('change', function () {
        let value = $(this).val();
        CheckRequired($district, value);
        setTimeout(function () {
            let ward = $(form + ' #wardId');
            CheckRequired($ward, ward.val());
        }, 200);
    });
    $(form + ' #wardId').on('change', function () {
        let value = $(this).val();
        CheckRequired($ward, value);
    });

    if (!CheckRequired($name, elmForm.name.value)) isValid = false;
    if (!CheckRequired($addresstext, elmForm.addressText.value)) isValid = false;
    if (!CheckRequired($province, elmForm.provinceId.value)) isValid = false;
    if (!CheckRequired($district, elmForm.districtId.value)) isValid = false;
    if (!CheckRequired($ward, elmForm.wardId.value)) isValid = false;

    if (!IsNullOrEmty(elmForm.phoneNumber.value)) {
        if (!/^[0-9]{3,12}$/.test(elmForm.phoneNumber.value))
            $($phonenumber.find('li')[1]).css('display', 'block'), isValid = false;
        else
            $($phonenumber.find('li')[1]).css('display', 'none');
        $($phonenumber.find('li')[0]).css('display', 'none');
    } else
        $($phonenumber.find('li')[0]).css('display', 'block'), $($phonenumber.find('li')[1]).css('display', 'none'), isValid = false;

    return isValid;
}

//Check required value
function CheckRequired(elmError, value) {
    let isValid = true;
    if (IsNullOrEmty(value))
        elmError.css('display', 'block'), isValid = false;
    else
        elmError.css('display', 'none');
    return isValid;
}

//Show overlay loading button
function ShowLoadingBody(elm) {
    var $loading = $($(elm).children()[0]);
    var trBody =
        `<tr>
            <td colspan="5">${_loadingButtonOverlay}</td>
        </tr>`
    if (!$loading.hasClass('overlay-loading-button')) {
        if ($(elm).hasClass('fa-refresh'))
            $(elm).removeAttr('class');
        $(elm).prepend(trBody);
        $($(elm).children().children().children()[0]).fadeIn(200);
    }
}

//Hide overlay
function HideLoadingBody(elm) {
    var $loading = $($(elm).children()[0]);
    if ($loading.hasClass('overlay-loading-button')) {
        $loading.fadeOut(200);
        setTimeout(function () {
            $loading.remove();
        }, 250);
    }
}

//Closse modal
function CloseModal() {
    $('#div_main_table').fadeIn(200);
    $('#div_view_panel').fadeOut(200);
    setTimeout(function () {
        $('#div_view_panel').html('');
    }, 200);
}

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

function RemoveRowUI(id) {
    //Remove row
    $('#tr_address_item_' + id).remove();

    //Check none record
    if ($('#tbody_main_table').find('tr').length === 0) {
        document.getElementById("tbody_main_table").innerHTML =
            `<tr>
                <td colspan="5" class="text-center p-2">
                    Sổ địa chỉ của bạn chưa có dữ liệu. Hãy thêm địa chỉ mới.
                </td>
            </tr>`;
    }
}
