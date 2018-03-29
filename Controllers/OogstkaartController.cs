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
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using IdentityServer4.AccessTokenValidation;

namespace AngularSPAWebAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
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

            var user = await Usermanager.GetUserAsync(User);

            if (ModelState.IsValid)
            {
                oogstkaartItem.OnlineStatus = true;
                oogstkaartItem.UserID = user.Id;
                oogstkaartItem.CreateDate = now;
                await context.OogstkaartItems.AddAsync(oogstkaartItem);
                await context.SaveChangesAsync();

                return Ok(oogstkaartItem.OogstkaartItemID);


            }

            return BadRequest();
        }

        
        [HttpPost("Location")]
        public async Task<IActionResult> Post([FromBody] Location Location, [FromQuery] int OogstkaartitemID )
        {

            if (ModelState.IsValid)
            {
                var item = await context.OogstkaartItems.FirstOrDefaultAsync(o => o.OogstkaartItemID == OogstkaartitemID);

                if(item != null)
                {
                    item.Location = Location;
                    await context.SaveChangesAsync();
                    return Ok();
                }


            }

            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var user = await Usermanager.GetUserAsync(User);

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if(user == null)
            {
                return NotFound();
            }

            var allitems = await context.OogstkaartItems.Where(c => c.UserID == user.Id).Include(c => c.Weight).Include(i => i.Location).ToListAsync();
            var filtereditems = allitems.Where(i => i.Location != null).ToList();

            return Ok(filtereditems);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id  )
        {

            var tempuser = await Usermanager.GetUserAsync(User);

            if(tempuser == null)
            {
                return NotFound("User not found");
            }

            var items = await context.OogstkaartItems.Where(i => i.UserID == tempuser.Id).Include(i => i.Location).Include(i => i.Weight).ToListAsync();

            if(!items.Any())
            {
                return NotFound("user has no items");
            }

            var item = items.Where(i => i.OogstkaartItemID == id).FirstOrDefault();
            if(item == null)
            {
                return NotFound("user has no item with provided ID");
            }



            

            return Ok(item);


           

           // return NotFound();

        }

        [AllowAnonymous]
        [HttpGet("mapview")]
        public async Task<IActionResult> GetAdmin()
        {
            var artikels = await context.OogstkaartItems.Where(i => i.OnlineStatus == true).Include(i => i.Location).Include(i => i.Weight).ToListAsync();



            return Ok(artikels);

        }

        



    }
}
