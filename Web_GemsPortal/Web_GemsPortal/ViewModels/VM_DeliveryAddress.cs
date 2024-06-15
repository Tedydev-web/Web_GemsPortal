namespace Web_GemsPortal.ViewModels
{
    public class VM_DeliveryAddress
    {
        public int id { get; set; }
        public int typeId { get; set; } = 0;
        public int isDefault { get; set; } = 0;
        public string name { get; set; }
        public string phoneNumber { get; set; }
        public string addressNumber { get; set; }
        public string addressText { get; set; }
        public int countryId { get; set; } = 1;
        public int provinceId { get; set; } = 0;
        public int districtId { get; set; } = 0;
        public int wardId { get; set; } = 0;
        public string provinceName { get; set; }
        public string districtName { get; set; }
        public string wardName { get; set; }
    }
}
