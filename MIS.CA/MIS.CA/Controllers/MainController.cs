using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using MIS.CA.Models.Views;
using MIS.CA.Services;
using Renci.SshNet;

namespace MIS.CA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {

        private ISshService _isshService;
        private IFtpService _iftpService;

        public MainController(ISshService isshService, IFtpService iftpService)
        {
            this._isshService = isshService;
            this._iftpService = iftpService;
        }

        [HttpPost("{filename}")]
        public IActionResult DownloadFile(string filename, [FromBody] Folder folder)
        {


            try
            {
                string host = "192.168.1.71";
                string username = "root";
                string password = "123456";
                string localFileName = Path.GetFileName(@"C:\MyData");
                string path = @"c:\temp\MyTest.txt";
                using (var sftp = new SftpClient(host, username, password))
                {
                    sftp.Connect();

                    var directory = sftp.ListDirectory("/root");
                    using (var file = System.IO.File.OpenWrite(path))
                    {
                        sftp.BeginDownloadFile("/root/temp.txt", file);
                    }

                    sftp.Disconnect();
                }
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest("Server Error while downloading file. Error :" + ex.Message);
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

        [HttpDelete("{filename}")]
        public IActionResult DeleteFile(string filename)
        {

            if (string.IsNullOrEmpty(filename))
            {
                return BadRequest("Filename is mandatory");
            }
            try
            {

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest("Error while listing directory.Error :" + ex.Message);
            }
        }
    }
}