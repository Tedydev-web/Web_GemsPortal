namespace Web_GemsPortal.Models
{
    public class M_Address
    {
        public int? id { get; set; }
        public int? supplierId { get; set; }
        public string title { get; set; }
        public string addressNumber { get; set; }
        public string addressText { get; set; }
        public int? provinceId { get; set; }
        public int? districtId { get; set; }
        public int? wardId { get; set; }
        public int? countryId { get; set; }
        public double? latitude { get; set; }
        public double? longitude { get; set; }
        public M_Country countryObj;
        public M_Province provinceObj;
        public M_District districtObj;
        public M_Ward wardObj;
        public M_Supplier supplierObj;
        public InventoryObj inventoryObj;
        public class InventoryObj
        {
            public int? productId { get; set; }
            public int? quantity { get; set; }
        }
    }
}
