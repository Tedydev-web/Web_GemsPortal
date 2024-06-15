using System;
using System.ComponentModel.DataAnnotations;
using Web_GemsPortal.Models.Common;

namespace Web_GemsPortal.Models
{
    public class M_Account_Register : M_BaseModel.BaseCustom
    {
        public int? id { get; set; }
        public int? slevel { get; set; }
        public int? accountId { get; set; }
        public int? supplierId { get; set; }
        public string remark { get; set; }
    }

    public class M_Account_RegisterAccountAndSupplier
    {
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string AccountType { get; set; }
        public string PersonType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public int? Gender { get; set; }
        public string Email { get; set; }
        public int? AddressId { get; set; }
        public int? ImageId { get; set; }
        public int? FolkId { get; set; }
        public int? ReligionId { get; set; }
        public int? ParentId { get; set; }
        public int? Slevel { get; set; }
        public string MemberUrlIdentity { get; set; }
        public string SupplierName { get; set; }
        public int? SupplierAddressId { get; set; }
    }

    public class EM_Account_RegisterAccountAndSupplier
    {
        [Required(ErrorMessage = "Vui lòng nhập điện thoại")]
        [StringLength(20, ErrorMessage = "Số điện thoại có độ dài tối đa 12 ký tự")]
        [RegularExpression("^[0-9]{0,12}$", ErrorMessage = "Điện thoại không hợp lệ!")]
        public string PhoneNumber { get; set; }

        [StringLength(50)]
        public string UserName { get; set; }

        [StringLength(100)]
        [RegularExpression(@"^([^'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\-\s]+)$", ErrorMessage = "Mật khẩu không được chứa ký tự dấu và khoảng trắng.")]
        public string Password { get; set; }

        [StringLength(50)]
        public string AccountType { get; set; }

        [StringLength(1)]
        public string PersonType { get; set; }

        [StringLength(30)]
        public string FirstName { get; set; }

        [StringLength(30)]
        public string LastName { get; set; }

        public DateTime? Birthday { get; set; }

        public int? Gender { get; set; }

        [StringLength(50, ErrorMessage = "Email có độ dài tối đa 50 ký tự")]
        [RegularExpression(@"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$", ErrorMessage = "Email không hợp lệ!")]
        public string Email { get; set; }

        public int? AddressId { get; set; }

        public int? ImageId { get; set; }

        public int? FolkId { get; set; }

        public int? ReligionId { get; set; }

        public int? ParentId { get; set; }

        public int? Slevel { get; set; }

        public string MemberUrlIdentity { get; set; }

        public string SupplierName { get; set; }

        public int? SupplierAddressId { get; set; }
        public int? CountryId { get; set; }
        public int? ProvinceId { get; set; }
        public int? DistrictId { get; set; }
        public int? WardId { get; set; }
        public string AddressText { get; set; }
    }

    public class M_Account_RegisterCreateAccount
    {
        [StringLength(20)]
        public string PhoneNumber { get; set; }

        [StringLength(50)]
        public string UserName { get; set; }

        [StringLength(100)]
        public string Password { get; set; }

        [StringLength(50)]
        public string AccountType { get; set; }

        [StringLength(1)]
        public string PersonType { get; set; }

        [StringLength(30)]
        public string FirstName { get; set; }

        [StringLength(30)]
        public string LastName { get; set; }

        public DateTime? Birthday { get; set; }

        public int? Gender { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        public int? AddressId { get; set; }

        public int? ImageId { get; set; }

        public int? FolkId { get; set; }

        public int? ReligionId { get; set; }

        public int? SupplierId { get; set; }
    }

    public class M_Account_RegisterCreateSupplier
    {
        public int? ParentId { get; set; }

        public int? Slevel { get; set; }

        public string MemberUrlIdentity { get; set; }

        public string SupplierName { get; set; }

        public int? SupplierAddressId { get; set; }

        public int? PersonId { get; set; }
    }
}
