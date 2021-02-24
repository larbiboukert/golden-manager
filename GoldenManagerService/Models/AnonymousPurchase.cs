using System;

namespace GoldenManagerService.Models
{
    public class AnonymousPurchase
    {
        public int ID { get; set; }
        public string Reference => $"ACHAT_ANONYME_{Fineness}_{Date.Date}";
        public DateTime Date { get; set; }
        public int Fineness { get; set; }
        public decimal Money { get; set; }
        public float Grams { get; set; }
        public string Designation { get; set; }
    }
}
