using System;
using System.Collections.Generic;

namespace Web_GemsPortal.Models
{
    public class M_Unit
    {
        public int? id { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public int? unitTypeId { get; set; }
        public int? parentId { get; set; }
        public M_Unit parentObj { get; set; }
        public List<M_Unit> unitChildObjs { get; set; }
    }
}
