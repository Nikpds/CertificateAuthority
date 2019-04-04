using MIS.CA.Models;
using System.Collections.Generic;

namespace MIS.CA.Repositories
{
    public interface IRepository<T> where T : IModel
    {
        T GetById(string id);

        IEnumerable<T> GetAll();

        T Insert(T t);

        T Update(T t);

        void DeleteAll();

        void DeleteById(string id);
    }
}
