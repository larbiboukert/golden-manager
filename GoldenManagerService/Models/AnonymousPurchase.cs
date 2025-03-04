﻿using System;

namespace GoldenManagerService.Models
{
    public class AnonymousPurchase
    {
        public int ID { get; set; }
        public string Reference => $"ACHAT_ANONYME_{Fineness}_{Date:dd_MM_yyyy}";
        public DateTime Date { get; set; }
        public int Fineness { get; set; }
        public decimal UnitPrice { get; set; }
        public float Grams { get; set; }
        public decimal Total => UnitPrice * (decimal)Grams;
    }
}
