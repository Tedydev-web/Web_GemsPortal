using Web_GemsPortal.EditModels.Account;
using Web_GemsPortal.ExtensionMethods;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.Services;
using Web_GemsPortal.ViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static System.String;

namespace Web_GemsPortal.Controllers
{
    public class AccountController : BaseController<AccountController>
    {
        private readonly IS_Account _s_Account;
        private readonly IS_Person _s_Person;
        private readonly IS_VertifyPhone _s_VertifyPhone;
        private readonly IS_PointLevel _s_PointLevel;
        private readonly IS_PersonPoint _s_PersonPoint;
        //private readonly IRecaptchaService _recaptcha;
        //private readonly double _minimumScore;
        //private readonly string _errorMessage;
        private readonly SecurityManager _securityManager = new SecurityManager();

        public AccountController(IS_Account account, IS_Person person, IS_VertifyPhone vertifyPhone, IS_PointLevel pointLevel, IS_PersonPoint personPoint)
        {
            _s_Account = account;
            _s_Person = person;
            _s_VertifyPhone = vertifyPhone;
            _s_PointLevel = pointLevel;
            _s_PersonPoint = personPoint;
            //_recaptcha = recaptcha;
            //_minimumScore = 0.5;
            //_errorMessage = "Đã xảy ra lỗi khi xác thực Google Recaptcha. Vui lòng thử lại!";
        }

        #region Login
        private async Task<ResponseData<M_LoginHub>> LoginFunc(EM_Login model, int timeOut = 30)
        {
            var res = await _s_Account.LoginHub(model, timeOut);
            if (res.result != 1 || res.data == null) return res;
            //SignIn success
            M_AccountSecurity account = new M_AccountSecurity()
            {
                AccountId = res.data.id.ToString(),
                UserId = res.data.personId?.ToString(),
                ShoppingCartId = res.data.shoppingCartId?.ToString(),
                Name = res.data.personObj?.lastname + " " + res.data.personObj?.firstname,
                UserName = model.UserName,
                Password = Encryptor.Encrypt(model.Password),
                Avatar = IsNullOrEmpty(res.data.imageObj?.smallUrl) ? "" : res.data.imageObj?.smallUrl,
                AccessToken = res.data.access_token,
                StayLoggedIn = model.StayLoggedIn,
                TimeOut = timeOut
            };
            _securityManager.SignIn(this.HttpContext, account, CookieAuthenticationDefaults.AuthenticationScheme);
            return res;
        }

        [HttpGet, AllowAnonymous]
        public IActionResult SignIn(string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
                return IsNullOrEmpty(returnUrl) ? Redirect("/") : Redirect(returnUrl);

            var siteCookies = _httpContextAccessor.HttpContext.Request.Cookies.Where(c => c.Key.Contains("Authentication") || c.Key.Contains("Microsoft.Authentication"));
            foreach (var cookie in siteCookies)
                _httpContextAccessor.HttpContext.Response.Cookies.Delete(cookie.Key);
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new VM_ViewDataSEO
            {
                Keywords = "Đăng nhập | GEMS GROUP",
                Title = "Đăng nhập | GEMS GROUP",
                Description = "Đăng nhập | GEMS GROUP",
            });
            return View();
        }

