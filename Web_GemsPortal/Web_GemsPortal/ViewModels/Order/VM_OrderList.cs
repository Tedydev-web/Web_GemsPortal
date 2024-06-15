namespace Web_GemsPortal.ViewModels.Order
{
    public class VM_OrderList
    {
        public string Id { get; set; }
        public int? DiscountAmount { get; set; }
        public int ProcessStatus { get; set; }
        public DateTime? CreatedAt { get; set; }
        public List<OrderItem> orderItem { get; set; }
        public class OrderItem
        {
            public int? ProductId { get; set; }
            public string ProductName { get; set; }
            public string ProductImage { get; set; }
            public string UnitName { get; set; }
            public string TypeName { get; set; }
            public string SizeName { get; set; }
            public string ColorName { get; set; }
            public int Price { get; set; } = 0;
            public int Discount { get; set; } = 0;
            public int Quantity { get; set; } = 0;
            public int ProcessStatus { get; set; }
        }
    }
}
