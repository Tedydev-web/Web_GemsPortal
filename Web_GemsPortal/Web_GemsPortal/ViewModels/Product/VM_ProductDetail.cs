using Web_GemsPortal.Models;

namespace Web_GemsPortal.ViewModels.Product
{
    public class VM_ProductDetail
    {
        public int Id { get; set; }
        public string QrCode { get; set; }
        public string Name { get; set; }
        public string NameSlug { get; set; }
        public int? CategoryId { get; set; } = 0;
        public int? CategoryParentId { get; set; } = 0;
        public string CategoryName { get; set; } = "";
        public string CategoryParentName { get; set; } = "";
        public int Price { get; set; } = 0;
        public int Discount { get; set; } = 0;
        public string SummaryInfo { get; set; }
        public string Detail { get; set; }
        public int? TradeMarkId { get; set; }
        public int? UnitId { get; set; }
        public int? Star { get; set; }
        public string TradeMarkName { get; set; }
        public string UnitName { get; set; }
        public double? ViewNumber { get; set; }
        public string ShippingMethodName { get; set; }
        public DateTime? EstimatedDeliveryTime { get; set; }
        public int? SupplyQuantity { get; set; }
        public VM_ImageObj ImageObj { get; set; }
        public M_Supplier SupplierObj { get; set; }
        public List<VM_ImageObj> ImageListObj { get; set; }
        public List<VM_ColorSizeObj> ProductColorSizeObj { get; set; }
        public List<M_ProductPrice> ProductPriceObjs { get; set; }
        public List<M_ProductPackingForm> ProductPackingFormObjs { get; set; }
        public List<M_ProductPropertyFilter> ProductPropertyFilterObjs { get; set; }
        public string ProductColorSizeJsonObj { get; set; }
        public class VM_ColorSizeObj
        {
            public int TypeColorId { get; set; } = 0;
            public int TypeSizeId { get; set; } = 0;
            public string TypeColorName { get; set; }
            public string TypeSizeName { get; set; }
            public int? Quantity { get; set; }
        }
    }
}
