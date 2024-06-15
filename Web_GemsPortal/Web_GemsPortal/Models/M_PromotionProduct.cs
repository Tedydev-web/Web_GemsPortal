namespace Web_GemsPortal.Models
{
    public class M_PromotionProduct
    {
        public int? id { get; set; }
        public int? promotionId { get; set; }
        public int? productId { get; set; }
        public int? status { get; set; }
        public M_Product productObj { get; set; }
    }
}
