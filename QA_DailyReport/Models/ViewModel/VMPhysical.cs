using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace QA_DailyReport.Models.ViewModel
{
    public class VMPhysical
    {
        public String FileNos { get; set; }
        public Nullable<System.DateTime> Test_Date { get; set; }
        public String Diameter { get; set; }
        public String BatchNo { get; set; }
        public String Grade { get; set; }
        public Double Yield_Strength { get; set; }
        public Double Tensile_Strength { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public Double TSYS { get; set; }
        public Double Elongation { get; set; }
        public Double Spacing { get; set; }
        public Double Height { get; set; }
        public Double Gap { get; set; }
        public Double Mass_Variation { get; set; }
        public Boolean Bend_Test { get; set; }
        public String Remarks { get; set; }
    }
}