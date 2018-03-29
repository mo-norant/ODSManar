using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularSPAWebAPI.Data;
using AngularSPAWebAPI.Models.DatabaseModels.General;
using Microsoft.AspNetCore.Identity;
using AngularSPAWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;
using AngularSPAWebAPI.Models.DatabaseModels.Users;

namespace AngularSPAWebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/General")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
    public class GeneralController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<ApplicationUser> Usermanager;

        public GeneralController(ApplicationDbContext context, UserManager<ApplicationUser> Usermanager)
        {
            this.context = context;
            this.Usermanager = Usermanager;
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUser()
        {
            var user = await Usermanager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound();
            }

            var tempuser = new InfoUser
            {
                ID = user.Id,
                CreationDate = user.CreateDate,
                Name = user.Name,
                Email = user.Email
            };

            return Ok(tempuser);
        }

        [HttpPost("registercompany")]
        public async Task<IActionResult> PostCompany([FromBody] Company company )
        {
            var user = await Usermanager.GetUserAsync(User);

            if(user == null)
            {
                return NotFound();
            }

            user.Company = company;

            try
            {
                await context.SaveChangesAsync();
                
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

            return Ok();

        }



    }
}
