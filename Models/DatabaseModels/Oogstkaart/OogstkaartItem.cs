using AngularSPAWebAPI.Models.DatabaseModels.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart
{
    public class OogstkaartItem
    {
        public int OogstkaartItemID { get; set; }
        public DateTime CreateDate { get; set; }
        public string Omschrijving { get; set; }
        public string AfbeeldingURL { get; set; }
        public string Jansenserie { get; set; }
        public string Coating { get; set; }
        public string Glassamenstelling { get; set; }
        public DateTime DatumBeschikbaar { get; set; }
        public Company Company { get; set; }
        public int Hoeveelheid { get; set; }
        public string Afmetingen { get; set; }
        public Weight Weight { get; set; }
        public float VraagPrijsPerEenheid { get; set; }
        public float VraagPrijsTotaal { get; set; }
        public bool TransportInbegrepen { get; set; }
        public string Status { get; set; }

    }
}
