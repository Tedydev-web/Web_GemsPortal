using System;

namespace Web_GemsPortal.Models
{
    public class M_OrderItemDeleteHub
    {
        public int? id { get; set; }
        public string orderId { get; set; }
        public int? supplierProductId { get; set; }
        public int? supplierId { get; set; }
        public int? productId { get; set; }
        public int? quantity { get; set; }
        public int? price { get; set; }
        public int? discount { get; set; }
        public int? processStatus { get; set; }
        public int? typeSizeId { get; set; }
        public int? typeColorId { get; set; }
        public int? isBigshop { get; set; }
        public int? reasonId { get; set; }
        public string remark { get; set; }
        public DateTime? createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime? updatedAt { get; set; }
        public string updatedBy { get; set; }
        public DateTime? timer { get; set; }
    }
}
