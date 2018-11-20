using QA_DailyReport.Models.RepositoryDeclaration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace QA_DailyReport.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

        RepositoryDeclaration repo = new RepositoryDeclaration();

        public ActionResult Index()
        {
            return View();
        }
	}
}