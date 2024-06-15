using System;
using System.Collections.Generic;

namespace Web_GemsPortal.Models
{
    public class M_Category
    {
        public int id { get; set; }
        public int? parentId { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public string categoryCode { get; set; }
        public string remark { get; set; }
        public M_Image imageObj { get; set; }
        public List<M_Category> childMenu { get; set; }
        public M_ParentObj parentObj { get; set; }

        public class M_ParentObj
        {
            public int id { get; set; }
            public string name { get; set; }
            public string nameSlug { get; set; }
        }
    }
}
