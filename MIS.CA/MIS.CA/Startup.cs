using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MIS.CA.Models;
using MIS.CA.Repositories;
using MIS.CA.Services;
using System.Text;

namespace MIS.CA
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var serverIp = Configuration.GetValue<string>("Ssh:ServerIp");
            var username = Configuration.GetValue<string>("Ssh:Username");
            var password = Configuration.GetValue<string>("Ssh:Password");

            services.AddSingleton<ISshService, SshService>((ctx) =>
            {
                var capass = Configuration.GetValue<string>("OpenSSL:Capass");
                return new SshService(serverIp, username, password, capass);
            });

            services.AddSingleton<ISftpService, SftpService>((ctx) =>
            {
                return new SftpService(serverIp, username, password);
            });
            services.AddScoped<UserService>();
            services.AddSingleton((ctx) =>
            {
                var connectionString = Configuration.GetConnectionString("DefaultConnection");
                return new DataContext(connectionString);
            });
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
           .AddJwtBearer(cfg =>
           {
               cfg.TokenValidationParameters = new TokenValidationParameters()
               {
                   ValidateIssuer = true,
                   ValidateAudience = true,
                   ValidateLifetime = true,
                   ValidateIssuerSigningKey = true,
                   ValidIssuer = Configuration["Jwt:Issuer"],
                   ValidAudience = Configuration["Jwt:Issuer"],
                   IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
               };
           });
            services.AddScoped<CertificateService, CertificateService>();

            services.AddCors();
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.DateFormatString = "dd/MM/yyyy HH:mm";
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseAuthentication();

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseMvc();
        }

    }
}
