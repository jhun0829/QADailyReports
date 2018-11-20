using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
namespace QA_DailyReport.Models
{
    //DataContract for Serializing Data - required to serve in JSON format
    [DataContract]
    public class ChartModels
    {
        public ChartModels(string label, double y)
		{
			this.Label = label;
			this.Y = y;
		}
 
		//Explicitly setting the name to be used while serializing to JSON.
		[DataMember(Name = "label")]
		public string Label = "";
 
		//Explicitly setting the name to be used while serializing to JSON.
		[DataMember(Name = "y")]
		public Nullable<double> Y = null;
    }
}