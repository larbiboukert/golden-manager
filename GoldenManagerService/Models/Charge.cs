using System;

namespace GoldenManagerService.Models
{
    public class Charge
    {
        public int Id { get; set; }
        public string Reference { get; set; }
        public DateTime Date { get; set; }
        public string Designation { get; set; }
        public decimal Montant { get; set; }
    }
}
