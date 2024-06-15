namespace Web_GemsPortal.Models
{
    public class M_Type
    {
        public int? id { get; set; }
        public string name { get; set; }
        public int? numcategory { get; set; }
        public string subcategoryId { get; set; }
        public string subCategoryName { get; set; }
        public int? parentId { get; set; }
        public string picture { get; set; }
        public int? weight { get; set; }
        public int? sort { get; set; }
        public string remark { get; set; }
    }
}
