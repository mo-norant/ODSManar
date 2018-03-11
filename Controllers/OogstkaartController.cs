using AngularSPAWebAPI.Data;
using AngularSPAWebAPI.Models;
using AngularSPAWebAPI.Models.DatabaseModels.Oogstkaart;
using AngularSPAWebAPI.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AngularSPAWebAPI.Controllers
{
    [Route("api/[controller]")]
    public class OogstkaartController : Controller
    {
        private readonly UserManager<ApplicationUser> Usermanager;
        private readonly RoleManager<IdentityRole> Rolemanager;
        private readonly SignInManager<ApplicationUser> SignInManager;
        private readonly IEmailSender EmailSender;
        private readonly ILogger Logger;
        private readonly ApplicationDbContext context;

        public OogstkaartController(
            UserManager<ApplicationUser> Usermanager,
            RoleManager<IdentityRole> Rolemanager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            ILogger<IdentityController> logger,
            ApplicationDbContext context)
        {
            this.Usermanager = Usermanager;
            this.Rolemanager = Rolemanager;
            SignInManager = signInManager;
            EmailSender = emailSender;
            Logger = logger;
            this.context = context;
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] OogstkaartItem oogstkaartItem)
        {
            var now = DateTime.Now;

            if (ModelState.IsValid)
            {
                oogstkaartItem.Company.CreateDate = now;
                oogstkaartItem.CreateDate = now;

                await context.AddAsync(oogstkaartItem);
                await context.SaveChangesAsync();

                return Ok(oogstkaartItem.OogstkaartItemID);


            }

            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var artikels = await context.OogstkaartItems.Include(i => i.Company).Include(i => i.Weight).ToListAsync();

            return Ok(artikels);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int OogstkaartitemID)
        {
            if (ModelState.IsValid)
            {


                //TODO: Delete excisting item from array

                return Ok();
            }
            return BadRequest();
        }

    }
}
