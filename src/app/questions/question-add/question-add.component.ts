import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {QuestionService} from "../question.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../category/category.service";
import {Category} from "../../category/category.model";

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {
  categories:Category[] = [];
  showAddCategoryForm:boolean = false;
  constructor(private questionService:QuestionService,private router:Router,private route:ActivatedRoute,
  private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  public getCategories():void{
    this.categoryService.getAllCategories().subscribe(
      ((response:Category[]) =>{
        this.categories = response;
      }),(error=>{
        alert(error.message);
      })
    );
  }
  public onAddQuestion(form:NgForm):void{
    this.questionService.addQuestion(form.value).subscribe(
      (response)=>{
        this.router.navigate([''],{relativeTo:this.route});
      },
      (error)=>{
        alert(error.message);
        this.router.navigate([''],{relativeTo:this.route});
      }
    );
  }
  public onshowAddCategoryForm():void{
    this.showAddCategoryForm = true;
  }
  public onAddCategory(form:NgForm):void{
    this.categoryService.addCategory(form.value).subscribe(
      ((response)=>{
        this.getCategories();
        this.showAddCategoryForm = false;
      })
    );
  }
}
