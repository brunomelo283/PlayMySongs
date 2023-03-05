/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function enviarMusica(){
    event.preventDefault(); // evita refresh da tela
    
    
    
   const URL_TO_FETCH = 'ServletRecebeMusica';

   var formData = new FormData(document.getElementById("fmusica"));
   
   //formData.append('acao', 'confirmar'); opcional, caso queira inserir outra informação
                
   fetch(URL_TO_FETCH, { method: 'post',body: formData 
   }).then(function (response) {
        return response.text();
   }).then(function (retorno) {
        // result recebe a resposta do módulo dinâmico
        document.getElementById("feedback").innerHTML = retorno;
        
   }).catch(function (error) {
        document.getElementById("feedback").innerHTML = error;
   });
}

