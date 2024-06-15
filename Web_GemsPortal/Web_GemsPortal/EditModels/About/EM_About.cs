using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Web_GemsPortal.EditModels.About
{
    public class EM_About
    {
        [Required(ErrorMessage = "Vui lòng nhập tên")]
        [StringLength(50, ErrorMessage = "Tên có độ dài tối đa 50 ký tự")]
        [RegularExpression(@"^([a-zA-Z0-9'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\-\s]+)$", ErrorMessage = "Tên không hợp lệ!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập tên")]
        [StringLength(100, ErrorMessage = "Mã có độ dài tối đa 100 ký tự")]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Title { get; set; }
        public string TitleSlug { get; set; }
        public string Detail { get; set; }
        public string Status { get; set; }
        public string Remake { get; set; }

      
    }
}
