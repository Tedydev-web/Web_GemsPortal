namespace Web_GemsPortal.Models
{
    public class M_NewsCategory
    {
        public int id { get; set; }
        public int? parentId { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public EN_NewsCategoryTypeId typeId { get; set; }
    }
    public enum EN_NewsCategoryTypeId
    {
        News,
        Introduce,
        Training,
        Consulting,
        Event,
        quantity
    }
}
