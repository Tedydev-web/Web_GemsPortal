using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.EditModels.Order
{
    public class EM_Order
    {
        public string SequenceShoppingCartItemId { get; set; }

        public int PaymentId { get; set; }

        [StringLength(50, ErrorMessage = "Tên người nhận hàng có độ dài tối đa 50 ký tự")]
        public string ReceiverFullName { get; set; }

        [StringLength(12, ErrorMessage = "Điện thoại có độ dài tối đa 12 ký tự")]
        public string ReceiverPhoneNumber { get; set; }

        [StringLength(200, ErrorMessage = "Địa chỉ nhận hàng có độ dài tối đa 200 ký tự")]
        public string AddressText { get; set; }

        [StringLength(200, ErrorMessage = "Địa chỉ nhận hàng có độ dài tối đa 200 ký tự")]
        public string AddressieText { get; set; }
        public int CountryId { get; set; } = 1;
        public int ProvinceId { get; set; } = 0;
        public int DistrictId { get; set; } = 0;
        public int WardId { get; set; } = 0;
        public string ShopId { get; set; }

        [StringLength(100, ErrorMessage = "Tên công ty có độ dài tối đa 100 ký tự")]
        public string CompanyName { get; set; }

        [StringLength(20, ErrorMessage = "Mã số thuế có độ dài tối đa 20 ký tự")]
        public string CompanyTaxNumber { get; set; }

        [StringLength(150, ErrorMessage = "Địa chỉ công ty có độ dài tối đa 150 ký tự")]
        public string CompanyAddress { get; set; }

        [StringLength(250, ErrorMessage = "Ghi chú có độ dài tối đa 250 ký tự")]
        public string Remark { get; set; }
        public int FeeShip { get; set; }
        public int? CarrierId { get; set; }
        public string DeliveryOption { get; set; }
        public string SequencePromotionCode { get; set; }
        public string DiscountAmount { get; set; }
        public long supplierOrderDiscountAmount { get; set; }
        public double? paymentPercent { get; set; }
        public string SupplierId { get; set; }
    }
}
