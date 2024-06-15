using System.Collections.Generic;

namespace Web_GemsPortal.Models
{
    public class M_ProductDetail
    {
        public int? id { get; set; }
        public string sku { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public string productCode { get; set; }
        public string qrCode { get; set; }
        public string summaryInfo { get; set; }
        public string detail { get; set; }
        public int? categoryId { get; set; }
        public int? star { get; set; }
        public int? price { get; set; }
        public int? priceOut { get; set; }
        public int? discount { get; set; }
        public int? unitId { get; set; }
        public int? tradeMarkId { get; set; }
        public double? viewNumber { get; set; }
        public int? status { get; set; }
        public string shippingMethodName { get; set; }
        public string typeName { get; set; }
        public DateTime? estimatedDeliveryTime { get; set; }
        public int? supplyQuantity { get; set; }
        public M_Category categoryObj { get; set; }
        public M_Image imageObj { get; set; }
        public List<M_Image> imageListObj { get; set; }
        public M_Unit unitObj { get; set; }
        public M_Supplier supplierObj { get; set; }
        public M_TradeMark trademarkObj { get; set; }
        public List<M_ProductPrice> productPriceObjs { get; set; }
        public List<M_ProductPackingForm> productPackingFormObjs { get; set; }
        public List<M_ProductPropertyFilter> productPropertyFilterObjs { get; set; }
    }
}
