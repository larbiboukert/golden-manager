namespace GoldenManagerService.Models
{
    public class Article
    {
        public int ID { get; set; }
        public string Reference => $"ARTICLE_{ID}";
        public string Nom { get; set; }
        public string NomReference { get; set; }
        public string Famille { get; set; }
        public string Designation { get; set; }
    }
}
