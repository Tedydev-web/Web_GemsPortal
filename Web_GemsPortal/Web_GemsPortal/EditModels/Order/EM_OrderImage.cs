using System.ComponentModel.DataAnnotations;
using Web_GemsPortal.Models;
using static Web_GemsPortal.ExtensionMethods.ValidationAttributeExtensionMethod;

namespace Web_GemsPortal.EditModels.Order
{
    public class EM_OrderImage
    {
        public int Id { get; set; }
        public int Type { get; set; }
        public string OrderId { get; set; }
        public int ImageId { get; set; }
        public int Star { get; set; }
        public string Remark { get; set; }

        [DataType(DataType.Upload)]
        [MaxFileSize(maxFileSize: 5 * 1024 * 1024, errorMessage: "Dung lượng ảnh tối đa 5MB!")]
        [AllowedExtensions(extensions: new string[] { ".jpg", ".jpeg", ".png" }, errorMessage: "Ảnh không hợp lệ!")]
        public IFormFile ImageFile { get; set; }
        public M_Image imageObj { get; set; }
    }

}
