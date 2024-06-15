using System;

namespace Web_GemsPortal.Models
{
    public class M_VertifyPhone
    {
        public string id { get; set; }
        public int? activeId { get; set; }
        public string activeCode { get; set; }
        public int? timesLimitFail { get; set; }
        public int? timesFail { get; set; }
        public string phoneNumber { get; set; }
        public int? vertifyType { get; set; }
        public DateTime? createdAt { get; set; }
        public string createdBy { get; set; }
        public DateTime? updatedAt { get; set; }
        public string updatedBy { get; set; }
        public DateTime? timer { get; set; }
        public int? status { get; set; }
    }
}
