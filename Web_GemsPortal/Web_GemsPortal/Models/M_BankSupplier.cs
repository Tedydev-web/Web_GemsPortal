namespace Web_GemsPortal.Models
{
    public class M_BankSupplier
    {
        public int? id { get; set; }
        public string nameCard { get; set; }
        public string number { get; set; }
        public string bankId { get; set; }
        public string supplierId { get; set; }
        public string personId { get; set; }
        public M_Bank bankObj { get; set; }
        public M_Supplier supplierObj { get; set; }
    }
    public class M_BankSupplierCustom: M_BankSupplier
    {
        public string supplierEncryptor { get; set; }
    }
}
