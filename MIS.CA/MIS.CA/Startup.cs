using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MIS.CA.Models;
using MIS.CA.Repositories;
using MIS.CA.Services;

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

            services.AddSingleton<ISshService, SshService>((ctx) => {
                var capass = Configuration.GetValue<string>("OpenSSL:Capass");
                return new SshService(serverIp, username, password, capass);
            });

            services.AddSingleton<ISftpService, SftpService>((ctx) => {
                return new SftpService(serverIp, username, password);
            });

            services.AddSingleton((ctx) => {
                var connectionString = Configuration.GetConnectionString("DefaultConnection");
                return new DataContext(connectionString);
            });
            services.AddScoped<CertificateService, CertificateService>();

            services.AddCors();
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => {
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

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseMvc();
        }

    }
}
