namespace GoldenManagerService.Models
{
    public class Product
    {
        public int ID { get; set; }
        public string Reference => $"{Article.Reference}_{UnitPrice}DA";
        public Article Article { get; set; }
        public float Grams { get; set; }
        public decimal UnitPrice { get; set; }
    }
}