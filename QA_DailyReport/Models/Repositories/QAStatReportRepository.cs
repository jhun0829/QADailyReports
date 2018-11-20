using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QA_DailyReport.Models.Core;
using QA_DailyReport.Models.DatabaseTables;

namespace QA_DailyReport.Models.Repositories
{
    public class QAStatReportRepository : Repository<StatQARpt>
    {
        //public IEnumerable<StatQARpt> GetStatDet(int Page,DateTime reportdate,string diameter)
        //{

        //        DateTime fd = reportdate;
        //        var FromDate = Convert.ToDateTime(fd.ToString("MM/dd/yyyy 00.00.000"));
        //        var ToDate = Convert.ToDateTime(fd.ToString("MM/dd/yyyy 00.00.000"));

        //        //var query = DbSet
        //        //            .Where(a => a.DateProduced == FromDate && a.Diameter == diameter)
        //        //            .OrderBy (a => a.ReportID)
        //        //            .Skip((Page - 1) * 5)
        //        //            .Take(5);     

        //        var query = DbSet
        //                      .Where(a => a.DateProduced >= FromDate.ToString() && a.DateProduced <= ToDate && a.Diameter == diameter)
        //                      .OrderBy(a => a.ReportID)
        //                      .Skip((Page - 1) * 5)
        //                      .Take(5);             
  
        //        return query.ToList();           
        //}
    }
}