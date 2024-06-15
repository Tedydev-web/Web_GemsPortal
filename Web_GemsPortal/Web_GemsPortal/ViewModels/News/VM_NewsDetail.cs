using System;

namespace Web_GemsPortal.ViewModels.News
{
    public class VM_NewsDetail
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string TitleSlug { get; set; }
        public int CategoryId { get; set; } = 0;
        public DateTime CreatedAt { get; set; }
        public string CategoryName { get; set; }
        public string CategoryNameSlug { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Detail { get; set; }
    }
}
