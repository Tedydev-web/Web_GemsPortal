
let $provinceSelect = $(".provinceId");
let $districtSelect = $(".districtId");
let laddaChooseSupplierForm;
let laddaShowRegisterModal;
let laddaSubmitForm;
let _logoUrl = "";
let _listDataSuplierSlevel1 = [];
let _currentId = 0;
let _nameShop = "";
let _listLocation = [];

//Google map form index
var map, i;
var markers = [];
var marker;
let infoWindow;

//Google map form register
var mapFormRegister, iFormRegister;
var markerFormRegister;
var markersFormRegister = [];
let infoWindowFormRegister;

$(document).ready(function () {
    $('.select2').select2({ language: "vi" });
    LoadListSupplierSlevel1();

    setTimeout(function myfunction() {
        ScrollToTop(".section_member_wrapper", 0, 500);
    },300)
});

//On change province form
function OnChangeProvinceFormEvent(elm, divElm, formElm) {
    let value = $(elm).val();
    if (parseInt(value) === 0) {
        $(formElm).find(".districtId").html('');
        $(formElm).find(".districtId").attr('disabled', true);
    } else {
        ShowOverlay3Dot($(divElm));
        $.ajax({
            type: "GET",
            url: "/Address/GetDistrictJson",
            data: {
                provinceId: value
            },
            dataType: 'json',
            success: function (response) {
                HideOverlay3Dot($(divElm));
                if (!CheckResponseIsSuccess(response)) return false;
                let html = '';
                $.map(response.data, function (item) {
                    html += `<option value="${item.id}">${item.name}</option>`;
                });
                $(formElm).find(".districtId").html(`<option value="0">--Quận/Huyện--</option>` + html);
                $(formElm).find(".districtId").attr('disabled', false);
                $(formElm).find(".districtId").val($(formElm).find(".districtId").children('option:not(.bs-title-option)').eq(0).val());
            },
            error: function (err) {
                HideOverlay3Dot($(divElm));
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    }
}

//On change province form
function OnChangeWardFormEvent(elm, divElm, formElm) {
    let value = $(elm).val();
    if (parseInt(value) === 0) {
        $(formElm).find(".wardId").html('');
        $(formElm).find(".wardId").attr('disabled', true);
    } else {
        ShowOverlay3Dot($(divElm));
        $.ajax({
            type: "GET",
            url: "/Address/GetWardJson",
            data: {
                districtId: value
            },
            dataType: 'json',
            success: function (response) {
                HideOverlay3Dot($(divElm));
                if (!CheckResponseIsSuccess(response)) return false;
                let html = '';
                $.map(response.data, function (item) {
                    html += `<option value="${item.id}">${item.name}</option>`;
                });
                $(formElm).find(".wardId").html(`<option value="0">--Phường/Xã--</option>` + html);
                $(formElm).find(".wardId").attr('disabled', false);
                $(formElm).find(".wardId").val($(formElm).find(".districtId").children('option:not(.bs-title-option)').eq(0).val());
            },
            error: function (err) {
                HideOverlay3Dot($(divElm));
                CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
            }
        });
    }
}

function Search() {
    LoadListSupplierSlevel1();
    $(".div_btn_supplier_slevel2_wrapper").slideUp(200);
}

//Data param supplier slevel 1
const dataParmsSupplierSlevel1 = function () {
    return {
        slevel: 2,
        provinceId: $provinceSelect.val(),
        districtId: $districtSelect.val(),
        parentId: 0,
    }
}

//Load list supplier slevel 1
function LoadListSupplierSlevel1() {
    var data = dataParmsSupplierSlevel1();
    try {
        ShowOverlay(".div_btn_supplier_slevel1_wrapper");
        $.ajax({
            type: 'GET',
            url: '/Supplier/GetListByArea',
            data: data,
            dataType: "json",
            success: function (response) {
                HideOverlay(".div_btn_supplier_slevel1_wrapper");
                if (response.result !== 1) {
                    $(".div_btn_supplier_slevel1_wrapper").html(` 
                        <div class="text-center p-2">
                            <h4>Kết nối không ổn định</h4>
                            <button type="button" class="btn btn-primary" 
                                style="width:200px;height:45px;border-radius:4px;" 
                                onclick="LoadListSupplierSlevel1();$(this).parent().remove();">Tải lại
                            </button>
                        </div>`)
                    return;
                }

                var listData = response.data;
                _listDataSuplierSlevel1 = listData
                var tmpHtml = '';
                var countData = 0;
                _listLocation = [];
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, item) {
                        tmpHtml += `
                            <li class="li_supplier row">
                                <div class="media btn_supplier col-12 col-md-12" onclick="HandleClickSupplier(this)" value="${item.id}" data-nameShop="${item.name}" data-logo="${!IsNullOrEmty(item.imageLogo) ? item.imageLogo : ''}" data-lat="${item.latitude}" data-long="${item.longitude}" data-name="${item.name}">
                                    <div class="text-center">
                                         <img src="${!IsNullOrEmty(item.imageLogo) ? item.imageLogo : '/assets/images/avtar.jpg'}" alt="${item.name}">
                                    </div>
                                    <div class="media-body mx-2">
                                         <a href="javascript:void(0)" data-style="contract" data-spinner-color="var(--primaryColor)" dir="ltr" class="fw-bold fs-5 ladda-button">${item.name}</a>
                                         <p style="line-height:normal" class="fs-6 mb-2"><strong><i class="fa fa-map-marker text-danger fs-5"></i> </strong> ${item.addressText ?? ""}, ${item.wardName ?? ""}, ${item.districtName ?? ""} ${item.countryName ?? ""}</p>
                                    </div>
                                </div>
                               
                            </li>`;
                        //<a target="_blank" href="javscript:void()" class="btn_link_member text-white col-12 col-md-4">
                        //    Trang bán hàng <i class="fa fa-external-link px-1 fs-4" aria-hidden="true"></i>
                        //</a>
                        _listLocation.push(item)
                    });
                    countData = listData.length;
                    $("#ul_data_supplier_slevel1").html(tmpHtml)
                    /*$(".btn_supplier:first").click();*/
                    InitMapWithManyMarker();
                } else {
                    let htmlNotData = `
                     <div class="d-flex flex-column mx-auto">
                         <div>
                          Hiện chưa có nhà Phân Phối ở khu vực này, vui lòng chọn khu vực khác !
                        </div>
                         <div>
                             ${_imgNotFoundHtml}
                         </div>
                     </div>
                    `
                    $("#ul_data_supplier_slevel1").html(htmlNotData);
                }

                $("#span_count_record").html(`Tìm thấy <strong class="text-success">${countData}</strong> kết quả phù hợp`);
            },
            error: function (error) {
                HideOverlay(".div_btn_supplier_slevel1_wrapper");
                $(".div_btn_supplier_slevel1_wrapper").html(` 
                        <div class="text-center p-2">
                            <h4>Kết nối không ổn định</h4>
                            <button type="button" class="btn btn-primary" 
                                style="width:200px;height:45px;border-radius:4px;" 
                                onclick="LoadListSupplierSlevel1();$(this).parent().remove();">Tải lại
                            </button>
                        </div>`)
                console.log("Error when load supplier sleve1!");
            }
        });
    } catch (e) {
        $(".div_btn_supplier_slevel1_wrapper").html(` 
                        <div class="text-center p-2">
                            <h4>Kết nối không ổn định</h4>
                            <button type="button" class="btn btn-primary" 
                                style="width:200px;height:45px;border-radius:4px;" 
                                onclick="LoadListSupplierSlevel1();$(this).parent().remove();">Tải lại
                            </button>
                        </div>`)
        console.log("Error when load supplier sleve1!");
    }
}


