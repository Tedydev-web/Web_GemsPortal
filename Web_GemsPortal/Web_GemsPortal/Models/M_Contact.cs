using System;

namespace Web_GemsPortal.Models
{
    public class M_Contact
    {
        public string id { get; set; }
        public string supplierId { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public string title { get; set; }
        public string titleSlug { get; set; }
        public string detail { get; set; }
        public int? status { get; set; }
        public string remark { get; set; }
    }
}
