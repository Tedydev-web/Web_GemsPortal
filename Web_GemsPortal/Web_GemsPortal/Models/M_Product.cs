using System.Collections.Generic;

namespace Web_GemsPortal.Models
{
    public class M_Product
    {
        public int id { get; set; }
        public string sku { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public string productCode { get; set; }
        public string qrCode { get; set; }
        public int? categoryId { get; set; }
        public int? supplierId { get; set; }
        public string summaryInfo { get; set; }
        public int? star { get; set; }
        public int? price { get; set; }
        public int? priceOut { get; set; }
        public int? discount { get; set; }
        public int? imageId { get; set; }
        public int? status { get; set; }
        public string shippingMethodName { get; set; }
        public DateTime? estimatedDeliveryTime { get; set; }
        public int? supplyQuantity { get; set; }
        public M_Category categoryObj { get; set; }
        public M_Supplier supplierObj { get; set; }
        public M_Image imageObj { get; set; }
        public List<M_Image> imageListObj { get; set; }
        public List<M_ProductPackingForm> productPackingFormObj { get; set; }
        public List<M_ProductPropertyFilter> productPropertyFilterObj { get; set; }
        public List<M_ProductPrice> productPriceObjs { get; set; }
    }
}
