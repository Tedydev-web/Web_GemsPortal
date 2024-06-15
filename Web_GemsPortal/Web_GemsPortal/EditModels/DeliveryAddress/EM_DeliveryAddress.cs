using System;
using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.EditModels.DeliveryAddress
{
    public class EM_DeliveryAddress
    {
        public int id { get; set; }
        public string customerId { get; set; }
        public string countryId { get; set; } = "1";

        [Required(ErrorMessage = "Vui lòng chọn tỉnh/thành phố")]
        [RegularExpression("(.*[1-9].*)|(.*[.].*[1-9].*)", ErrorMessage = "Vui lòng chọn tỉnh/thành phố")]
        public string provinceId { get; set; }

        [Required(ErrorMessage = "Vui lòng chọn quận/huyện")]
        [RegularExpression("(.*[1-9].*)|(.*[.].*[1-9].*)", ErrorMessage = "Vui lòng chọn quận/huyện")]
        public string districtId { get; set; }

        //[Required(ErrorMessage = "Vui lòng chọn phường/xã")]
        //[RegularExpression("(.*[1-9].*)|(.*[.].*[1-9].*)", ErrorMessage = "Vui lòng chọn phường/xã")]
        public string wardId { get; set; }
        public string townId { get; set; } = "0";

        [Required(ErrorMessage = "Vui lòng nhập tên")]
        [StringLength(50, ErrorMessage = "Tên có độ dài tối đa 50 ký tự")]
        public string name { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        [StringLength(12, ErrorMessage = "Điện thoại có độ dài tối đa 12 ký tự")]
        [RegularExpression("^[0-9]{0,12}$", ErrorMessage = "Điện thoại không hợp lệ!")]
        public string phoneNumber { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập địa chỉ")]
        [StringLength(100, ErrorMessage = "Địa chỉ có độ dài tối đa 100 ký tự")]
        public string addressText { get; set; }

        [StringLength(100, ErrorMessage = "Số nhà có độ dài tối đa 100 ký tự")]
        public string addressNumber { get; set; }

        public double latitude { get; set; } = 0;
        public double longitude { get; set; } = 0;
        public bool isAddNew { get; set; } = false;
        public bool isDefault { get; set; } = false;
        public int typeId { get; set; } = 0;
        public int status { get; set; } = 1;
        public DateTime? timer { get; set; }
    }
}
