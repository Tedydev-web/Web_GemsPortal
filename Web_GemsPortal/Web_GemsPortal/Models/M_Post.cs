using System;
using System.Collections.Generic;

namespace Web_GemsPortal.Models
{
    public class M_Post
    {
        public int id { get; set; }
        public int supplierId { get; set; }
        public int personId { get; set; }
        public string title { get; set; }
        public string detail { get; set; }
        public string status { get; set; }
        public DateTime? createdAt { get; set; }
        public string createdBy { get; set; }
        public M_Supplier supplierObj { get; set; }
        public M_Person personObj { get; set; }
        public List<M_PostImagePost> postImagePostObjs { get; set; }
    }
}
