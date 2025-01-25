"use strict";
//Interface are way to define our own custom
//type data 
;
const authorOne = {
    name: "Shivi",
    avatar: "img/avatar1.png"
};
;
const newPost = {
    title: "My First Post",
    body: "Something Interesting",
    tags: ["gaming", "tech"],
    created_at: new Date(),
    author: authorOne
};
//Passing interface as the type to parameter 
function createPost(post) {
    console.log(`Created Post ${post.title} by ${post.author.name}`);
}
createPost(newPost);
//using interface for arrays
//so to add typecheck in array we do somthing like this:let variable:type[]
//let arr:string[];
//we can do the same with interface
let arr = [];
arr.push(newPost);
console.log(arr);
