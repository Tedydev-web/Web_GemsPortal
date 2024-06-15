using System;
using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.EditModels.Account
{
    public class EM_Login
    {
        [Required(ErrorMessage = "Nhập tài khoản!")]
        [RegularExpression("^[a-z0-9_-]{1,20}$", ErrorMessage = "Tài khoản không hợp lệ!")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Nhập mật khẩu!")]
        [RegularExpression(@"^([^'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\-\s]+)$", ErrorMessage = "Mật khẩu không được chứa ký tự dấu và khoảng trắng.")]
        //[RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#?\-\$%\^&\*\[\];:_<>\.,=\+\/\\]).{8,50}$", ErrorMessage = "Mật khẩu không hợp lệ!")]
        public string Password { get; set; }
        public bool StayLoggedIn { get; set; }
        public string DeviceToken { get; set; }
    }
}
