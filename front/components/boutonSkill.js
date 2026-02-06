export default function buttonAddSkill(button, inputText, inputNumber, idThemes, upload){

    async function postData(e) {
        e.preventDefault()

        try {
        await fetch("http://localhost:4242/skill", {method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({name:inputText.value, progress:inputNumber.value, idThemes:idThemes})})
        
        console.log("POST du SKILL envoyé avec succès !")

        if(upload){
            upload()
        }

        } catch (error) {
            console.log("J'ai pas réussi à POST", error)
        }
    }

    button.addEventListener("click",(e) =>{
        if(inputText.value !== '' && inputNumber.value !== ''){
        postData(e)
        }else{
            alert("Vous devez remplir tous les champs")
        }
    })

}