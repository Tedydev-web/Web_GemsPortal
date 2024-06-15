using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Microsoft.Extensions.Options;
using static System.String;
using Org.BouncyCastle.Asn1.Ocsp;

namespace Web_GemsPortal.Services
{
    public interface IS_Image
    {
        Task<ResponseData<T>> UploadImageBase64<T>(IFormFile imgFile, string refId, string hostUri, string createdBy);
        Task<ResponseData<T>> Upload<T>(IFormFile imgFile, string refId, string hostUri, string createdBy);
        Task<ResponseData<T>> UploadListImageIFormFile<T>(List<IFormFile> imgFiles, string refId, string hostUri, string description, string createdBy);
        Task<ResponseData<T>> UploadResize<T>(IFormFile imgFile, string refId, string hostUri, string createdBy);
        Task<ResponseData<T>> UploadListImageResize<T>(List<IFormFile> imgFiles, string refId, string hostUri, string createdBy);
        Task<ResponseData<T>> UploadFile<T>(IFormFile imgFile, string refId, string hostUri, string createdBy);
        Task<ResponseData<T>> UploadListIFormFile<T>(List<IFormFile> imgFiles, string refId, string hostUri, string createdBy);
        Task<ResponseData<T>> UploadImageResizeWebp<T>(IFormFile imgFile, string refId, string createdBy);
        Task<ResponseData<T>> UploadImage<T>(IFormFile imgFile, string refId, string createdBy);
    }
    public class S_Image : IS_Image
    {
        private readonly ICallApi _callApi;
        private readonly IOptions<Config_ApiSettings> _apiSettings;
        private readonly IOptions<Config_TokenUploadFile> _tokenUploadFile;

        public S_Image(ICallApi callApi, IOptions<Config_ApiSettings> apiSettings, IOptions<Config_TokenUploadFile> tokenUploadFile)
        {
            _callApi = callApi;
            _apiSettings = apiSettings;
            _tokenUploadFile = tokenUploadFile;
        }

        private class SyncServer
        {
            public string sctlc { get; set; }
            public string setlc { get; set; }
            public string cs { get; set; }
            public string pattern { get; set; }
        }

        private async Task<ResponseData<SyncServer>> getTokenInfo(int ts = 10)
        {
            Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
            {
                {"ts", ts},
            };
            return await _callApi.GetResponseDataAsync<SyncServer>(_apiSettings.Value.UrlApiImage + "SyncServer/getTokenInfo", dictHead);
        }

