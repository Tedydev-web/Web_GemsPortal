using System;

namespace Web_GemsPortal.Models
{
    public class M_RegisterContact
    {
        public int id { get; set; }
        public string name { get; set; }
        public string nameSlug { get; set; }
        public string identityCardNumber { get; set; }
        public string email { get; set; }
        public string description { get; set; }
        public string telephoneNumber { get; set; }
        public string imageUrl { get; set; }
        public string remark { get; set; }
        public string inviteCodeRef { get; set; }
        public int? countryId { get; set; }
        public int? provinceId { get; set; }
        public int? districtId { get; set; }
        public int? wardId { get; set; }
        public string addressText { get; set; }
        public string status { get; set; }
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
