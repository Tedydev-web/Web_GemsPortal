namespace Web_GemsPortal.Models
{
    public class M_PromotionConditionApply
    {
        public int? id { get; set; }
        public int? promotionId { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public long? discountAmount { get; set; }
        public long? voucherAmount { get; set; }
        public double? couponPercent { get; set; }
        public long? couponAmount { get; set; }
        public long? orderPriceThreshold { get; set; }
        public string remark { get; set; }
        public int? status { get; set; }
    }
}
