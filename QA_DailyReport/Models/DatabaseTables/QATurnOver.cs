using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace QA_DailyReport.Models.DatabaseTables
{
    [Table("QATurnOver")]
    public class QATurnOver
    {
        [Key]
        public int ReportID { get; set; }

        public Nullable<System.DateTime> LastDateTime { get; set; }
        public Nullable<System.DateTime> ReportDate { get; set; }
        public string Shift { get; set; }
        public string Size { get; set; }
        public string RebarTest { get; set; }
        public string Tempcore { get; set; }
        public string Sampler { get; set; }
        public string WaterContent { get; set; }
        public string PreparedBy { get; set; }
        public string LastUser { get; set; }
        public string LastIP { get; set; }
    }
}