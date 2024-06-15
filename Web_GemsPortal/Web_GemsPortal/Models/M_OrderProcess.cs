using System;

namespace Web_GemsPortal.Models
{
    public class M_OrderProcess
    {
        public string id { get; set; }
        public string orderId { get; set; }
        public int? processStatus { get; set; }
        public int? reasonId { get; set; }
        public string remark { get; set; }
        public DateTime? createdAt { get; set; }
        public int? createdBy { get; set; }
        public DateTime? timer { get; set; }
        public M_Reason reasonObj { get; set; }
    }
}
