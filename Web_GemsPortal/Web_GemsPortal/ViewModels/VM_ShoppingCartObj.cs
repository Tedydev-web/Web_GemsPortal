using Web_GemsPortal.Models;

namespace Web_GemsPortal.ViewModels
{
    public class VM_ShoppingCartObj
    {
        public string id { get; set; }
        public int? supplierId { get; set; }
        public string shopName { get; set; }
        public string shopUrl { get; set; }
        public string code { get; set; }
        public string addressObj { get; set; }
        public List<ProductItem> productItem { get; set; }
        public class ProductItem
        {
            public int cartId { get; set; }
            public int? id { get; set; }
            public int? categoryId { get; set; }
            public int? productPriceId { get; set; }
            public int? supplyQuantity { get; set; }
            public string name { get; set; }
            public string nameSlug { get; set; }
            public string imageUrl { get; set; }
            public int? quantity { get; set; }
            public int status { get; set; }
            public string unitName { get; set; }
            public string sizeName { get; set; }
            public string colorName { get; set; }
            public int? supplierId { get; set; }
            public M_ProductPrice productPriceObj { get; set; }
            public List<M_FeeTagsProduct> feeTagProductObjs { get; set; }
        }
    }
}
