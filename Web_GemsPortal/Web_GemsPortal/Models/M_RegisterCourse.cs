using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.Models
{
    public class M_RegisterCourse
    {
        public int? id { get; set; }
        public int? supplierId { get; set; }
        public int? personId { get; set; }
        public int? newsCategoryId { get; set; }
        public int? newsId { get; set; }
        public int? reOrder { get; set; }
        public string remark { get; set; }
        public int? status { get; set; }
    }
    public class EM_RegisterCourse
    {
        public int? id { get; set; }
        public int? supplierId { get; set; }
        public int? personId { get; set; }
        public int? newsCategoryId { get; set; }
        public int? newsId { get; set; }
        public int? reOrder { get; set; }
        [StringLength(150, ErrorMessage = "Ghi chú có độ dài tối đa 150 ký tự")]
        public string remark { get; set; }
        public int? status { get; set; }
    }
}