        public async Task<ResponseData<T>> UploadImageBase64<T>(IFormFile imgFile, string refId, string hostUri, string createdBy)
        {
            ResponseData<T> res = new ResponseData<T>();
            var resToken = await getTokenInfo();
            if (resToken.result != 1)
            {
                res.error.message = "Token image is not valid";
                return res;
            }
            var authorization = Utility.ReConfigureTokenTime(_tokenUploadFile.Value, resToken.data.sctlc, resToken.data.setlc, resToken.data.cs, 0);
            Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
            {
                {"TokenTime", authorization},
            };
            MultipartFormDataContent formData = new MultipartFormDataContent();
            formData.Add(new StringContent(IsNullOrEmpty(refId) ? "" : refId), "refId");
            formData.Add(new StringContent(ImageHelper.EncodeToBase64String(imgFile)), "imgBase64");
            formData.Add(new StringContent(IsNullOrEmpty(IsNullOrEmpty(hostUri) ? _apiSettings.Value.UrlImageHost : hostUri) ? _apiSettings.Value.UrlImageHost : hostUri), "hostUri");
            formData.Add(new StringContent(IsNullOrEmpty(createdBy) ? "0" : createdBy), "createdBy");
            return await _callApi.PostResponseDataAsync<T>(_apiSettings.Value.UrlApiImage + "Image/UploadImage", formData, dictHead);
        }
        public async Task<ResponseData<T>> Upload<T>(IFormFile imgFile, string refId, string hostUri, string createdBy)
        {
            ResponseData<T> res = new ResponseData<T>();
            var resToken = await getTokenInfo();
            if (resToken.result != 1)
            {
                res.error.message = "Token image is not valid";
                return res;
            }
            var authorization = Utility.ReConfigureTokenTime(_tokenUploadFile.Value, resToken.data.sctlc, resToken.data.setlc, resToken.data.cs, 0);
            Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
            {
                {"TokenTime", authorization},
            };
            MultipartFormDataContent formData = new MultipartFormDataContent();
            formData.Add(new StringContent(IsNullOrEmpty(refId) ? "" : refId), "refId");
            formData.Add(ImageHelper.EncodeToStreamContent(imgFile), "imgFile", imgFile.FileName);
            formData.Add(new StringContent(IsNullOrEmpty(hostUri) ? _apiSettings.Value.UrlImageHost : hostUri), "hostUri");
            formData.Add(new StringContent(IsNullOrEmpty(createdBy) ? "0" : createdBy), "createdBy");
            return await _callApi.PostResponseDataAsync<T>(_apiSettings.Value.UrlApiImage + "Image/Upload", formData, dictHead);
        }
        public async Task<ResponseData<T>> UploadListImageIFormFile<T>(List<IFormFile> imgFiles, string refId, string hostUri, string description, string createdBy)
        {
            ResponseData<T> res = new ResponseData<T>();
            var resToken = await getTokenInfo();
            if (resToken.result != 1)
            {
                res.error.message = "Token image is not valid";
                return res;
            }
            var authorization = Utility.ReConfigureTokenTime(_tokenUploadFile.Value, resToken.data.sctlc, resToken.data.setlc, resToken.data.cs, 0);
            Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
            {
                {"TokenTime", authorization},
            };
            MultipartFormDataContent formData = new MultipartFormDataContent();
            foreach (var item in imgFiles)
                formData.Add(ImageHelper.EncodeToStreamContent(item), "imgFiles", item.FileName);
            formData.Add(new StringContent(IsNullOrEmpty(refId) ? "" : refId), "refId");
            formData.Add(new StringContent(IsNullOrEmpty(hostUri) ? _apiSettings.Value.UrlImageHost : hostUri), "hostUri");
            formData.Add(new StringContent(IsNullOrEmpty(description) ? "" : description), "description");
            formData.Add(new StringContent(IsNullOrEmpty(createdBy) ? "0" : createdBy), "createdBy");
            return await _callApi.PostResponseDataAsync<T>(_apiSettings.Value.UrlApiImage + "Image/UploadListImageIFormFile", formData, dictHead);
        }
        public async Task<ResponseData<T>> UploadResize<T>(IFormFile imgFile, string refId, string hostUri, string createdBy)
        {
            ResponseData<T> res = new ResponseData<T>();
            var resToken = await getTokenInfo();
            if (resToken.result != 1)
            {
                res.error.message = "Token image is not valid";
                return res;
            }
            var authorization = Utility.ReConfigureTokenTime(_tokenUploadFile.Value, resToken.data.sctlc, resToken.data.setlc, resToken.data.cs, 0);
            Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
            {
                {"TokenTime", authorization},
            };
            MultipartFormDataContent formData = new MultipartFormDataContent();
            formData.Add(ImageHelper.EncodeToStreamContent(imgFile), "imgFile", imgFile.FileName);
            formData.Add(new StringContent(IsNullOrEmpty(refId) ? "" : refId), "refId");
            formData.Add(new StringContent(IsNullOrEmpty(hostUri) ? _apiSettings.Value.UrlImageHost : hostUri), "hostUri");
            formData.Add(new StringContent(IsNullOrEmpty(createdBy) ? "0" : createdBy), "createdBy");
            return await _callApi.PostResponseDataAsync<T>(_apiSettings.Value.UrlApiImage + "Image/UploadResize", formData, dictHead);
        }
        public async Task<ResponseData<T>> UploadListImageResize<T>(List<IFormFile> imgFiles, string refId, string hostUri, string createdBy)
        {
            ResponseData<T> res = new ResponseData<T>();
            var resToken = await getTokenInfo();
            if (resToken.result != 1)
            {
                res.error.message = "Token image is not valid";
                return res;
            }
            var authorization = Utility.ReConfigureTokenTime(_tokenUploadFile.Value, resToken.data.sctlc, resToken.data.setlc, resToken.data.cs, 0);
            Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
            {
                {"TokenTime", authorization},
            };
            MultipartFormDataContent formData = new MultipartFormDataContent();
            foreach (var item in imgFiles)
                formData.Add(ImageHelper.EncodeToStreamContent(item), "imgFiles", item.FileName);
            formData.Add(new StringContent(IsNullOrEmpty(refId) ? "" : refId), "refId");
            formData.Add(new StringContent(IsNullOrEmpty(hostUri) ? _apiSettings.Value.UrlImageHost : hostUri), "hostUri");
            formData.Add(new StringContent(IsNullOrEmpty(createdBy) ? "0" : createdBy), "createdBy");
            return await _callApi.PostResponseDataAsync<T>(_apiSettings.Value.UrlApiImage + "Image/UploadListImageResize", formData, dictHead);
        }

