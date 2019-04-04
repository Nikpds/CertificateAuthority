using System;
using System.Linq;

namespace MIS.CA.Attributes
{
    public static class AttributeHelper
    {
        public static TValue GetAttribute<TValue, TAttribute>(this Type classType,
                                                              Func<TAttribute, TValue> valueSelector) where TAttribute : Attribute
        {
            var att = classType.GetCustomAttributes(typeof(TAttribute), true)
                .FirstOrDefault() as TAttribute;
            if (att != null)
            {
                return valueSelector(att);
            }
            return default(TValue);
        }
    }
}
