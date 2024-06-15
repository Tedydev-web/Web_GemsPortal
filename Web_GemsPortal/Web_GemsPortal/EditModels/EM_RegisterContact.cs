using System.ComponentModel.DataAnnotations;
using static Web_GemsPortal.ExtensionMethods.ValidationAttributeExtensionMethod;

namespace Web_GemsPortal.EditModels
{
    public class EM_RegisterContact
    {
        public string TokenReCAPTCHA { get; set; }
        public int Id { get; set; }
        public int SupplierModelId { get; set; } = 0;
        public string ImageList { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập họ")]
        [StringLength(30, ErrorMessage = "Họ tối đa 30 ký tự!")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập tên")]
        [StringLength(20, ErrorMessage = "Tên tối đa 20 ký tự!")]
        public string LastName { get; set; }

        //[Required(ErrorMessage = "Vui lòng nhập tên doanh nghiệp")]
        //[StringLength(100, ErrorMessage = "Tên doanh nghiệp tối đa 100 ký tự!")]
        public string Name { get; set; }

        [StringLength(15, ErrorMessage = "CMND/CCCD/Passport tối đa 15 ký tự!")]
        public string IdentityCardNumber { get; set; }

        //[Required(ErrorMessage = "Vui lòng nhập email")]
        //[StringLength(50, ErrorMessage = "Email tối đa 50 ký tự!")]
        //[RegularExpression(@"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", ErrorMessage = "Email không hợp lệ!")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập điện thoại")]
        [StringLength(12, ErrorMessage = "Điện thoại tối đa 12 ký tự!")]
        public string TelephoneNumber { get; set; }

        [StringLength(200, ErrorMessage = "Đường dẫn ảnh tối đa 200 ký tự!")]
        public string ImageUrl { get; set; }

        //[Required(ErrorMessage = "Please select a file.")]
        [DataType(DataType.Upload)]
        [MaxFileSize(maxFileSize: 5 * 1024 * 1024, errorMessage: "Dung lượng ảnh tối đa 5MB!")]
        [AllowedExtensions(extensions: new string[] { ".jpg", ".jpeg", ".png" }, errorMessage: "Ảnh không hợp lệ!")]
        public IFormFile ImageFile { get; set; }

        [DataType(DataType.Upload)]
        [MaxFile(maxFile: 4, errorMessage: "Giới hạn tải lên tối đa 4 ảnh!")]
        [MaxFileSizeInList(maxFileSize: 5 * 1024 * 1024, errorMessage: "Dung lượng ảnh tối đa 5MB!")]
        [AllowedExtensionsInList(extensions: new string[] { ".jpg", ".jpeg", ".png" }, errorMessage: "Ảnh không hợp lệ!")]
        public List<IFormFile> ListImageFile { get; set; }

        [StringLength(300, ErrorMessage = "Ghi chú tối đa 300 ký tự!")]
        public string Remark { get; set; }

        //[Required(ErrorMessage = "Vui lòng nhập giới thiệu")]
        //[StringLength(250, ErrorMessage = "Giới thiệu tối đa 250 ký tự!")]
        public string Description { get; set; }

        [StringLength(35, ErrorMessage = "Mã mời tối đa 35 ký tự!")]
        public string InviteCodeRef { get; set; }

        public string CountryId { get; set; } = "1";

        [Required(ErrorMessage = "Vui lòng nhập tỉnh/thành phố")]
        [RegularExpression("(.*[1-9].*)|(.*[.].*[1-9].*)", ErrorMessage = "Vui lòng chọn tỉnh/thành phố")]
        public string provinceId { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập quận/huyện")]
        [RegularExpression("(.*[1-9].*)|(.*[.].*[1-9].*)", ErrorMessage = "Vui lòng chọn quận/huyện")]
        public string districtId { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập phường/xã")]
        [RegularExpression("(.*[1-9].*)|(.*[.].*[1-9].*)", ErrorMessage = "Vui lòng chọn phường/xã")]
        public string wardId { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập địa chỉ")]
        [StringLength(150, ErrorMessage = "Địa chỉ tối đa 150 ký tự!")]
        public string AddressText { get; set; }

        public int Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? Timer { get; set; }
    }
}