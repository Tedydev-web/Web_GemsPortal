using Web_GemsPortal.AutoMapper;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Middlewares;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.HttpOverrides;
using System.Net;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

void GetDefaultHttpClient(IServiceProvider serviceProvider, HttpClient httpClient, string hostUri)
{
    if (!string.IsNullOrEmpty(hostUri))
        httpClient.BaseAddress = new Uri(hostUri);
    //client.DefaultRequestHeaders.CacheControl = new CacheControlHeaderValue { NoCache = true };
    httpClient.Timeout = TimeSpan.FromMinutes(1);
    httpClient.DefaultRequestHeaders.Clear();
    httpClient.DefaultRequestHeaders.Add("Accept", "text/html,application/xhtml+xml+json");
    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
}

HttpClientHandler GetDefaultHttpClientHandler()
{
    return new HttpClientHandler
    {
        AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate,
        UseCookies = false,
        AllowAutoRedirect = false,
        UseDefaultCredentials = true,
        //ClientCertificateOptions = ClientCertificateOption.Manual, //No check SSL host
        //ServerCertificateCustomValidationCallback = (httpRequestMessage, cert, cetChain, policyErrors) => true, //No check SSL host
    };
}

// Add builder.Services to the container.
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
    options.Cookie = new CookieBuilder
    {
        //Domain = "ocop247.vn", //Releases in active
        Name = "Authentication",
        HttpOnly = true,
        Path = "/",
        SameSite = SameSiteMode.Lax,
        SecurePolicy = CookieSecurePolicy.Always
    };
    options.LoginPath = new PathString("/account/signin");
    options.LogoutPath = new PathString("/account/signout");
    options.AccessDeniedPath = new PathString("/error/403");
    options.SlidingExpiration = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddSession(options =>
{
    //options.Cookie.Domain = "ocop247.vn"; //Releases in active
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.SameSite = SameSiteMode.Lax;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.IsEssential = true;
    options.Cookie.HttpOnly = true;
});
builder.Services.AddAutoMapper(typeof(AutoMapperProfile).Assembly); //Init auto mappper
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

builder.Services.AddHttpClient("base")
    .ConfigureHttpClient((serviceProvider, httpClient) => GetDefaultHttpClient(serviceProvider, httpClient, builder.Configuration.GetSection("ApiSettings:UrlApi").Value))
    .SetHandlerLifetime(TimeSpan.FromMinutes(5)) //Default is 2 min
    .ConfigurePrimaryHttpMessageHandler(x => GetDefaultHttpClientHandler());

builder.Services.AddHttpClient("custom")
    .ConfigureHttpClient((serviceProvider, httpClient) => GetDefaultHttpClient(serviceProvider, httpClient, string.Empty))
    .SetHandlerLifetime(TimeSpan.FromMinutes(5)) //Default is 2 min
    .ConfigurePrimaryHttpMessageHandler(x => GetDefaultHttpClientHandler());

