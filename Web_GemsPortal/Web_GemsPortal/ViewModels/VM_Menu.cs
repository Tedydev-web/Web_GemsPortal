using Web_GemsPortal.Models;
using Web_GemsPortal.ViewModels.Banner;
using System;
using System.Collections.Generic;

namespace Web_GemsPortal.ViewModels
{
    public class VM_Menu
    {
        public VM_Menu()
        {
            Categorys = new List<Category>();
            NewsCategorys = new List<NewsCategory>();
            AboutCategorys = new List<AboutCategory>();
            TopBanner = new List<VM_BannerList>();
        }

        public VM_Menu(List<Category> categorys, List<NewsCategory> newsCategorys, List<AboutCategory> aboutCategorys, List<VM_BannerList> topBanners)
        {
            Categorys = categorys;
            NewsCategorys = newsCategorys;
            AboutCategorys = aboutCategorys;
            TopBanner = topBanners;
        }

        public List<Category> Categorys { get; set; }
        public List<NewsCategory> NewsCategorys { get; set; }
        public List<AboutCategory> AboutCategorys { get; set; }
        public List<VM_BannerList> TopBanner { get; set; }
        public class Category
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string NameSlug { get; set; }
            public string ImageUrl { get; set; }
            public List<Category> ChildMenu { get; set; }
        }
        public class NewsCategory
        {
            public int Id { get; set; }
            public EN_NewsCategoryTypeId TypeId { get; set; }
            public string Name { get; set; }
            public string NameSlug { get; set; }
        }
        public class AboutCategory
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string TitleSlug { get; set; }
        }
    }
}
