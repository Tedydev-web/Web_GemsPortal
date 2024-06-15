using Web_GemsPortal.Models;

namespace Web_GemsPortal.ViewModels
{
    public class VM_SupplierCarrier
    {
        public int id { get; set; }
        public string supplierId { get; set; }
        public int carrierId { get; set; }
        public string shopCode { get; set; }
        public string token { get; set; }
        public M_Carrier carrierObj { get; set; }
    }
}
