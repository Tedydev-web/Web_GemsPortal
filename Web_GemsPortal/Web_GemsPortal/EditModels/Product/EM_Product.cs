using System;
using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.EditModels.Product
{
    public class EM_Product
    {
        public string Id { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập tên")]
        [StringLength(150, ErrorMessage = "Tên có độ dài tối đa 150 ký tự")]
        [RegularExpression(@"^([a-zA-Z0-9'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\-\s]+)$", ErrorMessage = "Tên không hợp lệ!")]
        public string Name { get; set; }

        [StringLength(100, ErrorMessage = "Mã có độ dài tối đa 100 ký tự")]
        public string JobCode { get; set; }

        public int Status { get; set; }
        public DateTime? Timer { get; set; }
    }
}
