using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularSPAWebAPI.Models.DatabaseModels.General
{
    public class Image
    {
        public int ImageID { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string uri { get; set; }
    }
}
