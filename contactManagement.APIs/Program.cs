using contactManagement.APIs.Middlewares;
using contactManagement.DAL;
using contactManagement.DAL.Implementations;
using contactManagement.DAL.Interfaces;
using contactManagement.DomainModels.Entities;
using contactManagement.Services.Implementations;
using contactManagement.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Add AutoMapper to the DI container
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        // Automatically return a BadRequest response with model state errors
        options.SuppressModelStateInvalidFilter = false;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

//Register Repositories
builder.Services.AddTransient<IContactRepository, ContactRepository>();

//Register Services
builder.Services.AddScoped<IContactService, ContactService>();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

//configure global custom middlerware for error handling
app.UseErrorHandlingMiddleware();

app.UseAuthorization();
app.MapControllers();



app.Run();
