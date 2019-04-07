using MIS.CA.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Repositories
{
    public class DataContext
    {
        public IMongoDatabase Database { get; private set; }
        public MongoDbRepository<CertificateRequest> Certificates { get; private set; }

        public DataContext(string connectionString)
        {
            var url = new MongoUrl(connectionString);

            MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
            var client = new MongoClient(settings);
            if (url.DatabaseName == null)
            {
                throw new ArgumentException("Your connection string must contain a database name", connectionString);
            }
            this.Database = client.GetDatabase(url.DatabaseName);

            Certificates = new MongoDbRepository<CertificateRequest>(this.Database, "Certificates");
        }
    }
}
