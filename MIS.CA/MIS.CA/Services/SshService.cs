using System;
using System.Collections.Generic;
using System.Diagnostics;
using MIS.CA.Models;
using Renci.SshNet;

namespace MIS.CA.Services {
    public interface ISshService : IDisposable {
        void CreatePrivateKey (string key, string size);
        void CreateCrs (string name, string keyname, CertificateDetails certificateDetails);
        void CreateCertificate (string name, int duration);
        void CreateBundle (string name, string certname);
        void CreateCertificateAllCommands (CertificateRequest certificateRequest);
        void DeleteFile (string filename, string path);
        IEnumerable<string> ListDirectory (string lsArgument);
    }

    public class SshService : ISshService {
        private readonly SshClient _sshClient;
        private readonly string _capass;

        public SshService (string serverIp, string username, string password, string capass) {
            this._capass = capass;
            try {
                var connectionInfo = new ConnectionInfo (serverIp, username, new PasswordAuthenticationMethod (username, password));
                _sshClient = new SshClient (connectionInfo);
                _sshClient.Connect ();
            } catch {
                throw;
            }
        }

        private string CreatePrivateKeyCommand (string key, string size)
        {
            return "openssl genrsa -out /root/ca/intermediate/private/" + key + ".key.pem" + ( !String.IsNullOrEmpty(size) ? " " + size : "");
        }

        private string CreateCrsCommand (string name, string keyname, CertificateDetails certificateDetails)
        {
            return "openssl req -config /root/ca/intermediate/openssl.cnf -key /root/ca/intermediate/private/" + keyname + ".key.pem " +
                CreateSubjectParameter(certificateDetails) + " " +
                "-new -sha256 -out /root/ca/intermediate/csr/" + name + ".csr.pem";
        }

        // returns the subject parameter given the certificate details object
        // it will add only the existing values
        // the returned value will not have trailing and leading whitespace
        private string CreateSubjectParameter(CertificateDetails certificateDetails)
        {
            string param = "-subj '";
            if (!String.IsNullOrEmpty(certificateDetails.Country))
            {
                param += "/C=" + certificateDetails.Country;
            }
            if (!String.IsNullOrEmpty(certificateDetails.State))
            {
                param += "/ST=" + certificateDetails.State;
            }
            if (!String.IsNullOrEmpty(certificateDetails.Locality))
            {
                param += "/L=" + certificateDetails.Locality;
            }
            if (!String.IsNullOrEmpty(certificateDetails.Organization))
            {
                param += "/O=" + certificateDetails.Organization;
            }
            if (!String.IsNullOrEmpty(certificateDetails.Unit))
            {
                param += "/OU=" + certificateDetails.Unit;
            }
            if (!String.IsNullOrEmpty(certificateDetails.Cn))
            {
                param += "/CN=" + certificateDetails.Cn;
            }
            if (!String.IsNullOrEmpty(certificateDetails.Email))
            {
                param += "/emailAddress=" + certificateDetails.Email;
            }
            param += "'";
            return param;
        }

        private string CreateCertificateCommand (string name, int duration)
        {
            return "openssl ca -config /root/ca/intermediate/openssl.cnf -extensions server_cert -days " + duration + " -notext -md sha256" +
                " -in /root/ca/intermediate/csr/" + name + ".csr.pem -out /root/ca/intermediate/certs/" + name + ".cert.pem -batch -passin pass:" + _capass;
        }

        private string CreateBundleCommand (string name, string certname) {
            return "cat /root/ca/intermediate/certs/" + certname + ".cert.pem  /root/ca/intermediate/certs/ca-chain.cert.pem >> /root/ca/intermediate/certs/" + name + ".crt";
        }

        public IEnumerable<string> ListDirectory (string lsArgument) {
            var command = "cd ca/intermediate/" + lsArgument + " ; ls -m";
            SshCommand sshCommand = _sshClient.RunCommand (command);
            return sshCommand.Result.Replace(" ", "").Replace("\n", "").Split(",");
        }

        public void CreatePrivateKey(string key, string size) {
            var command = CreatePrivateKeyCommand(key, size);
            try
            {
                _sshClient.RunCommand(command);
            } catch (Exception e) {
                throw new Exception("Error while generating key. The following error occured: " + e.Message);
            }
        }

        public void CreateCrs (string name, string keyname, CertificateDetails certificateDetails) {
            var command = CreateCrsCommand (name, keyname, certificateDetails);
            try {
                _sshClient.RunCommand(command);
            } catch (Exception e) {
                throw new Exception("Error while generating crs. The following error occured: " + e.Message);
            }
        }

        public void CreateCertificate(string name, int duration)
        {
            var command = CreateCertificateCommand(name, duration);
            try
            {
                _sshClient.RunCommand(command);
            }
            catch (Exception e)
            {
                throw new Exception("Error while generating certificate. The following error occured: " + e.Message);
            }
        }

        public void CreateBundle(string name, string certname)
        {
            var command = CreateBundleCommand(name, certname);
            try
            {
                _sshClient.RunCommand(command);
            }
            catch (Exception e)
            {
                throw new Exception("Error while bundling certificate. The following error occured: " + e.Message);
            }
        }

        public void CreateCertificateAllCommands(CertificateRequest certificateRequest)
        {
            // Create the private key
            CreatePrivateKey(certificateRequest.PrivateKey, null);

            // Create crs
            CreateCrs(certificateRequest.Certificate, certificateRequest.PrivateKey, certificateRequest.Request);

            // Create the certificate
            CreateCertificate(certificateRequest.Certificate, certificateRequest.Duration * 365);

            // Bundle files
            CreateBundle(certificateRequest.Certificate, certificateRequest.Certificate);
        }

        public void DeleteFile (string filename, string path) {
            var command = "rm -rf /root/ca/intermediate/" + path + "/" + filename;
            try
            {
                _sshClient.RunCommand(command);
            } catch (Exception e) {
                throw new Exception("Error while deleting certificate. The following error occured: " + e.Message);
            }
        }

        public void Dispose()
        {
            Debug.WriteLine("Closing SSH connection...");
            _sshClient.Dispose();
        }
    }
}