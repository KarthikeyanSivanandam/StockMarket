import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyInfoResponse, CompanyListResponse, companyStockResponse } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  // private compcode="test103";
  // private sdate="2022-06-10";
  // private edate="2022-06-10";
  // baseUrl: string = `http://localhost:3000/api/v1.0/market/stock/get/${this.compcode}/${this.sdate}/${this.edate}`;

  baseUrl: string = `http://35.88.79.177:3000/api/v1.0/market`
  newUrl: string="";
  localbaseUrl:string ="https://localhost:7099/api/Company";

  constructor(private httpClient:HttpClient) { }

  getCompanyCode():Observable<CompanyListResponse>{
    this.newUrl = `/company/getall`;   
    return this.httpClient.get<CompanyListResponse>(this.localbaseUrl);
  }

  getCompanyInfo(CompanyCode:string):Observable<any>{
    this.newUrl = `/company/info/${CompanyCode}`;
    console.log("GetcompanyURL",this.localbaseUrl+`/${CompanyCode}`);
    return this.httpClient.get<any>(this.localbaseUrl+`/${CompanyCode}`);
  }

  getCompanyList(CompanyCode:string,StartDate:Date,EndDate:Date):Observable<companyStockResponse>{
    this.newUrl = `/stock/get/${CompanyCode}/${StartDate}/${EndDate}`;
    return this.httpClient.get<companyStockResponse>(this.baseUrl+this.newUrl);
  }

  // getCompanyList():Observable<companyStockResponse>{
  //   return this.httpClient.get<companyStockResponse>(this.baseUrl);
  // }
}
