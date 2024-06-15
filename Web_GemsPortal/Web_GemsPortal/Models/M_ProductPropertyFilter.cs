using System;

namespace Web_GemsPortal.Models
{
    public class M_ProductPropertyFilter
    {
        public int id { get; set; }
        public int productId { get; set; }
        public int propertyFilterId { get; set; }
        public int status { get; set; }
        public M_PropertyFilter propertyFilterObj { get; set; }
    }
}
