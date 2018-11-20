using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QA_DailyReport.Models.Core;
using QA_DailyReport.Models.DatabaseTables;
using QA_DailyReport.Models.ViewModel;
using QA_DailyReport.Models.RepositoryDeclaration;
using LinqKit;
using System.Data.Entity;

namespace QA_DailyReport.Models.Repositories
{
    public class QADailyReportRepository : Repository<DailyQARpt>
    {
        //public IEnumerable<DailyQARpt> GetDailyQARpt(int Page)
        //{
         
        //    var query =  DbSet                      
        //                .OrderBy(o => o.DateProduced)
        //                //.GroupBy(a => a.DateProduced)                       
        //                .Skip((Page - 1) * 5)
        //                .Take(5);

        //    var distinctdate = query
        //                       .Select(a => a.DateProduced).Distinct().ToList();
        //    return distinctdate;
        //}
    }
}