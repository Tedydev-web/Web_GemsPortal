namespace Web_GemsPortal.EditModels
{
    public class EM_ShoppingCardItem
    {
        public EM_ShoppingCardItem()
        {
            shoppingCartId = this.shoppingCartId;
            supplierId = this.supplierId;
            productId = this.productId;
            unitId = 0;
            quantity = 1;
            typeSizeId = 0;
            typeColorId = 0;
            isBigShop = 0;
        }

        public string shoppingCartId { get; set; }
        public string supplierId { get; set; }
        public int productId { get; set; }
        public int productPriceId { get; set; }
        public int quantity { get; set; }
        public int unitId { get; set; } = 0;
        public int typeSizeId { get; set; } = 0;
        public int typeColorId { get; set; } = 0;
        public int isBigShop { get; set; } = 0;
    }
}
