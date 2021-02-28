using System;
using System.Collections.Generic;
using System.Linq;

namespace GoldenManagerService.Models
{
    public class Sale
    {
        public int ID { get; set; }
        public string Reference => $"VENTE{ID}_{Date:dd_MM_yyyy}";
        public DateTime Date { get; set; }
        public List<Product> Products { get; set; }
        public float TotalGrams => Products.Sum(p => p.Grams);
        public decimal TotalMoney => Products.Sum(p => p.UnitPrice * (decimal)p.Grams);
    }
}
