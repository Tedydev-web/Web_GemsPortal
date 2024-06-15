namespace Web_GemsPortal.Models
{
    public class M_DeliveryAddress
    {
        public int? id { get; set; }
        public int? customerId { get; set; }
        public int? typeId { get; set; }
        public string name { get; set; }
        public string phoneNumber { get; set; }
        public string addressNumber { get; set; }
        public string addressText { get; set; }
        public int? isDefault { get; set; }
        public double? latitude { get; set; }
        public double? longitude { get; set; }
        public int? countryId { get; set; }
        public int? provinceId { get; set; } 
        public int? districtId { get; set; }
        public int? wardId { get; set; }
        public M_CustomerObj customerObj;
        public M_CountryObj countryObj;
        public M_ProvinceObj provinceObj;
        public M_DistrictObj districtObj;
        public M_WardObj wardObj;
        public class M_CustomerObj
        {
            public int? id { get; set; }
            public string firstName { get; set; }
            public string lastName { get; set; }
        }
        public class M_CountryObj
        {
            public int? id { get; set; }
            public string name { get; set; }
            public string countryCode { get; set; }
        }
        public class M_ProvinceObj
        {
            public int? id { get; set; }
            public string name { get; set; }
            public string nameSlug { get; set; }
            public string provinceCode { get; set; }
        }
        public class M_DistrictObj
        {
            public int? id { get; set; }
            public string name { get; set; }
            public string nameSlug { get; set; }
            public string districtCode { get; set; }
        }
        public class M_WardObj
        {
            public int? id { get; set; }
            public string name { get; set; }
            public string nameSlug { get; set; }
            public string wardCode { get; set; }
        }
    }
}
