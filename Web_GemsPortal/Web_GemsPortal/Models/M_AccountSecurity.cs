namespace Web_GemsPortal.Models
{
    public class M_AccountSecurity
    {
        public string AccountId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string AccessToken { get; set; }
        public string ShoppingCartId { get; set; }
        public string Avatar { get; set; }
        public string Role { get; set; }
        public bool StayLoggedIn { get; set; }
        public int TimeOut { get; set; } = 30;
    }
}
