using Microsoft.AspNetCore.Mvc;
using Web_GemsPortal.ViewModels;
using static System.String;

namespace Web_GemsPortal.ExtensionMethods
{
	public static class SetViewDataSEOExtensionMethod
	{
		public static void SetViewDataSEODefaultAll(this Controller controller, VM_ViewDataSEO model)
		{
			controller.ViewData["Title"] = IsNullOrEmpty(model.Title) ? controller.ViewBag.SupplierInfo?.name : model.Title;
			controller.ViewData["Keywords"] = IsNullOrEmpty(model.Keywords) ? controller.ViewBag.SupplierInfo?.name : model.Keywords;
			controller.ViewData["Description"] = IsNullOrEmpty(model.Description) ? controller.ViewBag.SupplierInfo?.description : model.Description;
			controller.ViewData["ImagePreview"] = IsNullOrEmpty(model.Image) ? controller.ViewBag.SupplierInfo?.imageObj?.mediumUrl : $"https://{controller.HttpContext.Request.Host}{model.Image}";
		}
		public static void SetViewDataSEODefaultAllStaticImagePrevice(this Controller controller, VM_ViewDataSEO model)
		{
			controller.ViewData["Title"] = IsNullOrEmpty(model.Title) ? controller.ViewBag.SupplierInfo?.name : model.Title;
			controller.ViewData["Keywords"] = IsNullOrEmpty(model.Keywords) ? controller.ViewBag.SupplierInfo?.name : model.Keywords;
			controller.ViewData["Description"] = IsNullOrEmpty(model.Description) ? controller.ViewBag.SupplierInfo?.description : model.Description;
			controller.ViewData["ImagePreview"] = $"https://{controller.HttpContext.Request.Host}{model.Image}";
		}
		public static void SetViewDataSEOCustom(this Controller controller, VM_ViewDataSEO model)
		{
			controller.ViewData["Title"] = model.Title;
			controller.ViewData["Keywords"] = model.Keywords;
			controller.ViewData["Description"] = model.Description;
			controller.ViewData["ImagePreview"] = IsNullOrEmpty(model.Image) ? controller.ViewBag.SupplierInfo?.imageObj?.mediumUrl : model.Image;
		}
		public static void SetViewDataSEOCustomStaticImagePrevice(this Controller controller, VM_ViewDataSEO model)
		{
			controller.ViewData["Title"] = model.Title;
			controller.ViewData["Keywords"] = model.Keywords;
			controller.ViewData["Description"] = model.Description;
			controller.ViewData["ImagePreview"] = $"https://{controller.HttpContext.Request.Host}{model.Image}";
		}
	}
}