function HandleClickSupplier(elm) {
    $(".btn_supplier").removeClass("active");
    laddaChooseSupplierForm = Ladda.create($(elm).find("a")[0]);
    laddaChooseSupplierForm.start();
    ShowOverlay3Dot($(".map_wrapper"))
    setTimeout(function myfunction() {
        $(elm).addClass("active");
        laddaChooseSupplierForm.stop();
        HideOverlay3Dot($(".map_wrapper"))
    }, 300)
    _currentId = $(elm).attr("value");
    let longtitude = $(elm).attr("data-long");
    let latitude = $(elm).attr("data-lat");
    _logoUrl = $(elm).attr("data-logo");
    _nameShop = $(elm).attr("data-nameShop");
    $("#name_supplier_slevel1").html($(elm).attr("data-name"))
    InitGoogleMap('.section_member_wrapper', Number(latitude), Number(longtitude), 20);
    /*LoadListSupplierSlevel2();*/
}

//Data param supplier slevel 2
const dataParmsSupplierSlevel2 = function () {
    return {
        slevel: 1,
        provinceId: $provinceSelect.val(),
        districtId: $districtSelect.val(),
        parentId: $(".btn_supplier.active").attr("value"),
    }
}

//Load list supplier slevel 2
function LoadListSupplierSlevel2() {
    var data = dataParmsSupplierSlevel2();
    try {
        ShowOverlay(".div_btn_supplier_slevel2_wrapper");
        $.ajax({
            type: 'GET',
            url: '/Supplier/GetListByParent',
            data: data,
            dataType: "json",
            success: function (response) {
                HideOverlay(".div_btn_supplier_slevel2_wrapper");

                if (response.result !== 1) {
                    $(".div_btn_supplier_slevel2_wrapper").html(` 
                        <div class="text-center p-2">
                            <h4>Kết nối không ổn định</h4>
                            <button type="button" class="btn btn-primary" 
                                style="width:200px;height:45px;border-radius:4px;" 
                                onclick="LoadListSupplierSlevel1();$(this).parent().remove();">Tải lại
                            </button>
                        </div>`)
                    return;
                }

                var listData = response.data;
                var tmpHtml = '';
                var countData = 0;
                if (listData != null && listData.length > 0) {
                    $.each(listData, function (key, item) {
                        tmpHtml += `
                             <li class="col-12 col-md-12 col-lg-4">
                                 <div class="media">
                                     <div class="text-center">
                                         <img src="${!IsNullOrEmty(item.imageLogo) ? item.imageLogo : '/assets/images/avtar.jpg'}" alt="${item.name}">
                                     </div>
                                     <div class="media-body mx-2">
                                    <a href="javascript:void(0)" data-style="contract" data-spinner-color="var(--primaryColor)" dir="ltr" class="fw-bold fs-5 ladda-button">${item.name}</a>
                                              <p style="line-height:normal" class="fs-6 mb-2"><strong><i class="fa fa-map-marker text-danger fs-5"></i> </strong> ${item.addressText ?? ""}, ${item.wardName ?? ""}, ${item.districtName ?? ""} ${item.countryName ?? ""}</p>
                                     </div>
                                 </div>
                               </li>`;
                    });
                    countData = listData.length;
                    $(".div_btn_supplier_slevel2_wrapper").slideDown(200);
                    $("#ul_data_supplier_slevel2").html(tmpHtml)
                }
                else {
                    let htmlNotData = `
                     <div class="d-flex flex-column mx-auto">
                         <div>
                          Không có dữ liệu đại lý thuộc nhà phân phối này, vui lòng chọn nhà phân phối khác !
                        </div>
                         <div>
                             ${_imgNotFoundHtml}
                         </div>
                     </div>
                    `
                    $("#ul_data_supplier_slevel2").html(htmlNotData);
                    $(".div_btn_supplier_slevel2_wrapper").slideUp(200);
                }
                $("#span_count_record").html(`Tìm thấy <strong class="text-success">${countData}</strong> kết quả phù hợp`);
            },
            error: function (error) {
                HideOverlay(".div_btn_supplier_slevel2_wrapper");
                $(".div_btn_supplier_slevel2_wrapper").html(` 
                        <div class="text-center p-2">
                            <h4>Kết nối không ổn định</h4>
                            <button type="button" class="btn btn-primary" 
                                style="width:200px;height:45px;border-radius:4px;" 
                                onclick="LoadListSupplierSlevel1();$(this).parent().remove();">Tải lại
                            </button>
                        </div>`)
                console.log("Error when load supplier sleve2!");
            }
        });
    } catch (e) {
        $(".div_btn_supplier_slevel2_wrapper").html(` 
                        <div class="text-center p-2">
                            <h4>Kết nối không ổn định</h4>
                            <button type="button" class="btn btn-primary" 
                                style="width:200px;height:45px;border-radius:4px;" 
                                onclick="LoadListSupplierSlevel1();$(this).parent().remove();">Tải lại
                            </button>
                        </div>`)
        console.log("Error when load supplier sleve2!");
    }
}

