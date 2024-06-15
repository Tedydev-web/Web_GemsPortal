using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_Payment
    {
        Task<ResponseData<List<M_Payment>>> getListPayment();
    }
    public class S_Payment : IS_Payment
    {
        private readonly ICallBaseApi _callApi;
        public S_Payment(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_Payment>>> getListPayment()
        {
            return await _callApi.GetResponseDataAsync<List<M_Payment>>("Payment/DeleteHub", default(Dictionary<string, dynamic>));
        }
    }
}
