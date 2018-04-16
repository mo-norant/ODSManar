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
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using AngularSPAWebAPI.Models.DatabaseModels.General;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Cors;

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
        private readonly IHostingEnvironment _appEnvironment;

        public OogstkaartController(
            UserManager<ApplicationUser> Usermanager,
            RoleManager<IdentityRole> Rolemanager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            IHostingEnvironment _appEnvironment,
        ILogger<IdentityController> logger,
            ApplicationDbContext context)
        {
            this.Usermanager = Usermanager;
            this.Rolemanager = Rolemanager;
            SignInManager = signInManager;
            EmailSender = emailSender;
            this._appEnvironment = _appEnvironment;
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

        [HttpPost("productstatus/{id}")]
        public async Task<IActionResult> PostProduct([FromRoute] int id)
        {

            var user = await Usermanager.GetUserAsync(User);

            if (user != null)
            {
                var item = await context.OogstkaartItems.Where(o => o.UserID == user.Id).Where(o => o.OogstkaartItemID == id).FirstOrDefaultAsync();

                if (item != null)
                {
                    item.OnlineStatus = !item.OnlineStatus;
                    await context.SaveChangesAsync();
                    return Ok();
                }

            }

            return BadRequest();
        }

        [HttpPost("oogstkaartavatar/{id}")]
        public async Task<IActionResult> oogstkaartavatar([FromRoute] int id)
        {
            var user = await Usermanager.GetUserAsync(User);

            if(user != null)
            {
                var item = await context.OogstkaartItems.Where(i => i.OogstkaartItemID == id).Where(i => i.UserID == user.Id).SingleOrDefaultAsync();

        
                if(item == null)
        {
          return NotFound();
        }  

        var files = HttpContext.Request.Form.Files;

                foreach (var image in files)
                {
                    if (image != null && image.Length > 0)
                    {
                        var file = image;

                        var uploads = Path.Combine(_appEnvironment.WebRootPath, "uploads\\image");

                        if (file.Length > 0)
                        {
              var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
              using (var fileStream = new FileStream(Path.Combine(uploads, fileName), FileMode.Create))
                            {
                                await file.CopyToAsync(fileStream);
                                item.Avatar = new Image
                                {
                                    Date = DateTime.Now,
                                    uri = fileName,
                                    Name = file.Name
                                };
                            }



                        }
                    }

                }
                await context.SaveChangesAsync();
                return Ok();
            }

            return BadRequest();
        }


        [HttpPost("files/{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> PostFiles([FromRoute] int id)
        {

      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

                var files = HttpContext.Request.Form.Files;

                var user = await Usermanager.GetUserAsync(User);

                var oogstkaartitem = await context.OogstkaartItems.Where(i => i.UserID == user.Id).Where(i => i.OogstkaartItemID == id).Include(i => i.Avatar).Include(i => i.Gallery).FirstOrDefaultAsync();

                if (user != null && oogstkaartitem != null)
                {
                    

                    foreach (var Image in files)
                    {
                        if (Image != null && Image.Length > 0)
                        {
                            var file = Image;
                            var uploads = Path.Combine(_appEnvironment.WebRootPath, ".\\img");
                            if (file.Length > 0)
                            {

                                
                                
                                    var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
                                    using (var fileStream = new FileStream(Path.Combine(uploads, fileName), FileMode.Create))
                                    {
                                        await file.CopyToAsync(fileStream);
                                        oogstkaartitem.Gallery.Add(new Image
                                        {
                                            Date = DateTime.Now,
                                            uri = fileName,
                                            Name = file.Name
                                        });
                                    }
                                
                                

                            }
                        }
                    }

                    await context.SaveChangesAsync();
                    return Ok();

                }

                return BadRequest();
        }



        

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
           
                var user = await Usermanager.GetUserAsync(User);

                if(user != null)
                {
                    var item = await context.OogstkaartItems.Where(i => i.OogstkaartItemID == id).Where(i => user.Id == i.UserID).SingleAsync();

                    if(item != null)
                    {
                        context.OogstkaartItems.Remove(item);
                        await context.SaveChangesAsync();
                        return Ok();

                    }
                }



            

            return BadRequest();
        }



    [AllowAnonymous]
    [HttpPost("view/{id}")]
    public async Task<IActionResult> PostView( [FromRoute] int id)
    {

      var item = await context.OogstkaartItems.Where(i => i.OogstkaartItemID == id).FirstOrDefaultAsync();

      if(item != null)
      {
        item.Views++ ;
        await context.SaveChangesAsync();
        return Ok(item.Views);
      }
      

      return BadRequest();
    }
    [AllowAnonymous]
    [HttpGet("mapview")]
        public async Task<IActionResult> GetAdmin()
        {
            var artikels = await context.OogstkaartItems.Where(i => i.OnlineStatus == true).Include(i => i.Location).Include(i => i.Avatar)
             .Include(i => i.Gallery).Include(i => i.Weight).ToListAsync();



            return Ok(artikels);

        }


    }
}
