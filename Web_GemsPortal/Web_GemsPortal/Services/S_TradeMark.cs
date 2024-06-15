﻿using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_TradeMark
    {
        Task<ResponseData<List<M_TradeMark>>> getListHubTradeMarkBySupplierIdCategoryId(string sequenceStatus, int? parentId, int? categoryId);
    }
    public class S_TradeMark : IS_TradeMark
    {
        private readonly ICallBaseApi _callApi;
        public S_TradeMark(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_TradeMark>>> getListHubTradeMarkBySupplierIdCategoryId(string sequenceStatus, int? parentId, int? categoryId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
                {"parentId", parentId},
                {"categoryId", categoryId},
            };
            return await _callApi.GetResponseDataAsync<List<M_TradeMark>>("TradeMark/getListHubTradeMarkBySupplierIdCategoryId", dictPars);
        }
    }
}
