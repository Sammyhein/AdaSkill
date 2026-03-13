// //import express
// const express = require('express')
// //constante app => express()
// const app = express()
// //definir le ort qu'on utilise
// const port = 3000

// //route, une route get
// //req => request
// //res => response
// //res.send => retourne "Hello World"
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// // app.listen => lis notre route 
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();
const PORT = process.env.PORT || 4242;

const sql = neon(`${process.env.DATABASE_URL}`)

app.use(cors())
app.use(express.json());

app.get('/', async (_, res) => {
  const response = await sql`SELECT * FROM themes`;;
  res.json(response);
});

app.get('/name', async (_, res) => {
  const response = await sql`SELECT name FROM themes WHERE id=1`;
  console.log(response)
  res.json(response);
});

app.get('/themes', async (_, res) => {
   // Récupère tous les thèmes
    const themesData = await sql`SELECT * FROM themes ORDER BY idThemes`;
    
    // Récupère tous les skills
    const skillsData = await sql`SELECT * FROM skills ORDER BY idThemes, idSkills`;
    
    // Combine les données et le met dans le format que l'on souhaite
    const result = themesData.map(theme => ({
      idthemes: theme.idthemes,
      theme_name: theme.name,
      skills: skillsData
        .filter(skill => skill.idthemes === theme.idthemes)
        .map(skill => ({
          idskills: skill.idskills,
          skill_name: skill.name,
          progress: skill.progress
        }))
    }));
    
    res.json(result);
});

app.post("/theme", async (req, res) => {
  //const {name, skills, progress} = req.body;
  const { name } = req.body;
  const response = await sql`INSERT INTO themes(name)
  VALUES(${name})`;
  res.json(response)
})

app.post("/skill",async(req, res) =>{
  const { name , progress , idThemes} = req.body
  const response = await sql`INSERT INTO skills(name, progress, idThemes)
  VALUES(${name}, ${progress}, ${idThemes})`;
  res.json(response)
})



app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});

// export default sql;