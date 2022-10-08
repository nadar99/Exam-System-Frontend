import { Component, OnInit } from '@angular/core';
import {Question} from "../question.model";
import {QuestionService} from "../question.service";
import {HttpErrorResponse} from "@angular/common/http";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../category/category.service";
import {Category} from "../../category/category.model";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

   questions:Question[] = [];
   categories:Category[] = [];
   startCategories:Category[] = [];
   responseError:boolean = false;
   responseErrorBody:string;
   ids:string[] = [];
   deletedQuestion:Question= null;
   editQuestion:Question= null;
   modal :any;
   p: number = 1;
  constructor(private questionService:QuestionService,private modalService: NgbModal,private categoryService:CategoryService) {
  }

  ngOnInit(): void {
    this.getQuestions();

  }

  public getQuestions() :void{
    this.questionService.getQuestions().subscribe(
      (response:Question[])=>{
        console.log("res"+response);
        if(!response){
          this.responseError = true;
        }
        this.questions = response;
        this.questions.sort( (objA, objB) => objA.created_at > objB.created_at? -1 : 1);
      },
      (error)=>{
      }
    );
  }
  public open(modal: any,mode:string,question?:Question): void {
   this.modal = this.modalService.open(modal);
   if(mode === 'delete'){
     this.deletedQuestion = question;
   }
    if(mode === 'edit'){
      this.editQuestion = question;
      this.categoryService.getAllCategories().subscribe(
        ((response:Category[]) =>{
          this.startCategories = response;
        }),(error=>{
          alert(error.message);
        })
      );
    }

  }
  public onDeleteQuestion(id:string):void{
    this.questionService.deleteQuestion(id).subscribe(
      (response)=>{
        this.getQuestions();
        this.modal.close();
      },
      (error)=>{
        alert(error.message);
      }
    );
  }

 public onUpdateQuestion(question:Question):void{
  this.questionService.updateQuestion(question).subscribe(
    (response)=>{
      this.getQuestions();
      this.modal.close();
    },
    (error)=>{
      alert(error.message);
    }
  );
 }

 public onAddQuestion(form:NgForm):void{
   this.questionService.addQuestion(form.value).subscribe(
     (response)=>{
       this.getQuestions();
       this.modal.close();
     },
     (error)=>{
       alert(error.message);
     }
   );
 }
}
