using System;

namespace Web_GemsPortal.Models
{
    public class M_ProductPackingForm
    {
        public int id { get; set; }
        public int productId { get; set; }
        public int packingFormId { get; set; }
        public int status { get; set; }
        public DateTime? createdAt { get; set; }
        public int createdBy { get; set; }
        public DateTime? updatedAt { get; set; }
        public int? updatedBy { get; set; }
        public DateTime? timer { get; set; }
        public M_PackingForm packingFormObj { get; set; }
    }
}
