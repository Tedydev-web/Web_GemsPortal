namespace Web_GemsPortal.Models
{
    public class M_PartnerList
    {
        public int id { get; set; }
        public int? supplierId { get; set; }
        public string title { get; set; }
        public string descShort { get; set; }
        public string url { get; set; }
        public string pageName { get; set; }
        public int? imageId { get; set; }
        public int? clickNumber { get; set; }
        public M_Image imageObj { get; set; }
    }
}
