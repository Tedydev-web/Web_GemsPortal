using System;
using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.EditModels.Account
{
    public class EM_Register
    {
        //[Required(ErrorMessage = "Nhập tài khoản!")]
        //[RegularExpression("^[a-z0-9_-]{3,50}$", ErrorMessage = "Tài khoản phải thỏa: độ dài 3-15, chỉ chứa ký tự thường và số.")]
        public string userName { get; set; }

        [RegularExpression(@"^([^'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\-\s]+)$", ErrorMessage = "Mật khẩu không được chứa ký tự dấu và khoảng trắng.")]
        //[RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?\-\$%\^&\*\[\];:_<>\.,=\+\/\\]).{8,50}$", ErrorMessage = "Mật khẩu phải có độ dài tối thiểu 8 ký tự và chứa ít nhất 1 chữ in, 1 chữ thường, 1 số và 1 ký tự đặc biệt.")]
        public string password { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập họ")]
        [StringLength(30, ErrorMessage = "Họ có độ dài tối đa 30 ký tự")]
        public string lastName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập tên")]
        [StringLength(10, ErrorMessage = "Tên có độ dài tối đa 10 ký tự")]
        public string firstName { get; set; }

        [DataType(DataType.Date, ErrorMessage = "Ngày sinh không hợp lệ!")]
        public DateTime? birthday { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập điện thoại")]
        [StringLength(12, ErrorMessage = "Điện thoại có độ dài tối đa 12 ký tự")]
        [RegularExpression("^[0-9]{0,12}$", ErrorMessage = "Điện thoại không hợp lệ!")]
        public string phoneNumber { get; set; }

        [StringLength(50, ErrorMessage = "Email có độ dài tối đa 50 ký tự")]
        [RegularExpression(@"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", ErrorMessage = "Email không hợp lệ!")]
        public string email { get; set; }

        public int gender { get; set; }
    }
}
