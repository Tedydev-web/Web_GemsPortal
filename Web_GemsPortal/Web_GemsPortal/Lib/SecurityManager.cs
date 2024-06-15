using Microsoft.AspNetCore.Authentication;
using Web_GemsPortal.Models;
using System.Security.Claims;

namespace Web_GemsPortal.Lib
{
    public class SecurityManager
    {
        private IEnumerable<Claim> getUserClaims(M_AccountSecurity account)
        {
            return new List<Claim>()
            {
                new Claim("AccountId", account.AccountId),
                new Claim("UserId", account.UserId),
                new Claim(ClaimTypes.NameIdentifier, account.UserName),
                new Claim(ClaimTypes.Name, account.Name),
                new Claim("Password", account.Password),
                new Claim("Avatar", account.Avatar),
                new Claim("AccessToken", account.AccessToken),
                new Claim("ShoppingCartId", account.ShoppingCartId.ToString())
            }; ;
        }
        public async void SignIn(HttpContext httpContext, M_AccountSecurity account, string scheme)
        {
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(getUserClaims(account), scheme);
            ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
            await httpContext.SignInAsync(
                scheme: scheme,
                principal: claimsPrincipal,
                properties: new AuthenticationProperties
                {
                    IsPersistent = account.StayLoggedIn,
                    ExpiresUtc = DateTime.Now.AddMinutes(account.TimeOut)
                });
        }
        public async void SignOut(HttpContext httpContext, string scheme)
        {
            if (httpContext.Request.Cookies.Count > 0)
            {
                var siteCookies = httpContext.Request.Cookies.Where(c => c.Key.Contains("Authentication") || c.Key.Contains("Microsoft.Authentication"));
                foreach (var cookie in siteCookies)
                    httpContext.Response.Cookies.Delete(cookie.Key);
                //foreach (var cookie in httpContext.Request.Cookies.Keys)
                //    httpContext.Response.Cookies.Delete(cookie);
            }
            await httpContext.SignOutAsync(scheme);
            httpContext.Session.Clear();
            httpContext.Request.Headers.Remove("Authorization");
        }
    }
}
