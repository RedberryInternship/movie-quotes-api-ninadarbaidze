import express, { Request, Response } from "express";

const images = [
    'https://c.tenor.com/rK3k9EgLkhEAAAAC/steins-gate.gif',
    'https://c.tenor.com/wvZfA6FeOs0AAAAd/naruto-boruto.gif',
    'https://media3.giphy.com/media/pGlDpwgWTLgBi/giphy.gif',
    'https://c.tenor.com/stGMm1ODsGsAAAAC/anime-vinland-saga.gif',
    'https://i.pinimg.com/originals/ee/8f/ed/ee8fed71f21624f59205460b23820873.gif',
    'https://i.pinimg.com/originals/dd/9d/1b/dd9d1bef17c23fccf6f8224d7a70b766.gif',
]

const server = express()

server.get('/', async (_: Request, res: Response) => {
  
    const randomImgIdx = Math.floor(Math.random() * 100) % images.length

    res.send(`
    <html>
        <head>
            <title>Anime Images</title>
        </head>
        <body>
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #0c112d;
            }

            img {
                border-radius: 10px;
            }
        </style>
        <a href="/" style="width: 50%">
            <img src="${images[randomImgIdx]}" style="width: 100%" />
        </a>
        </body>
    </html>
    `);
})


server.listen(3001, () => console.log("Server is listening at http://localhost:3001"))