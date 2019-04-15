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
            if (String.IsNullOrEmpty(certificate.Certificate))
            {
                return false;
            }
            //if (String.IsNullOrEmpty(certificate.Owner))
            //{
            //    return false;
            //}
            return true;
        }

        public static bool IsValidForGeneration(this CertificateRequest certificate)
        {
            if (!certificate.IsValid())
            {
                return false;
            }
            if (certificate.Duration == 0)
            {
                return false;
            }
            if (certificate.Request == null)
            {
                return false;
            }
            return true;
        }
    }
}
