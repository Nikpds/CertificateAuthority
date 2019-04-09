using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace MIS.CA.Models
{
    public abstract class BaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTime Updated { get; set; }
        public DateTime Created { get; private set; }

        public BaseModel()
        {
            Created = DateTime.Now;
        }
    }
}
