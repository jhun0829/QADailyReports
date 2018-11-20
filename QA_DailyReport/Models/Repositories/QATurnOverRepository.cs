using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using QA_DailyReport.Models.Core;
using QA_DailyReport.Models.DatabaseTables;
using LinqKit;

namespace QA_DailyReport.Models.Repositories
{
    public class QATurnOverRepository : Repository<QATurnOver>
    {
        public IEnumerable<QATurnOver> GetQTO(int Page)
        {
            //JavaScriptSerializer j = new JavaScriptSerializer();
            var query =
                DbSet
                .OrderByDescending(a => a.ReportID)
                .Skip((Page - 1) * 5)
                .Take(5);
            return query.ToList();
        }

        public IEnumerable<QATurnOver> SearchQTO(string search,int Page)
        {
            //JavaScriptSerializer j = new JavaScriptSerializer();
            var predicate = PredicateBuilder.New<QATurnOver>();
            predicate = predicate.And(a => a.ReportID != null);
            if (search != "")
            {
                predicate = predicate.And(a => (a.Size).Contains(search) ||
                                                a.LastUser.Contains(search));
            }
            var query =
                DbSet
                .Where(predicate)
                .OrderByDescending(a => a.ReportID)
                .Skip((Page - 1) * 5)
                .Take(5);
            return query.ToList();
        }

        public IEnumerable<QATurnOver> EditQTO(int ReportID)
        {
            //JavaScriptSerializer j = new JavaScriptSerializer();

         
            var query =
                DbSet
             .Where(a => a.ReportID == ReportID);
            return query.ToList();
        }

        public IEnumerable<QATurnOver> DeleteQTO(int ReportID)
        {
            QATurnOver qto = dbContext.QTO.Find(ReportID);
            dbContext.QTO.Remove(qto);
            dbContext.SaveChanges();
            
            return GetQTO(1);
        }
        
    }
}