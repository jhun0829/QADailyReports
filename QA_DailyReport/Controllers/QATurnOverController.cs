using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QA_DailyReport.Models;
using QA_DailyReport.Models.Context;
using QA_DailyReport.Models.DatabaseTables;
using QA_DailyReport.Models.RepositoryDeclaration;
using QA_DailyReport.Models.ViewModel;
using System.Data.SqlClient;
using LinqKit;
using Newtonsoft.Json;
using System.Data.Entity;


namespace QA_DailyReport.Controllers
{
    public class QATurnOverController : Controller
    {
        //QADBContext db = new QADBContext();
        RepositoryDeclaration repo = new RepositoryDeclaration();
        //
        // GET: /QATurnOver/

        ////Session `
        //[QA_DailyReport.App_Start.FilterConfig.CheckSessionTimeOut]
        //[Authorize(Roles = "Admin")]
        public ActionResult Index()
        {
            //var xdatefr = datefr;
            //var xdateto = dateto;

            //   var TSYSdata = repo.dbContext.Database.SqlQuery<VMStatistical>("EXEC Load_TS_Stat @DateFrom,@DateTo", new SqlParameter("@DateFrom", datefr), new SqlParameter("@DateTo", dateto)).ToList();
           
            
            //original code working for graphs
            //var TSYSdata = repo.dbContext.Database.SqlQuery<VMStatistical>("SELECT '''' + FileNo + '''' AS FileNo,Tensile_Strength,Yield_Strength FROM  StatQARpt", "").ToList();

            //var fileno = (from stat in TSYSdata
            //              select stat.FileNo).ToList();

            //var ts = (from stat in TSYSdata
            //          select stat.Tensile_Strength).ToList();

            //var ys = (from stat in TSYSdata
            //          select stat.Yield_Strength).ToList();

            //var xfileno = String.Join(",", fileno);
            //var xts = String.Join(",", ts);
            //var xys = String.Join(",", ys);
            

            //ViewBag.FileNo_List = xfileno.Trim();
            //ViewBag.TS_List = xts.Trim();
            //ViewBag.YS_List = xys.Trim();
            // --------------- original code working for graphs
            return View();
        }

        //insert QTO information
        [HttpPost]
        public JsonResult InsertQATurnOver(QATurnOver qato)
        {
            //db.QTO.Add(qa);
            //db.SaveChanges();

            qato.LastIP  = this.Request.ServerVariables["REMOTE_ADDR"] == null ? "" : this.Request.ServerVariables["REMOTE_ADDR"] ;
            qato.Shift = qato.Shift == null ? "" : qato.Shift;
            qato.Size = qato.Size == null ? "" : qato.Size;
            qato.RebarTest = qato.RebarTest == null ? "" : qato.RebarTest;
            qato.Tempcore = qato.Tempcore == null ? "" : qato.Tempcore;
            qato.Sampler = qato.Sampler == null ? "" :  qato.Sampler;
            qato.WaterContent = qato.WaterContent == null ? "" : qato.WaterContent;
            qato.PreparedBy = qato.PreparedBy == null ? "" : qato.PreparedBy; 
            qato.LastDateTime = DateTime.Now;
            qato.ReportDate = DateTime.Now;
            qato.LastUser = qato.LastUser == null ? "" : qato.LastUser;

            repo.QATurnOverRepo.Add(qato);
            repo.QATurnOverRepo.SaveChanges();
            return Json("Successfully saved..");
        }

        //load QTO information
        [HttpPost]
        public JsonResult GetQTO(int Page)
        { 
             //var qaturnover = db.QTO.ToList();
            return Json(repo.QATurnOverRepo.GetQTO(Page));
        }

        //filter QTO
        [HttpPost]
        public JsonResult SearchQTO(string search,int Page)
        {   
                return Json(repo.QATurnOverRepo.SearchQTO(search, Page));     
        }

        //load qto to be edit
        [HttpPost]
        public JsonResult EditQTO(int ReportID)
        {
            //var qaturnover = db.QTO.ToList();
            return Json(repo.QATurnOverRepo.EditQTO(ReportID));
        }

