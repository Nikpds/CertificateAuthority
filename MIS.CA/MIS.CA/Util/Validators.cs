using MIS.CA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Util
{
    public static class Validators
    {
        public static bool IsValid(this CertificateRequest certificate)
        {
            if (String.IsNullOrEmpty(certificate.PrivateKey))
            {
                return false;
            }
            if (String.IsNullOrEmpty(certificate.Owner))
            {
                return false;
            }
            return true;
        }
    }
}
