namespace Web_GemsPortal.Models
{
    public class M_OrderGetList
    {
        public string id { get; set; }
        public int? discountAmount { get; set; }
        public DateTime? createdAt { get; set; }
        public List<M_OrderItem> orderItemObj { get; set; }
        public M_OrderProcess orderProcessObj { get; set; }
    }
}
