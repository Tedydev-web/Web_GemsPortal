namespace Web_GemsPortal.Models
{
    public class M_Banner
    {
        public int id { get; set; }
        public int? supplierId { get; set; }
        public string title { get; set; }
        public string descShort { get; set; }
        public string url { get; set; }
        public int? imageId { get; set; }
        public int? clickNumber { get; set; }
        public EN_BannerLocation locationId { get; set; }
        public M_Image imageObj { get; set; }
        public List<M_Image> imageListObj { get; set; }
    }
    public enum EN_BannerLocation
    {
       Location1,
       Location2,
       Location3,
       Location4,
       Location5,
       Location6
    }
}
