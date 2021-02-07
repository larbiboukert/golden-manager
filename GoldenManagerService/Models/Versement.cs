using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenManagerService.Models
{
    public class Versement
    {
        public int ID { get; set; }
        public string Reference { get; set; }
        public DateTime Date { get; set; }
        public float VersementOr { get; set; }
        public decimal VersementArgent { get; set; }
    }
}
