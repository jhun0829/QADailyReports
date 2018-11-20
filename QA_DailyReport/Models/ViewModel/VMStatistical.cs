using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QA_DailyReport.Models.ViewModel
{
    public class VMStatistical
    {
        public String FileNos { get; set; }
        public Nullable<System.DateTime > Test_Date { get; set; }
        public String DateProduced { get; set; }
        public String Diameter { get; set; }
        public Double Yield_Strength { get; set; }
        public Double Tensile_Strength { get; set; }
    }
}