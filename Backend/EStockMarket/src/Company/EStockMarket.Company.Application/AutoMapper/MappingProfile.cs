using AutoMapper;
using EStockMarket.Company.Application.Models.Request;
using EStockMarket.Company.Application.Models.Response;
using EStockMarket.Company.Domain.Entities;

namespace EStockMarket.Company.Application.AutoMapper;
internal class CompanyProfile : Profile
{
    public CompanyProfile()
    {
        CreateMap<CreateCompanyRequest, CompanyModel>();
        CreateMap<UpdateCompanyRequest, CompanyModel>();
        CreateMap<CompanyModel, CompanyResponse>();
        CreateMap<CompanyModel, Companies>().ForMember(dest => dest.CompanyCode, opt => opt.MapFrom(src => src.Code));

    }
}