        //run QTO edit
        [HttpPost]
        public JsonResult RunUpdate(QATurnOver qato)
        {
            
            //Working Original Code
            var message = new Object();


            //qato.ReportID = qato.ReportID;
            qato.Shift = qato.Shift;
            qato.Size = qato.Size;
            qato.RebarTest = qato.RebarTest;
            qato.Tempcore = qato.Tempcore;
            qato.Sampler = qato.Sampler;
            qato.WaterContent = qato.WaterContent;
            qato.PreparedBy = qato.PreparedBy == null ? "" : qato.PreparedBy;
            qato.LastDateTime = DateTime.Now;
            //qato.ReportDate = DateTime.Now;
            qato.ReportDate = qato.ReportDate;

            //repo.QATurnOverRepo.Update(qato);
            repo.dbContext.Entry(qato).State = EntityState.Modified;
            repo.dbContext.Entry(qato).Property(x => x.ReportDate).IsModified = false;
            repo.dbContext.SaveChanges();

            message = "Update Success";

            return Json(message);
        }

        //Delete QTO Details
        [HttpPost]
        public JsonResult RunDelete(int ReportID)
        {
            repo.QATurnOverRepo.DeleteQTO(ReportID);
            return Json("Data has been deleted");
        }

        [HttpPost]
        public JsonResult LoadDiameter()
        {
            var loadgrade = repo.dbContext.Database.SqlQuery<VMGrades>("Select '' Diameter UNION Select Diameter from Diameters", "").ToList();
            return Json(loadgrade);
        }

        [HttpPost]
        public JsonResult LoadQAStaff()
        {
            var loadQAStaff = repo.dbContext.Database.SqlQuery<VMQAStaff>("EXEC LoadQASpecialist", "").ToList();
             return Json(loadQAStaff);
        }
   
        //----------------------QA Daily Report--------------//
        [HttpPost]
        public JsonResult GetPhysicalData(int Page)
        {

            //DateTime fd = DateTime.Now.Date;
            //var FromDate = Convert.ToDateTime(fd.ToString("MM/dd/yyyy 7:00"));

            //DateTime td = DateTime.Now.Date;
            //td = td.AddDays(1);
            //var ToDate = Convert.ToDateTime(td.ToString("MM/dd/yyyy 19:00"));

            //List<Physical> physicalTB = db.Phy.ToList();
            //List<DailyQARpt> DailyQARptTB = db.DRPT.ToList();
            //var physical = from p in physicalTB
            //               where !(from q in DailyQARptTB
            //                       select q.FileNo)
            //                                  .Contains(p.FileNos) &&
            //                                   p.Test_Date >= FromDate && p.Test_Date <= ToDate
            //               orderby p.Test_Date ascending
            //               select p;

            //load with paeameter
            //var loadphysical = repo.dbContext.Database.SqlQuery<VMPhysical>("EXEC LoadPhysicalDataTimestamp  @param1,@param2", new SqlParameter("@param1", FromDate), new SqlParameter("@ProjectID", ToDate)).ToList();
            var loadphysical = repo.dbContext.Database.SqlQuery<VMPhysical>("EXEC LoadPhysicalDataTimestamp","").ToList();
            var query = loadphysical
                        .OrderBy(a => a.Test_Date)
                        .Skip((Page - 1) * 5)
                        .Take(5);
            return Json(query);
        }


        [HttpPost]
        public JsonResult LoadDailyReport(int Page,string search)
        {
            var loaddailyrptsummary = repo.dbContext.Database.SqlQuery<VMDailyQARpt>("EXEC LoadDailyReportSummary", "").ToList();
            var predicate = PredicateBuilder.New<VMDailyQARpt>();


            if (search != null)
            {
                predicate = predicate.And(a => (a.DateProduced.Contains(search)));
            }
            predicate = predicate.And(a => a.DateProduced != null);
            var query = loaddailyrptsummary
                     .Where(predicate)
                     .OrderByDescending(a => a.DateProduced)
                     .Skip((Page - 1) * 5)
                     .Take(5);
            return Json(query);
        }

