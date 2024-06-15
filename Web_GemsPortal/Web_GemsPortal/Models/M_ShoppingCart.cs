using Web_GemsPortal.Models.FarmConfigure;
using System.Collections.Generic;

namespace Web_GemsPortal.Models
{
    public class M_ShoppingCart
    {
        public int id { get; set; }
        public int? customerId { get; set; }
        public List<ShoppingCartItemObj> shoppingCartItemObj { get; set; }
        public class ShoppingCartItemObj
        {
            public SupplierObj supplierObj { get; set; }
            public M_SupplierConfigure supplierConfigureObj { get; set; }
        }
        public class SupplierObj
        {
            public int? id { get; set; }
            public string memberUrlIdentity { get; set; }
            public string name { get; set; }
            public string nameSlug { get; set; }
            public string refCode { get; set; }
            public M_Address addressObj { get; set; }
            public List<SplitShoppingCartObj> splitShoppingCartObj { get; set; }
        }
        public class SplitShoppingCartObj
        {
            public int id { get; set; }
            public int? shoppingCardId { get; set; }
            public int? supplierId { get; set; }
            public int? productId { get; set; }
            public int? productPriceId { get; set; }
            public int? quantity { get; set; }
            public int? typeSizeId { get; set; }
            public int? typeColorId { get; set; }
            public M_Product productObj { get; set; }
            public M_ProductPrice productPriceObj { get; set; }
            public M_Unit unitObj { get; set; }
            public M_Image imageObj { get; set; }
            public List<M_FeeTagsProduct> feeTagProductObjs { get; set; }
        }
    }
}
