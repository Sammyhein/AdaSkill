import buttonAdd from "./components/boutonTheme.js"
import buttonAddSkill from "./components/boutonSkill.js";

const root = document.getElementById("root")

async function getData(){

// Vide le contenu avant de recréer
    root.innerHTML = ''

    try {
        const res = await fetch("http://localhost:4242/themes");
        const data = await res.json();
        console.log(data)

        //on commence à faire apparaitre des informations
        data.forEach(themes => {
            //on créé les sections pour chaque thèmes et on les fait apparaitre
            const section = document.createElement("section")
            section.className='themes'
            root.appendChild(section)

            //on fait apparaitre les titre
            const titre = document.createElement("h2")
            titre.innerHTML = themes.theme_name
            section.appendChild(titre)

            //on s'occupe maintenant des skills
            const list = document.createElement("ul")
            list.className="skills-container"
            section.appendChild(list)

            //on fait la mise en page de chaque skill
            themes.skills.forEach(skill =>{

                //On fait un format spécifique pour les langues
                if(themes.theme_name==="Langues"){
                    const li = document.createElement("li")
                    li.className ="progress"
                //on met la condition si la progression est moins de 50%
                if(skill.progress<50) li.classList.add('less')
                li.style.setProperty('--i',skill.progress)
                li.style.setProperty('--clr', '#38bdf8')
                list.appendChild(li)

                const progress = document.createElement("h3")
                li.appendChild(progress)

                const percent = document.createElement("span")
                percent.innerHTML=skill.skill_name
                progress.appendChild(percent)
                } 
                
                //on fait le format pour tous les autres qui ne sont pas null (qui ont au moins 1skill)
                else{
                const li = document.createElement("li")
                li.className ="progress"
                //on met la condition si la progression est moins de 50%
                if(skill.progress<50) li.classList.add('less')
                li.style.setProperty('--i',skill.progress)
                li.style.setProperty('--clr', '#38bdf8')
                list.appendChild(li)

                const progress = document.createElement("h3")
                progress.innerHTML = skill.progress
                li.appendChild(progress)

                const percent = document.createElement("span")
                percent.innerHTML="%"
                progress.appendChild(percent)

                const skillName = document.createElement("h4")
                skillName.innerHTML=skill.skill_name
                li.appendChild(skillName)}
            });

            //on fait le formulaire pour ajouter un skill

            const skillForm = document.createElement("form")
            skillForm.className = "skillFrom"
            //skillForm.action = "submit"
            section.appendChild(skillForm)

            const labelSkill = document.createElement("label")
            //labelSkill.for="skill"
            labelSkill.innerHTML="Ajouter une compétence"
            skillForm.appendChild(labelSkill)

            const inputSkillName= document.createElement("input")
            inputSkillName.type="text"
            inputSkillName.name="skill"
            inputSkillName.id="inputSkill"
            inputSkillName.placeholder="Nom de la compétence"
            inputSkillName.required = true
            skillForm.appendChild(inputSkillName)

            const inputSkillProgress = document.createElement("input")
            inputSkillProgress.type="number"
            inputSkillProgress.name="skill"
            inputSkillProgress.id="inputSkill"
            inputSkillProgress.placeholder="Nombre en %"
            inputSkillProgress.required = true
            skillForm.appendChild(inputSkillProgress)


            const buttonSkill = document.createElement("button")
            buttonSkill.innerHTML = "+"
            skillForm.appendChild(buttonSkill)

            //On fait fonctionner le bouton pour les skills
            buttonAddSkill(buttonSkill, inputSkillName, inputSkillProgress, themes.idthemes, getData)
        });
        
        //on fait le formulaire pour ajouter un thème

            const themeForm = document.createElement("form")
            themeForm.className="themeForm"
            //themeForm.action="submit"
            root.appendChild(themeForm)
            
            const labelTheme = document.createElement("label")
            labelTheme.innerHTML="Ajouter un Thème"
            themeForm.appendChild(labelTheme)

            const inputTheme = document.createElement('input')
            inputTheme.type="text"
            inputTheme.name="theme"
            inputTheme.id="inputTheme"
            inputTheme.placeholder="Nom du Thème"
            inputTheme.required = true
            themeForm.appendChild(inputTheme)
            console.log(inputTheme.value)

            const buttonTheme = document.createElement("button")
            buttonTheme.type ="button"
            buttonTheme.innerHTML="+"
            themeForm.appendChild(buttonTheme)

            //On fait fonctionner le bouton pour les thèmes
            buttonAdd(buttonTheme, inputTheme , getData)

        
    } catch (error) {
        console.log("Je n'arrive pas à récuperer la database")
    }
}

getData()