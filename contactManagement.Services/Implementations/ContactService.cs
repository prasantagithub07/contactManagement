using contactManagement.DAL.Interfaces;
using contactManagement.DomainModels.Entities;
using contactManagement.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace contactManagement.Services.Implementations
{
    public class ContactService: IContactService
    {
        private readonly IContactRepository _repo;
        public ContactService(IContactRepository repo)
        {
            _repo = repo;
        }
        public async Task Add(Contact entity)
        {
            _repo.Add(entity);
            await _repo.SaveChanges();
        }

        public async Task Delete(int Id)
        {
            _repo.Delete(Id);
            await _repo.SaveChanges();
        }

        public Contact Find(int Id)
        {
            return _repo.Find(Id);
        }

        public async Task<IEnumerable<Contact>> GetAll()
        {
            return await _repo.GetAll();
        }

        public async Task Update(Contact entity)
        {
            _repo.Update(entity);
            await _repo.SaveChanges();
        }
    }
}
