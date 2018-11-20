using QA_DailyReport.Models.Context;
using QA_DailyReport.Models.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QA_DailyReport.Models.RepositoryDeclaration
{
    public class RepositoryDeclaration
    {
        public QADBContext dbContext = new QADBContext();
        public QATurnOverRepository QATurnOverRepo = new QATurnOverRepository();
        public QADailyReportRepository DailyQARepo = new QADailyReportRepository();
        public QAStatReportRepository StatRptRepo = new QAStatReportRepository();
    }
}