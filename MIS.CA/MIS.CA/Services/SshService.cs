using MIS.CA.Models;
using Renci.SshNet;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Services
{
    public interface ISshService: IDisposable
    {
        string CreatePublicKey(string name, string size);
        string CreateCrs(string name, string keyname, CertificateDetails certificateDetails);
        string CreateCertificate(string name, int duration);
        string CreateBundle(string name, string certname);
        IEnumerable<string> ListDirectory(string lsArgument);
    }
    public class SshService : ISshService
    {
        private readonly SshClient _sshClient;

        public SshService()
        {
            var connectionInfo = new ConnectionInfo("192.168.48.72", "geakmh", new PasswordAuthenticationMethod("geakmh", "geakmh"));
            this._sshClient = new SshClient(connectionInfo);
            this._sshClient.Connect();
        }

        public string CreateBundle(string name, string certname)
        {
            return "cat intermediate/certs/" + certname + ".cert.pem  intermediate/certs/ca-chain.cert.pem >> " + name + ".crt";
        }

        public string CreateCertificate(string name, int duration)
        {
            return "openssl ca -config intermediate/openssl.cnf -extensions server_cert -days " + duration + " -notext -md sha256" +
                " -in intermediate/csr/192.168.50.25.csr.pem -out intermediate/certs/" + name + ".cert.pem";
        }

        public string CreateCrs(string name, string keyname, CertificateDetails certificateDetails)
        {
            return "openssl req -config intermediate/openssl.cnf -key intermediate/private/" + keyname + ".key.pem " +
                "-subj '/C="+ certificateDetails.CountryName + "/ST=" + certificateDetails.StateName + "/L=" + certificateDetails.LocalityName +
                "/O=" + certificateDetails.OrganizationName + "/OU=" + certificateDetails.UnitName + "/CN=" + certificateDetails.CommonName +
                "/emailAddress=" + certificateDetails.Email + "' " +
                 "-new -sha256 -out intermediate/csr/" + name + " ";
        }

        public string CreatePublicKey(string name, string size)
        {
            return "openssl genrsa -out intermediate/private/" + name + "key.pem " + size;
        }

        public IEnumerable<string> ListDirectory(string lsArgument)
        {
            var command = "ls -m " + lsArgument;
            SshCommand sshCommand = _sshClient.RunCommand(command);
            return sshCommand.Result.Split(", ");
        }

        public void GenerateCertificate(Certificate certificate)
        {

        }

        public void GenerateKey(string name, string size)
        {
            var command = CreatePublicKey(name, size);
            SshCommand sshCommand = _sshClient.RunCommand(command);
        }

        public void GenerateCrs(string name, string keyname, CertificateDetails certificateDetails)
        {
            var command = CreateCrs(name, keyname, certificateDetails);
            SshCommand sshCommand = _sshClient.RunCommand(command);
        }

        public void Dispose()
        {
            Debug.WriteLine("Closing SSH connection...");
            _sshClient.Dispose();
        }

    }
}
