namespace GoldenManagerService.Models
{
    public class ProduitNeuf : Produit
    {
        public Achat Achat { get; set; }
        public Vente Vente { get; set; }
    }
}
