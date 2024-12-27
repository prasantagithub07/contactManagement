using contactManagement.DomainModels.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace contactManagement.Services.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetAll();
        Contact Find(int Id);
        Task Add(Contact entity);
        Task Update(Contact entity);
        Task Delete(int Id);
    }
}
