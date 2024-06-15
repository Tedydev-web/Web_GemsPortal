using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.EditModels.Contact
{
    public class EM_Contact
    {
        public string SupplierId { get; set; }
        public int RatingStart { get; set; }
        public int ContactTypeId { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập tên")]
        [StringLength(50, ErrorMessage = "Tên có độ dài tối đa 50 ký tự")]
        public string Name { get; set; }

        [StringLength(100, ErrorMessage = "Email có độ dài tối đa 100 ký tự")]
        [RegularExpression(@"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", ErrorMessage = "Vui lòng nhập đúng Email của bạn")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        [StringLength(20, ErrorMessage = "Điện thoại có độ dài tối đa 20 ký tự")]
        public string PhoneNumber { get; set; }

        //[Required(ErrorMessage = "Vui lòng nhập số chủ đề")]
        [StringLength(100, ErrorMessage = "Chủ đề có độ dài tối đa 100 ký tự")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập số nội dung")]
        [StringLength(1000, ErrorMessage = "Nội dung có độ dài tối đa 1000 ký tự")]
        public string Detail { get; set; }

        [StringLength(250, ErrorMessage = "Ghi chú có độ dài tối đa 250 ký tự")]
        public string Remark { get; set; }
        public string TokenReCAPTCHA { get; set; }
    }
}
