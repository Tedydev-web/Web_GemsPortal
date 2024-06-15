namespace Web_GemsPortal.Models
{
    public class M_Promotion
    {
        public int? id { get; set; }
        public int? supplierId { get; set; }
        public EN_PromotionType promotionTypeId { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public EN_PromotionIsGeneral isGeneral { get; set; }
        public int? isFlashSale { get; set; }
        public EN_PromotionIsManage isManage { get; set; }
        public string description { get; set; }
        public string descriptionLink { get; set; }
        public string promotionCode { get; set; }
        public int? amountDiscountMaxDefault { get; set; }
        public int? limitNumber { get; set; }
        public int? usedNumber { get; set; }
        public int? approvedBy { get; set; }
        public int? status { get; set; }
        public List<M_PromotionConditionApply> promotionConditionApplyObj { get; set; }
        public M_Supplier supplierObj { get; set; }
        public List<M_PromotionSupplier> promotionSupplierObj { get; set; }
        public List<M_PromotionCategory> promotionCategoryObj { get; set; }
        public List<M_PromotionProduct> promotionProductObj { get; set; }
    }
    public enum EN_PromotionIsGeneral
    {
        None,
        Condition
    }
    public enum EN_PromotionIsManage
    {
        Seller,
        Admin
    }
    public enum EN_PromotionType
    {
        Default,
        Discount,
        Voucher,
        Coupon
    }
}
