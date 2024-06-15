namespace Web_GemsPortal.Models
{
    public class M_OrderItem
    {
        public int? id { get; set; }
        public int? quantity { get; set; }
        public int? price { get; set; }
        public int? discount { get; set; }
        public int? processStatus { get; set; }
        public int? reasonId { get; set; }
        public string remark { get; set; }
        public M_Product productObj { get; set; }
        public M_Image imageObj { get; set; }
        public M_Unit unitObj { get; set; }
        public M_ProductPrice productPriceObj { get; set; }
        public M_Reason reasonObj { get; set; }
    }
}
