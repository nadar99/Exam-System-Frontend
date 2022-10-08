import {Category} from "../category/category.model";

export  interface Question {
  id:string;
  name:string;
  level:string;
  type:string;
  category_id:string;
  sub_category:string;
  mark:number;
  expected_time:number;
  created_by:string;
  created_at:Date;
  category_name?:string;
}
