using System;
using System.Collections.Generic;

namespace GoldenManagerService.Models
{
    public class Payment
    {
        public int ID { get; set; }
        public string Reference => $"VERSEMENT_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
        public decimal Money { get; set; }
        public Stakeholder Stakeholder { get; set; }
        public List<Product> Produits { get; set; }
    }
}
