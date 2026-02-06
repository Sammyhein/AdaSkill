export default function buttonAdd(button, input, upload){

    async function postData(e) {
        e.preventDefault()

        try {
        await fetch("http://localhost:4242/theme", {method:"POST", headers:{"Content-Type":"application/json"},body:JSON.stringify({name:input.value})})
        
        console.log("POST envoyé avec succès !")

        if(upload){
            upload()
        }

        } catch (error) {
            console.log("J'ai pas réussi à POST", error)
        }
    }

    button.addEventListener("click",(e) =>{
        if(input.value !== ''){
            postData(e)
        }else{
            alert("Vous devez donner un nom à votre thème!")
        }
        
    })

}