namespace GoldenManagerService.Models
{
    public class PartiePrenante
    {
        public int ID { get; set; }
        public string Reference => $"{this.GetType().Name.ToUpper()}_{ID}";
        public string Nom { get; set; }
        public string Telephone { get; set; }
        public string Ville { get; set; }
        public string Willaya { get; set; }
    }
}
