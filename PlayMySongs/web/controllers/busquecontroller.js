function pesquisarMusica()
{
    let html = "";
    let chave = document.getElementById("chave")
    let div_ret = document.getElementById("resultado_pesquisa");

    event.preventDefault(); // evita refresh da tela

    const URL_TO_FETCH = 'ServletPesquisaMusica';

    //formData.append('acao', 'confirmar'); opcional, caso queira inserir outra informação
    
    var msc = fetch(URL_TO_FETCH, {
        method: 'post',
        body: new FormData(document.getElementById("fmusica"))
    }).then(function (response) {
        return response.text();
    }).then(retorno => {
         console.log(retorno)
        /*html = `   
        <div class="card text-center mt-5">
            <div class="card-body">
                <table class="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Play</th>
                            <th>Título</th>
                            <th>Artista</th>
                            <th>Estilo</th>
                        </tr>
                    </thead>
                    </tbody>
        `
    
        retorno.forEach(obj => {
            html +=`
                <tr>
                    <td>
                        <audio controls>
                            <source src="musicas_recebidas/${obj.arquivo}" type="audio/mpeg"> 
                            </source>
                        </audio>
                    </td>
        
                    <td>
                        ${obj.titulo}
                    </td>
        
                    <td>
                        ${obj.artista}
                    </td>
        
                    <td>
                        ${obj.estilo}
                    </td>
                </tr>
            `
        });

        html += `
                    </tbody>
                </table>
            </div>
        </div>
        `
    
        div_ret.innerHTML = html;*/
    });
}
