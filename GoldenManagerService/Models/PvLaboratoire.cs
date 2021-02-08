namespace GoldenManagerService.Models
{
    public class PvLaboratoire
    {
        public int ID { get; set; }
        public string Reference => $"PVLABORATOIRE_{ID}";
        public float OrVerse { get; set; }
        public float Fonte { get; set; }
        public float Titre { get; set; }
        public float Net750 => (OrVerse - Fonte) * Titre / 750;
        public float Ecart => OrVerse - Net750;
    }
}
