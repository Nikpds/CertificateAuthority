using MIS.CA.Models;
using MIS.CA.Repositories;
using MIS.CA.Util;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MIS.CA.Services
{
    public class CertificateService
    {

        private readonly DataContext _dataCtx;

        public CertificateService(DataContext dataCtx)
        {
            this._dataCtx = dataCtx;
        }

        public async Task<IEnumerable<CertificateRequest>> GetAllCertificates()
        {
            return await _dataCtx.Certificates.GetAll();
        }

        public async Task<CertificateRequest> GetCertificateById(string certificateId)
        {
            if (String.IsNullOrEmpty(certificateId))
            {
                throw new Exception("Id cannot be null or empty");
            }
            CertificateRequest certificate = await _dataCtx.Certificates.GetById(certificateId);
            if (String.IsNullOrEmpty(certificateId))
            {
                throw new Exception("Certificate was not found");
            }
            return certificate;
        }

        public async Task<CertificateRequest> CreateCertificate(CertificateRequest incomingCertificate)
        {
            bool isValid = incomingCertificate.IsValid();
            if (!isValid)
            {
                throw new Exception("Object is not valid");
            }

            return await _dataCtx.Certificates.Insert(incomingCertificate);
        }
    }
}
