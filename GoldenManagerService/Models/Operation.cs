using System;

namespace GoldenManagerService.Models
{
    public class Operation
    {
        public int ID { get; set; }
        public string Reference => $"{this.GetType().Name.ToUpper()}_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
    }
}
