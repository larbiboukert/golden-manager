using System;

namespace GoldenManagerService.Models
{
    public class AchatAnonyme
    {
        public int ID { get; set; }
        public string Reference => $"ACHATANONYME_{ID}_{Date.Date}";
        public DateTime Date  { get; set; }
    }
}
