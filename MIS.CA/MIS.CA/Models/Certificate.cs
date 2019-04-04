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
    public class Certificate: IModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id {get; set;}

        public string Name { get; set; }

        public string Apps { get; set; }

        public DateTime EndDate { get; set; }

        public string Unit { get; set; }

        public CertificateDetails CertificateDetails { get; set; }

    }
}
