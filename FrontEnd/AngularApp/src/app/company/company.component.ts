import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AvgMinMaxPrice, CompanyInfoResponse, CompanyListResponse, companyStockResponse, CompDetails, CompDetailsAll, StockDetails } from '../shared/company.model';
import { CompanyService } from '../shared/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {
  companyStockDetails:any=[];
  loadCompanyCode:any=[];
  companyInfo:any=[];
  StockDetails:StockDetails[]=[];
  AvgMinMaxPrice:AvgMinMaxPrice[]=[];
  CompDetailsAll:CompDetailsAll[]=[];
  CompDetails:CompDetails[]=[];
  CompanyCode:string="";
  CompanyName:string="";
  CompanyCodeSelected:string | undefined;
  StartDateSelected:Date | undefined;
  EndDateSelected:Date | undefined;
  StartDate!: Date;
  EndDate!: Date;
  errorTextMsg:string="";

  avgPrice!: DecimalPipe;
  minPrice!: DecimalPipe;
  maxPrice!: DecimalPipe;

  p:number=1 ;
  count:number=2;
  
  constructor(private compService:CompanyService) { }

  ngOnInit(): void {
    this.listCompanyCode();
  }
  
  validateDates(StartDate:Date,EndDate:Date){
    this.errorTextMsg="";
    if (!StartDate || StartDate==null ){
      this.errorTextMsg=this.errorTextMsg+'* Start date is required\n';
    }
    if (!EndDate || EndDate==null ){
      this.errorTextMsg=this.errorTextMsg+'* End date is required\n';
    }
    if (StartDate>EndDate){
      this.errorTextMsg=this.errorTextMsg+'* Start date should be less than End date\n';
    }
  }
  
  listCompanyCode(){
    this.compService.getCompanyCode().subscribe((data : CompanyListResponse) => {
    this.loadCompanyCode= data;
    console.log('data : ', this.loadCompanyCode.CompDetailsAll)
    console.log('companyDetails_list : ', this.loadCompanyCode)
    });
  }

  showCompanyInfo(CompanyCode:string){
    this.compService.getCompanyInfo(CompanyCode).subscribe((data : any) => {
    this.companyInfo= data;  
    console.log("Data:",data.name)
    //this.CompanyName=this.companyInfo.CompDetails[0].CompanyName;
    this.CompanyName= data.name;
    console.log('companyDetails_Info : ', this.companyInfo)
    });
  }

  showCompanyList(CompanyCode:string,StartDate:Date,EndDate:Date){
    this.compService.getCompanyList(CompanyCode,StartDate,EndDate).subscribe((data : companyStockResponse) => {
    this.companyStockDetails= data;
    this.avgPrice = this.companyStockDetails.AvgMinMaxPrice[0].avgPrice.$numberDecimal;
    this.maxPrice = this.companyStockDetails.AvgMinMaxPrice[0].maxPrice.$numberDecimal;
    this.minPrice = this.companyStockDetails.AvgMinMaxPrice[0].minPrice.$numberDecimal;

    console.log('companyDetails : ', this.companyStockDetails, 'avgPrice : ',this.avgPrice)
    });
  }

  onSelectCompanyCode(CompanyCode: string){
    this.showCompanyInfo(CompanyCode);
  }

  onClickCompanySearch(CompanyCode:string,StartDate:Date,EndDate:Date){
    this.validateDates(StartDate,EndDate);
    //this.showCompanyList(CompanyCode,StartDate,EndDate);
  }

}
