using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.EditModels.Account
{
    public class EM_ChangePassword
    {
        [StringLength(50, ErrorMessage = "Mật khẩu có độ dài tối đa 50 ký tự")]
        [Required(ErrorMessage = "Nhập mật khẩu cũ!")]
        [RegularExpression(@"^([^'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\-\s]+)$", ErrorMessage = "Mật khẩu không được chứa ký tự dấu và khoảng trắng.")]
        //[RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?\-\$%\^&\*\[\];:_<>\.,=\+\/\\]).{8,50}$", ErrorMessage = "Mật khẩu phải có độ dài tối thiểu là 8 và thỏa 4 tiêu chí: chứa ít nhất một chữ in, chữ thường, số và ký tự đặc biệt.")]
        public string password { get; set; }

        [StringLength(50, ErrorMessage = "Mật khẩu có độ dài tối đa 50 ký tự")]
        [Required(ErrorMessage = "Nhập mật khẩu mới!")]
        [RegularExpression(@"^([^'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\-\s]+)$", ErrorMessage = "Mật khẩu không được chứa ký tự dấu và khoảng trắng.")]
        //[RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?\-\$%\^&\*\[\];:_<>\.,=\+\/\\]).{8,50}$", ErrorMessage = "Mật khẩu phải có độ dài tối thiểu là 8 và thỏa 4 tiêu chí: chứa ít nhất một chữ in, chữ thường, số và ký tự đặc biệt.")]
        public string newPassword { get; set; }
    }
}