using System;
using System.Collections.Generic;
using System.Linq;

namespace GoldenManagerService.Models
{
    public class Achat : Operation
    {
        public Fournisseur Fournisseur { get; set; }
    }
}