builder.Services.AddSingleton<IBase_CallApi, Base_CallApi>();
builder.Services.AddSingleton<ICallBaseApi, CallBaseApi>();
builder.Services.AddSingleton<ICallExternalApi, CallExternalApi>();
builder.Services.AddSingleton<ICallApi, CallApi>();
builder.Services.AddSingleton<IS_Image, S_Image>();
builder.Services.AddSingleton<IS_Address, S_Address>();
builder.Services.AddSingleton<IS_Account, S_Account>();
builder.Services.AddSingleton<IS_BankPerson, S_BankPerson>();
builder.Services.AddSingleton<IS_BankSupplier, S_BankSupplier>();
builder.Services.AddSingleton<IS_Banner, S_Banner>();
builder.Services.AddSingleton<IS_Category, S_Category>();
builder.Services.AddSingleton<IS_ConfigHome, S_ConfigHome>();
builder.Services.AddSingleton<IS_Contact, S_Contact>();
builder.Services.AddSingleton<IS_ContactType, S_ContactType>();
builder.Services.AddSingleton<IS_CustomerTestimonial, S_CustomerTestimonial>();
builder.Services.AddSingleton<IS_DeliveryAddress, S_DeliveryAddress>();
builder.Services.AddSingleton<IS_News, S_News>();
builder.Services.AddSingleton<IS_NewsCategory, S_NewsCategory>();
builder.Services.AddSingleton<IS_Order, S_Order>();
builder.Services.AddSingleton<IS_OrderItem, S_OrderItem>();
builder.Services.AddSingleton<IS_OrderImage, S_OrderImage>();
builder.Services.AddSingleton<IS_PartnerList, S_PartnerList>();
builder.Services.AddSingleton<IS_PackingForm, S_PackingForm>();
builder.Services.AddSingleton<IS_Payment, S_Payment>();
builder.Services.AddSingleton<IS_Person, S_Person>();
builder.Services.AddSingleton<IS_PersonPoint, S_PersonPoint>();
builder.Services.AddSingleton<IS_PointLevel, S_PointLevel>();
builder.Services.AddSingleton<IS_Post, S_Post>();
builder.Services.AddSingleton<IS_Product, S_Product>();
builder.Services.AddSingleton<IS_PropertyFilter, S_PropertyFilter>();
builder.Services.AddSingleton<IS_Reason, S_Reason>();
builder.Services.AddSingleton<IS_RegisterContact, S_RegisterContact>();
builder.Services.AddSingleton<IS_RegisterCourse, S_RegisterCourse>();
builder.Services.AddSingleton<IS_ShoppingCart, S_ShoppingCart>();
builder.Services.AddSingleton<IS_Supplier, S_Supplier>();
builder.Services.AddSingleton<IS_SupplierModel, S_SupplierModel>();
builder.Services.AddSingleton<IS_ShoppingCartItem, S_ShoppingCartItem>();
builder.Services.AddSingleton<IS_TradeMark, S_TradeMark>();
builder.Services.AddSingleton<IS_Unit, S_Unit>();
builder.Services.AddSingleton<IS_Utilities, S_Utilities>();
builder.Services.AddSingleton<IS_VertifyPhone, S_VertifyPhone>();
builder.Services.AddSingleton<IS_GHTK, S_GHTK>();
builder.Services.AddSingleton<IS_GHN, S_GHN>();
builder.Services.AddSingleton<IS_SupplierCarrier, S_SupplierCarrier>();

builder.Services.AddSingleton<IS_Promotion, S_Promotion>();
builder.Services.AddSingleton<IS_PromotionApply, S_PromotionApply>();
builder.Services.AddSingleton<IS_SupplierOrderDiscount, S_SupplierOrderDiscount>();
builder.Services.AddSingleton<IS_OrderComment, S_OrderComment>();

builder.Services.AddSingleton<IS_GoogleReCAPTCHA, S_GoogleReCAPTCHA>();

builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages().AddRazorRuntimeCompilation();
builder.Services.Configure<Config_MetaSEO>(builder.Configuration.GetSection("MetaSEO"));
builder.Services.Configure<Config_ApiSettings>(builder.Configuration.GetSection("ApiSettings"));
builder.Services.Configure<Config_TokenUploadFile>(builder.Configuration.GetSection("TokenUploadFile"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseStatusCodePagesWithReExecute("/error/{0}");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseForwardedHeaders(new ForwardedHeadersOptions
    {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor,

        // IIS is also tagging a X-Forwarded-For header on, so we need to increase this limit, 
        // otherwise the X-Forwarded-For we are passing along from the browser will be ignored
        ForwardLimit = 2
    });

    app.UseDeveloperExceptionPage();
}

app.UseMiddleware<SecurityHeadersMiddleware>(); //App config security header

app.UseHttpsRedirection();
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        const int durationInSeconds = 7 * 60 * 60 * 24; //7 days
        ctx.Context.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.CacheControl] =
                "public,max-age=" + durationInSeconds;
    }
});

app.UseRouting();
app.UseCookiePolicy();

app.UseAuthentication(); //Authen of Microsoft signin session
app.UseAuthorization();
app.UseMiddleware<AuthenticationAccountMiddleware>();
app.UseSession();

