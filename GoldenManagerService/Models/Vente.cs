using System;
using System.Collections.Generic;
using System.Linq;

namespace GoldenManagerService.Models
{
    public class Vente : Operation
    {
        public Client Client { get; set; }
    }
}
