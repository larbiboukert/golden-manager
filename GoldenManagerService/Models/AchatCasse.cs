using System;

namespace GoldenManagerService.Models
{
    public class AchatCasse
    {
        public int ID { get; set; }
        public string Reference => $"ACHATCASSE_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
        public string Designation { get; set; }
    }
}
