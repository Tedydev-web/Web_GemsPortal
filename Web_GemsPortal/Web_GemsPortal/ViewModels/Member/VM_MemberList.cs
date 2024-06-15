namespace Web_GemsPortal.ViewModels.Member
{
    public class VM_MemberList
    {
        public int id { get; set; }
        public string identity { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string avatar { get; set; }
        public string shopName { get; set; }
        public string addressText { get; set; }
        public string provinceName { get; set; }
        public string districtName { get; set; }
        public string wardName { get; set; }
        public int? isMember { get; set; }
        public double? latitude { get; set; }
        public double? longitude { get; set; }
    }
}
