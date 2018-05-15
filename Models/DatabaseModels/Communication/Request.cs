using AngularSPAWebAPI.Models.DatabaseModels.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularSPAWebAPI.Models.DatabaseModels.Communication
{
    public class Request
    {
    public int RequestID { get; set; }
    public string Name { get; set; }
    public Company Company { get; set; }
    public string Message { get; set; }
    public string Status { get; set; }
    public DateTime Create { get; set; }
    public bool UserViewed { get; set; }
  }
}
