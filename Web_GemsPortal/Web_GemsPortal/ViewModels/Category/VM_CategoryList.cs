using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Web_GemsPortal.Models.M_Category;

namespace Web_GemsPortal.ViewModels
{
    public class VM_CategoryList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameSlug { get; set; }
        //public List<M_ChildMenu> childMenu { get; set; }
    }
}
