using Renci.SshNet;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MIS.CA.Services
{
    public interface ISftpService: IDisposable
    {
        byte[] DownloadFile(string directory, string file);
    }

    public class SftpService : ISftpService
    {

        private readonly SftpClient _sftp;

        public SftpService(string serverIp, string username, string password)
        {
            try
            {
                this._sftp = new SftpClient(serverIp, username, password);
                this._sftp.Connect();
            }
            catch
            {
                throw;
            }
        }

        public byte[] DownloadFile(string directory, string file)
        {
            if (String.IsNullOrEmpty(directory))
            {
                throw new Exception("Directory can not be null or empty");
            }
            if (String.IsNullOrEmpty(file))
            {
                throw new Exception("File can not be null or empty");
            }
            using (MemoryStream stream = new MemoryStream())
            {
                try
                {
                    _sftp.DownloadFile("/root/ca/intermediate/" + directory + "/" +  file, stream);
                    return stream.ToArray();
                } catch (Exception e) { 
                    throw new Exception("Error while Downloading file. The following error occured: " + e.Message);
                }
            }
        }

        public void Dispose()
        {
            Debug.WriteLine("Closing Sftp connection...");
            _sftp.Dispose();
        }
    }
}
