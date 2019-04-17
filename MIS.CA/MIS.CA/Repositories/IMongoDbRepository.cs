using MIS.CA.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MIS.CA.Repositories
{
    public interface IMongoDbRepository<T> where T : BaseModel
    {
        Task<IEnumerable<T>> Get(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> Get(FilterDefinition<T> filter);
        Task<T> GetById(string id);
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetPage(Expression<Func<T, bool>> predicate, int page, int pageSize, ProjectionDefinition<T> projection = null);
        Task<IEnumerable<T>> GetPage(FilterDefinition<T> filter, int page, int pageSize, ProjectionDefinition<T> projection = null);
        Task<IEnumerable<T>> GetPageSorted(FilterDefinition<T> filter, SortDefinition<T> sort, int page, int pageSize, ProjectionDefinition<T> projection = null);
        Task<T> Insert(T entity);
        Task<IEnumerable<T>> InsertMany(IEnumerable<T> entities);
        Task<T> Update(T entity);
        Task<bool> Delete(string id);
        Task<bool> Delete(T entity);
        Task<bool> Delete(Expression<Func<T, bool>> predicate);
        Task<bool> DeleteAll();
        Task<int> Count(Expression<Func<T, bool>> predicate);
        Task<int> Count(FilterDefinition<T> filter);
    }
}
