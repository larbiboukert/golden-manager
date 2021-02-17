using System.Collections.Generic;
using System.Linq;

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
        public decimal? TotalSupplies => Supplies?.Sum(s => s.Total);
        public List<SupplierPayment> SupplierPayments { get; set; }
        public float? TotalPayedGold => SupplierPayments?.Sum(cp => cp.Grams);
        public decimal? TotalPayedMoney => SupplierPayments?.Sum(cp => cp.Money);
    }
}
