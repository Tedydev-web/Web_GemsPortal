using Web_GemsPortal.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web_GemsPortal.ViewModels.Category
{
    public class VM_CategoryDetail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameSlug { get; set; }
        public string ImageUrl { get; set; }
        public List<VM_ImageObj> ImageListObj { get; set; }
        public string Detail { get; set; }
    }
}
