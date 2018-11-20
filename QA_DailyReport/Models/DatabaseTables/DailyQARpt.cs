using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QA_DailyReport.Models.DatabaseTables
{
    [Table("DailyQARpt")]
    public class DailyQARpt
    {
        [Key]
        public int ReportID { get; set; }
     public Nullable<System.DateTime> DateProduced { get; set; }
       // public String  DateProduced { get; set; }
    }
}