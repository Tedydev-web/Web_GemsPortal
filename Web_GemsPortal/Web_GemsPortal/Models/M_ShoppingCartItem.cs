using System;

namespace Web_GemsPortal.Models
{
    public class M_ShoppingCartItem
    {
        public int id { get; set; }
        public int? shoppingCardId { get; set; }
        public int? supplierId { get; set; }
        public int? productId { get; set; }
        public int? unitId { get; set; }
        public int? quantity { get; set; }
        public int? typeSizeId { get; set; }
        public int? typeColorId { get; set; }
        public int? status { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public string relativeUrl { get; set; }
        public string smallUrl { get; set; }
        public string mediumUrl { get; set; }
    }
}
