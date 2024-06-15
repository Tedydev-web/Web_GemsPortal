﻿using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_GemsPortal.Services
{
    public interface IS_PropertyFilter
    {
        Task<ResponseData<List<M_PropertyFilter>>> getListPropertyFilterBySequenceStatusSequenceTypeId(string sequenceStatus, string sequenceTypeId);
    }
    public class S_PropertyFilter : IS_PropertyFilter
    {
        private readonly ICallBaseApi _callApi;
        public S_PropertyFilter(ICallBaseApi callApi)
        {
            _callApi = callApi;
        }

        public async Task<ResponseData<List<M_PropertyFilter>>> getListPropertyFilterBySequenceStatusSequenceTypeId(string sequenceStatus, string sequenceTypeId)
        {
            Dictionary<string, dynamic> dictPars = new Dictionary<string, dynamic>
            {
                {"sequenceStatus", sequenceStatus},
                {"sequenceTypeId", sequenceTypeId},
            };
            return await _callApi.GetResponseDataAsync<List<M_PropertyFilter>>("PropertyFilter/getListPropertyFilterBySequenceStatusSequenceTypeId", dictPars);
        }
    }
}
