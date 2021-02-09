namespace GoldenManagerService.Models
{
    public class Produit
    {
        public int ID { get; set; }
        public string Reference =>
            $"{Article.Reference}_{(Achat != null ? Achat.Reference : AchatCasse.Reference)}";
        public Article Article { get; set; }
        public float Grammes { get; set; }
        public decimal PrixUnitaire { get; set; }
        public Achat Achat { get; set; }
        public Vente Vente { get; set; }
        public AchatCasse AchatCasse { get; set; }
        public PvLaboratoire PvLaboratoire { get; set; }
    }
}