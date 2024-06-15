using Web_GemsPortal.EditModels.Account;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using static System.String;

namespace Web_GemsPortal.Services
{
    public interface IS_Person
    {
        Task<ResponseData<M_Person>> getHubPersonByIdStatus(string access_token);
        Task<ResponseData<M_Person>> UpdateCustomer(EM_Person model, string updatedBy);
    }
    public class S_Person : IS_Person
    {
        private readonly ICallBaseApi _callApi;
        private readonly IS_Image _s_Image;

        public S_Person(ICallBaseApi callApi, IS_Image image)
        {
            _callApi = callApi;
            _s_Image = image;
        }

        public async Task<ResponseData<M_Person>> getHubPersonByIdStatus(string access_token)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
            };
            return await _callApi.GetResponseDataAsync<M_Person>("Person/getHubPersonByIdStatus", dictPars);
        }
        public async Task<ResponseData<M_Person>> UpdateCustomer(EM_Person model, string updatedBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model); //Clean XSS
            bool isFail = false;
            ResponseData<M_Person> res = new ResponseData<M_Person>();
            if (model.imageFile != null)
            {
                var imgUpload = await _s_Image.UploadImageResizeWebp<M_Image>(model.imageFile, CommonConstants.REFOCDE_SUPPLIER_ADMIN, updatedBy);
                if (imgUpload.result == 1 && imgUpload.data != null)
                {
                    model.imageId = imgUpload.data.id;
                    model.imageSerialId = imgUpload.data.serialId;
                    model.imageUrl = imgUpload.data.relativeUrl;
                }
                else
                {
                    isFail = true;
                    res.result = imgUpload.result; res.error = imgUpload.error;
                }
            }
            if (isFail) return res;
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", model.id},
                {"firstName", model.firstName},
                {"lastName", model.lastName},
                {"birthday", model.birthday},
                {"gender", model.gender},
                {"email", model.email},
                {"imageId", model.imageId},
                {"imageSerialId", model.imageSerialId},
                {"timer", model.timer},
                {"updatedBy", updatedBy},
                {"status", 1},
            };
            return await _callApi.PostResponseDataAsync<M_Person>("Person/UpdateCustomer", dictPars);
        }
    }
}
