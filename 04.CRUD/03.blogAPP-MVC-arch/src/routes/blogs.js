import express from "express";
import { Router } from "express";
import { allBlogs,perticularBlog,getPath_blogForm,postBlog,patchBlog,deleteBlog, postForm, getJson_dataBlog} from "../controller/blogs.controller.js";
const blogRouter=Router();
blogRouter.get('/blogs', allBlogs);
  
blogRouter.get('/blogs/create', postForm);
  
    

  
blogRouter.get("/blogs/patch/:_id",getPath_blogForm)
  
blogRouter.get("/blogs/perticular/:_id",perticularBlog );
blogRouter.get("/blogs/json/:_id",getJson_dataBlog );
  
//POST
blogRouter.post('/blogs',postBlog );
  
//PATCH METHOD
blogRouter.patch("/blogs/patch/:_id", patchBlog);
  
  
//DELETE METHOD:
blogRouter.delete("/blog/delete/:_id",deleteBlog);


export default blogRouter;