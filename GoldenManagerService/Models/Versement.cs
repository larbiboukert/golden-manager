using System;

namespace GoldenManagerService.Models
{
    public class Versement
    {
        public int ID { get; set; }
        public string Reference => $"{this.GetType().Name.ToUpper()}_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
        public decimal VersementArgent { get; set; }
    }
}
