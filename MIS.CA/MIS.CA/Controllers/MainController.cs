using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.NodeServices;

namespace MIS.CA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        public MainController()
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetKeyAsync()
        {
            
            var file = "ca.cert.pem";
            var url = "ftp://" + "192.168.1.20/" + file;
            Uri serverUri = new Uri(url);
            if (serverUri.Scheme != Uri.UriSchemeFtp)
            {
                return BadRequest();
            }
            // Get the object used to communicate with the server.
            WebClient request = new WebClient();
            // This example assumes the FTP site uses anonymous logon.
            request.Credentials = new NetworkCredential("geakmh", "geakmh");
            try
            {
                byte[] newFileData = request.DownloadData(serverUri.ToString());
                string fileString = System.Text.Encoding.UTF8.GetString(newFileData);
                Debug.WriteLine("----------------------> " + fileString);


                return File(newFileData, "application/pdf", file);

            }
            catch (WebException e)
            {
                String status = ((FtpWebResponse)e.Response).StatusDescription;
                Debug.WriteLine("ERROR STATUS ------ > " + status);
            }
            return Ok();
            //var path = @"C:\Users\Nperperidis\Downloads\Φασολάδα.docx";
            //var memory = new MemoryStream();
            //using (var stream = new FileStream(path, FileMode.Open))
            //{
            //    await stream.CopyToAsync(memory);
            //}
            //memory.Position = 0;
            //return File(memory, GetContentType(path), Path.GetFileName(path));

        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pem", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformats officedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }
    }
}