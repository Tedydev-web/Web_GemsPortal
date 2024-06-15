using System;
using System.Collections.Generic;

namespace Web_GemsPortal.ViewModels
{
    public static class VM_PriceList
    {
        public static List<PriceObj> PriceData = new List<PriceObj>()
        {
            new PriceObj
            {
                id = 1,
                name = "Dưới 500.000đ",
                fPrice = 0,
                tPrice = 500000
            },
            new PriceObj
            {
                id = 2,
                name = "500.000đ đến 1.000.000đ",
                fPrice = 500000,
                tPrice = 1000000
            },
            new PriceObj
            {
                id = 3,
                name = "1.000.000đ đến 2.000.000đ",
                fPrice = 1000000,
                tPrice = 2000000
            },
            new PriceObj
            {
                id = 4,
                name = "Trên 2.000.000đ",
                fPrice = 2000000,
                tPrice = 0
            }
        };

        public class PriceObj
        {
            public int id { get; set; } = 0;
            public string name { get; set; }
            public int fPrice { get; set; } = 0;
            public int tPrice { get; set; } = 0;
        }
    }
}
