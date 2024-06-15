namespace Web_GemsPortal.Models
{
    public class M_PropertyFilter
    {
        public int id { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public int typeId { get; set; }
        public int status { get; set; }
        public int? categoryTypeId { get; set; }
        public M_CategoryType categoryTypeObj { get; set; }
    }
}
