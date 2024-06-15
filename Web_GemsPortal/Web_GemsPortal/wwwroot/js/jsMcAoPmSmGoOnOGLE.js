var map, i;
var markers = [];
var marker;
let infoWindow;

function initialize(formElm, latitude, longtitude, zoom = 6) {
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
        setDefaultLocation(myLatlng, infoWindow);

}

function setDefaultLocation(location, infoWindow) {
    showinfoWindow(infoWindow);
    addMarker(location);
    placeMarkerAndPanTo(location, map);
}

function showinfoWindow(infoWindow) {
    // Close the current InfoWindow.
    infoWindow.close();
    //// Create a new InfoWindow.
    //infoWindow = new google.maps.InfoWindow({ position: e.latLng });
    //infoWindow.setContent(e.latLng.toString());
    //infoWindow.open(map);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function addMarker(location) {
    if (marker != null)
        marker.setMap(null);
    //// Đường dẫn đến hình icon
    ////var image = 'http://www.burlington.org/_assets_/images/info-1.png';
    //marker = new google.maps.Marker({
    //    //map: map, draggable: true, animation: google.maps.Animation.DROP, position: location, title: '' //content:'fsdfdsfdsdgd', icon: image
    //    draggable: true, animation: google.maps.Animation.DROP, position: location, title: ''
    //});
    let icon = {
        url: !IsNullOrEmty(_logoUrl) ? _logoUrl : 'http://www.burlington.org/_assets_/images/info-1.png',
        scaledSize: { width: 70, height: 70 }
    }
    deleteMarkers();
    marker = new google.maps.Marker({ map: map, draggable: true, animation: google.maps.Animation.DROP, position: location, title: '', icon: icon, title: 'Precision Profiles Manufacturing' });
    markers.push(marker);
    google.maps.event.addListener(marker, 'mouseover', toggleBounce);

    google.maps.event.addListener(marker, 'click', function (e) {
        ViewPolygonInfo(e)
    });

    google.maps.event.addListener(marker, 'dragend', function () {
        //console.log(marker.getPosition().lat()); //console.log(marker.getPosition().lng());
        placeMarkerAndPanTo(marker.getPosition(), map)
        getMapLocation(marker.getPosition(), '#form_data_add_address');
    });
}

function ViewPolygonInfo(event) {
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

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    if (markers.length > 10) {
        clearMarkers();
        markers = [];
    }
}

function showMarkers() {
    setMapOnAll(map);
}

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function placeMarkerAndPanTo(latLng, map) {
    //delayed so you can see it move
    setTimeout(function () {
        map.panTo(latLng);
    }, 200);
}

function mappingLocation(formElm, latitude = '', longtitude = '', zoom = 6) {
    google.maps.event.addDomListener(window, 'load', initialize(formElm, latitude, longtitude, zoom));
}

function getMapAddress(formElm, address = '') {
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
                mappingLocation(formElm);
                return false;
            }
            var latitude = data.results[0].geometry.location.lat;
            var longtitude = data.results[0].geometry.location.lng;
            $(formElm).find('[name="latitude"]').val(latitude);
            $(formElm).find('[name="longitude"]').val(longtitude);
            mappingLocation(formElm, latitude, longtitude, 17);
        },
        error: function (err) {
            CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
        }
    });
}

function getMapLocation(latLng, formElm) {
    if (IsNullOrEmty(latLng)) return false;
    $(formElm).find('[name="latitude"]').val(latLng.toJSON().lat);
    $(formElm).find('[name="longitude"]').val(latLng.toJSON().lng);
    //$.ajax({
    //    type: "GET",
    //    url: "/Address/getMapLocation",
    //    data: { latLng: `${latLng.toJSON().lat},${latLng.toJSON().lng}` },
    //    dataType: "json",
    //    success: function (response) {
    //        if (!CheckResponseIsSuccess(response)) return false;
    //        if (response.data != null) {
    //            $(formElm).find('[name="latitude"]').val(response.data.latitude);
    //            $(formElm).find('[name="longitude"]').val(response.data.longitude);
    //        }
    //    },
    //    error: function (err) {
    //        CheckResponseIsSuccess({ result: -1, error: { code: err.status } });
    //    }
    //});
}

function listenOnchangeAddress(elm) {
    $(`${elm} [name="provinceId"],[name="districtId"],[name="wardId"],[name="addressText"]`).on('change', function () {
        let provinceId = $(`${elm} [name="provinceId"]`).val();
        let districtId = $(`${elm} [name="districtId"]`).val();
        let wardId = $(`${elm} [name="wardId"]`).val();
        let addressText = $(`${elm} [name="addressText"]`).val();
        let provinceName = provinceId == null || provinceId == 0 ? '' : $(`${elm} [name="provinceId"] option:selected`).text();
        let districtName = districtId == null || districtId == 0 ? '' : $(`${elm} [name="districtId"] option:selected`).text();
        let wardName = wardId == null || wardId == 0 ? '' : $(`${elm} [name="wardId"] option:selected`).text();
        let fullAddress = `${IsNullOrEmty(addressText) ? '' : addressText.trim() + ', '}${IsNullOrEmty(wardName) ? '' : wardName + ', '}${IsNullOrEmty(districtName) ? '' : districtName + ', '}${IsNullOrEmty(provinceName) ? '' : provinceName}`;
        if (provinceId == null || provinceId == 0 || districtId == null || districtId == 0)
            return false;
        getMapAddress(elm, fullAddress);
    });
}
