import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Question} from "./question.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpClient:HttpClient) { }

  public getQuestions():Observable<Question[]>{
    return this.httpClient.get<Question[]>(`${this.apiServerUrl}/api/questions`);
  }

  public addQuestion(question:Question):Observable<Question>{
    return this.httpClient.post<Question>(`${this.apiServerUrl}/api/questions/add`,question);
  }

  public updateQuestion(question:Question):Observable<Question>{
    return this.httpClient.put<Question>(`${this.apiServerUrl}/api/questions/update`,question);
  }

  public deleteQuestion(id:string):Observable<any>{
    return this.httpClient.delete(`${this.apiServerUrl}/api/questions/delete/${id}`);
  }



}
