import express from 'express'
import ejs from 'ejs'
import axios from 'axios'
import bodyParser from 'body-parser'

const app = express();
const port = 3000;
const URL  = 'https://api.jikan.moe/v4/';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("search.ejs");
});

app.post("/submit", async (req, res) => {
        const searchName = req.body.animeName;
        const currentpage =  Number(req.body.page);
        // console.log(currentpage);
    try {
        const result = await axios.get(`${URL}anime?q=${searchName}&page=${currentpage}&limit=20`);
        const anime = result.data;
        const pages = anime.pagination.last_visible_page;
        res.render("search.ejs", {
            content: anime,
            titleAnime: searchName,
            currentPage: currentpage,
            pages: pages     
        });
    } catch (error) {
        console.log(error.message); 
    }

});

app.post("/random", async (req,res)=>{
    try {
        const result = await axios.get(`${URL}random/anime?limit=20`);
        const anime = result.data;
        res.render("search.ejs", {random: anime});
    } catch (error) {
        console.log(error.message); 
    }
});

app.listen(port, ()=>{
    console.log(`Listening on Port ${port}`);
});