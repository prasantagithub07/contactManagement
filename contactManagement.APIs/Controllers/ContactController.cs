using AutoMapper;
using contactManagement.DomainModels.Entities;
using contactManagement.DomainModels.Models;
using contactManagement.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace contactManagement.APIs.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        private readonly IMapper _mapper;

        public ContactController(IContactService contactService, IMapper mapper)
        {
            _contactService = contactService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _contactService.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<ContactModel> Get(int id)
        {
            Contact entity = _contactService.Find(id);
            if(entity == null) return NotFound();

            ContactModel model = _mapper.Map<ContactModel>(entity); 
            return Ok(model);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ContactModel model)
        {
            Contact entity = _mapper.Map<Contact>(model);
            await _contactService.Add(entity);
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,ContactModel model)
        {

            if (id != model.Id) return BadRequest();

            Contact e = _contactService.Find(id);
            if (e == null) return NotFound();

            Contact entity = _mapper.Map<Contact>(model);
            await _contactService.Update(entity);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            Contact entity = _contactService.Find(id);
            if (entity == null) return NotFound();

            await _contactService.Delete(id);
            return StatusCode(StatusCodes.Status200OK);
        }
    }

}
