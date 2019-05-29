using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Models
{
    public class Page<T>
    {
        public Page (int page, int size, int total, IEnumerable<T> content) 
        {
            this.Number = page;
            this.Size = size;
            this.Total = total;
            this.Content = content;
        }

        public int Number { get; set; }
        public int Size { get; set; }
        public int Total { get; set; }
        public IEnumerable<T> Content { get; set; }
    }
}
