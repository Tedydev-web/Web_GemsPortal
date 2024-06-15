namespace Web_GemsPortal.ViewModels
{
    public class VM_SupplierCardItem
    {
        public string Id { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public string TypeSizeName { get; set; }
        public string TypeColorName { get; set; }
        public int Quantity { get; set; } = 0;
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string SupplierUrl { get; set; }
    }
}
