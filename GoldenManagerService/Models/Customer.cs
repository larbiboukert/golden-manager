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
        public decimal? TotalSales => Sales?.Sum(s => s.Total);
        public List<CustomerPayment> CustomerPayments { get; set; }
        public float? TotalPayedGold => CustomerPayments?.Sum(cp => cp.Grams);
        public decimal? TotalPayedMoney => CustomerPayments?.Sum(cp => cp.Money);
    }
}
