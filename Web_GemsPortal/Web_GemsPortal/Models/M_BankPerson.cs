namespace Web_GemsPortal.Models
{
    public class M_BankPerson
    {
        public int? id { get; set; }
        public string nameCard { get; set; }
        public string number { get; set; }
        public string bankId { get; set; }
        public string personId { get; set; }
        public M_Bank bankObj { get; set; }
        public PersonObj personObj { get; set; }
        public class PersonObj
        {
            public int? id { get; set; }
            public string supplierId { get; set; }
            public string firstName { get; set; }
            public string lastName { get; set; }
            public string email { get; set; }
        }
    }
}
