using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Services
{
    public interface ISshService
    {
        string CreatePublicKey(string name, string size);
        string CreateCrs(string name, string keyname);
        string CreateCertificate(string name, int duration);
        string CreateBundle(string name, string certname);
    }
    public class SshService : ISshService
    {
        public SshService()
        {

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

        public string CreateCrs(string name, string keyname)
        {
            return "openssl req -config intermediate/openssl.cnf -key intermediate/private/" + keyname + ".key.pem " +
                 "-new -sha256 -out intermediate/csr/" + name + ".csr.pem";
        }

        public string CreatePublicKey(string name, string size)
        {
            return "openssl genrsa -out intermediate/private/" + name + "key.pem " + size;
        }
    }
}
