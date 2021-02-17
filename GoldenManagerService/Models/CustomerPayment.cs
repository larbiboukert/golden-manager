using System;

namespace GoldenManagerService.Models
{
    public class CustomerPayment
    {
        public int ID { get; set; }
        public string Reference => $"VERSEMENT_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
        public decimal Money { get; set; }
        public float Grams { get; set; }
    }
}
