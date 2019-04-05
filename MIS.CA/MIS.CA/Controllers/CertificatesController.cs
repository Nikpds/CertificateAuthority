using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MIS.CA.Models;
using MIS.CA.Services;

namespace MIS.CA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CertificatesController : ControllerBase
    {
        //private readonly CertificateService _certificateService;

        //public CertificatesController(CertificateService certificateService)
        //{
        //    this._certificateService = certificateService;
        //}
  
        //[HttpGet]
        //public IEnumerable<Certificate> Get()
        //{
        //    return _certificateService.GetAllCertificates();
        //}
        
        //[HttpGet("{id}")]
        //public Certificate GetById(string id)
        //{
        //    return _certificateService.GetCertificateById(id);
        //}
        
        //[HttpPost]
        //public ActionResult Create([FromBody] Certificate certificate)
        //{
        //    Certificate createdCertificate = _certificateService.CreateCertificate(certificate);
        //    return CreatedAtAction(nameof(GetById), new { id = createdCertificate.Id }, createdCertificate);
        //}
    }
}
