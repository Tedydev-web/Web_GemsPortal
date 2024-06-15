namespace Web_GemsPortal.Models
{
    public class M_News
    {
        public int id { get; set; }
        public int? categoryId { get; set; }
        public int? supplierId { get; set; }
        public string title { get; set; }
        public string titleSlug { get; set; }
        public string description { get; set; }
        public string detail { get; set; }
        public DateTime createdAt { get; set; }
        public M_NewsCategory categoryObj { get; set; }
        public M_Image imageObj { get; set; }
    }
}
