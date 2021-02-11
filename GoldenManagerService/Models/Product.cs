namespace GoldenManagerService.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string Reference => $"{Article.Reference}_{UnitPrice}";
        public Article Article { get; set; }
        public float Grams { get; set; }
        public decimal UnitPrice { get; set; }
        public float PayedGold { get; set; }
        public float Melting { get; set; }
        public float Fineness { get; set; }
        public float Net750 => (PayedGold - Melting) * Fineness / 750;
        public float Gap => PayedGold - Net750;
    }
}