function InitMapWithManyMarker() {
    let locations = [];
    if (_listLocation != null && _listLocation.length > 0) {
        $.each(_listLocation, function myfunction(key, item) {
            locations.push(
                [`${item.id}`, `${item.name}`, `${item.latitude}`, `${item.longitude}`, 2]
            );
        })
    };
    //var locations = [
    //    ['Bondi Beach', -33.890542, 151.274856, 4],
    //    ['Coogee Beach', -33.923036, 151.259052, 5],
    //    ['Cronulla Beach', -34.028249, 151.157507, 3],
    //    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    //    ['Maroubra Beach', -33.950198, 151.259302, 1]
    //];

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: new google.maps.LatLng(locations[0][2], locations[0][3]),
        //center: new google.maps.LatLng(-33.92, 151.25),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    infowindow = new google.maps.InfoWindow();
    if (markers != null && markers.length > 0) {
        $.each(markers, function (key, item) {
            item.setMap(null);
        })
        markers = [];
    }

    let icon = {
        url: LOGO_GEMS_DEFAULT,
        scaledSize: { width: 50, height: 50 }
    }

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][2], locations[i][3]),
            map: map,
            icon: icon,
            title: TITLE_GEMS_DEFAULT
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(locations[i][1]);
                infowindow.open(map, marker);
                _currentId = locations[i][0]
                ViewSupplierOnMap(marker)
            }
        })(marker, i));

        markers.push(marker);

    }
    // Add a marker clusterer to manage the markers.
    new MarkerClusterer(map, markers, {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });

}

