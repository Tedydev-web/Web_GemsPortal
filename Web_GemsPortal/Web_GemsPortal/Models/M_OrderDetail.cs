using Web_GemsPortal.Models.FarmConfigure;

namespace Web_GemsPortal.Models
{
    public class M_OrderDetail
    {
        public string id { get; set; }
        public int? status { get; set; }
        public int? feeShip { get; set; }
        public int? discountAmount { get; set; }
        public int? totalMustPay { get; set; }
        public string receiverFullname { get; set; }
        public string receiverPhoneNumber { get; set; }
        public string addressText { get; set; }
        public string companyName { get; set; }
        public string companyTaxNumber { get; set; }
        public string companyAddress { get; set; }
        public string remark { get; set; }
        public long? supplierOrderDiscountAmount { get; set; }
        public double? paymentPercent { get; set; }
        public DateTime? deliveredAt { get; set; }
        public DateTime? createdAt { get; set; }
        public M_Supplier supplierObj { get; set; }
        public M_SupplierConfigure supplierConfigureObj { get; set; }
        public M_Payment paymentObj { get; set; }
        public M_Shipmethod shipmethodObj { get; set; }
        public List<M_OrderItem> orderItemObj { get; set; }
        public M_OrderProcess orderProcessObj { get; set; }
        public List<M_OrderComment> orderCommentObjs { get; set; }
    }
}
