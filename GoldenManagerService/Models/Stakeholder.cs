using System.Collections.Generic;

namespace GoldenManagerService.Models
{
    public class Stakeholder
    {
        public int ID { get; set; }
        public string Reference =>
            $"{Type.ToString().ToUpper()}_{Name}_{City}_{State}";
        public StakeholderType Type { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public List<Operation> Operations { get; set; }
        public List<Payment> Payments { get; set; }
    }
    public enum StakeholderType
    {
        Fournisseur, Client, Anonyme
    }
}
