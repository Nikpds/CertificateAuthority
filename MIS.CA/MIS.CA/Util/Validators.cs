using MIS.CA.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Util
{
    public static class Validators
    {
        public static bool IsValid(this Certificate certificate)
        {
            if (String.IsNullOrEmpty(certificate.Name))
            {
                return false;
            }
            if (String.IsNullOrEmpty(certificate.Apps))
            {
                return false;
            }
            return true;
        }
    }
}
