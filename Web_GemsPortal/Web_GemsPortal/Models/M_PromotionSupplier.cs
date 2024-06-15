namespace Web_GemsPortal.Models
{
    public class M_PromotionSupplier
    {
        public int? id { get; set; }
        public int? supplierId { get; set; }
        public int? promotionId { get; set; }
        public int? status { get; set; }
        public M_Supplier supplierObj { get; set; }
    }
}
