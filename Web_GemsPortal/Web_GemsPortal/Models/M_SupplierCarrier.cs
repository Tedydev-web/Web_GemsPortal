namespace Web_GemsPortal.Models
{
    public class M_SupplierCarrier
    {
        public int id { get; set; }
        public int supplierId { get; set; }
        public int carrierId { get; set; }
        public string shopCode { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public string token { get; set; }
        public string remark { get; set; }
        public int status { get; set; }
        public M_Carrier carrierObj { get; set; }
        public M_Supplier supplierObj { get; set; }
    }
}
