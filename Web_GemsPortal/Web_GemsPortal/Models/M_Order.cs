namespace Web_GemsPortal.Models
{
    public class M_Order
    {
        public string id { get; set; }
        public string parentId { get; set; }
        public string supplierId { get; set; }
        public int? customerId { get; set; }
        public DateTime? deliveredAt { get; set; }
        public int? status { get; set; }
        public int? paymentId { get; set; }
        public int? shipmethodId { get; set; }
        public string receiverFullname { get; set; }
        public string receiverPhoneNumber { get; set; }
        public string addressText { get; set; }
        public int? shoppingCartId { get; set; }
        public long? supplierOrderDiscountAmount { get; set; }
        public double? paymentPercent { get; set; }
        public DateTime? createdAt { get; set; }
        public int? createdBy { get; set; }
        public DateTime? timer { get; set; }
        public M_Supplier supplierObj { get; set; }
    }
    public class M_CheckPromotionCode
    {
        public int result { get; set; }
        public int? IsManage { get; set; }
        public string promotionCode { get; set; }
        public string message { get; set; }
        public int totalDiscountForThisCode { get; set; }
    }
}
