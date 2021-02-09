using System.Collections.Generic;

namespace GoldenManagerService.Models
{
    public class VersementFournisseur : Versement
    {
        public Fournisseur Fournisseur { get; set; }
    }
}
