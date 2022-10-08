import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QuestionsComponent} from "./questions/questions.component";
import {QuestionAddComponent} from "./questions/question-add/question-add.component";
import {QuestionListComponent} from "./questions/question-list/question-list.component";

const routes: Routes = [
  {path:"",redirectTo:'/questions',pathMatch:'full'},
  {path:"questions",component:QuestionsComponent,children:[
      {path:"",component:QuestionListComponent},
      {path:"add",component:QuestionAddComponent}
    ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
