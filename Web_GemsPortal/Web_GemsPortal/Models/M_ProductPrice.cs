using System;

namespace Web_GemsPortal.Models
{
    public class M_ProductPrice
    {
        public int id { get; set; }
        public string typeName { get; set; }
        public int productId { get; set; }
        public int? unitId { get; set; }
        public int priceOut { get; set; } = 0;
        public int discount { get; set; } = 0;
        public int isWarehouse { get; set; }
        public double? weight { get; set; } = 0;
        public double? height { get; set; } = 0;
        public double? length { get; set; } = 0;
        public double? width { get; set; } = 0;
        public int isMember { get; set; }
        public int status { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
        public int? createdBy { get; set; }
        public int? updatedBy { get; set; }
        public DateTime? timer { get; set; }
        public M_Unit unitObj { get; set; }
        public M_Type typeObj { get; set; }
    }
}
