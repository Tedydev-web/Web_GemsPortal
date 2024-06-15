using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.Models
{
    public class M_OrderComment
    {
        public int? id { get; set; }
        public int? parentId { get; set; }
        public string orderId { get; set; }
        public string comment { get; set; }
        public EN_OrderCommentManagementType managementType { get; set; }
        public EN_OrderCommentManagementReplyType managementReplyType { get; set; }
        public string remark { get; set; }
        public int? status { get; set; }
        public int? createdBy { get; set; }
        public DateTime? createdAt { get; set; }
        public int? updatedBy { get; set; }
        public DateTime? updatedAt { get; set; }
        public DateTime? timer { get; set; }
        public List<M_OrderComment> orderReplyObjs { get; set; }
    }
    public enum EN_OrderCommentManagementType
    {
        All,
        Admin,
        Member
    }
    public enum EN_OrderCommentManagementReplyType
    {
        Admin = 1,
        Member = 2,
        Buyer = 3
    }
    public class EM_OrderComment
    {
        public int? id { get; set; }
        public int? parentId { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập mã đơn hàng")]
        public string orderId { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập nội dung")]
        [StringLength(500, ErrorMessage = "Nội dung tối đa 500 ký tự!")]
        public string comment { get; set; }
        public EN_OrderCommentManagementType managementType { get; set; }
        public EN_OrderCommentManagementReplyType managementReplyType { get; set; }
        [StringLength(150, ErrorMessage = "Ghi chú tối đa 150 ký tự!")]
        public string remark { get; set; }
        public int? status { get; set; }
        public int? createdBy { get; set; }
        public DateTime? createdAt { get; set; }
        public int? updatedBy { get; set; }
        public DateTime? updatedAt { get; set; }
        public DateTime? timer { get; set; }
    }
}