        [HttpPost]
        public JsonResult LoadDailyReportSummary(int Page,string DateStamp,string search) 
        {
            var pFrmDate = new SqlParameter("@FromHr", DateStamp);

            var loaddailysummary = repo.dbContext.Database.SqlQuery<VMPhysical>("EXEC usp_LoadDailyRptDet @FromHr", pFrmDate).ToList();

            var predicate = PredicateBuilder.New<VMPhysical>();
            predicate = predicate.And(a => a.FileNos != null);

            if (search != "")
            {
                predicate = predicate.And(a => (a.Diameter).Contains(search) ||
                                                a.Grade.Contains(search) ||
                                                a.FileNos.Contains(search) ||
                                                a.BatchNo.Contains(search));
            }

            var searchvalue = loaddailysummary
                            .Where(predicate)
                            .OrderByDescending(a => a.Test_Date)
                            .Skip((Page - 1) * 5)
                            .Take(5);

            return Json(searchvalue);
        }
        
        [HttpPost]
        public JsonResult SearchDailyQA(string search, int Page)
        {
            var loadphysical = repo.dbContext.Database.SqlQuery<VMPhysical>("EXEC LoadPhysicalDataTimestamp", "").ToList();         
            var predicate = PredicateBuilder.New<VMPhysical>();
            predicate = predicate.And(a => a.FileNos != null);
            if (search != "")
            {
                predicate = predicate.And(a => (a.Diameter).Contains(search) ||
                                                a.Grade.Contains(search) ||
                                                a.FileNos.Contains(search) ||
                                                a.BatchNo.Contains(search));
            }

            var searchvalue = loadphysical
                        .Where(predicate)
                       .OrderByDescending(a => a.Test_Date)
                       .Skip((Page - 1) * 5)
                       .Take(5);
            return Json(searchvalue);
        }


        [HttpPost]
        public JsonResult InsertDailyQA()
        {
            var insertphysical = repo.dbContext.Database.SqlQuery<VMPhysical>("EXEC InsertDailyQAReport", "").ToList();      
            return Json("");
        }


        //---------------------- Statistical Process --------------------------//

        [HttpPost]
        public JsonResult GetPhysicalStatistic(string diameter, int Page)
        {

            var xdiameter = diameter;
            var statistical = repo.dbContext.Database.SqlQuery<VMStatistical>("EXEC LoadPhysicalStatTimestamp @diameter", new SqlParameter("@diameter", xdiameter)).ToList();
            var query = statistical
                        .OrderByDescending(a => a.DateProduced);
                        //.Skip((Page - 1) * 5)
                        //.Take(5);
            return Json(query);
        }

        [HttpPost]
        public JsonResult InsertStatReport(string diameter, string qastatff,string shift, int Page)
        {
            var xdiameter = diameter;
            var xstaff = qastatff;
            var xshift = shift;
            var xip = this.Request.ServerVariables["REMOTE_ADDR"] == null ? "" : this.Request.ServerVariables["REMOTE_ADDR"];
            var insertphysical = repo.dbContext.Database.SqlQuery<VMStatistical>("EXEC InsertStatQAReport @diameter,@QAStaff,@Shift,@LastIP", new SqlParameter("@diameter", xdiameter), new SqlParameter("@QAStaff", xstaff), new SqlParameter("@Shift", xshift), new SqlParameter("@LastIP", xip)).ToList();      
            return Json("");
        }

        [HttpPost]
        public JsonResult LoadStatisticalRpt(int Page,string search)
        {
            var statrpt = repo.dbContext.Database.SqlQuery<VMStatQARpt>("EXEC LoadStatReportSummary").ToList();
            var predicate = PredicateBuilder.New<VMStatQARpt>();
            predicate = predicate.And(a => a.DateProduced != null);

            if (search != null)
            {
                predicate = predicate.And(a => (a.DateProduced).Contains(search) ||
                                                a.Shift.ToString().Contains(search) ||
                                                a.Diameter.Contains(search) ||
                                                a.QAStaff.Contains(search));
            }

            var query = statrpt
                        .Where(predicate)
                        .OrderByDescending(a => a.DateProduced)
                        .Skip((Page - 1) * 5)
                        .Take(5);
            return Json(query);
        }


