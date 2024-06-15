using Web_GemsPortal.Lib;
using System.ComponentModel.DataAnnotations;

namespace Web_GemsPortal.Models
{
    public class M_GHN
    {
        public int? district_id { get; set; }
        public int? _id { get; set; }
    }
    public class EM_GetFeeShip_GHN
    {  
        public int? shop_id { get; set; }
        public int? service_id { get; set; }
        public int? service_type_id { get; set; } //1:Bay, 2:Đi bộ
        public int? insurance_value { get; set; }
        public int? coupon { get; set; }
        public int? from_district_id { get; set; }
        public string provinceName { get; set; }
        public string districtName { get; set; }
        public string wardName { get; set; }
        public int? weight { get; set; }
        public int? length { get; set; }
        public int? width { get; set; }
        public int? height { get; set; }
        public int? cod_value { get; set; }
    }
    public class M_Fee_GHN : M_GHN
    {
        public int? total { get; set; }
        public int? service_fee { get; set; }
        public int? insurance_fee { get; set; }
        public int? pick_station_fee { get; set; }
        public int? coupon_value { get; set; }
        public int? r2s_fee { get; set; }
    }
}