app.UseEndpoints(endpoints =>
{
    #region About
    endpoints.MapControllerRoute(
    name: "About",
    pattern: "gioi-thieu",
    defaults: new { controller = "About", action = "Index" });

    endpoints.MapControllerRoute(
    name: "DetailAbout",
    pattern: "gioi-thieu/{nameSlug}-{id}",
    defaults: new { controller = "About", action = "ViewDetail" });
    #endregion
    #region Quality
    endpoints.MapControllerRoute(
    name: "Quality",
    pattern: "chung-nhan",
    defaults: new { controller = "Quality", action = "Index" });

    endpoints.MapControllerRoute(
    name: "Quality",
    pattern: "chung-nhan/{nameSlug}-{id}",
    defaults: new { controller = "Quality", action = "ViewDetail" });
    #endregion

    #region Product
    endpoints.MapControllerRoute(
    name: "Product List",
    pattern: "san-pham",
    defaults: new { controller = "Product", action = "Index" });

    endpoints.MapControllerRoute(
    name: "Product Detail",
    pattern: "san-pham/{nameSlug}-{id}",
    defaults: new { controller = "Product", action = "ViewDetail" });
    #endregion

    #region Member
    endpoints.MapControllerRoute(
    name: "Member List",
    pattern: "thanh-vien",
    defaults: new { controller = "Member", action = "Index" });

    endpoints.MapControllerRoute(
    name: "Member Detail",
    pattern: "npp/{identity}",
    defaults: new { controller = "Member", action = "ViewDetail" });

    endpoints.MapControllerRoute(
    name: "Member Register",
    pattern: "dang-ky-thanh-vien",
    defaults: new { controller = "MemberRegister", action = "Index" });

    endpoints.MapControllerRoute(
    name: "Supplier",
    pattern: "trang-thanh-vien",
    defaults: new { controller = "Supplier", action = "Index" });
    #endregion

    #region Training
    endpoints.MapControllerRoute(
    name: "Training",
    pattern: "dao-tao",
    defaults: new { controller = "Training", action = "Index" });

    endpoints.MapControllerRoute(
    name: "Training Detail",
    pattern: "dao-tao/{nameSlug}-{id}",
    defaults: new { controller = "Training", action = "ViewDetail" });
    #endregion
    
    #region Consulting
    endpoints.MapControllerRoute(
    name: "Consulting",
    pattern: "tu-van",
    defaults: new { controller = "Consulting", action = "Index" });

    endpoints.MapControllerRoute(
    name: "Consulting Detail",
    pattern: "tu-van/{nameSlug}-{id}",
    defaults: new { controller = "Consulting", action = "ViewDetail" });
    #endregion

    #region News
    endpoints.MapControllerRoute(
    name: "News",
    pattern: "tin-tuc",
    defaults: new { controller = "News", action = "Index" });

    endpoints.MapControllerRoute(
    name: "DetailNews",
    pattern: "tin-tuc/{nameSlug}-{id}",
    defaults: new { controller = "News", action = "ViewDetail" });
    #endregion

    #region Account
    endpoints.MapControllerRoute(
     name: "Account forgot password",
     pattern: "account/forgot-password",
     defaults: new { controller = "Account", action = "ForgotPassword" });
    endpoints.MapControllerRoute(
     name: "Account addressList",
     pattern: "account/address",
     defaults: new { controller = "Address", action = "Index" });
    endpoints.MapControllerRoute(
     name: "Account profile",
     pattern: "account/profile",
     defaults: new { controller = "Account", action = "Profile" });
    endpoints.MapControllerRoute(
     name: "Account signin",
     pattern: "account/signin",
     defaults: new { controller = "Account", action = "SignIn" });
    endpoints.MapControllerRoute(
     name: "Account signout",
     pattern: "account/signout/{autoLogout}",
     defaults: new { controller = "Account", action = "SignOut" });
    endpoints.MapControllerRoute(
     name: "Account register",
     pattern: "account/register",
     defaults: new { controller = "Account", action = "Register" });
    #endregion

    #region Checkout
    endpoints.MapControllerRoute(
    name: "Checkout cart",
    pattern: "checkout/cart",
    defaults: new { controller = "Checkout", action = "Cart" });
    endpoints.MapControllerRoute(
    name: "Checkout payment",
    pattern: "checkout/payment",
    defaults: new { controller = "Checkout", action = "Payment" });
    #endregion

    #region Order
    endpoints.MapControllerRoute(
    name: "Order view",
    pattern: "order/view/{id?}",
    defaults: new { controller = "Order", action = "Views" });
    #endregion
    
    endpoints.MapControllerRoute(
    name: "Promotion",
    pattern: "uu-dai",
    defaults: new { controller = "Promotion", action = "Index" });
    
    endpoints.MapControllerRoute(
    name: "Contact",
    pattern: "lien-he",
    defaults: new { controller = "Contact", action = "Index" });

    endpoints.MapControllerRoute(
     name: "Contact-Success",
     pattern: "lien-he/thanh-cong",
     defaults: new { controller = "Contact", action = "Success" });
    
    endpoints.MapControllerRoute(
     name: "PromotionApply",
     pattern: "colection-voucher-coupon",
     defaults: new { controller = "PromotionApply", action = "Index" });

    endpoints.MapControllerRoute(
        name: "Error",
        pattern: "expired-domain",
        defaults: new { controller = "Error", action = "ExpiredDomain" });
    endpoints.MapControllerRoute(
        name: "Error",
        pattern: "error/{statusCode}",
        defaults: new { controller = "Error", action = "Index" });
    endpoints.MapControllerRoute(
        name: "policy",
        pattern: "policy/{path}",
        defaults: new { controller = "Home", action = "Policy" });
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});

app.Run();