function ShowModalRegister(elm, type) {
    //Type: 0:NPP, 1:Đại lý, 2:CTV
    $("#modal_choose_option_register").modal("hide");
    switch (type) {
        case 0:
            $.get("/Supplier/P_RegisterDistributor").done(function (response) {
                laddaShowRegisterModal = Ladda.create($(elm)[0]);
                laddaShowRegisterModal.start();
                if (!CheckResponseIsSuccess(response)) {
                    laddaShowRegisterModal.stop();

                    //Show modal
                    $('#div_show_form_register').html(response);
                    $('#div_show_form_register').show();
                    $('#modal_register_districtbutor').modal("show")

                    //Init bootstrap max length
                    $('#form_register_distributor input[type="text"],input[type="email"],textarea').maxlength({
                        alwaysShow: !0,
                        warningClass: "badge badge-success",
                        limitReachedClass: "badge badge-danger"
                    });

                    //Init validation form parsley
                    $('#form_register_distributor').parsley();

                    $(".select2").select2();

                    InitGoogleMapFormRegister('#form_register_distributor', LATITUDE, LONGITUDE, 20);
                    ListenOnchangeAddress('#form_register_distributor');

                    //Init submit
                    laddaSubmitForm = Ladda.create($("#btn_submit_form")[0]);
                    InitRegister();
                };
            }).fail(function (err) {
                laddaShowRegisterModal.stop();
                CheckResponseIsSuccess(response);
            });
            break;
        case 1:
            // code block
            break;
        case 2:
            // code block
            break;
        default:
        // code block
    }
}

function InitRegister() {
    $('#form_register_distributor').on('submit', function (e) {
        e.preventDefault();
        //alert('I am here FIRST !');

        let formElm = $('#form_register_distributor');
        let formDataElm = document.getElementById('form_register');
        let isvalidate = formElm[0].checkValidity();
        let formData = new FormData(formDataElm);


        if (isvalidate == true) {
            laddaSubmitForm.start();

            try {

            } catch (e) {
                console.log("Error when handling append productPrice")
            }

            $.ajax({
                url: formElm.attr('action'),
                type: formElm.attr('method'),
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    laddaSubmitForm.stop();
                    if (response.result == 1 && response.data != null) {
                        ShowToastNoti('success', '', "Đã gửi");

                        //Hide model
                        $("#modal_register_districtbutor").modal("hide");
                        $("#div_show_form_register").html("");
                        $("#div_show_form_register").fadeOut();
                    }
                    else {
                        CheckResponseIsSuccess(response);
                        return;
                    }
                }, error: function (err) {
                    laddaSubmitForm.stop();
                    CheckResponseIsSuccess(response);
                }
            });
        } else {
            laddaSubmitForm.stop();
            ShowToastNoti('warning', '', "Vui lòng nhập đầy đủ thông tin");
        }
    });
}

