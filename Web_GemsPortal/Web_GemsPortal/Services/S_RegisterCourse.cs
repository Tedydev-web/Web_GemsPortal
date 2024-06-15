using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_RegisterCourse
    {
        Task<ResponseData<M_RegisterCourse>> Create(EM_RegisterCourse model, string createdBy);
    }
    public class S_RegisterCourse : IS_RegisterCourse
    {
        private readonly ICallBaseApi _callApi;
        public S_RegisterCourse(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<M_RegisterCourse>> Create(EM_RegisterCourse model, string createdBy)
        {
            model = CleanXSSHelper.CleanXSSObject(model);
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", model.supplierId},
                {"personId", model.personId},
                {"newsCategoryId", model.newsCategoryId},
                {"newsId", model.newsId},
                {"reOrder", model.reOrder ?? 0},
                {"remark", model.remark},
                {"createdBy", createdBy},
            };
            return await _callApi.PostResponseDataAsync<M_RegisterCourse>("RegisterCourse/Create", dictPars);
        }
    }
}
