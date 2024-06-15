using Microsoft.AspNetCore.Mvc;

namespace Web_GemsPortal.ViewComponents
{
    [ViewComponent(Name = "Menu")]
    public class MenuComponent : ViewComponent
    {
        public IViewComponentResult Invoke(int maxPriority, bool isDone)
        {
            return View("Default");
        }
    }
}
