using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.Models
{
    public class M_PromotionApply
    {
        public int? id { get; set; }
        public string orderId { get; set; }
        public int? personId { get; set; }
        public string promotionCodeClaim { get; set; }
        public int? isApply { get; set; }
        public int? status { get; set; }
        public DateTime? timer { get; set; }
        public M_Promotion promotionObj { get; set; }
    }
    public class EM_PromotionApply
    {
        public int? id { get; set; }
        [StringLength(20, ErrorMessage = "Đơn hàng có độ dài tối đa 20 ký tự")]
        public string orderId { get; set; }
        public int? personId { get; set; }
        [StringLength(10, ErrorMessage = "Mã có độ dài tối đa 10 ký tự")]
        public string promotionCodeClaim { get; set; }
        public int? isApply { get; set; }
        public int? status { get; set; }
        public DateTime? timer { get; set; }
    }
}
