using AutoMapper;
using contactManagement.DomainModels.Entities;
using contactManagement.DomainModels.Models;

namespace contactManagement.APIs.MapperProfiles
{
    public class ContactProfile: Profile
    {
        public ContactProfile() { 
            CreateMap<Contact,ContactModel>();
            CreateMap<ContactModel,Contact>();
        }
    }
}
