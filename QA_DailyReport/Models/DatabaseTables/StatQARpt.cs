using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QA_DailyReport.Models.DatabaseTables
{
    [Table("StatQARpt")]
    public class StatQARpt
    {
        [Key]
        public int ReportID { get; set; }

        public Nullable<System.DateTime> ReportDate { get; set; }
        public String FileNos { get; set; }
        public String DateProduced { get; set; }
        public String Diameter { get; set; }
        public Double Tensile_Strength { get; set; }
        public Double Yield_Strength { get; set; }
        public String QAStaff { get; set; }
        public String QAHead { get; set; }
        public String LastUser { get; set; }
        public String LastIP { get; set; }
        public Nullable<System.DateTime> LastDateTime  { get; set; }
    }
}