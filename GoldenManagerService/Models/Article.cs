namespace GoldenManagerService.Models
{
    public class Article
    {
        public int ID { get; set; }
        public string Reference => $"ARTICLE_{ID}_{Name}_{Label}";
        public string Name { get; set; }
        public string Label { get; set; }
        public string Family { get; set; }
        public string Designation { get; set; }
    }
}
