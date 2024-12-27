using contactManagement.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace contactManagement.DAL.Interfaces
{
    public interface IContactRepository
    {
            Task<IEnumerable<Contact>> GetAll();
            Contact Find(int Id);
            void Add(Contact entity);
            void Update(Contact entity);
            void Delete(int Id);
            Task SaveChanges();
    }
}
