using Web_GemsPortal.Models;
using System.Collections.Generic;

namespace Web_GemsPortal.ViewModels.Product
{
    public class VM_ProductList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameSlug { get; set; }
        public string ImageUrl { get; set; }
        public string SummaryInfo { get; set; }
        public int Price { get; set; } = 0;
        public int Discount { get; set; } = 0;
        public List<M_ProductPrice> productPriceObjs { get; set; }
    }
}
