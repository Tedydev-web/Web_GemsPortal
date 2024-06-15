namespace Web_GemsPortal.Models
{
    public class M_FeeTagsProduct
    {
        public int id { get; set; }
        public int feeTagsId { get; set; }
        public int productId { get; set; }
        public int status { get; set; }
        public M_FeeTags feeTagsObj { get; set; }
    }
}
