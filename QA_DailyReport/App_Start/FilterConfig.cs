using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Mvc;
using System.Web.Routing;

namespace QA_DailyReport.App_Start
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());

        }
        [AttributeUsage(AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
        public class CheckSessionTimeOutAttribute : ActionFilterAttribute
        {
            public override void OnActionExecuting(System.Web.Mvc.ActionExecutingContext filterContext)
            {
                var context = filterContext.HttpContext;
                if (context.Session != null)
                {
                    if (context.Session.IsNewSession)
                    {
                        string sessionCookie = context.Request.Headers["Cookie"];
                        if ((sessionCookie != null) && (sessionCookie.IndexOf("ASP.NET&#95;SessionId") >= 0))
                        {
                            FormsAuthentication.SignOut();
                            string redirectTo = "~/Login/Index";
                            if (!string.IsNullOrEmpty(context.Request.RawUrl))
                            {
                                redirectTo = string.Format("~/Login/Index?ReturnUrl={0}", HttpUtility.UrlEncode(context.Request.RawUrl));
                            }
                            filterContext.HttpContext.Response.Redirect(redirectTo, true);
                        }
                    }
                }
                base.OnActionExecuting(filterContext);
            }
        }
    }
}