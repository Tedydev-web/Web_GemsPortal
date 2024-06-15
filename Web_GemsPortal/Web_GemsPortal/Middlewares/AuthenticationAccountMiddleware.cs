using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Web_GemsPortal.Services;
using System;
using System.Linq;
using System.Threading.Tasks;
using static System.String;

namespace Web_GemsPortal.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class AuthenticationAccountMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IS_Person _s_Person;

        public AuthenticationAccountMiddleware(RequestDelegate next, IS_Person person)
        {
            _next = next;
            _s_Person = person;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                var controller = httpContext.Request.RouteValues["controller"];
                if (controller != null && controller.ToString() != "Error")
                {
                    if (httpContext.User.Identity.IsAuthenticated)
                    {
                        var timeout = ExtensionMethods.ClaimsExtensionMethod.GetClaim(httpContext, "TimeCheck");
                        string time = !IsNullOrEmpty(timeout) ? timeout : "0";
                        Int32 now = (Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
                        if (now > Convert.ToInt32(time))
                        {
                            //Each 10 minutes check account active
                            var accessToken = httpContext.User.Claims.FirstOrDefault(c => c.Type == "AccessToken")?.Value;
                            var getInfoUser = await _s_Person.getHubPersonByIdStatus(accessToken);
                            if (getInfoUser.result == 1 && getInfoUser.data != null)
                            {
                                if (getInfoUser.data.accountObj?.status == 1)
                                    await ExtensionMethods.ClaimsExtensionMethod.AddUpdateClaimAsync(httpContext, "TimeCheck", ((Int32)DateTime.UtcNow.AddMinutes(10).Subtract(new DateTime(1970, 1, 1)).TotalSeconds).ToString());
                                else
                                    httpContext.Response.Redirect("/account/logout");
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
                httpContext.Response.Redirect("/error/500");
            }
            await _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class AuthenticationAccountMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuthenticationAccountMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthenticationAccountMiddleware>();
        }
    }
}
