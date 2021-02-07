namespace GoldenManagerService.Models
{
    public class ProduitCasse : Produit
    {
        public VersementFournisseur VersementFournisseur { get; set; }
        public PvLaboratoire PvLaboratoire { get; set; }
    }
}
