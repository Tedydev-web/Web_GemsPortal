using System;

namespace Web_GemsPortal.Models
{
    public class M_SupplierOffice
    {
        public int id { get; set; }
        public int supplierId { get; set; }
        public string title { get; set; }
        public string fax { get; set; }
        public string telephoneNumber { get; set; }
        public string addressNumber { get; set; }
        public string addressText { get; set; }
        public int countryId { get; set; }
        public int provinceId { get; set; }
        public int districtId { get; set; }
        public int wardId { get; set; }
        public int townId { get; set; }
        public double? latitude { get; set; }
        public double? longitude { get; set; }
        public int status { get; set; }
        public DateTime? createdAt { get; set; }
        public DateTime? updatedAt { get; set; }
        public string createdBy { get; set; }
        public string updatedBy { get; set; }
        public DateTime? timer { get; set; }

        public M_Country countryObj { get; set; }
        public M_Province provinceObj { get; set; }
        public M_District districtObj { get; set; }
        public M_Ward wardObj { get; set; }
    }
}
