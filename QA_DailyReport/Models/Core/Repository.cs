using QA_DailyReport.Models.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace QA_DailyReport.Models.Core
{
    public class Repository<T> where T : class
    {
        protected QADBContext dbContext = null;
        protected DbSet<T> DbSet { get; set; }
        public Repository()
        {
            dbContext = new QADBContext();
            DbSet = dbContext.Set<T>();
        }
        public IEnumerable<T> GetAll()
        {
            return DbSet;
        }
        public T GetById(int id)
        {
            return DbSet.Find(id);
        }
        public void Add(T entity)
        {
            DbSet.Add(entity);
        }
        public void SaveChanges()
        {
            dbContext.SaveChanges();
        }
        public void Remove(T entity)
        {
            var obj = DbSet.Find(entity);
            DbSet.Remove(obj);
        }
        public void Update(T entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;           
        }

        //public virtual IEnumerable<T> GetWithRawSql(string query, params object[] parameters)
        //{
        //    return DbSet.SqlQuery(query, parameters).ToList();
        //}

    }
}