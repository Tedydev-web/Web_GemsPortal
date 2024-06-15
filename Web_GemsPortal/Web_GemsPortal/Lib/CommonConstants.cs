namespace Web_GemsPortal.Lib
{
    public class CommonConstants
    {
        public const int OWNER_SUPPLIER_ID = 1;
        public const string REFOCDE_SUPPLIER_ADMIN = "797590F6-012C-4EC8-9F2D-EC8D7261A3ED";
        public const int TIMEOUT_CHECK_AUTHENTICATION = 1;
        public const string CACHE_KEY_SUPPLIER_INFO = "supplier_info";
        public const string CACHE_KEY_CATEGORY = "category_list";
        public const string CACHE_KEY_NEWSCATEGORY = "newscategory_list";
        public const string CACHE_KEY_TOPBANNER = "top_banner";
        public const string URL_MEMBER_PROFILE = "https://gemsgroup.tmdt247.vn/npp/";
        public const string URL_VIEW_ORDER_ADMIN = "https://admin-gemsgroup.tmdt247.vn/";
        public const string DOMAIN_URL = "gemsgroup.tmdt247.vn";
        public static int HUB_ID = 1;
        public static string URL_CURRENT = "";

        //Template SMS
        public const string TEMPLATE_USER_AND_PASSWORD = "1288367";
        public const string TEMPLATE_NEW_ORDER = "1288366";
        public const string TEMPLATE_THANK_YOU_CUSTOMER = "1288430";
        public const string TEMPLATE_NEW_REGISTER = "1270489";
        public const string BRAND_NAME = "GEMSGROUP";

        public static void SetHubId(int? hubId)
        {
            HUB_ID = hubId.HasValue ? hubId.Value : 0;
        }
        public static void SetHubUrl(string url)
        {
            URL_CURRENT = url;
        }
    }
}
