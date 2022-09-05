import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


// const user ={username:"", avatar:""};
const users = [];
const tweets = [];

//modo que eu fiz
// function filterList(index){

//     if(index > 9){
//         return false;
//     }

//     return true;

// }
function addAvatar(tweet, users) {

    if (!tweet) {
        return "sem avatar"
    }

    const user = users.find(val => val.username === tweet.username);
    if (!user) {
        return "sem avatar";
    }

    return user.avatar;

};


app.get("/", (req, res) => {

    res.send("<h1>Api Tweteroo</h1>")


})

app.post("/sign-up", (req, res) => {

   
    const { username, avatar } = req.body;

    if (!username || !avatar) {
        res.status(400).send({ erro: "Todos os campos são obrigatórios!" });
        return;
    }

    users.push({ username, avatar });



    res.status(201).send({ message: "OK" });

})


app.post("/tweets", (req, res) => {
    const {user: username} = req.headers;
    const {  tweet } = req.body;

    if (!username || !tweet) {
        res.status(400).send({ erro: "Todos os campos são obrigatórios!" });
        return;
    }

    let teste = tweets.length + 1
    tweets.push({ username, tweet, cont: tweets.length + 1 });


    res.status(201).send({ message: teste });

})

app.get("/tweets", (req, res) => {

    const { page } = req.query;

    if (!page || page < 1) {
        res.status(400).send({ erro: "Informe uma página válida!" });
        return;
    }
    // console.log("page = " + page);
    const limite = 10;// limite de itens na tela 
    const start = (page - 1) * limite;
    // console.log("start= "+ start)
    const end = page * limite;
    // console.log("end= "+ end);

    tweets.forEach(tweet => tweet.avatar = addAvatar(tweet, users))

    if (tweets.length <= 10) {
        res.send([...tweets].reverse());
        console.log("aqui")
        return;
    }

    res.status(200).send([...tweets].slice(start, end).reverse());

})




app.get("/tweets/:username", (req, res) => {

    const { username } = req.params;

    const tweetsUser = tweets.filter(tweet => tweet.username === username);

    tweetsUser.forEach(tweet => tweet.avatar = addAvatar(tweet, users))

    res.status(200).send(tweetsUser);

})


app.listen(5000, () => console.log("Rodando Porta 5000"));