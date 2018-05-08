using System;
using System.IO;
using System.Linq;
using AngularSPAWebAPI.Data;
using AngularSPAWebAPI.Models;
using AngularSPAWebAPI.Services;
using IdentityServer4.AccessTokenValidation;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;

namespace AngularSPAWebAPI
{
    public class Startup
    {
        private readonly IHostingEnvironment currentEnvironment;

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            currentEnvironment = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)

    {



      if (currentEnvironment.IsDevelopment())
      {
        services.AddDbContext<ApplicationDbContext>(options =>
     options.UseMySql("Server=192.168.64.2 ;Port=3306;Database=ODSCatharina;Uid=ods;Pwd = Catharina2018*; "));
      }
      else
      {
        services.AddDbContext<ApplicationDbContext>(options =>
        options.UseMySql("Server=localhost ;Port=3306;Database=odsbe_;Uid=ods;Pwd = Catharina2018*; "));

      }


      services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            // Identity options.
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = false;
                // Lockout settings.
              //  options.Lockout.AllowedForNewUsers = true;
               // options.Lockout.MaxFailedAccessAttempts = 3;
             //   options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromDays(1);
            });

            // Role based Authorization: policy based role checks.
            services.AddAuthorization(options =>
            {
                // Policy for dashboard: only administrator role.
                options.AddPolicy("Manage Accounts", policy => policy.RequireRole("administrator"));
                // Policy for resources: user or administrator roles. 
                options.AddPolicy("Access Resources", policy => policy.RequireRole("administrator", "user"));
            });

            // Adds application services.
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IDbInitializer, DbInitializer>();

            // Adds IdentityServer.
            services.AddIdentityServer()
                // The AddDeveloperSigningCredential extension creates temporary key material for signing tokens.
                // This might be useful to get started, but needs to be replaced by some persistent key material for production scenarios.
                // See http://docs.identityserver.io/en/release/topics/crypto.html#refcrypto for more information.
                .AddDeveloperSigningCredential()
                .AddInMemoryPersistedGrants()
                // To configure IdentityServer to use EntityFramework (EF) as the storage mechanism for configuration data (rather than using the in-memory implementations),
                // see https://identityserver4.readthedocs.io/en/release/quickstarts/8_entity_framework.html
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<ApplicationUser>(); // IdentityServer4.AspNetIdentity.


      if (currentEnvironment.IsProduction())
      {
        services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
         .AddIdentityServerAuthentication(options =>
         {
           options.Authority = "http://jansenbyods.com";
           options.RequireHttpsMetadata = false;

           options.ApiName = "WebAPI";
         });


      }

      else
      {
        services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                   .AddIdentityServerAuthentication(options =>
                   {
                     options.Authority = "http://localhost:5000";
                     options.RequireHttpsMetadata = false;
                     options.ApiName = "WebAPI";
                   });

       

      }







      services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme() { In = "header", Description = "Please insert JWT with Bearer into field", Name = "Authorization", Type = "apiKey" });

            });



      services.AddCors(options =>
      {
        options.AddPolicy("AllowAll",
            builder =>
            {
              builder
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
            });
      });
      services.AddMvc();

      

    }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();


      }
      else
      { app.UseDeveloperExceptionPage();      }




      app.UseAuthentication();
      app.UseIdentityServer();

   


      // Microsoft.AspNetCore.StaticFiles: API for starting the application from wwwroot.
      // Uses default files as index.html.

      app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });


      app.UseCors("AllowAll");
    
    
      app.Use(async (context, next) => {
                await next();
                if (context.Response.StatusCode == 404 &&
                   !Path.HasExtension(context.Request.Path.Value) &&
                   !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseMvcWithDefaultRoute();
            app.UseDefaultFiles();
            // Uses static file for the current path.
            app.UseStaticFiles();


    }
  }
}
