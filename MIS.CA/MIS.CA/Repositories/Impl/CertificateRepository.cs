using MIS.CA.Models;
using MongoDB.Driver;
using MIS.CA.Repositories.Impl;

namespace MIS.CA.Implementation
{
    public class CertificateRepository: Repository<Certificate>
    {
        public CertificateRepository(IMongoDatabase db) : base(db)
        {
        }
    }
}
