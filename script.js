let nome = prompt ("Por favor, digite seu nome!")
let chat = [];
let objetoNome = {name: nome}
let enviarMsg =  ''
function enviarNome(){

const promessa = axios.post ('https://mock-api.driven.com.br/api/v6/uol/participants',
objetoNome
)
promessa.then(buscarMensagens);
promessa.catch(deuErro)

}
buscarMensagens();


function buscarMensagens(){
    let promessaStatus = axios.get ('https://mock-api.driven.com.br/api/v6/uol/messages');
    promessaStatus.then (mostrarMensagens);
    promessaStatus.catch(deuErro)
    

    }
   
    function mostrarMensagens(resposta){
       
        chat = resposta.data
        const caixaConversa = document.querySelector('.caixaConversa')
    

        caixaConversa.innerHtml=''
        
        for(i=0; i<chat.length; i++)
        { console.log('alo');
             if (chat[i].type === "status") { 
                caixaConversa.innerHTML += `
                <div class="mensagensStatus">
                 <p class="hora">${chat[i].time}</p>
                 <p class="nome">${chat[i].from}</p>
                 <p class ='entrou'>${chat[i].text}</p>
                </div>`
                 } 
             if (chat[i].type === 'message') {
                    caixaConversa.innerHTML += `
                    <div class="mensagensNormais">
                     <p class="hora">${chat[i].time}</p>
                     <p class="nome">${chat[i].from}</p>
                     <p class="para">para</p>
                     <p class="nome">${chat[i].to}</p>
                     <p class="texto">${chat[i].text}</p>
                    </div>`
                 }
             if (chat[i].type === 'private_message') {
                caixaConversa.innerHTML += `
                <div class="mensagensReservadas">
                 <p class="hora">${chat[i].time}</p>
                 <p class="nome">${chat[i].from}</p>
                 <p class="para">reservadamente para</p>
                 <p class="nome">${chat[i].to}</p>
                 <p class="texto">${chat[i].text}</p>
               </div>
                `
            }
         } puxarMensagens();
    }

    function puxarMensagens(){
        const elementoQueQueroQueApareca = document.querySelector('.caixaConversa');
        let ultimaMsg = elementoQueQueroQueApareca.lastElementChild
        ultimaMsg.scrollIntoView();
    }
    
    function enviarMensagem (){
       
       console.log('ola tudo bem');
        enviarMsg =  document.querySelector('.botao').value
       let objeto = {
             from: nome,
             to: 'Todos',
             text: enviarMsg,
             type: "message" // ou "private_message" para o bônus
          }

       let promessa = axios.post ('https://mock-api.driven.com.br/api/v6/uol/messages', objeto)
       promessa.then(mostrarMensagens);
       promessa.catch(erroAtualizar)


    }

    function manterConexao(){
        const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",
        objetoNome
   )git
        promessa.catch(erroAtualizar)
}

    function deuErro(){
    alert ('Esse nome já está em uso.');
    window.location.reload()
}

    function erroAtualizar(){
        alert("Você ficou inativo")
        window.location.reload()
    }

// setInterval(manterConexao, 5000);
// setInterval(mostrarMensagens, 3000);