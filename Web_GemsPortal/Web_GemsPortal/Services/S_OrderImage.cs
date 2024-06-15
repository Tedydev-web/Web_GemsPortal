using Web_GemsPortal.EditModels.Contact;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Web_GemsPortal.EditModels.Order;
using static System.String;

namespace Web_GemsPortal.Services
{
    public interface IS_OrderImage
    {
        Task<ResponseData<M_OrderImage>> GetById(int id);
        Task<ResponseData<List<M_OrderImage>>> GetListByTypeOrderId(int type, string orderId);
        Task<ResponseData<M_OrderImage>> Create(EM_OrderImage model, string createdBy);
        Task<ResponseData<M_OrderImage>> Update(EM_OrderImage model, string updatedBy);
        Task<ResponseData<M_OrderImage>> Delete(int id);
    }
    public class S_OrderImage : IS_OrderImage
    {
        private readonly ICallBaseApi _callApi;
        private readonly IS_Image _s_Image;

        public S_OrderImage(ICallBaseApi callApi, IS_Image image)
        {
            _callApi = callApi;
            _s_Image = image;
        }

        public async Task<ResponseData<M_OrderImage>> GetById(int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id",id},
            };
            return await _callApi.GetResponseDataAsync<M_OrderImage>("OrderImage/GetById", dictPars);
        }
        public async Task<ResponseData<List<M_OrderImage>>> GetListByTypeOrderId(int type, string orderId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"type",type},
                {"orderId",orderId},
            };
            return await _callApi.GetDictHeaderResponseDataAsync<List<M_OrderImage>>("OrderImage/GetListByTypeOrderId", dictPars);
        }
        public async Task<ResponseData<M_OrderImage>> Create(EM_OrderImage model, string createdBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model);
            ResponseData<M_OrderImage> res = new ResponseData<M_OrderImage>();
            if (model.ImageFile != null)
            {
                var imgUpload = await _s_Image.UploadImageResizeWebp<M_Image>(model.ImageFile, CommonConstants.REFOCDE_SUPPLIER_ADMIN, createdBy);
                if (imgUpload.result == 1 && imgUpload.data != null)
                {
                    model.ImageId = imgUpload.data.id ?? 0;
                }
                else
                {
                    res.result = imgUpload.result; res.error = imgUpload.error;
                    return res;
                }
            }
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"type", model.Type},
                {"orderId", model.OrderId},
                {"imageId", model.ImageId},
                {"star", model.Star},
                {"remark", model.Remark},
                {"createdBy", createdBy},
            };
            return await _callApi.PostResponseDataAsync<M_OrderImage>("OrderImage/Create", dictPars);
        }
        public async Task<ResponseData<M_OrderImage>> Update(EM_OrderImage model, string updatedBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model);
            ResponseData<M_Person> res = new ResponseData<M_Person>();
            if (model.ImageFile != null)
            {
                var imgUpload = await _s_Image.Upload<M_Image>(model.ImageFile, CommonConstants.REFOCDE_SUPPLIER_ADMIN, Empty, updatedBy);
                if (imgUpload.result == 1 && imgUpload.data != null)
                {
                    model.ImageId = imgUpload.data.id ?? 0;
                }
                else
                {
                    res.result = imgUpload.result; res.error = imgUpload.error;
                }
            }
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id", model.Id},
                {"type", model.Type},
                {"orderId", model.OrderId},
                {"imageId", model.ImageId},
                {"star", model.Star},
                {"remark", model.Remark},
                {"updatedBy", updatedBy},
            };
            return await _callApi.PutDictHeaderResponseDataAsync<M_OrderImage>("OrderImage/Update", dictPars);
        }
        public async Task<ResponseData<M_OrderImage>> Delete(int id)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"id",id},
            };
            return await _callApi.DeleteResponseDataAsync<M_OrderImage>("OrderImage/Delete", dictPars);
        }
    }
}
