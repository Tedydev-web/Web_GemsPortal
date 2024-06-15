using System;

namespace Web_GemsPortal.ViewModels.Result
{
    public class VM_Error
    {
        public int code { get; set; }
        public string message { get; set; }
        public VM_Error()
        {
            this.code = 200;
            this.message = "";
        }
        public VM_Error(int statusCode, string msg)
        {
            this.code = statusCode;
            this.message = msg;
        }
    }
}
