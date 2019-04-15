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
        private readonly ISshService _sshService;

        public CertificateService(DataContext dataCtx, ISshService sshService)
        {
            this._dataCtx = dataCtx;
            this._sshService = sshService;
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

        public async Task<CertificateRequest> CreateExistingCertificate(CertificateRequest incomingCertificate)
        {
            bool isValid = incomingCertificate.IsValid();
            if (!isValid)
            {
                throw new Exception("Object is not valid");
            }
            incomingCertificate.AlreadyCreated = false;

            return await _dataCtx.Certificates.Insert(incomingCertificate);
        }

        public async Task<CertificateRequest> GenerateCertificate(CertificateRequest incomingCertificate)
        {
            bool isValid = incomingCertificate.IsValidForGeneration();
            if (!isValid)
            {
                throw new Exception("Object is not valid");
            }

            _sshService.CreateCertificateAllCommands(incomingCertificate);

            incomingCertificate.Expires = DateTime.Now.AddYears(incomingCertificate.Duration);
            incomingCertificate.AlreadyCreated = true;

            return await _dataCtx.Certificates.Insert(incomingCertificate);
        }
    }
}
