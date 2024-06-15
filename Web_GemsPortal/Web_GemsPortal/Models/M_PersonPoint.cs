using System;

namespace Web_GemsPortal.Models
{
    public class M_PersonPoint
    {
        public int id { get; set; }
        public int? personId { get; set; }
        public double? point { get; set; }
        public M_Person personObj { get; set; }
    }
}
