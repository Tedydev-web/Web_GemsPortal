using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;

namespace Web_GemsPortal.Services
{
    public interface IS_Banner
    {
        Task<ResponseData<List<M_Banner>>> getListHubBannerByLocationIdPageName(string supplierId, string pageName, EN_BannerLocation locationId = 0, int recordNumber = 5);
    }
    public class S_Banner : IS_Banner
    {
        private readonly ICallBaseApi _callApi;
        public S_Banner(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_Banner>>> getListHubBannerByLocationIdPageName(string supplierId, string pageName, EN_BannerLocation locationId = 0, int recordNumber = 5)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"supplierId", supplierId},
                {"pageName", pageName},
                {"locationId", (int)locationId},
                {"recordNumber", recordNumber},
            };
            return await _callApi.GetResponseDataAsync<List<M_Banner>>("Banner/getListHubBannerByLocationIdPageName", dictPars);
        }
    }
}
