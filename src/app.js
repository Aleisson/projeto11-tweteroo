import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


// const user ={username:"", avatar:""};
const users = []

app.get("/", (req, res) => {

    res.send("<h1>Api Tweteroo</h1>")
    

})

app.post("/sign-up", (req,res) =>{

   
    const user = req.body;

    console.log(user.username);
    console.log(user.avatar);
    console.log(user);


    res.send("OK");

})


app.listen(5000, () => console.log("Rodando Porta 5000"));