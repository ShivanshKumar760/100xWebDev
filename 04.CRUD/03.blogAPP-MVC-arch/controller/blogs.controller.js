import blogCollection from "../model/blogSchema.js";

const allBlogs=(req, res) => {//working
    blogCollection.find().then((posts)=>{
      res.status(200).render("index",{title:"Home",posts:posts});
    }).catch((err)=>{
      console.log(err);
      res.status(400).json({errorMessage:"Cannot fetch data from server !"});
    });
};

const perticularBlog=(req, res) => {//working
    const {params:{_id}}=req;
    blogCollection.findById(_id).then((post)=>{
      const makePost_Array=[post];
      res.status(200).render("index",{title:makePost_Array[0].title,posts:makePost_Array});
    }).catch((err)=>{
      console.log(err);
      res.status(400).json({errorMessage:"Cannot fetch blog-post from server !"});
    });
    
};

const getPath_blogForm=(req,res)=>{
    const {params:{_id}}=req;
    console.log(_id);
    let post;
    blogCollection.findById(_id).then((postItem)=>{
      post=postItem
      res.render("modify",{post:post});
    }).catch((err)=>{
      console.log(err);
      res.status(400).json({errorMessage:"Cannot fetch blog-post from server !"});
    });
};

const postForm=(req, res) => {//working
    res.render('create', { title: 'Create a new blog' });
};

const postBlog=(req, res) => {//working
    // console.log(req.body);
    const post = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      createdAt: new Date(),
    };
    const newPost=new blogCollection(post);
    blogCollection.create(newPost).then(()=>{
      res.redirect("/blogs");
    }).catch((err)=>{
      console.log(err);
        res.status(401).json({errorMessage:"Cannot create blog-post!"});
    });
};


const patchBlog=(req, res) => {//working
    const {params:{_id}}=req;
    const {body}=req;
    blogCollection.findByIdAndUpdate(_id,{$set:body},{new:true})
     .then(function(fixArticle)
     {
      // res.status(201).json(fixArticle);
      res.redirect("/blogs");
     }).catch((err)=>{
          res.json({errorMsg:err});
      });
};


const deleteBlog= (req, res) => {//working
    const {params:{_id}}=req;
    console.log(_id)
    blogCollection.findByIdAndDelete(_id).then(()=>{
      res.redirect("/");
    }).catch((err)=>{
      res.json({errorMsg:err});
    });
    
};


export {allBlogs,perticularBlog,getPath_blogForm,postBlog,patchBlog,deleteBlog,postForm};