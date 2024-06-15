using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_OrderItem
    {
        Task<ResponseData<List<M_OrderItemDeleteHub>>> DeleteHub(string access_token, string sequenceIdsReasonId, string remark);
    }
    public class S_OrderItem : IS_OrderItem
    {
        private readonly ICallBaseApi _callApi;
        public S_OrderItem(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_OrderItemDeleteHub>>> DeleteHub(string access_token, string sequenceIdsReasonId, string remark)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"access_token", access_token},
                {"sequenceIdsReasonId", sequenceIdsReasonId},
                {"remark", remark},
            };
            return await _callApi.PostResponseDataAsync<List<M_OrderItemDeleteHub>>("OrderItem/DeleteHub", dictPars);
        }
    }
}
