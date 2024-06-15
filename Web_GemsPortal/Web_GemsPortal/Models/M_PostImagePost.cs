namespace Web_GemsPortal.Models
{
    public class M_PostImagePost
    {
        public int postId { get; set; }
        public int imagePostId { get; set; }
        public string title { get; set; }
        public int status { get; set; }
        public M_Image imagePostObj { get; set; }
    }
}
