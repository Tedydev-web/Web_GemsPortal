using Web_GemsPortal.Models;
using System.Collections.Generic;

namespace Web_GemsPortal.ViewModels
{
    public class VM_SupplierObj
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public string RefCode { get; set; }
        public string Name { get; set; }
        public string ContactName { get; set; }
        public string Description { get; set; }
        public string TaxNumber { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }
        public string CountryName { get; set; }
        public string ProvinceName { get; set; }
        public string DistrictName { get; set; }
        public string WardName { get; set; }
        public string AddressNumber { get; set; }
        public string AddressText { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public string Facebook { get; set; }
        public string Twitter { get; set; }
        public string Instagram { get; set; }
        public string Zalo { get; set; }
        public string Youtube { get; set; }
        public string AppUrl { get; set; }
        public string ImageLogo { get; set; }
        public string ImageFavicon { get; set; }
        public string BusinessNumber { get; set; }
        public string HotlineNumber { get; set; }
        public string MemberUrlIdentity { get; set; }
        public List<SupplierOfficeObj> supplierOfficeObjs { get; set; }
        public class SupplierOfficeObj
        {
            public string title { get; set; }
            public string fax { get; set; }
            public string telephoneNumber { get; set; }
            public string addressNumber { get; set; }
            public string addressText { get; set; }
            public double? latitude { get; set; }
            public double? longitude { get; set; }
            public M_Country countryObj { get; set; }
            public M_Province provinceObj { get; set; }
            public M_District districtObj { get; set; }
            public M_Ward wardObj { get; set; }
        }
    }
}
