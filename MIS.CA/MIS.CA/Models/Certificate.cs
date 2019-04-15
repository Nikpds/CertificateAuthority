using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MIS.CA.Models {
    public class CertificateRequest : BaseModel {
        public string PrivateKey { get; set; }

        public string Certificate { get; set; }

        public DateTime Expires { get; set; }

        public CertificateDetails Request { get; set; }

        [BsonIgnore]
        public int Duration { get; set; }

        public string Owner { get; set; }

        public string Unit { get; set; }

        public bool AlreadyCreated { get; set; }
    }
}