function pesquisarMusica()
{
    let html = "";
    let chave = document.getElementById("chave").value;
    let div_ret = document.getElementById("resultado_pesquisa");

    event.preventDefault(); // evita refresh da tela

    console.log(chave);
    const URL_TO_FETCH = 'ServletPesquisaMusica';
    var formData = new FormData(document.getElementById("fmusica"));
    //formData.append('acao', 'confirmar'); opcional, caso queira inserir outra informação

    fetch(URL_TO_FETCH, {
        method: 'post',
        body: formData
    }).then(function (response) {
        console.log(response);
        return response.json();
    }).then(retorno => {
        console.log(retorno);
        html = `   
        <div class="card text-center mt-5">
            <div class="card-body" id="search">
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
            html += `
                <tr>
                    <td>
                        <div class="audio-player"> 
                            <audio controls class="audio">
                                <source src="musicas_recebidas/${obj.arquivo}" type="audio/mpeg"> 
                                </source>
                            </audio>
                            
                        </div>
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

        div_ret.innerHTML = html;
    });
}
