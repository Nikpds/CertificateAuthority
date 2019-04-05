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
        private readonly CertificateService _certificateService;

        public CertificatesController(CertificateService certificateService)
        {
            this._certificateService = certificateService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IEnumerable<Certificate> certificates = await _certificateService.GetAllCertificates();
            return Ok(certificates);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                Certificate certificate = await _certificateService.GetCertificateById(id);
                return Ok(certificate);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Certificate certificate)
        {
            try
            {
                Certificate createdCertificate = await _certificateService.CreateCertificate(certificate);
                return CreatedAtAction(nameof(GetById), new { id = createdCertificate.Id }, createdCertificate);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
