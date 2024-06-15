using Web_GemsPortal.EditModels.Contact;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Contact
    {
        Task<ResponseData<M_Contact>> Create(EM_Contact model, string createdBy);
    }
    public class S_Contact : IS_Contact
    {
        private readonly ICallBaseApi _callApi;
        public S_Contact(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<M_Contact>> Create(EM_Contact model, string createdBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model);
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", model.SupplierId},
                {"contactTypeId", model.ContactTypeId},
                {"star", model.RatingStart},
                {"name", model.Name},
                {"email", model.Email},
                {"phoneNumber", model.PhoneNumber},
                {"title", model.Title},
                {"detail", model.Detail},
                {"remark", model.Remark},
                {"createdBy", createdBy},
            };
            return await _callApi.PostResponseDataAsync<M_Contact>("Contact/Create", dictPars);
        }
    }
}
