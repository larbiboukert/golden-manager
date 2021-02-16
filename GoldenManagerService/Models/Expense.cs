using System;

namespace GoldenManagerService.Models
{
    public class Expense
    {
        public int ID { get; set; }
        public string Reference => $"CHARGE_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
        public decimal Money { get; set; }
        public string Designation { get; set; }
    }
}