        [HttpPost]
        public JsonResult LoadStatisticalDetails(int Page, string dateProduce, string diameter, string search)
        {
            var xdiameter = diameter;
            var xdateproduce = dateProduce;
            //var FromDate = Convert.ToDateTime(dateProduce);

            var predicate = PredicateBuilder.New<VMStatistical>();
            var statdet = repo.dbContext.Database.SqlQuery<VMStatistical>("EXEC LoadPhysicalStatDiameterStamp @Diameter,@FromHr", new SqlParameter("@Diameter", xdiameter), new SqlParameter("@FromHr", xdateproduce)).ToList();

            predicate = predicate.And(a => a.DateProduced != null);

            if (search != null)
            {
                predicate = predicate.And(a => ((a.DateProduced).Contains(search) ||
                                                 a.FileNos.Contains(search) ||
                                                 a.Diameter.Contains(search) ||
                                                 a.Yield_Strength.ToString().Contains(search) ||
                                                 a.Tensile_Strength.ToString().Contains(search)));
            }

            var query = statdet
                        .Where(predicate)
                        .OrderBy(a => a.DateProduced)
                        .Skip((Page - 1) * 5)
                        .Take(5);
            return Json(query);
        }
        //public JsonResult LoadGraphs(string datefr, string dateto)
        //[HttpPost]
        //{
        //    var xdatefr = datefr;
        //    var xdateto = dateto;

        //    //   var TSYSdata = repo.dbContext.Database.SqlQuery<VMStatistical>("EXEC Load_TS_Stat @DateFrom,@DateTo", new SqlParameter("@DateFrom", datefr), new SqlParameter("@DateTo", dateto)).ToList();
        //    var TSYSdata = repo.dbContext.Database.SqlQuery<VMStatistical>("EXEC Load_TS_Stat", "").ToList();

        //    var fileno = (from stat in TSYSdata
        //                  select stat.Tensile_Strength).ToList();

        //    var ts = (from stat in TSYSdata
        //              select stat.Yield_Strength).ToList();

        //    ViewBag.FileNo_List = String.Join(",", fileno);
        //    ViewBag.TS_List = String.Join(",", ts);

        //    return Json("");
        //}


        public ContentResult LoadGraphs(int Page, string sdate)
        {
            //var pDate = new SqlParameter("@FromHr",sdate);

            //var TSYSdata = repo.dbContext.Database.SqlQuery<VMStatistical>("EXEC usp_LoadStatisticalData @FromHr", pDate).ToList();

            //var fileno = (from stat in TSYSdata
            //              select stat.FileNo).ToList();

            //var ts = (from stat in TSYSdata
            //          select stat.Tensile_Strength).ToList();

            //var ys = (from stat in TSYSdata
            //          select stat.Yield_Strength).ToList();

            //var xfileno = String.Join(",", fileno);
            //var xts = String.Join(",", ts);
            //var xys = String.Join(",", ys);
            

            //ViewBag.FileNo_List = xfileno.Trim();
            //ViewBag.TS_List = xts.Trim();
            //var gts = xts.Trim();
            //ViewBag.YS_List = xys.Trim();
            ////var gys = xys.Trim();

            var pDate = new SqlParameter("@FromHr", sdate);

            var TSYSdata = repo.dbContext.Database.SqlQuery<VMStatistical>("EXEC usp_LoadStatisticalData @FromHr", pDate).ToList();

            var fileno = (from stat in TSYSdata
                          orderby stat.Test_Date ascending
                          select new { stat.FileNos, stat.Tensile_Strength, stat.Yield_Strength }).ToList();

            //var ts = (from stat in TSYSdata
            //          select stat.Tensile_Strength).ToList();

            //var ys = (from stat in TSYSdata
            //          select stat.Yield_Strength).ToList();

            //var xfileno = String.Join(",", fileno);
            //var xts = String.Join(",", ts);
            //var xys = String.Join(",", ys);


            //ViewBag.FileNo_List = xfileno.Trim();
            //ViewBag.TS_List = xts.Trim();
            //var gts = xts.Trim();
            //ViewBag.YS_List = xys.Trim();
            //var gys = xys.Trim();

            JsonSerializerSettings _jsonSetting = new JsonSerializerSettings()
            {
                NullValueHandling = NullValueHandling.Ignore
            };



            return Content(JsonConvert.SerializeObject(fileno),"application/json");
        }
	}
}