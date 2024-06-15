using Web_GemsPortal.Models;
using System;
using System.Collections.Generic;

namespace Web_GemsPortal.ViewModels.Order
{
    public class VM_OrderView
    {
        public string Id { get; set; }
        public string ReceiverFullname { get; set; }
        public string AddressText { get; set; }
        public string ReceiverPhoneNumber { get; set; }
        public string CompanyName { get; set; }
        public string CompanyTaxNumber { get; set; }
        public string CompanyAddress { get; set; }
        public string Remark { get; set; }
        public string ShopId { get; set; }
        public string ShopName { get; set; }
        public string ShopAvatar { get; set; }
        public string ShopUrl { get; set; }
        public string ShopPhone { get; set; }
        public string ShopAddressText { get; set; }
        public string ShopWardName { get; set; }
        public string ShopDistrictName { get; set; }
        public string ShopProvinceName { get; set; }
        public string PaymentMethodId{ get; set; }
        public string PaymentMethodName { get; set; }
        public int? ShipMethodId { get; set; }
        public string ShipMethodName { get; set; }
        public string ReasonName { get; set; }
        public int? ReasonType { get; set; }
        public string ReasonDescription { get; set; }
        public int? Feeship { get; set; }
        public int? TotalMustPay { get; set; }
        public int? DiscountAmount { get; set; }
        public long? supplierOrderDiscountAmount { get; set; }
        public double? paymentPercent { get; set; }
        public int ProcessStatus { get; set; }
        public DateTime? DeliveredAt { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? DoneAt { get; set; }
        public List<OrderItem> orderItem { get; set; }
        public List<M_OrderComment> orderCommentObjs { get; set; }
        public class OrderItem
        {
            public int Id { get; set; }
            public int? ProductId { get; set; }
            public string ProductName { get; set; }
            public string ProductNameSlug { get; set; }
            public string ProductImage { get; set; }
            public string UnitName { get; set; }
            public string TypeName { get; set; }
            public string SizeName { get; set; }
            public string ColorName { get; set; }
            public int Price { get; set; } = 0;
            public int Discount { get; set; } = 0;
            public int Quantity { get; set; } = 0;
            public int ProcessStatus { get; set; }
            public string ReasonName { get; set; }
            public int? ReasonType { get; set; }
            public string ReasonDescription { get; set; }
        }
    }
}
