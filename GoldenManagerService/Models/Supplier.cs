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
        public decimal? TotalMoneySupplied => Supplies?.Sum(s => s.TotalMoney);
        public float? TotalGoldSupplied => Supplies?.Sum(s => s.TotalGrams);
        public List<SupplierPayment> SupplierPayments { get; set; }
        public float? TotalSuppliedGold => SupplierPayments?.Sum(cp => cp.Grams);
        public decimal? TotalSuppliedMoney => SupplierPayments?.Sum(cp => cp.Money);
        public decimal? TotalMoneyCredit => TotalMoneySupplied - TotalSuppliedMoney;
        public float? TotalGoldCredit => TotalGoldSupplied - TotalSuppliedGold;
        public float? TotalGap => SupplierPayments?.Sum(p => p.LaboratoryReports?.Sum(r => r.Gap));
    }
}
