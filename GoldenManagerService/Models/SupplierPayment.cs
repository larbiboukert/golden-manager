using System;
using System.Collections.Generic;

namespace GoldenManagerService.Models
{
    public class SupplierPayment
    {
        public int ID { get; set; }
        public string Reference => $"VERSEMENT_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
        public List<SupplierPaymentProduct> SupplierPaymentProducts { get; set; }
    }
}
