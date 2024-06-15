using Web_GemsPortal.Models.Common;
using Web_GemsPortal.Models.FarmConfigure;

namespace Web_GemsPortal.Models
{
    public class M_OrderImage : M_BaseModel.BaseCustom
    {
        public int? id { get; set; }
        public int? type { get; set; }
        public string orderId { get; set; }
        public int? imageId { get; set; }
        public int? star { get; set; }
        public string remark { get; set; }
        public M_Image imageObj { get; set; }
    }
}
