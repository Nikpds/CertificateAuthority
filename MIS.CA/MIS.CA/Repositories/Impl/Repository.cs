using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using MIS.CA.Models;
using MIS.CA.Services;
using MIS.CA.Attributes;

namespace MIS.CA.Repositories.Impl
{
    public abstract class Repository<T>: IRepository<T> where T : IModel
    {

        protected IMongoCollection<T> Collection { get; }
        protected IMongoDatabase Db { get; }

        protected Repository(IMongoDatabase _db)
        {
            Db = _db;
            Collection = Db.GetCollection<T>(TableName());
        }

        public void DeleteAll()
        {
            Collection.DeleteMany(item => true);
        }

        public void DeleteById(string id)
        {
            Collection.DeleteOne(item => item.Id.Equals(id));
        }

        public IEnumerable<T> GetAll()
        {
            return Collection.Find(item => true).ToList();
        }

        public T GetById(string id)
        {
            return Collection.Find(item => item.Id.Equals(id)).FirstOrDefault();
        }

        public T Insert(T t)
        {
            Collection.InsertOne(t);
            return t;
        }

        public T Update(T t)
        {
            Collection.ReplaceOne(item => item.Id.Equals(t.Id), t);
            return t;
        }

        protected string TableName()
        {
            return typeof(T).GetAttribute((Collection collection) => collection.Value);
        }
    }
}