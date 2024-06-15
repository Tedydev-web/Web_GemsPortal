using System.ComponentModel.DataAnnotations;
using static Web_GemsPortal.ExtensionMethods.ValidationAttributeExtensionMethod;

namespace Web_GemsPortal.EditModels.Account
{
    public class EM_Person
    {
        public string id { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập tên")]
        [StringLength(30, ErrorMessage = "Tên có độ dài tối đa 30 ký tự")]
        public string firstName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập họ")]
        [StringLength(30, ErrorMessage = "Họ có độ dài tối đa 30 ký tự")]
        public string lastName { get; set; }

        [DataType(DataType.Date, ErrorMessage = "Ngày sinh không hợp lệ!")]
        public DateTime? birthday { get; set; }

        public int gender { get; set; }

        [StringLength(50, ErrorMessage = "Email có độ dài tối đa 50 ký tự")]
        [RegularExpression(@"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", ErrorMessage = "Email không hợp lệ!")]
        public string email { get; set; }
        public int? imageId { get; set; }
        public int? imageSerialId { get; set; }

        [DataType(DataType.Upload)]
        [MaxFileSize(maxFileSize: 5 * 1024 * 1024, errorMessage: "Dung lượng ảnh tối đa 5MB!")]
        [AllowedExtensions(extensions: new string[] { ".jpg", ".jpeg", ".png" }, errorMessage: "Ảnh không hợp lệ!")]
        public IFormFile imageFile { get; set; }
        public string imageUrl { get; set; }
        public int status { get; set; }
        public DateTime? timer { get; set; }
    }
}
