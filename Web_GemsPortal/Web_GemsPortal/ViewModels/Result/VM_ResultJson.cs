using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Web_GemsPortal.ViewModels.Result
{
    public class VM_ResultJson : Controller
    {
        /// <summary>
        /// Method is response JsonResult
        /// </summary>
        /// <param name="IsSuccess">true is success and false is oppsite</param>
        /// <param name="MessageErr">send message (push notification) to display</param>
        /// <returns></returns>
        public JsonResult Success(bool IsSuccess, string MessageErr)
        {
            return Json(new
            {
                isSuccess = IsSuccess,
                messageErr = MessageErr
            });
        }

        /// <summary>
        /// Method is response JsonResult<typeparamref name="T"/>
        /// </summary>
        /// <param name="IsSuccess">true is success and false is oppsite</param>
        /// <param name="MessageErr">send message (push notification) to display</param>
        /// <returns></returns>
        public JsonResult Success<T>(bool IsSuccess, string MessageErr, T t)
        {
            return Json(new
            {
                isSuccess = IsSuccess,
                messageErr = MessageErr,
                Data = t
            });
        }

        /// <summary>
        /// Method is response async JsonResult
        /// </summary>
        /// <param name="IsSuccess">true is success and false is oppsite</param>
        /// <param name="MessageErr">send message (push notification) to display</param>
        public async Task<JsonResult> SuccessAsync(bool IsSuccess, string MessageErr)
        {
            Func<JsonResult> result = () => {
                return Json(new
                {
                    isSuccess = IsSuccess,
                    messageErr = MessageErr
                });
            };

            Task<JsonResult> task = new Task<JsonResult>(result);
            task.Start();
            return await task;
        }

        internal object Success(bool v, object p)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Method is response async JsonResult<typeparamref name="T"/>
        /// </summary>
        /// <param name="IsSuccess">true is success and false is oppsite</param>
        /// <param name="MessageErr">send message (push notification) to display</param>
        public async Task<JsonResult> SuccessAsync<T>(bool IsSuccess, string MessageErr, T t)
        {
            Func<JsonResult> result = () => {
                return Json(new
                {
                    isSuccess = IsSuccess,
                    messageErr = MessageErr,
                    data = t
                });
            };

            Task<JsonResult> task = new Task<JsonResult>(result);
            task.Start();
            return await task;
        }
    }
}