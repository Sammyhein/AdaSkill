import { API_BASE_URL } from "../api"
export default function buttonAdd(button, input, upload){

    async function postData(e) {
        e.preventDefault()

        try {
        await fetch(`${API_BASE_URL}/theme`, {method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({name:input.value})})
        
        console.log("POST envoyé avec succès !")
s 
        

        } catch (error) {
            console.log("J'ai pas réussi à POST", error)
        }
    }

    button.addEventListener("click",(e) =>{
        if(input.value !== ''){
            postData(e)
            upload()
        }else{
            alert("Vous devez donner un nom à votre thème!")
        }
        
    })

}