using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Models
{
    public class CertificateDetails
    {
        public string Country { get; set; }
        public string State { get; set; }
        public string Locality { get; set; }
        public string Organization { get; set; }
        public string Unit { get; set; }
        public string Cn { get; set; }
        public string Email { get; set; }
    }
}
