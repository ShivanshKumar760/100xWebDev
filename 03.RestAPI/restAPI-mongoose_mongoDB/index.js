import express from "express";
import mongoose from "mongoose";
const app=express();
const port=3000;

mongoose.connect("mongodb://localhost:27017/wikiDB").then(()=>{
    app.listen(port,()=>{console.log("Server is running");});
})
.catch(err=>{console.log("Mongo sever cannot get connected")});

const wikiAritcleSchema = new mongoose.Schema(
    {
        title:String,
        content:String
});
app.use(express.json());
const wikiArticleCollection = mongoose.model("Article",wikiAritcleSchema);//if the collection is not present it 
//will create the collection 

//routes 
app.get("/api/articles",function(req,res){
    wikiArticleCollection.find().then((collectionArray)=>{
        res.status(200).json({allArticle:collectionArray});
    }).catch((err)=>{
        res.json({err:"Error cannot find the collection's article"});
    });
});

app.get("/api/get/article/:id",function(req,res,){
    const {params:{id}}=req;
    wikiArticleCollection.findOne({_id:id}).then(function(article){
        res.json({article:article});
    }).catch((err)=>{res.json({err:"Error cannot find the article"})});
});

app.post("/api/addArticle",function(req,res){
    const {body:{title,content}}=req;
    const newAritcle=new wikiArticleCollection({
        title:title,
        content:content
    });

    wikiArticleCollection.create(newAritcle).then(()=>{
        res.redirect("/api/articles");
    }).catch(err=>{res.json({err:"Could not insert article"})});

});

app.put("/api/update/article/:id",function(req,res){
    const {params:{id}}=req;
    const {body:{title,content}}=req;
    wikiArticleCollection.replaceOne({_id:id},{title:title,content:content})
    .then(function(updateArticleInfo){
        res.json(updateArticleInfo);
    }).catch(function(err){
        res.json({error:err});
    });

})

app.patch("/api/fix/article/:id",function(req,res){
    const {params:{id}}=req;
    const{body}=req;
    wikiArticleCollection.findByIdAndUpdate(id,{$set:body},{new:true})
    .then((fixArticle)=>{
        res.json({fixedAritcle_attribute:fixArticle});
    })
    .catch((error)=>{
        res.json({error:error});
    });
})

app.delete('/api/deleteArticle',function(req,res){
    wikiArticleCollection.deleteMany().then((deletedCollectionArticle)=>{
        res.json({msg:"Deleted article are",deleted:deletedCollectionArticle});
    })
    .catch(err=>{res.json({err:"Could not delete"})});
});