        //File upload
        public async Task<ResponseData<T>> UploadFile<T>(IFormFile imgFile, string refId, string hostUri, string createdBy)
        {
            ResponseData<T> res = new ResponseData<T>();
            var resToken = await getTokenInfo();
            if (resToken.result != 1)
            {
                res.error.message = "Token image is not valid";
                return res;
            }
            var authorization = Utility.ReConfigureTokenTime(_tokenUploadFile.Value, resToken.data.sctlc, resToken.data.setlc, resToken.data.cs, 0);
            Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
            {
                {"TokenTime", authorization},
            };
            MultipartFormDataContent formData = new MultipartFormDataContent();
            formData.Add(ImageHelper.EncodeToStreamContent(imgFile), "imgFile", imgFile.FileName);
            formData.Add(new StringContent(IsNullOrEmpty(refId) ? "" : refId), "refId");
            formData.Add(new StringContent(IsNullOrEmpty(hostUri) ? _apiSettings.Value.UrlImageHost : hostUri), "hostUri");
            formData.Add(new StringContent(IsNullOrEmpty(createdBy) ? "0" : createdBy), "createdBy");
            return await _callApi.PostResponseDataAsync<T>(_apiSettings.Value.UrlApiImage + "File/UploadFile", formData, dictHead);
        }
        public async Task<ResponseData<T>> UploadListIFormFile<T>(List<IFormFile> imgFiles, string refId, string hostUri, string createdBy)
        {
            ResponseData<T> res = new ResponseData<T>();
            var resToken = await getTokenInfo();
            if (resToken.result != 1)
            {
                res.error.message = "Token image is not valid";
                return res;
            }
            var authorization = Utility.ReConfigureTokenTime(_tokenUploadFile.Value, resToken.data.sctlc, resToken.data.setlc, resToken.data.cs, 0);
            Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
            {
                {"TokenTime", authorization},
            };
            MultipartFormDataContent formData = new MultipartFormDataContent();
            foreach (var item in imgFiles)
                formData.Add(ImageHelper.EncodeToStreamContent(item), "imgFiles", item.FileName);
            formData.Add(new StringContent(IsNullOrEmpty(refId) ? "" : refId), "refId");
            formData.Add(new StringContent(IsNullOrEmpty(hostUri) ? _apiSettings.Value.UrlImageHost : hostUri), "hostUri");
            formData.Add(new StringContent(IsNullOrEmpty(createdBy) ? "0" : createdBy), "createdBy");
            return await _callApi.PostResponseDataAsync<T>(_apiSettings.Value.UrlApiImage + "File/UploadListIFormFile", formData, dictHead);
        }

        //Image new
        public async Task<ResponseData<T>> UploadImageResizeWebp<T>(IFormFile imgFile, string refId, string createdBy)
        {
            ResponseData<T> res = new ResponseData<T>();
            try
            {
                Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
                 {
                     {"Authorization", $"Bearer {_tokenUploadFile.Value.userKeyShare}"},
                 };
                //Call api
                MultipartFormDataContent formData = new MultipartFormDataContent();
                formData.Add(ImageHelper.EncodeToStreamContent(imgFile), "imageFile", imgFile.FileName);
                formData.Add(new StringContent(string.IsNullOrEmpty(refId) ? "" : refId), "refId");
                formData.Add(new StringContent(_apiSettings.Value.UrlImageHost), "hostUri");
                formData.Add(new StringContent(string.IsNullOrEmpty(createdBy) ? "" : createdBy), "createdBy");
                return await _callApi.PostResponseDataAsync<T>(_apiSettings.Value.UrlApiImage + "Image/UploadImageResizeWebp", formData, dictHead);
            }
            catch (Exception ex)
            {
                res.result = 0;
                res.error = new error { code = -1, message = $"Exception: {ex.Message}" };
            }
            return res;
        }

        public async Task<ResponseData<T>> UploadImage<T>(IFormFile imgFile, string refId, string createdBy)
        {
            ResponseData<T> res = new ResponseData<T>();
            try
            {
                Dictionary<string, dynamic> dictHead = new Dictionary<string, dynamic>
                 {
                     {"Authorization", $"Bearer {_tokenUploadFile.Value.userKeyShare}"},
                 };
                //Call api
                MultipartFormDataContent formData = new MultipartFormDataContent();
                formData.Add(ImageHelper.EncodeToStreamContent(imgFile), "imageFile", imgFile.FileName);
                formData.Add(new StringContent(string.IsNullOrEmpty(refId) ? "" : refId), "refId");
                formData.Add(new StringContent(_apiSettings.Value.UrlImageHost), "hostUri");
                formData.Add(new StringContent(string.IsNullOrEmpty(createdBy) ? "" : createdBy), "createdBy");
                return await _callApi.PostResponseDataAsync<T>(_apiSettings.Value.UrlApiImage + "Image/UploadImage", formData, dictHead);
            }
            catch (Exception ex)
            {
                res.result = 0;
                res.error = new error { code = -1, message = $"Exception: {ex.Message}" };
            }
            return res;
        }
    }
}