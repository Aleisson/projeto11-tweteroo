import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


// const user ={username:"", avatar:""};
const users = [];
const tweets = [];
function filterList(index){

    if(index > 9){
        return false;
    }

    return true;

}

function addAvatar(tweet, users){

    if(!tweet){
        return "sem avatar"
    }

    const user = users.find(val => val.username === tweet.username);
    if(!user){
        return "sem avatar";
    }

    return user.avatar;

  };


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

    const tweet = req.body;

    tweets.push(tweet);

    // tweets.forEach(x => console.log(x));

    res.status(201).send({message: "OK"});

})

app.get("/tweets", (req, res)=>{

    // const tweetsList = tweets.splice(-10).reverse();
    const tweetsList = tweets.reverse().filter(((tweet,index) =>{
       return filterList(index);
    }));
    tweetsList.forEach(x => x.avatar = addAvatar(x, users))
    // console.log(tweetsList);
    res.send(tweetsList);
})


app.listen(5000, () => console.log("Rodando Porta 5000"));