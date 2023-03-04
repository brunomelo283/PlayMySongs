function pesquisarMusica()
{
    var html = "";
    
    
    var div_ret = document.getElementById("resultado_pesquisa");

    event.preventDefault(); // evita refresh da tela

    const URL_TO_FETCH = 'ServletPesquisaMusica';

    //formData.append('acao', 'confirmar'); opcional, caso queira inserir outra informação

    var msc = fetch(URL_TO_FETCH, {method: 'get'
    }).then(function (response) {
        return response.text();
    }).then(retorno => {

        html =
                `
    <audio controls>
        <source src="musicas_recebidas/${retorno}" type="audio/mpeg"> </source>
    </audio>`

        //devolver o html gera para a interface de busca
        div_ret.innerHTML = html;
    });
//   }).then(function (retorno) {
//        // result recebe a resposta do módulo dinâmico
//        console.log(retorno);
//        document.getElementById("resultado_pesquisa").innerHTML = retorno;
//        
//   }).catch(function (error) {
//        document.getElementById("resultado_pesquisa").innerHTML = error;
//   });


    //let chave = document.getElementById("pesquisa").value;
    //fetch api para executar o servlet de músicas
    //repassando a chave
    //depois dos dados(nome completo de cada mp3) recebidos em uma string
    //divida com split
    //faça um laço
    //gere um html com os audio controls



}
