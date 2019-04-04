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
            dbConectionString = Configuration.GetConnectionString("DefaultConnection");
            context = new DataContext(dbConectionString);
        }

        public IConfiguration Configuration { get; }
        private string dbConectionString { get; }
        private DataContext context { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
         

            services.AddScoped<ISshService, SshService>();
            services.AddScoped<IFtpService, FtpService>();
            services.AddScoped<IMongoDbRepository<BaseModel>, MongoDbRepository<BaseModel>>();
            // services.AddScoped<CertificateRepository, CertificateRepository>();
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

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseMvc();
        }

    }
}
