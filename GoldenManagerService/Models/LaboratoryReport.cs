namespace GoldenManagerService.Models
{
    public class LaboratoryReport
    {
        public int ID { get; set; }
        public float PayedGold { get; set; }
        public float Melting { get; set; }
        public int Fineness { get; set; }
        public float Net750 => (PayedGold - Melting) * Fineness / 750;
        public float Gap => PayedGold - Net750;
        public Customer Customer { get; set; }
    }
}
