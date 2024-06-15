using System;
using System.Collections.Generic;

namespace Web_GemsPortal.Models
{
    public class M_Person
    {
        public int id { get; set; }
        public string supplierId { get; set; }
        public string personType { get; set; }
        public string qrCode { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string firstNameSlug { get; set; }
        public string lastNameSlug { get; set; }
        public DateTime? birthday { get; set; }
        public int? gender { get; set; }
        public string email { get; set; }
        public int? addressId { get; set; }
        public string addressList { get; set; }
        public int? imageId { get; set; }
        public int? status { get; set; }
        public DateTime? timer { get; set; }
        public M_Image imageObj { get; set; }
        public M_Telephone telephoneObj { get; set; }
        public M_Address addressObj { get; set; }
        public List<M_DeliveryAddress> deliveryAddressObj { get; set; }
        public M_Account accountObj { get; set; }
    }
}
