using System;

namespace GoldenManagerService.Models
{
    public class CustomerPayment
    {
        public int ID { get; set; }
        public string Reference => $"VERSEMENT{ID}_{Date:dd_MM_yyyy}";
        public DateTime Date { get; set; }
        public decimal Money { get; set; }
        public float Grams { get; set; }
        public int Fineness { get; set; }
    }
}
