using AutoMapper;
using Web_GemsPortal.EditModels.Account;
using Web_GemsPortal.EditModels.DeliveryAddress;
using Web_GemsPortal.Lib;
using Web_GemsPortal.Models;
using Web_GemsPortal.ViewModels;
using Web_GemsPortal.ViewModels.Banner;
using Web_GemsPortal.ViewModels.Category;
using Web_GemsPortal.ViewModels.Member;
using Web_GemsPortal.ViewModels.News;
using Web_GemsPortal.ViewModels.Order;
using Web_GemsPortal.ViewModels.Product;
using static System.String;
using static Web_GemsPortal.Models.M_ShoppingCart;
using Newtonsoft.Json;
using Web_GemsPortal.EditModels.Order;

namespace Web_GemsPortal.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            #region Common
            CreateMap<M_Image, VM_ImageObj>();
            CreateMap<M_ContactType, VM_SelectDropDown>();
            CreateMap<M_SupplierModel, VM_SelectDropDown>();
            #endregion

            //Address----------------
            #region Address
            CreateMap<M_Country, VM_SelectDropDown>();
            CreateMap<M_Province, VM_SelectDropDown>();
            CreateMap<M_District, VM_SelectDropDown>();
            CreateMap<M_Ward, VM_SelectDropDown>();
            CreateMap<M_Address, VM_ShopAddress>()
               .ForMember(destination => destination.shopId,
               options => options.MapFrom(source => source.supplierId))
               .ForMember(destination => destination.shopName,
               options => options.MapFrom(source => source.supplierObj.name))
               .ForMember(destination => destination.addressText,
               options => options.MapFrom(source => source.addressText))
               .ForMember(destination => destination.provinceName,
               options => options.MapFrom(source => source.provinceObj.name))
               .ForMember(destination => destination.districtName,
               options => options.MapFrom(source => source.districtObj.name))
               .ForMember(destination => destination.wardName,
               options => options.MapFrom(source => source.wardObj.name))
               .ForMember(destination => destination.quantityProduct,
               options => options.MapFrom(source => source.inventoryObj.quantity));
            #endregion

            //DeliveryAddress----------------
            #region DeliveryAddress
            CreateMap<M_DeliveryAddress, EM_DeliveryAddress>()
                .ForMember(destination => destination.countryId,
                options => options.MapFrom(source => source.countryObj.id))
                .ForMember(destination => destination.provinceId,
                options => options.MapFrom(source => source.provinceObj.id))
                .ForMember(destination => destination.districtId,
                options => options.MapFrom(source => source.districtObj.id))
                .ForMember(destination => destination.wardId,
                options => options.MapFrom(source => source.wardObj.id));
            CreateMap<M_DeliveryAddress, VM_DeliveryAddress>()
                .ForMember(destination => destination.countryId,
                options => options.MapFrom(source => source.countryObj.id))
                .ForMember(destination => destination.provinceId,
                options => options.MapFrom(source => source.provinceObj.id))
                .ForMember(destination => destination.districtId,
                options => options.MapFrom(source => source.districtObj.id))
                .ForMember(destination => destination.wardId,
                options => options.MapFrom(source => source.wardObj.id))
                .ForMember(destination => destination.provinceName,
                options => options.MapFrom(source => source.provinceObj.name))
                .ForMember(destination => destination.districtName,
                options => options.MapFrom(source => source.districtObj.name))
                .ForMember(destination => destination.wardName,
                options => options.MapFrom(source => source.wardObj.name));
            #endregion

            //Order----------------
            #region Order
            CreateMap<M_Order, VM_CheckoutCreateOrder>()
                .ForMember(destination => destination.supplierId,
                options => options.MapFrom(source => Lib.Encryptor.Encrypt(source.supplierId)));
            CreateMap<M_OrderItem, VM_OrderList.OrderItem>()
                .ForMember(destination => destination.ProductName,
                options => options.MapFrom(source => source.productObj.name))
                .ForMember(destination => destination.ProductImage,
                options => options.MapFrom(source => source.imageObj.smallUrl))
                .ForMember(destination => destination.TypeName,
                options => options.MapFrom(source => source.productPriceObj.typeObj.id == 0 ? "" : source.productPriceObj.typeObj.name))
                .ForMember(destination => destination.UnitName,
                options => options.MapFrom(source => source.unitObj.id == 0 ? "" : source.unitObj.name));
            CreateMap<M_OrderGetList, VM_OrderList>()
                .ForMember(destination => destination.orderItem,
                options => options.MapFrom(source => source.orderItemObj))
                .ForMember(destination => destination.ProcessStatus,
                options => options.MapFrom(source => source.orderProcessObj.processStatus));
            CreateMap< M_OrderItem, VM_OrderView.OrderItem>()
                .ForMember(destination => destination.ProductId,
                options => options.MapFrom(source => source.productObj.id))
                .ForMember(destination => destination.ProductName,
                options => options.MapFrom(source => source.productObj.name))
                .ForMember(destination => destination.ProductNameSlug,
                options => options.MapFrom(source => source.productObj.nameSlug))
                .ForMember(destination => destination.ProductImage,
                options => options.MapFrom(source => source.imageObj.smallUrl))
                .ForMember(destination => destination.UnitName,
                options => options.MapFrom(source => source.unitObj.id == 0 ? "" : source.unitObj.name))
                .ForMember(destination => destination.TypeName,
                options => options.MapFrom(source => source.productPriceObj.typeObj.id == 0 ? "" : source.productPriceObj.typeObj.name))
                .ForMember(destination => destination.ReasonName,
                options => options.MapFrom(source => source.reasonObj.name))
                .ForMember(destination => destination.ReasonDescription,
                options => options.MapFrom(source => source.remark))
                .ForMember(destination => destination.ReasonType,
                options => options.MapFrom(source => source.reasonObj.type));
            CreateMap<M_OrderDetail, VM_OrderView>()
                .ForMember(destination => destination.ShopId,
                options => options.MapFrom(source => Lib.Encryptor.Encrypt(source.supplierObj.id.ToString())))
                .ForMember(destination => destination.ShopName,
                options => options.MapFrom(source => source.supplierObj.name))
                .ForMember(destination => destination.ShopAvatar,
                options => options.MapFrom(source => source.supplierObj.imageObj.smallUrl))
                .ForMember(destination => destination.ShopUrl,
                options => options.MapFrom(source => CommonConstants.URL_MEMBER_PROFILE + source.supplierObj.memberUrlIdentity ))
                .ForMember(destination => destination.ShopPhone,
                options => options.MapFrom(source => source.supplierObj.telephoneNumber))
                .ForMember(destination => destination.ShopAddressText,
                options => options.MapFrom(source => source.supplierObj.addressObj.addressText))
                .ForMember(destination => destination.ShopWardName,
                options => options.MapFrom(source => source.supplierObj.addressObj.wardObj.name))
                .ForMember(destination => destination.ShopDistrictName,
                options => options.MapFrom(source => source.supplierObj.addressObj.districtObj.name))
                .ForMember(destination => destination.ShopProvinceName,
                options => options.MapFrom(source => source.supplierObj.addressObj.provinceObj.name))
                .ForMember(destination => destination.PaymentMethodId,
                options => options.MapFrom(source => source.paymentObj.id))
                .ForMember(destination => destination.PaymentMethodName,
                options => options.MapFrom(source => source.paymentObj.name))
                .ForMember(destination => destination.ShipMethodId,
                options => options.MapFrom(source => source.shipmethodObj.id))
                .ForMember(destination => destination.ShipMethodName,
                options => options.MapFrom(source => source.shipmethodObj.name))
                .ForMember(destination => destination.ReasonName,
                options => options.MapFrom(source => source.orderProcessObj.reasonObj.name))
                .ForMember(destination => destination.ReasonType,
                options => options.MapFrom(source => source.orderProcessObj.reasonObj.type))
                .ForMember(destination => destination.ReasonDescription,
                options => options.MapFrom(source => source.orderProcessObj.remark))
                .ForMember(destination => destination.orderItem,
                options => options.MapFrom(source => source.orderItemObj))
                .ForMember(destination => destination.ProcessStatus,
                options => options.MapFrom(source => source.orderProcessObj.processStatus))
                .ForMember(destination => destination.DoneAt,
                options => options.MapFrom(source => source.orderProcessObj.createdAt));
            #endregion

            //Home----------------
            #region Home
            CreateMap<M_SupplierOffice, VM_SupplierObj.SupplierOfficeObj>();
            CreateMap<M_Supplier, VM_SupplierObj>()
                .ForMember(destination => destination.Url,
                options => options.MapFrom(source => source.supplierConfigureObj.domainName))
                .ForMember(destination => destination.CountryName,
                options => options.MapFrom(source => source.addressObj.countryObj.name))
                .ForMember(destination => destination.ProvinceName,
                options => options.MapFrom(source => source.addressObj.provinceObj.name))
                .ForMember(destination => destination.DistrictName,
                options => options.MapFrom(source => source.addressObj.districtObj.name))
                .ForMember(destination => destination.WardName,
                options => options.MapFrom(source => source.addressObj.wardObj.name))
                .ForMember(destination => destination.AddressNumber,
                options => options.MapFrom(source => source.addressObj.addressNumber))
                .ForMember(destination => destination.AddressText,
                options => options.MapFrom(source => source.addressObj.addressText))
                .ForMember(destination => destination.Latitude,
                options => options.MapFrom(source => source.addressObj.latitude))
                .ForMember(destination => destination.Longitude,
                options => options.MapFrom(source => source.addressObj.longitude))
                .ForMember(destination => destination.ImageLogo,
                options => options.MapFrom(source => source.imageObj.mediumUrl))
                .ForMember(destination => destination.ImageFavicon,
                options => options.MapFrom(source => source.imageFavicon));
            #endregion

            //Category----------------
            #region Category
            CreateMap<M_Category, VM_Menu.Category>()
                .ForMember(destination => destination.ImageUrl,
                options => options.MapFrom(source => source.imageObj.smallUrl));
            CreateMap<M_Category, VM_CategoryDetail>()
                .ForMember(destination => destination.ImageUrl,
                options => options.MapFrom(source => source.imageObj.relativeUrl));
            #endregion

            //NewsCategory----------------
            #region NewsCategory
            CreateMap<M_NewsCategory, VM_Menu.NewsCategory>();
            #endregion

            //News -----
            #region News
            CreateMap<M_News, VM_NewsList>()
                .ForMember(destination => destination.ImageUrl,
                options => options.MapFrom(source => source.imageObj.relativeUrl))
                .ForMember(destination => destination.CategoryId,
                options => options.MapFrom(source => source.categoryObj.id))
                .ForMember(destination => destination.CategoryName,
                options => options.MapFrom(source => source.categoryObj.name))
                .ForMember(destination => destination.CategoryNameSlug,
                options => options.MapFrom(source => source.categoryObj.nameSlug));
            CreateMap<M_News, VM_NewsDetail>()
                .ForMember(destination => destination.ImageUrl,
                options => options.MapFrom(source => source.imageObj.relativeUrl))
                .ForMember(destination => destination.CategoryId,
                options => options.MapFrom(source => source.categoryObj.id))
                .ForMember(destination => destination.CategoryName,
                options => options.MapFrom(source => source.categoryObj.name))
                .ForMember(destination => destination.CategoryNameSlug,
                options => options.MapFrom(source => source.categoryObj.nameSlug));

            #endregion

            //Product--------
            #region Product
            CreateMap<M_Product, VM_ProductList>()
               .ForMember(destination => destination.Price,
               options => options.MapFrom(source => source.priceOut))
               .ForMember(destination => destination.ImageUrl,
               options => options.MapFrom(source => source.imageObj.relativeUrl));
            CreateMap<M_Product, VM_ProductDetail>()
               .ForMember(destination => destination.Price,
               options => options.MapFrom(source => source.priceOut));
            CreateMap<M_ProductDetail, VM_ProductDetail>()
               .ForMember(destination => destination.Price,
               options => options.MapFrom(source => source.priceOut))
               .ForMember(destination => destination.TradeMarkName,
               options => options.MapFrom(source => source.trademarkObj.name))
               .ForMember(destination => destination.UnitName,
               options => options.MapFrom(source => source.unitObj.name))
               .ForMember(destination => destination.CategoryId,
               options => options.MapFrom(source => source.categoryObj.id))
               .ForMember(destination => destination.CategoryParentId,
               options => options.MapFrom(source => source.categoryObj.parentId))
               .ForMember(destination => destination.CategoryParentName,
               options => options.MapFrom(source => source.categoryObj.parentObj.name))
               .ForMember(destination => destination.CategoryName,
               options => options.MapFrom(source => source.categoryObj.name));
            #endregion

            //Checkout----------------
            #region Checkout
            CreateMap<M_ShoppingCart.SplitShoppingCartObj, VM_ShoppingCartObj.ProductItem>()
               .ForMember(destination => destination.cartId,
               options => options.MapFrom(source => source.id))
               .ForMember(destination => destination.id,
               options => options.MapFrom(source => source.productId))
               .ForMember(destination => destination.categoryId,
               options => options.MapFrom(source => source.productObj.categoryId))
               .ForMember(destination => destination.name,
               options => options.MapFrom(source => source.productObj.name))
               .ForMember(destination => destination.nameSlug,
               options => options.MapFrom(source => source.productObj.nameSlug))
               .ForMember(destination => destination.status,
               options => options.MapFrom(source => source.productObj.status))
               .ForMember(destination => destination.imageUrl,
               options => options.MapFrom(source => source.imageObj.mediumUrl))
               .ForMember(destination => destination.quantity,
               options => options.MapFrom(source => source.quantity))
               .ForMember(destination => destination.unitName,
               options => options.MapFrom(source => source.unitObj.name));
            CreateMap<M_ShoppingCart.ShoppingCartItemObj, VM_ShoppingCartObj>()
               .ForMember(destination => destination.id,
               options => options.MapFrom(source => Lib.Encryptor.Encrypt(source.supplierObj.id.ToString())))
               .ForMember(destination => destination.supplierId,
               options => options.MapFrom(source => source.supplierObj.id.ToString()))
               .ForMember(destination => destination.shopName,
               options => options.MapFrom(source => source.supplierObj.name))
               .ForMember(destination => destination.addressObj,
               options => options.MapFrom(source => JsonConvert.SerializeObject(source.supplierObj.addressObj)))
               .ForMember(destination => destination.shopUrl,
               options => options.MapFrom(source => $"{CommonConstants.URL_MEMBER_PROFILE}{source.supplierObj.memberUrlIdentity}"));
            CreateMap<M_BankPerson, VM_BankList>()
               .ForMember(destination => destination.Number,
               options => options.MapFrom(source => source.number))
               .ForMember(destination => destination.BankName,
               options => options.MapFrom(source => source.bankObj.name))
               .ForMember(destination => destination.BankTradeName,
               options => options.MapFrom(source => source.bankObj.tradeName))
               .ForMember(destination => destination.PersonName,
               options => options.MapFrom(source => source.nameCard));
            CreateMap<M_BankSupplier, VM_BankList>()
               .ForMember(destination => destination.Number,
               options => options.MapFrom(source => source.number))
               .ForMember(destination => destination.BankName,
               options => options.MapFrom(source => source.bankObj.name))
               .ForMember(destination => destination.BankTradeName,
               options => options.MapFrom(source => source.bankObj.tradeName))
               .ForMember(destination => destination.PersonName,
               options => options.MapFrom(source => source.nameCard));
            #endregion

            //Account User----------------
            #region Account User
            CreateMap<M_Person, EM_Person>()
               .ForMember(destination => destination.imageUrl,
               options => options.MapFrom(source => source.imageObj.mediumUrl));
            #endregion

            //Banner
            #region Banner
            CreateMap<M_Banner, VM_BannerList>()
               .ForMember(destination => destination.imageUrl,
               options => options.MapFrom(source => source.imageObj.relativeUrl));
            #endregion


            //BankPerson
            CreateMap<M_BankSupplier, M_BankSupplierCustom>()
            .ForMember(destination => destination.supplierEncryptor,
            options => options.MapFrom(source => Lib.Encryptor.Encrypt(source.supplierId)));

            //Member
            #region Member
            CreateMap<M_Supplier, VM_MemberList>()
               .ForMember(destination => destination.identity,
               options => options.MapFrom(source => source.memberUrlIdentity))
               .ForMember(destination => destination.avatar,
               options => options.MapFrom(source => source.imageObj.mediumUrl))
               .ForMember(des => des.addressText,
               options => options.MapFrom(src => src.addressObj.addressText))
               .ForMember(des => des.provinceName,
               options => options.MapFrom(src => src.addressObj.provinceObj.name))
               .ForMember(des => des.districtName,
               options => options.MapFrom(src => src.addressObj.districtObj.name))
               .ForMember(des => des.wardName,
                 options => options.MapFrom(src => src.addressObj.wardObj.name))
               .ForMember(des => des.longitude,
                 options => options.MapFrom(src => src.addressObj.longitude))
               .ForMember(des => des.latitude,
               options => options.MapFrom(src => src.addressObj.latitude))
               .ForMember(destination => destination.shopName,
               options => options.MapFrom(source => source.name));
            CreateMap<M_Supplier, VM_MemberDetail>()
               .ForMember(destination => destination.Identity,
               options => options.MapFrom(source => source.memberUrlIdentity))
               .ForMember(destination => destination.Avatar,
               options => options.MapFrom(source => source.imageObj.mediumUrl))
               .ForMember(destination => destination.Banner,
               options => options.MapFrom(source => source.bannerUrl))
               .ForMember(destination => destination.Phone,
               options => options.MapFrom(source => source.telephoneNumber))
               .ForMember(des => des.Address,
               options => options.MapFrom(src => $"{(IsNullOrEmpty(src.addressObj.addressText) ? "" : src.addressObj.addressText + ", ")}{(IsNullOrEmpty(src.addressObj.wardObj.name) ? "" : src.addressObj.wardObj.name + ", ")}{(IsNullOrEmpty(src.addressObj.districtObj.name) ? "" : src.addressObj.districtObj.name + ", ")}{(IsNullOrEmpty(src.addressObj.provinceObj.name) ? "" : src.addressObj.provinceObj.name)}"))
               .ForMember(destination => destination.ShopName,
               options => options.MapFrom(source => source.name));
            CreateMap<M_Supplier, VM_MemberList>()
               .ForMember(destination => destination.identity,
               options => options.MapFrom(source => source.memberUrlIdentity))
               .ForMember(destination => destination.avatar,
               options => options.MapFrom(source => source.imageObj.mediumUrl))
               .ForMember(des => des.addressText,
               options => options.MapFrom(src =>src.addressObj.addressText))
               .ForMember(des => des.provinceName,
               options => options.MapFrom(src =>src.addressObj.provinceObj.name))
               .ForMember(des => des.districtName,
               options => options.MapFrom(src =>src.addressObj.districtObj.name))
               .ForMember(des => des.wardName,
               options => options.MapFrom(src =>src.addressObj.wardObj.name))
               .ForMember(destination => destination.shopName,
               options => options.MapFrom(source => source.name));
            CreateMap<M_Post, VM_ProfilePostList>()
               .ForMember(destination => destination.shopName,
               options => options.MapFrom(source => source.supplierObj.name))
               .ForMember(destination => destination.identityCre,
               options => options.MapFrom(source => source.supplierObj.memberUrlIdentity))
               .ForMember(destination => destination.avatarCre,
               options => options.MapFrom(source => source.supplierObj.imageObj.smallUrl))
               .ForMember(des => des.content,
               options => options.MapFrom(src => src.detail));
            #endregion

            //SupplierCarrier
            #region SupplierCarrier
            CreateMap<M_SupplierCarrier, VM_SupplierCarrier>()
               .ForMember(destination => destination.supplierId,
               options => options.MapFrom(source => Lib.Encryptor.Encrypt(source.supplierId.ToString())));
            #endregion

            #region OrderImage
            CreateMap<M_OrderImage, EM_OrderImage>();
            #endregion
        }
    }
}
