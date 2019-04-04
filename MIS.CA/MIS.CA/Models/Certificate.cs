using MIS.CA.Attributes;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Models
{
    [Collection("Certificates")]
    public class Certificate: BaseModel
    {        

        public string Name { get; set; }

        public string Application { get; set; }

        public DateTime EndDate { get; set; }

        public string Unit { get; set; }

        public CertificateDetails CertificateDetails { get; set; }

    }
}
