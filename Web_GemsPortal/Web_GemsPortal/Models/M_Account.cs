using System.Collections.Generic;

namespace Web_GemsPortal.Models
{
    public class M_Account
    {
        public int id { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string accountType { get; set; }
        public int? shopingCardid { get; set; }
        public int? systemId { get; set; }
        public int? personId { get; set; }
        public int? status { get; set; }
        public M_PersonObj personObj { get; set; }
        public M_Image imageObj { get; set; }
        public VertifyObj vertifyObj { get; set; }
        public class M_PersonObj
        {
            public int? id { get; set; }
            public string firstname { get; set; }
            public string lastname { get; set; }
        }
        public class VertifyObj
        {
            public int? id { get; set; }
            public int? activeId { get; set; }
            public string phoneNumber { get; set; }
        }
    }
}
