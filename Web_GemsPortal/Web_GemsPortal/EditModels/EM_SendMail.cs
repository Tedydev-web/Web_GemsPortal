using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.EditModels
{
    public class EM_SendMail
    {
        [Required(ErrorMessage = "Vui lòng nhập tiêu đề")]
        [StringLength(150, ErrorMessage = "Tiêu đề có độ dài tối đa 150 ký tự")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập email")]
        [StringLength(50, ErrorMessage = "Email có độ dài tối đa 50 ký tự")]
        [RegularExpression(@"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", ErrorMessage = "Email không hợp lệ!")]
        public string RecipientEmail { get; set; }

        [StringLength(50, ErrorMessage = "Tên người nhận có độ dài tối đa 50 ký tự")]
        //[RegularExpression(@"^([a-zA-Z0-9'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\-\s]+)$", ErrorMessage = "Tên không hợp lệ!")]
        public string RecipientName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập nội dung")]
        public string Message { get; set; }
    }
}
