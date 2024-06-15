using Web_GemsPortal.Models.FarmConfigure;

namespace Web_GemsPortal.Models
{
    public class M_Supplier
    {
        public int id { get; set; }
        public int? slevel { get; set; }
        public int? parentId { get; set; }
        public string qrIdentityCode { get; set; }
        public string supplierType { get; set; }
        public string name { get; set; }
        public string nameEn { get; set; }
        public string refCode { get; set; }
        public string contactName { get; set; }
        public int? isTrademark { get; set; }
        public string taxNumber { get; set; }
        public string accountNumber { get; set; }
        public string email { get; set; }
        public string siteUrl { get; set; }
        public string telephoneNumber { get; set; }
        public string fax { get; set; }
        public string postCode { get; set; }
        public string facebook { get; set; }
        public string twitter { get; set; }
        public string instagram { get; set; }
        public string zalo { get; set; }
        public string youtube { get; set; }
        public string tiktokUrl { get; set; }
        public string imageFavicon { get; set; }
        public string bannerUrl { get; set; }
        public string memberUrlIdentity { get; set; }
        public string businessNumber { get; set; }
        public string description { get; set; }
        public string hotlineNumber { get; set; }
        public int? isMember { get; set; }
        public string ministryUrl { get; set; }
        public string roleFileUrl { get; set; }
        public string securityFileUrl { get; set; }
        public string operatingRegulationUrl { get; set; }
        public string refundPolicyUrl { get; set; }
        public string shippingPolicyUrl { get; set; }
        public DateTime? createdAt { get; set; }
        public M_Image imageObj { get; set; }
        public List<M_Image> imageListObj { get; set; }
        public M_Address addressObj { get; set; }
        public M_SupplierConfigure supplierConfigureObj { get; set; }
        public List<M_SupplierOffice> supplierOfficeObjs { get; set; }
    }
}
