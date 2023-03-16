/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function enviarMusica() {
     //event.preventDefault(); // evita refresh da tela
     const URL_TO_FETCH = 'ServletRecebeMusica';
     var formData = new FormData(document.getElementById("fmusica"));
     //formData.append('acao', 'confirmar'); opcional, caso queira inserir outra informação
     fetch(URL_TO_FETCH, {
          method: 'post', body: formData
     }).then(function (response) {
          return response.text();
     }).then(function (retorno) {
          // result recebe a resposta do módulo dinâmico
          if (retorno == "true"){
               Swal.fire({
                    icon: 'success',
                    title: 'Perfeito',
                    html: 'Sua música foi adicionada ao nosso site :)'
               })
          }
          else{
               Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    html: 'Parece que tivemos um problema ao adicionar sua música :('
               })
          }

     }).catch(function (error) {
          Swal.fire({
               icon: 'error',
               title: 'Ops...',
               html: 'Parece que tivemos um problema ao adicionar sua música :('
          })
     });
}

function ArquivoValido(value) {
     let a = value.split('.')
     if (a[a.length - 1].toUpperCase() != "MP3")
          return false;

     return true;
}

function validaCampos(elem) {
     if (!elem.hasAttribute("required"))
          return false;

     if (elem.value == "") {
          elem.classList.add("errorValue")
          return false;
     }

     if (elem.id != "musica") {
          if (elem.nodeName != "SELECT")
               elem.value = elem.value.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
          
          elem.classList.remove("errorValue")
          return true;
     }

     if (ArquivoValido(elem.value)){
          elem.classList.remove("errorValue")
          return true
     }
}

function onValidating() {
     //event.preventDefault(); // evita refresh da tela
     let campos = document.querySelectorAll(".errorValue")
     let erro = "";

     campos.forEach((elem) =>{

          if (elem.id == "musica" && !ArquivoValido(elem.value)){
               erro += "<br>Não podemos enviar este tipo de arquivo.<br>Tente um com extensão .MP3 :)"
          }else{
               erro +="<br>Campo "+elem.innerText+" obrigatório"
          }
     })


     if (erro != ""){
          Swal.fire({
               icon: 'error',
               title: 'Oops...',
               html: erro
          }).then((result) => {

          })
     }else{
          enviarMusica();
     }
}

window.onload = function () {
     document.querySelector("#estilo").focus()
}