        [HttpPost, AllowAnonymous, ValidateAntiForgeryToken]
        public async Task<JsonResult> SignIn(EM_Login model, string returnUrl)
        {
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(this));
                return Json(jResult);
            }

            //Check is stayLogin, if true set time 30 days
            int timeOut = model.StayLoggedIn ? 60 * 24 * 30 : 120;
            var res = await LoginFunc(model, timeOut);
            if (res.result != 1 || res.data == null)
                return Json(jResult.MapData(res));
            return Json(jResult.MapData(res, returnUrl));
        }

        public IActionResult SignOut(string returnUrl, string autoLogout)
        {
            _securityManager.SignOut(this.HttpContext, CookieAuthenticationDefaults.AuthenticationScheme);

            //Auto logout when other user login
            //if (autoLogout != null)
            //{
            //    TempData["AutoLogoutMessage"] = "Tài khoản của bạn vừa được truy cập ở một nơi khác!";
            //}
            if (!IsNullOrEmpty(returnUrl))
                return Redirect($"/account/signin?returnUrl={returnUrl}");
            return Redirect("/account/signin");
        }

        [HttpPost, Authorize]
        public async Task<JsonResult> SignOutJs()
        {
            M_JResult jResult = new M_JResult();
            try
            {
                //Check expiredTime ~ isStayLogin
                var expirecTime = ClaimsExtensionMethod.GetClaim(_httpContextAccessor, "ExpiredTime");
                string time = !IsNullOrEmpty(expirecTime) ? expirecTime : "0";
                long now = Utilities.DateTimeToLong(DateTime.UtcNow.AddHours(7));
                if (now > Convert.ToInt32(time))
                    return Json(jResult);

                //Get username password
                EM_Login model = new EM_Login
                {
                    UserName = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                    Password = Encryptor.Decrypt(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Password")?.Value),
                };

                var res = await _s_Account.LoginHub(model, 30);
                if (res.result == 1 || res.data != null)
                    await ClaimsExtensionMethod.AddUpdateClaimAsync(_httpContextAccessor, "AccessToken", res.data.access_token);
                jResult.result = res.result;
                jResult.error = res.error;
            }
            catch (Exception ex)
            {
                jResult.result = -1;
                jResult.error = new error(0, $"Exception: {ex.Message}");
            }
            return Json(jResult);
        }
        #endregion

        #region Register
        [HttpGet, AllowAnonymous]
        public IActionResult Register()
        {
            if (User.Identity.IsAuthenticated)
                return Redirect("/");
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new VM_ViewDataSEO
            {
                Keywords = "Đăng ký | GEMS GROUP",
                Title = "Đăng ký | GEMS GROUP",
                Description = "Đăng ký | GEMS GROUP",
            });
            return View();
        }

        [HttpPost, AllowAnonymous, ValidateAntiForgeryToken]
        public async Task<JsonResult> Register(EM_Register model)
        {
            //Check captcha
            //var recaptcha = await _recaptcha.Validate(Request);
            //if (!recaptcha.success || recaptcha.score != 0 && recaptcha.score < _minimumScore)
            //    return Json(new
            //    {
            //        result = 0,
            //        message = _errorMessage
            //    });

            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(this));
                return Json(jResult);
            }

            //Set phoneNumber is userName
            model.userName = model.phoneNumber;
            //Call API
            var res = await _s_Account.CreateCustomer(model);
            if (res.result != 1 || res.data == null)
                return Json(jResult.MapData(res));
            return Json(jResult.MapData(res, Encryptor.Encrypt(res.data.vertifyObj?.id.ToString())));
        }

        [HttpPost, AllowAnonymous]
        public async Task<JsonResult> VerifedRegister(string key, string code, string phoneNumber, string password)
        {
            M_JResult jResult = new M_JResult();
            try
            {
                if (IsNullOrEmpty(key) || IsNullOrEmpty(code) || IsNullOrEmpty(phoneNumber))
                {
                    jResult.error = new error(0, "Key hoặc mã hoặc SĐT chưa nhập");
                    return Json(jResult);
                }

                key = Encryptor.Decrypt(key);
                var res = await _s_VertifyPhone.VertifyPhone(key, code, phoneNumber);
                bool signInSuccess = false;
                if (res.result == 1 && res.data != null)
                {
                    //Auto login when vertify success
                    EM_Login accountSignIn = new EM_Login
                    {
                        UserName = phoneNumber,
                        Password = password
                    };
                    var resSignIn = await LoginFunc(accountSignIn, 60 * 24 * 7); //Login session 7 days
                    if (resSignIn.result == 1 && resSignIn.data != null)
                        signInSuccess = true;
                }
                jResult.result = res.result;
                jResult.data = res.data;
                jResult.data2nd = signInSuccess;
                jResult.error = res.error;
            }
            catch (Exception ex)
            {
                jResult.result = -1;
                jResult.error = new error(0, $"Exception: {ex.Message}");
            }
            return Json(jResult);
        }

        [HttpPost, AllowAnonymous]
        public async Task<JsonResult> ResendVerifiedRegister(string key)
        {
            M_JResult jResult = new M_JResult();
            try
            {
                if (IsNullOrEmpty(key))
                {
                    jResult.error = new error(0, "Chưa có key xác thực");
                    return Json(jResult);
                }

                key = Encryptor.Decrypt(key);
                var res = await _s_VertifyPhone.ResendCode(key);
                return Json(jResult.MapData(res));
            }
            catch (Exception ex)
            {
                jResult.result = -1;
                jResult.error = new error(0, $"Exception: {ex.Message}");
            }
            return Json(jResult);
        }
        #endregion


        #region Forgot password
        public IActionResult ForgotPassword()
        {
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new VM_ViewDataSEO
            {
                Keywords = "Quên mật khẩu | GEMS GROUP",
                Title = "Quên mật khẩu | GEMS GROUP",
                Description = "Quên mật khẩu | GEMS GROUP",
            });
            return View();
        }

        [HttpPost, AllowAnonymous]
        public async Task<JsonResult> CheckPhoneForgotPw(string phoneNumber)
        {
            M_JResult jResult = new M_JResult();
            if (IsNullOrEmpty(phoneNumber))
            {
                jResult.error = new error(0, "Vui lòng nhập điện thoại");
                return Json(jResult);
            }

            var res = await _s_Account.ForgotPassSMS(phoneNumber);
            if (res.result != 1 || res.data == null)
                return Json(jResult.MapData(res));
            return Json(jResult.MapData(res, Encryptor.Encrypt(res.data.vertifyObj?.id.ToString())));
        }

        [HttpPost, AllowAnonymous]
        public async Task<JsonResult> ResetPassword(string key, string code, string phoneNumber, string password)
        {
            M_JResult jResult = new M_JResult();
            try
            {
                if (IsNullOrEmpty(key) || IsNullOrEmpty(code) || IsNullOrEmpty(phoneNumber) || IsNullOrEmpty(password))
                {
                    jResult.error = new error(0, "Key hoặc mã hoặc SĐT hoặc mật khẩu chưa nhập");
                    return Json(jResult);
                }

                key = Encryptor.Decrypt(key);
                var res = await _s_Account.VertifyForgotPassNewPass(key, code, phoneNumber, password);
                return Json(jResult.MapData(res));
            }
            catch (Exception ex)
            {
                jResult.result = -1;
                jResult.error = new error(0, $"Exception: {ex.Message}");
            }
            return Json(jResult);
        }

        [HttpPost, AllowAnonymous]
        public async Task<JsonResult> ResendForgotPw(string key)
        {
            M_JResult jResult = new M_JResult();
            if (IsNullOrEmpty(key))
            {
                jResult.error = new error(0, "Chưa có key xác thực");
                return Json(jResult);
            }

            key = Encryptor.Decrypt(key);
            var res = await _s_VertifyPhone.ResendCode(key);
            return Json(jResult.MapData(res));
        }
        #endregion

        #region Profile ChangePassword
        [Authorize]
        private async Task<object> ResetToken()
        {
            M_JResult jResult = new M_JResult();
            try
            {
                //Check expiredTime ~ isStayLogin
                var expirecTime = ClaimsExtensionMethod.GetClaim(_httpContextAccessor, "ExpiredTime");
                string time = !IsNullOrEmpty(expirecTime) ? expirecTime : "0";
                long now = Utilities.DateTimeToLong(DateTime.UtcNow.AddHours(7));
                if (now > Convert.ToInt32(time))
                    return new { result = 0 };

                //Get username password
                EM_Login model = new EM_Login
                {
                    UserName = _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value,
                    Password = Encryptor.Decrypt(_httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Password")?.Value),
                };

                var res = await _s_Account.LoginHub(model, 30);
                if (res.result == 1 || res.data != null)
                {
                    await ClaimsExtensionMethod.AddUpdateClaimAsync(_httpContextAccessor, "AccessToken", res.data.access_token);
                    return new { result = 1, access_token = res.data.access_token };
                }
                else
                    return new { result = 0 };
            }
            catch (Exception)
            {
                return new { result = 0 };
            }
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> Profile()
        {
            var res = await _s_Person.getHubPersonByIdStatus(_accessToken);

            //Check expiredTime accessToken
            if (res.result == -1 && res.error.code == 408)
            {
                dynamic resetToken = await ResetToken();
                if (resetToken.result == 1)
                    res = await _s_Person.getHubPersonByIdStatus(_accessToken);
                else
                    return Redirect("/error/408");
            }

            if (res.result != 1 || res.data == null)
                return Redirect($"/error/{res.error.code}");
            SetViewDataSEOExtensionMethod.SetViewDataSEODefaultAll(this, new VM_ViewDataSEO
            {
                Keywords = "Thông tin tài khoản",
                Title = "Thông tin tài khoản",
                Description = "Thông tin tài khoản",
            });
            return PartialView(_mapper.Map<EM_Person>(res.data));
        }

        [HttpPost, Authorize, ValidateAntiForgeryToken]
        public async Task<JsonResult> EditProfile(EM_Person model)
        {
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(this));
                return Json(jResult);
            }
            model.id = _accessToken;
            model.timer = DateTime.UtcNow.AddHours(7);
            model.status = 1;
            var res = await _s_Person.UpdateCustomer(model, _userId);

            if (res.result != 1 || res.data == null) return Json(jResult.MapData(res));
            var data = _mapper.Map<EM_Person>(res.data);
            await ClaimsExtensionMethod.AddUpdateClaimAsync(_httpContextAccessor, ClaimTypes.Name, data.lastName + " " + data.firstName);
            await ClaimsExtensionMethod.AddUpdateClaimAsync(_httpContextAccessor, "Avatar", IsNullOrEmpty(data.imageUrl) ? "" : data.imageUrl);
            return Json(jResult.MapData(res));
        }

        [HttpGet, Authorize]
        public IActionResult P_ChangePassword()
        {
            return PartialView();
        }

        [HttpPost, Authorize, ValidateAntiForgeryToken]
        public async Task<JsonResult> P_ChangePassword(EM_ChangePassword model)
        {
            M_JResult jResult = new M_JResult();
            if (!ModelState.IsValid)
            {
                jResult.error = new error(0, DataAnnotationExtensionMethod.GetErrorMessage(this));
                return Json(jResult);
            }

            var res = await _s_Account.ChangePassHubComparePass(_accessToken, model.password, model.newPassword);
            if (res.result != 1 || res.data == null)
                return Json(jResult.MapData(res));
            await ClaimsExtensionMethod.AddUpdateClaimAsync(_httpContextAccessor, "Password", Encryptor.Encrypt(model.newPassword));
            return Json(jResult.MapData(res));
        }
        #endregion

    }
}
