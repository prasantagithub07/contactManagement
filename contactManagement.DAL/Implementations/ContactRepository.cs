using contactManagement.DAL.Interfaces;
using contactManagement.DomainModels.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace contactManagement.DAL.Implementations
{
    public class ContactRepository : IContactRepository
    {
        private const string _filePath = @"JsonFileMockDatabase\contacts.json";

        private static List<Contact> _entities = new List<Contact>();
        public ContactRepository()
        {
            // Seed data from JSON file
            var contactsJson = File.ReadAllText(_filePath);
            _entities = JsonConvert.DeserializeObject<List<Contact>>(contactsJson);
        }

        public void Add(Contact entity)
        {
            int maxId = 1;
            if (_entities.Count > 0)
            {
                maxId = _entities.Max(e => e.Id);
                entity.Id = maxId + 1;
            }
            else
            {
                entity.Id = maxId;
            }
            _entities.Add(entity);
        }

        public void Delete(int Id)
        {
            Contact entity = _entities.Find(x => x.Id == Id);
            if(entity != null)
                _entities.Remove(entity);
        }

        public Contact Find(int Id)
        {
            return _entities.Find(x => x.Id == Id);
        }

        public Task<IEnumerable<Contact>> GetAll()
        {
            return Task.FromResult<IEnumerable<Contact>>(_entities.OrderBy(x=>x.Id));
        }

        public async Task SaveChanges()
        {
            var jsonData = JsonConvert.SerializeObject(_entities);
            await File.WriteAllTextAsync(_filePath, jsonData);
        }

        public void Update(Contact entity)
        {
            var existingEntity = _entities.FirstOrDefault(e => e.Id == entity.Id);

            if (existingEntity != null)
            {
                _entities.Remove(existingEntity);
                _entities.Add(entity);
            }
        }
    }
}
