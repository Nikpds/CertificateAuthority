using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Attributes
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    public class Collection: Attribute
    {
        public string Value { get; }

        public Collection(string value)
        {
            this.Value = value;
        }
    }
}
