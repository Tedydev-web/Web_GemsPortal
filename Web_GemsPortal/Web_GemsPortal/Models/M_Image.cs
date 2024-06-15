using System;

namespace Web_GemsPortal.Models
{
    public class M_Image
    {
        public int? id { get; set; }
        public int? serialId { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public string relativeUrl { get; set; }
        public string smallUrl { get; set; }
        public string mediumUrl { get; set; }
    }
}
