using MIS.CA.Models;
using MIS.CA.Repositories;
using MIS.CA.Util;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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

        public async Task<Page<CertificateRequest>> GetCertificateSorted(int page, int size, string sort)
        {
            SortDefinition<CertificateRequest> sortDefinition = CreateSortDefinition(sort);
            IEnumerable<CertificateRequest> certificates = await _dataCtx.Certificates.GetPageSorted(FilterDefinition<CertificateRequest>.Empty, sortDefinition, page, size);
            int total = await _dataCtx.Certificates.Count(FilterDefinition<CertificateRequest>.Empty);
            return new Page<CertificateRequest>(page, size, total, certificates);
        }

        public async Task<IEnumerable<CertificateRequest>> GetAllCertificates()
        {

            Debug.WriteLine(Builders<CertificateRequest>.Sort.Ascending("antonis").Descending("antonis2"));
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

        public async void DeleteCertificate(string id)
        {

            bool deleted = await _dataCtx.Certificates.Delete(id);
            if (!deleted)
            {
                throw new Exception("The Certificate was not found");
            }
        }

        private SortDefinition<CertificateRequest> CreateSortDefinition(string sort)
        {
            IList<SortDefinition<CertificateRequest>> sortDefinitions = new List<SortDefinition<CertificateRequest>>();
            if (!String.IsNullOrEmpty(sort))
            {
                if (sort.Contains(" "))
                {
                    throw new Exception("Sort parameter can not contain whitespace characters");
                }
                string[] sorts = sort.Split(",");
                foreach (string sortOption in sorts)
                {
                    string[] options = sortOption.Split(":");
                    if (options.Length != 2)
                    {
                        throw new Exception("Sorting params must be alligned with the following format: [COLUMN:{asc|desc}[,]]*");
                    }
                    if (options[1].ToUpper() == "ASC")
                    {
                        sortDefinitions.Add(Builders<CertificateRequest>.Sort.Ascending(options[0]));
                    }
                    else if (options[1].ToUpper() == "DESC")
                    {
                        sortDefinitions.Add(Builders<CertificateRequest>.Sort.Descending(options[0]));
                    }
                    else
                    {
                        throw new Exception("Invalid Sort Object");
                    }
                }
            }
            return Builders<CertificateRequest>.Sort.Combine(sortDefinitions);
        }
           
    }
}
