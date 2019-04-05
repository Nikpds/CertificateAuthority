using MIS.CA.Models;
using MIS.CA.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Services
{
    public class CertificateService
    {

    //    private readonly CertificateRepository _certificateRepository;

    //    public CertificateService(CertificateRepository certificateRepository)
    //    {
    //        this._certificateRepository = certificateRepository;
    //    }

    //    public IEnumerable<Certificate> GetAllCertificates()
    //    {
    //        return _certificateRepository.GetAll();
    //    }

    //    public Certificate GetCertificateById(string certificateId)
    //    {
    //        if (String.IsNullOrEmpty(certificateId))
    //        {
    //            throw new Exception("Id cannot be null or empty");
    //        }
    //        Certificate certificate = _certificateRepository.GetById(certificateId);
    //        if (String.IsNullOrEmpty(certificateId))
    //        {
    //            throw new Exception("Certificate was not found");
    //        }
    //        return certificate;
    //    }

    //    public Certificate CreateCertificate(Certificate incomingCertificate)
    //    {
    //        bool isValid = incomingCertificate.IsValid();
    //        if (!isValid)
    //        {
    //            throw new Exception("Object is not valid");
    //        }
    //        incomingCertificate.Id = null;

    //        return _certificateRepository.Insert(incomingCertificate);
    //    }
 }
}
