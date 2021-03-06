﻿using System;
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
            IEnumerable<CertificateRequest> certificates = await _certificateService.GetAllCertificates();
            return Ok(certificates);
        }

        [HttpGet("paged")]
        public async Task<IActionResult> Get([FromQuery] int page, [FromQuery] int size, [FromQuery] string sort)
        {
            try
            {
                Page<CertificateRequest> certificates = await _certificateService.GetCertificateSorted(page, size, sort);
                return Ok(certificates);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                CertificateRequest certificate = await _certificateService.GetCertificateById(id);
                return Ok(certificate);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromBody] CertificateRequest certificate)
        {
            try
            {
                CertificateRequest createdCertificate = await _certificateService.CreateExistingCertificate(certificate);
                return CreatedAtAction(nameof(GetById), new { id = createdCertificate.Id }, createdCertificate);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] string id)
        {
            try
            {
                _certificateService.DeleteCertificate(id);
                return Ok(new { deleted = true });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
