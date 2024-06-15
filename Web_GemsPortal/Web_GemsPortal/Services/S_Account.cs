using Web_GemsPortal.EditModels.Account;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.EditModels;
using Org.BouncyCastle.Asn1.Ocsp;

namespace Web_GemsPortal.Services
{
    public interface IS_Account
    {
        Task<ResponseData<M_Account>> CreateCustomer(EM_Register model);
        Task<ResponseData<M_LoginHub>> LoginHub(EM_Login model, int timeOut = 30);
        Task<ResponseData<object>> ChangePassHubComparePass(string access_token, string oldPass, string newPass);
        Task<ResponseData<M_ForgotPassword>> ForgotPassSMS(string userName);
        Task<ResponseData<M_VertifyPhone>> VertifyForgotPassNewPass(string id, string activeCode, string phoneNumber, string newPassWord);
        Task<ResponseData<object>> SendAccountEmail(string accessToken, EM_SendMail model);
        Task<ResponseData<M_Account>> RegisterAccountAndSupplier(EM_Account_RegisterAccountAndSupplier model);
    }
    public class S_Account : IS_Account
    {
        private readonly ICallBaseApi _callApi;
        private readonly IS_Address _s_Address;

        public S_Account(ICallBaseApi callApi, IS_Address address)
        {
            _callApi = callApi;
            _s_Address = address;
        }

        public async Task<ResponseData<M_Account>> CreateCustomer(EM_Register model)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"userName", model.userName?.Trim()},
                {"password", model.password},
                {"firstName", model.firstName?.Trim()},
                {"lastName", model.lastName?.Trim()},
                {"gender", model.gender},
                {"accountType", "CUS"},
                {"email", model.email?.Trim()},
                {"birthday", model.birthday?.ToString("yyyy-MM-dd")},
                {"phoneNumber", model.phoneNumber?.Trim()},
            };
            return await _callApi.PostResponseDataAsync<M_Account>("Account/CreateCustomer", dictPars);
        }
        public async Task<ResponseData<M_LoginHub>> LoginHub(EM_Login model, int timeOut = 30)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"userName", model.UserName?.Trim()},
                {"password", model.Password},
                {"timeOut", timeOut},
            };
            return await _callApi.PostResponseDataAsync<M_LoginHub>("Account/LoginHub", dictPars);
        }
        public async Task<ResponseData<object>> ChangePassHubComparePass(string access_token, string oldPass, string newPass)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"oldPass", oldPass},
                {"newPass", newPass},
            };
            return await _callApi.PostResponseDataAsync<object>("Account/ChangePassHubComparePass", dictPars);
        }
        public async Task<ResponseData<M_ForgotPassword>> ForgotPassSMS(string userName)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"userName", userName},
            };
            return await _callApi.PostResponseDataAsync<M_ForgotPassword>("Account/ForgotPassSMS", dictPars);
        }
        public async Task<ResponseData<M_VertifyPhone>> VertifyForgotPassNewPass(string id, string activeCode, string phoneNumber, string newPassWord)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", id},
                {"activeCode", activeCode},
                {"phoneNumber", phoneNumber},
                {"newPassWord", newPassWord},
            };
            return await _callApi.PostResponseDataAsync<M_VertifyPhone>("Account/VertifyForgotPassNewPass", dictPars);
        }
        public async Task<ResponseData<object>> SendAccountEmail(string accessToken, EM_SendMail model)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"subject", model.Subject},
                {"recipientEmail", model.RecipientEmail},
                {"recipientName", model.RecipientName},
                {"message", model.Message},
            };
            return await _callApi.PostResponseDataAsync<object>("Account/SendAccountEmail", dictPars);
        }

        public async Task<ResponseData<M_Account>> RegisterAccountAndSupplier(EM_Account_RegisterAccountAndSupplier model)
        {
            //model = CleanXSSHelper.CleanXSSObject(model);
            //Task taskAddress = Task.Run(action: () =>
            //{
            //    var resAddress = _s_Address.create("", "", "", model.AddressText, model.CountryId,model.ProvinceId,model.DistrictId,model.WardId, "","");
            //});

            //Wait task all
            //await Task.WhenAll(taskAddress);
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"phoneNumber", model.PhoneNumber},
                {"userName", model.UserName},
                {"password", model.Password},
                {"accountType", model.AccountType?.Trim()},
                {"personType", model.PersonType},
                {"firstName", model.FirstName?.Trim()},
                {"lastName", model.LastName},
                {"birthday", model.Birthday},
                {"gender", model.Gender},
                {"email", model.Email?.Trim()},
                {"addressId", model.AddressId},
                {"imageId", model.ImageId},
                {"folkId", model.FolkId},
                {"religionId", model.ReligionId},
                {"parentId", model.ParentId},
                {"slevel", model.Slevel},
                {"memberUrlIdentity", model.MemberUrlIdentity},
                {"supplierName", model.SupplierName?.Trim()},
                {"supplierAddressId", model.SupplierAddressId},
            };
            return await _callApi.PostResponseDataAsync<M_Account>("Account/RegisterAccountAndSupplier", dictPars);
        }
    }
}
