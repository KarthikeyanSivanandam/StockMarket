import { DecimalPipe } from "@angular/common";

export interface CompDetailsAll{
    CompanyCode: String;
}
export interface CompDetails{   
    CompanyCode: String;
    CompanyName: String;
    CompanyCEO: String;
    CompanyTurnover: String;
    CompanyWebsite: String;
    StockExchange: String;
}
export interface StockDetails{
    CompanyCode : String;
    StockPrice : DecimalPipe;
    CurrDateTime : Date;
}
export interface AvgMinMaxPrice{
    avgPrice : DecimalPipe;
    minPrice : DecimalPipe;
    maxPrice : DecimalPipe;
}
export interface CompanyListResponse{
    CompDetailsAll:CompDetailsAll[];
}
export interface CompanyInfoResponse{
    CompDetails:CompDetails[];  
}
export interface companyStockResponse {
    StockDetails:StockDetails[];
    AvgMinMaxPrice:AvgMinMaxPrice[];
}
