namespace Web_GemsPortal.Models
{
    public class M_LoginHub
    {
        public int id { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string accountType { get; set; }
        public int? shoppingCartId { get; set; }
        public int? systemId { get; set; }
        public int? personId { get; set; }
        public int? status { get; set; }
        public string access_token { get; set; }
        public M_PersonObj personObj { get; set; }
        public M_Image imageObj { get; set; }
        public class M_PersonObj
        {
            public int? id { get; set; }
            public string firstname { get; set; }
            public string lastname { get; set; }
        }
    }
}
