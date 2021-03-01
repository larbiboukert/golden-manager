namespace GoldenManagerService.Models
{
    public class LaboratoryReport
    {
        public int ID { get; set; }
        public float PayedGold { get; set; }
        public float Melting { get; set; }
        public int Fineness { get; set; }
        public float? Net => (PayedGold - Melting) * Fineness / SupplierPayment.Fineness;
        public float? Gap => PayedGold - Net;
        public Customer Customer { get; set; }
        public SupplierPayment SupplierPayment { get; set; }
    }
}
