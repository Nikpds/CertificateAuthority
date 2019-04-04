using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MIS.CA.Implementation;
using MIS.CA.Services;
using MongoDB.Driver;

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
            ConfigureDB(services);

            services.AddScoped<ISshService, SshService>();
            services.AddScoped<IFtpService, FtpService>();
            services.AddScoped<CertificateRepository, CertificateRepository>();
            services.AddScoped<CertificateService, CertificateService>();

            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.AllowAnyHeader().WithOrigins("*").AllowAnyMethod().AllowCredentials());

            app.UseMvc();
        }

        private void ConfigureDB(IServiceCollection services)
        {
            string connectionString = Configuration.GetValue<string>("Db:ConnectionString");
            var client = new MongoClient(connectionString);

            string dbName = Configuration.GetValue<string>("Db:DbName");
            IMongoDatabase db = client.GetDatabase(dbName);

            services.Add(new ServiceDescriptor(typeof(IMongoDatabase), db));
        }
    }
}
