namespace Web_GemsPortal.Models
{
    public class M_PromotionCategory
    {
        public int? id { get; set; }
        public int? promotionId { get; set; }
        public int? categoryId { get; set; }
        public int? status { get; set; }
        public M_Category categoryObj { get; set; }
    }
}
