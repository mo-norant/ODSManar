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
using AngularSPAWebAPI.Models.DatabaseModels.Communication;

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
        private readonly IHostingEnvironment env;

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
            this.env = _appEnvironment;
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

            var allitems = await context.OogstkaartItems.Where(c => c.UserID == user.Id).Include(c => c.Specificaties).Include(i => i.Location).ToListAsync();
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
            var items = await context.OogstkaartItems.Where(i => i.UserID == tempuser.Id).Include(i => i.Gallery).Include(i => i.Avatar).Include(i => i.Location).Include(i => i.Specificaties).ToListAsync();
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
                        var uploads = Path.Combine(env.WebRootPath, "uploads\\image");
                        if (file.Length > 0)
                        {
                            var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
                            using (var fileStream = new FileStream(Path.Combine(uploads, fileName), FileMode.Create))
                            {
                                await file.CopyToAsync(fileStream);
                                item.Avatar = new Afbeelding
                                {
                                    Create = DateTime.Now,
                                    URI = fileName,
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

      var user = await Usermanager.GetUserAsync(User);
      if (user != null)
      {
        var item = await context.OogstkaartItems.Where(i => i.OogstkaartItemID == id).Where(i => i.UserID == user.Id).Include(i => i.Gallery).SingleOrDefaultAsync();

        if (item == null)
        {
          return NotFound();
        }

        var files = HttpContext.Request.Form.Files;

        if(item.Gallery == null)
        {
          item.Gallery = new List<Afbeelding>();
        }

     

       

        foreach (var image in files)
        {
          if (image != null && image.Length > 0)
          {
            var file = image;
            var uploads = Path.Combine(env.WebRootPath, "uploads\\image");
            if (file.Length > 0)
            {
              var fileName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);
              using (var fileStream = new FileStream(Path.Combine(uploads, fileName), FileMode.Create))
              {
                await file.CopyToAsync(fileStream);

                var afbeelding = new Afbeelding
                {
                  Create = DateTime.Now,
                  URI = fileName,
                  Name = file.Name
                };

                
                item.Gallery.Add(afbeelding);
               
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
                    var item = await context.OogstkaartItems.Where(i => i.OogstkaartItemID == id).Where(i => user.Id == i.UserID).Include(i => i.Gallery).Include(i => i.Location).Include(i => i.Specificaties).SingleAsync();

                    if(item != null)
                    {

          foreach (var specificatie in item.Specificaties)
          {
            context.Specificaties.Remove(specificatie);
          }

          foreach (var foto in item.Gallery)
          {
            context.Afbeeldingen.Remove(foto);
          }

          context.Locations.Remove(item.Location);
                        
                        context.OogstkaartItems.Remove(item);
                        await context.SaveChangesAsync();
                        return Ok();

                    }
                }
                
            return BadRequest();
        }

    [HttpPost("update")]
    public async Task<IActionResult> Update( [FromBody] OogstkaartItem updatingitem )
    {

      var user = await Usermanager.GetUserAsync(User);
      if (user != null)
      {
        var item = await context.OogstkaartItems.Where(i => i.OogstkaartItemID == updatingitem.OogstkaartItemID).Where(i => i.UserID == user.Id).Include(i => i.Location).Include(i => i.Specificaties).FirstOrDefaultAsync();

        if(item == null)
        {
          return NotFound();
        }

        
        item.Artikelnaam = updatingitem.Artikelnaam;
        item.Avatar = updatingitem.Avatar;
        item.Category = updatingitem.Category;
        item.Concept = updatingitem.Concept;
        item.CreateDate = updatingitem.CreateDate;
        item.DatumBeschikbaar = updatingitem.DatumBeschikbaar;
        item.Gallery = updatingitem.Gallery;
        item.Hoeveelheid = updatingitem.Hoeveelheid;
        item.Jansenserie = updatingitem.Jansenserie;

        item.Omschrijving = updatingitem.Omschrijving;
        item.VraagPrijsPerEenheid = updatingitem.VraagPrijsPerEenheid;
        item.VraagPrijsTotaal = updatingitem.VraagPrijsTotaal;

        item.Location.Latitude = updatingitem.Location.Latitude;
        item.Location.Longtitude = updatingitem.Location.Longtitude;

        if (updatingitem.Specificaties.Count() > 0)
        {



          foreach (var specificatie in updatingitem.Specificaties)
          {

            if (specificatie.SpecificatieID == 0 && specificatie.SpecificatieSleutel != null && specificatie.SpecificatieValue != null)
            {
              item.Specificaties.Add(specificatie);
            }


            foreach (var existingChild in item.Specificaties.ToList())
            {
              if (!updatingitem.Specificaties.Any(c => c.SpecificatieID == existingChild.SpecificatieID))
                context.Specificaties.Remove(existingChild);
            }

            var temp = await context.Specificaties.Where(i => i.SpecificatieID == specificatie.SpecificatieID).FirstOrDefaultAsync();

            if (temp != null)
            {

              temp.SpecificatieOmschrijving = specificatie.SpecificatieOmschrijving;
              temp.SpecificatieSleutel = specificatie.SpecificatieSleutel;
              temp.SpecificatieEenheid = specificatie.SpecificatieEenheid;
            }

          }

        }


        else
        {
          foreach (var specificatie in item.Specificaties)
          {
            context.Specificaties.Remove(specificatie);
          }

        }

        await context.SaveChangesAsync();
        return Ok();
        

      }

      return BadRequest();
      
    }

    [AllowAnonymous]
    [HttpPost("request/{id}")]
    public async Task<IActionResult> CreateRequest([FromRoute] int id,  [FromBody] Request request )
    {

      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

      var item = await context.OogstkaartItems.Where(i => i.OogstkaartItemID == id).Include(i => i.Requests).FirstOrDefaultAsync();

      if(item != null)
      {
        request.Create = DateTime.Now;
        request.Status = "review";
        item.Requests.Add(request);
        await context.SaveChangesAsync();
        return Ok();
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
      var artikels = await context.OogstkaartItems.Where(i => i.OnlineStatus == true).Include(i => i.Location).Where(i => i.Location != null).Include(i => i.Avatar)
      .Include(i => i.Gallery).Include(i => i.Specificaties).Include(i => i.Files).ToListAsync();
      return Ok(artikels);
    }

    [AllowAnonymous]
    [HttpGet("mapview/{id}")]
    public async Task<IActionResult> GetItemFromRoute([FromRoute] int id )
    {
      var artikel = await context.OogstkaartItems.Where(i => i.OogstkaartItemID == id).Include(i => i.Location).Where(i => i.Location != null).Include(i => i.Avatar)
      .Include(i => i.Gallery).Include(i => i.Specificaties).Include(i => i.Files).FirstOrDefaultAsync();

      if(artikel == null)
      {
        return BadRequest();
      }

      return Ok(artikel);
    }


  }
}
