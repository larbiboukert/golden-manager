namespace GoldenManagerService.Models
{
    public class SupplierPaymentProduct
    {
        public int ID { get; set; }
        public float Grams { get; set; }
        public Customer Customer { get; set; }
        public float PayedGold { get; set; }
        public float Melting { get; set; }
        public int Fineness { get; set; }
        public float Net750 => (PayedGold - Melting) * Fineness / 750;
        public float Gap => PayedGold - Net750;
    }
}
