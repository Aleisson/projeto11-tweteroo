import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


// const user ={username:"", avatar:""};
const users = [];
const tweets = [];
// function filterList(index){

//     if(index > 9){
//         return false;
//     }

//     return true;

// }
//modo que eu fiz
// function addAvatar(tweet, users){

//     if(!tweet){
//         return "sem avatar"
//     }

//     const user = users.find(val => val.username === tweet.username);
//     if(!user){
//         return "sem avatar";
//     }

//     return user.avatar;

//   };


app.get("/", (req, res) => {

    res.send("<h1>Api Tweteroo</h1>")
    

})

app.post("/sign-up", (req,res) =>{

   
    const user = req.body;

    users.push(user);
    // users.forEach(x => console.log(x))


    res.status(201).send({message: "OK"});

})


app.post("/tweets", (req, res) =>{
    
    const {username, tweet} = req.body;
    const { avatar } = users.find(val => val.username === username);
  
    // console.log("aqui" + avatar);
    tweets.push({username, tweet, avatar});

    // tweets.forEach(x => console.log(x));

    res.status(201).send({message: "OK"});

})

app.get("/tweets", (req, res)=>{

    const tweetsList = tweets;
    tweetsList.slice(-10).reverse();
    
   //modo como fiz
    // const tweetsList = tweets.reverse().filter(((tweet,index) =>{
    //    return filterList(index);
    // }));
    // tweetsList.forEach(x => x.avatar = addAvatar(x, users))
    // console.log(tweetsList);
    res.send(tweetsList);
})


app.listen(5000, () => console.log("Rodando Porta 5000"));