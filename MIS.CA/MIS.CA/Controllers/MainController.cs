using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MIS.CA.Models;
using MIS.CA.Models.Views;
using MIS.CA.Services;
using MIS.CA.Util;
using Renci.SshNet;

namespace MIS.CA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {

        private ISshService _isshService;
        private ISftpService _isftpService;
        private CertificateService _certificateService;

        public MainController(ISshService isshService, ISftpService isftpService, CertificateService certificateService)
        {
            this._isshService = isshService;
            this._isftpService = isftpService;
            this._certificateService = certificateService;
        }

        [HttpGet("{directory}/{filename}")]
        public IActionResult DownloadFile(string directory, string filename)
        {
            try
            {
                byte[] file = _isftpService.DownloadFile(directory, filename);
                return File(file, "application/text", filename);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateRequestAsync([FromBody] CertificateRequest certificateRequest)
        {
            try
            {
                CertificateRequest createdCertificate = await _certificateService.GenerateCertificate(certificateRequest);
                return Created("api/certificates/" + createdCertificate.Id, createdCertificate);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("ls/{directory}")]
        public IActionResult ListDirectory(string directory)
        {

            if (string.IsNullOrEmpty(directory))
            {
                return BadRequest("Directory is mandatory");
            }
            try
            {
                IEnumerable<string> files = _isshService.ListDirectory(directory);
                return Ok(files);
            }
            catch (Exception ex)
            {
                return BadRequest("Error while listing directory.Error :" + ex.Message);
            }
        }

        [HttpDelete("{directory}/{filename}")]
        public IActionResult DeleteFile(string directory, string filename)
        {

            if (string.IsNullOrEmpty(directory))
            {
                return BadRequest("Filename is directory");
            }
            if (string.IsNullOrEmpty(filename))
            {
                return BadRequest("Filename is mandatory");
            }
            try
            {
                _isshService.DeleteFile(filename, directory);
                return Ok(new { deleted = true });
            }
            catch (Exception ex)
            {
                return BadRequest("Error while listing directory.Error :" + ex.Message);
            }
        }

        [HttpPost("crt/request")]
        public IActionResult CreateCertificate([FromBody] CertificateRequest request)
        {
            try
            {

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}