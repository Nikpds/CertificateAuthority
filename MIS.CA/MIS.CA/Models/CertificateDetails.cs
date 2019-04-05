using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Models
{
    public class CertificateDetails
    {
        public string CountryName { get; set; }
        public string StateName { get; set; }
        public string LocalityName { get; set; }
        public string OrganizationName { get; set; }
        public string UnitName { get; set; }
        public string CommonName { get; set; }
        public string Email { get; set; }
    }
}
