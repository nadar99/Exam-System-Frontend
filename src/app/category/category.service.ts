import {Injectable, Optional} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Category} from "./category.model";
import {Observable} from "rxjs";
import {Question} from "../questions/question.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpClient:HttpClient) { }

  public getCategoryById(id:string):Observable<Category>{
    return this.httpClient.get<Category>(`${this.apiServerUrl}/api/categories/${id}`);
  }
  public getAllCategories():Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.apiServerUrl}/api/categories`);
  }
  public addCategory(category:Category):Observable<Category>{
    return this.httpClient.post<Category>(`${this.apiServerUrl}/api/categories/add`,category);
  }
  public getCategoriesByIds(ids:string[]):Observable<Category[]>{
    console.log(`${this.apiServerUrl}/api/categories/all/`,{params:{'ids':ids}});
    return this.httpClient.get<Category[]>(`${this.apiServerUrl}/api/categories/all/`,{params:{'ids':ids}});
  }
}
