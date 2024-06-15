using Web_GemsPortal.Models;
using System;
using System.Collections.Generic;

namespace Web_GemsPortal.ViewModels.Member
{
    public class VM_ProfilePostList
    {
        public string id { get; set; }
        public string identityCre { get; set; }
        public string shopName { get; set; }
        public string avatarCre { get; set; }
        public string content { get; set; }
        public List<M_PostImagePost> postImagePostObjs { get; set; }
        public DateTime createdAt { get; set; }
    }
}
