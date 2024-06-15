using System;
using Web_GemsPortal.Models.Common;

namespace Web_GemsPortal.Models
{
    public class M_ConfigHome
    {
        public int? id { get; set; }
        public string supplierId { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public string urlType { get; set; }
        public string urlTarget { get; set; }
        public string fileUrl { get; set; }
        public int? fileType { get; set; }
        public string align { get; set; }
        public int? location { get; set; }
        public int? sort { get; set; }
    }
}
