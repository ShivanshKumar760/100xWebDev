//Interface are way to define our own custom
//type data 

//it's like how we define schemas in mongoose for the mongodb document 

interface Author{
    name:string,
    avatar:string
    age?:number//this is basicallya a optional property casue it has this ?
    //and it indicates that if the object which is created using this interface 
    //does not have a age property it wont through error 
};

const authorOne:Author={
    name:"Shivi",
    avatar:"img/avatar1.png"
};

interface Post{
    title:string
    body:string
    tags:string[]
    created_at:Date
    author:Author
};

const newPost:Post={
    title:"My First Post",
    body:"Something Interesting",
    tags:["gaming","tech"],
    created_at:new Date(),
    author:authorOne
};

//Passing interface as the type to parameter 

function createPost(post:Post):void{
    console.log(`Created Post ${post.title} by ${post.author.name}`);
}

createPost(newPost);


//using interface for arrays

//so to add typecheck in array we do somthing like this:let variable:type[]
//let arr:string[];
//we can do the same with interface

let arr:Post[]=[];

arr.push(newPost);
console.log(arr);
