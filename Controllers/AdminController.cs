using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularSPAWebAPI.Data;
using AngularSPAWebAPI.Models;
using AngularSPAWebAPI.Services;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AngularSPAWebAPI.Controllers
{
  [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Manage Accounts")]
  [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
    private readonly UserManager<ApplicationUser> _userManager;
      private readonly RoleManager<IdentityRole> _roleManager;
      private readonly SignInManager<ApplicationUser> _signInManager;
      private readonly IEmailSender _emailSender;
      private readonly ILogger _logger;
      private readonly ApplicationDbContext _context;

      public AdminController(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        SignInManager<ApplicationUser> signInManager,
        IEmailSender emailSender,
        ILogger<IdentityController> logger, ApplicationDbContext context)
      {
        _userManager = userManager;
        _roleManager = roleManager;
        _signInManager = signInManager;
        _emailSender = emailSender;
        _logger = logger;
        _context = context;
      }





  }
}