//Google Map index
function InitGoogleMap(formElm, latitude, longtitude, zoom = 6) {
    var _latitude = latitude;
    var _longtitude = longtitude;
    if (latitude != '')
        _latitude = latitude;
    if (longtitude != '')
        _longtitude = longtitude;

    var myLatlng = { lat: _latitude, lng: _longtitude };

    var location = new google.maps.LatLng(_latitude, _longtitude);//10.8873623, 107.019325
    var mapProp = {
        center: location, //new google.maps.LatLng(10.765974, 106.689422),
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapProp);

    //-------------------------------------------------------------
    var styles = [
        { featureType: 'road.arterial', elementType: 'all', stylers: [{ hue: '#fff' }, { saturation: 100 }, { lightness: -48 }, { visibility: 'on' }] },
        { featureType: 'road', elementType: 'all', stylers: [] },
        { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#adc9b8' }] },
        { featureType: 'landscape.natural', elementType: 'all', stylers: [{ hue: '#809f80' }, { lightness: -35 }] }];

    var styledMapType = new google.maps.StyledMapType(styles);
    map.mapTypes.set('Styled', styledMapType);

    // Create the initial InfoWindow.
    infoWindow = new google.maps.InfoWindow({ content: 'Có thể nhấn chọn địa điểm trên bản đồ!', position: myLatlng }); infoWindow.open(map);
 
    if (latitude != '' && longtitude != '')
        SetDefaultLocation(myLatlng, infoWindow);
}

function SetDefaultLocation(location, infoWindow) {
    infoWindow.close();
    AddMarker(location);
    setTimeout(function () {
        map.panTo(location);
    }, 200);
}

function AddMarker(location) {
    if (marker != null)
        marker.setMap(null);
    let icon = {
        url: !IsNullOrEmty(_logoUrl) ? _logoUrl : 'http://www.burlington.org/_assets_/images/info-1.png',
        scaledSize: { width: 70, height: 70 }
    }
    DeleteMarkersFormRegister();
    marker = new google.maps.Marker({ map: map, draggable: false, animation: google.maps.Animation.DROP, position: location, title: '', icon: icon, title: `${_nameShop}` });
    markers.push(marker);
    google.maps.event.addListener(marker, 'mouseover', ToggleBounce);

    google.maps.event.addListener(marker, 'click', function (e) {
        ViewSupplierOnMap(e)
    });
}

function DeleteMarkers() {
    if (markers.length > 10) {
        clearMarkers();
        markers = [];
    }
}

function ToggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function ViewSupplierOnMap(event) {
    if (_listDataSuplierSlevel1 == null) {
        return;
    }
    let obj = FindItemByKeyValueInArrayObj(_listDataSuplierSlevel1, "id", _currentId);
    let contentString =
        `<div class="info-window" style="width:400px;height:300px;">
            <table class="table table-sm table-striped mb-0">
                <tbody>
                    <tr>
                       <th scope="row">Tên</th>
                        <td>${obj?.name ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Ngày thành lập</th>
                        <td>${obj?.businessNumber ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Email</th>
                        <td>${obj?.email ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Hotline</th>
                        <td>${obj?.hotlineNumber ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Số điện thoại</th>
                        <td>${obj?.telephoneNumber ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Link Facebook</th>
                        <td>${obj?.facebook ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Link Zalo</th>
                        <td>${obj?.zalo ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Giới thiệu</th>
                        <td>${obj?.description ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Thôn/Xóm</th>
                        <td>${obj?.addressText ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Phường/Xã</th>
                        <td>${obj?.wardName ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Quận/Huyện</th>
                        <td>${obj?.districtName ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Tỉnh/Thành phố</th>
                        <td>${obj?.provinceName ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Quốc gia</th>
                        <td>${obj?.countryName ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">Y</th>
                        <td>${obj?.latitude ?? ''}</td>
                    </tr>
                    <tr>
                        <th scope="row">X</th>
                        <td>${obj?.longitude ?? ''}</td>
                    </tr> 
                </tbody>
            </table>
        </div>`;

    var myLatlng = { lat: obj?.latitude, lng: obj?.longitude };
    infoWindow = new google.maps.InfoWindow({ position: myLatlng });

    infoWindow.setContent(contentString);
    infoWindow.setPosition(myLatlng);
    infoWindow.open(map);
}


//Google Map form register
function InitGoogleMapFormRegister(formElm, latitude, longtitude, zoom = 20) {
    var _latitude = latitude;
    var _longtitude = longtitude;
    if (latitude != '')
        _latitude = latitude;
    if (longtitude != '')
        _longtitude = longtitude;

    var myLatlng = { lat: _latitude, lng: _longtitude };

    var location = new google.maps.LatLng(_latitude, _longtitude);//10.8873623, 107.019325
    //var location = new google.maps.LatLng(_latitude, _longtitude);//10.8873623, 107.019325
    var mapProp = {
        center: location, //new google.maps.LatLng(10.765974, 106.689422),
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    mapFormRegister = new google.maps.Map(document.getElementById("map_form_register"), mapProp);

    //-------------------------------------------------------------
    var styles = [
        { featureType: 'road.arterial', elementType: 'all', stylers: [{ hue: '#fff' }, { saturation: 100 }, { lightness: -48 }, { visibility: 'on' }] },
        { featureType: 'road', elementType: 'all', stylers: [] },
        { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#adc9b8' }] },
        { featureType: 'landscape.natural', elementType: 'all', stylers: [{ hue: '#809f80' }, { lightness: -35 }] }];

    var styledMapType = new google.maps.StyledMapType(styles);
    mapFormRegister.mapTypes.set('Styled', styledMapType);

    // Create the initial InfoWindow.
    infoWindowFormRegister = new google.maps.InfoWindow({ content: 'Có thể nhấn chọn địa điểm trên bản đồ!', position: myLatlng }); infoWindowFormRegister.open(mapFormRegister);

    if (latitude != '' && longtitude != '')
        SetDefaultLocationFormRegister(myLatlng, infoWindowFormRegister);
}


function SetDefaultLocationFormRegister(location, infoWindowFormRegister) {
    infoWindowFormRegister.close();
    AddMarkerFormRegister(location);
    setTimeout(function () {
        mapFormRegister.panTo(location);
    }, 200);
}

function AddMarkerFormRegister(location) {
    if (markerFormRegister != null)
        markerFormRegister.setMap(null);
   
    DeleteMarkersFormRegister();
    markerFormRegister = new google.maps.Marker({ map: mapFormRegister, draggable: true, animation: google.maps.Animation.DROP, position: location, title: '', icon: '', title: 'Kéo thả để ghim tọa độ của bạn' });

    markersFormRegister.push(markerFormRegister);

    google.maps.event.addListener(markerFormRegister, 'mouseover', ToggleBounce);

 /*   google.maps.event.addListener(markerFormRegister, 'click', function (e) {
        ViewSupplierOnMap(e)
    });*/
}

function ListenOnchangeAddress(elm) {
    $(`${elm} [name="ProvinceId"],[name="DistrictId"],[name="WardId"],[name="AddressText"]`).on('change', function () {
        let provinceId = $(`${elm} [name="ProvinceId"]`).val();
        let districtId = $(`${elm} [name="DistrictId"]`).val();
        let wardId = $(`${elm} [name="WardId"]`).val();
        let addressText = $(`${elm} [name="AddressText"]`).val();
        let provinceName = provinceId == null || provinceId == 0 ? '' : $(`${elm} [name="ProvinceId"] option:selected`).text();
        let districtName = districtId == null || districtId == 0 ? '' : $(`${elm} [name="ProvinceId"] option:selected`).text();
        let wardName = wardId == null || wardId == 0 ? '' : $(`${elm} [name="WardId"] option:selected`).text();
        let fullAddress = `${IsNullOrEmty(addressText) ? '' : addressText.trim() + ', '}${IsNullOrEmty(wardName) ? '' : wardName + ', '}${IsNullOrEmty(districtName) ? '' : districtName + ', '}${IsNullOrEmty(provinceName) ? '' : provinceName}`;
        if (provinceId == null || provinceId == 0 || districtId == null || districtId == 0)
            return false;

        GetMapAddress(elm, fullAddress);
    });
}


function GetMapAddress(formElm, address = '') {
    if (IsNullOrEmty(address)) return false;
    $.ajax({
        type: "GET",
        url: "/Address/getMapAddress",
        data: { address: address },
        dataType: "json",
        success: function (response) {
            if (!CheckResponseIsSuccess(response)) return false;
            let data = response.data;
            if (data == null || data.status !== "OK") {
                MappingLocation(formElm);
                return false;
            }
            var latitude = data.results[0].geometry.location.lat;
            var longtitude = data.results[0].geometry.location.lng;
            $(formElm).find('[name="latitude"]').val(latitude);
            $(formElm).find('[name="longitude"]').val(longtitude);
            MappingLocation(formElm, latitude, longtitude, 17);
        },
        error: function (err) {
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function MappingLocation(formElm, latitude = '', longtitude = '', zoom = 6) {
    google.maps.event.addDomListener(window, 'load', InitGoogleMapFormRegister(formElm, latitude, longtitude, zoom));
}

function DeleteMarkersFormRegister() {
    if (markersFormRegister.length > 10) {
        clearMarkers();
        markersFormRegister = [];
    }
}