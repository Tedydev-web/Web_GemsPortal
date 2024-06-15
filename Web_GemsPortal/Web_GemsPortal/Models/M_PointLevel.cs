using System;

namespace Web_GemsPortal.Models
{
    public class M_PointLevel
    {
        public int id { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public double? pointFrom { get; set; }
        public double? pointTo { get; set; }
        public int? ratioExchange { get; set; }
        public int? isMember { get; set; }
    }
}
