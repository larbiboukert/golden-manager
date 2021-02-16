using System;
using System.Collections.Generic;

namespace GoldenManagerService.Models
{
    public class Supply
    {
        public int ID { get; set; }
        public string Reference => $"OPERATION_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
        public List<Product> Products { get; set; }
    }
}
