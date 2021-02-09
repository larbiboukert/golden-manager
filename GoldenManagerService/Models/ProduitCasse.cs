namespace GoldenManagerService.Models
{
    public class ProduitCasse : Produit
    {
        public float OrVerse { get; set; }
        public float Fonte { get; set; }
        public float Titre { get; set; }
        public float Net750 => (OrVerse - Fonte) * Titre / 750;
        public float Ecart => OrVerse - Net750;
        public VersementFournisseur VersementFournisseur { get; set; }
    }
}
