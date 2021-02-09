namespace GoldenManagerService.Models
{
    public class Produit
    {
        public int ID { get; set; }
        public string Reference =>
            $"{Article.Reference}";
        public Article Article { get; set; }
        public float Grammes { get; set; }
        public decimal PrixUnitaire { get; set; }
    }
}