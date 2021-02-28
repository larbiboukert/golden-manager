using System.Collections.Generic;
using System.Linq;

namespace GoldenManagerService.Models
{
    public class Customer
    {
        public int ID { get; set; }
        public string Reference => $"{Name}_{City}_{State}";
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public List<Sale> Sales { get; set; }
        public decimal? TotalMoneySold => Sales?.Sum(s => s.TotalMoney);
        public float? TotalGoldSold => Sales?.Sum(s => s.TotalGrams);
        public List<CustomerPayment> CustomerPayments { get; set; }
        public decimal? TotalPayedMoney => CustomerPayments?.Sum(cp => cp.Money);
        public float? TotalPayedGold => CustomerPayments?.Sum(cp => cp.Grams);
        public decimal? TotalMoneyCredit => TotalMoneySold - TotalPayedMoney;
        public float? TotalGoldCredit => TotalGoldSold - TotalPayedGold;
        public List<LaboratoryReport> LaboratoryReports { get; set; }
        public float? TotalGap => LaboratoryReports?.Sum(r => r.Gap);
    }
}
