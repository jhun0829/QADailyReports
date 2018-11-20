using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using QA_DailyReport.Models.DatabaseTables; 

namespace QA_DailyReport.Models.Context
{
    public class QADBContext : DbContext
    {
        public DbSet<QATurnOver> QTO { get; set; }
        public DbSet<DailyQARpt> DRpt { get; set; }
        public DbSet<StatQARpt> SRpt { get; set; }
    }
}