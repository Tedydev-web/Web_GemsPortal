using System;
using Web_GemsPortal.Models.Common;

namespace Web_GemsPortal.Models
{
    public class M_CustomerTestimonial:M_BaseModel.BaseCustom
    {
        public int? id { get; set; }
        public int supplierId { get; set; }
        public string name { get; set; }
        public string position { get; set; }
        public string comment { get; set; }
        public string imageUrl { get; set; }
        public int? star { get; set; }
        public string remark { get; set; }
    }
}
