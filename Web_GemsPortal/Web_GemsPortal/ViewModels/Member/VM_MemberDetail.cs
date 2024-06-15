using Web_GemsPortal.Models;

namespace Web_GemsPortal.ViewModels.Member
{
    public class VM_MemberDetail
    {
        public int Id { get; set; }
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ShopName { get; set; }
        public string Address { get; set; }
        public string TelehoneNumber { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Avatar { get; set; }
        public int IsMember { get; set; }
        public string Banner { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<M_Image> imageListObj { get; set; }
    }
}
