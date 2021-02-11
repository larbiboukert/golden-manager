﻿using System;
using System.Collections.Generic;

namespace GoldenManagerService.Models
{
    public class Operation
    {
        public int ID { get; set; }
        public string Reference => $"OPERATION_{ID}_{Date.Date}";
        public DateTime Date { get; set; }
        public Stakeholder Stakeholder { get; set; }
        public List<Product> Produits { get; set; }
    }
}
