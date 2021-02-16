using System.Collections.Generic;

namespace GoldenManagerService.Models
{
    public class Supplier
    {
        public int ID { get; set; }
        public string Reference => $"{Name}_{City}_{State}";
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public List<Supply> Supplies { get; set; }
        public List<SupplierPayment> SupplierPayments { get; set; }
    }
}
