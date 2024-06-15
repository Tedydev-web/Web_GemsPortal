using Newtonsoft.Json;
using Web_GemsPortal.EditModels;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using static System.String;

namespace Web_GemsPortal.Services
{
    public interface IS_RegisterContact
    {
        Task<ResponseData<M_RegisterContact>> Create(EM_RegisterContact model, string createdBy);
    }
    public class S_RegisterContact : IS_RegisterContact
    {
        private readonly ICallBaseApi _callApi;
        private readonly IS_Image _s_Image;

        public S_RegisterContact(ICallBaseApi callApi, IS_Image image)
        {
            _callApi = callApi;
            _s_Image = image;
        }

        public async Task<ResponseData<M_RegisterContact>> Create(EM_RegisterContact model, string createdBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model); //Clean XSS
            bool isFail = false;
            ResponseData<M_RegisterContact> res = new ResponseData<M_RegisterContact>();
            //if (model.ImageFile != null)
            //{
            //    var imgUpload = await _s_Image.Upload<M_Image>(model.ImageFile, CommonConstants.REFOCDE_SUPPLIER_ADMIN, Empty, createdBy);
            //    if (imgUpload.result == 1 && imgUpload.data != null)
            //    {
            //        model.ImageUrl = imgUpload.data.relativeUrl;
            //    }
            //    else
            //    {
            //        isFail = true;
            //        res.result = imgUpload.result; res.error = imgUpload.error;
            //    }
            //}
            //if (model.ListImageFile != null)
            //{
            //    var imgUpload = await _s_Image.UploadListImageIFormFile<List<M_Image>>(model.ListImageFile, CommonConstants.REFOCDE_SUPPLIER_ADMIN, Empty, Empty, createdBy);
            //    if (imgUpload.result == 1 && imgUpload.data != null)
            //    {
            //        List<int> imageListId = new List<int>();
            //        imgUpload.data.ForEach(item => imageListId.Add(item.id ?? 0));
            //        model.ImageList = JsonConvert.SerializeObject(imageListId);
            //    }
            //    else
            //    {
            //        isFail = true;
            //        res.result = imgUpload.result; res.error = imgUpload.error;
            //    }
            //}
            if (isFail) return res;
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"name", model.Name},
                {"firstName", model.FirstName},
                {"lastName", model.LastName},
                {"description", model.Description},
                {"identityCardNumber", model.IdentityCardNumber},
                {"email", model.Email},
                {"telephoneNumber", model.TelephoneNumber},
                //{"imageUrl", model.ImageUrl},
                //{"imageList", model.ImageList},
                {"supplierModelId", model.SupplierModelId},
                {"inviteCodeRef", model.InviteCodeRef},
                {"remark", model.Remark},
                {"countryId", IsNullOrEmpty(model.CountryId) ? "1" : model.CountryId},
                {"provinceId", model.provinceId},
                {"districtId", model.districtId},
                {"wardId", model.wardId},
                {"addressText", model.AddressText},
                {"createdBy", createdBy},
            };
            return await _callApi.PostResponseDataAsync<M_RegisterContact>("RegisterContact/Create", dictPars);
        }
    }
}
