using System;

namespace GoldenManagerService.Models
{
    public class Charge
    {
        public int ID { get; set; }
        public string Reference => $"CHARGE_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
        public string Designation { get; set; }
        public decimal Montant { get; set; }
    }
}
