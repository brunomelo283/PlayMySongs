const audio = new Audio();
audio.volume = .75;

function pesquisarMusica() {
    let html = "";
    let chave = document.getElementById("chave").value;
    let div_ret = document.getElementById("resultado_pesquisa");

    event.preventDefault(); // evita refresh da tela

    const URL_TO_FETCH = 'ServletPesquisaMusica';
    var formData = new FormData(document.getElementById("fmusica"));
    //formData.append('acao', 'confirmar'); opcional, caso queira inserir outra informação

    fetch(URL_TO_FETCH, {
        method: 'post',
        body: formData
    }).then(function (response) {
        //console.log(response);
        return response.json();
    }).then(retorno => {
        //console.log(retorno);
        html = `   
        <div class="card text-center mt-5">
            <div class="card-body" id="search">
                <table id='lista-retorno' class="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Artista</th>
                            <th>Estilo</th>
                        </tr>
                    </thead>
                    </tbody>
        `
        retorno.forEach(obj => {

            html += `
                <tr 
                    title='Clique para tocar esta música' 
                    onclick='funcoesAudio(this)'>

                    <input type='hidden' value='${obj.arquivo}'>
                    
                    <td>
                        ${obj.titulo}
                    </td>
        
                    <td>
                        ${obj.artista}
                    </td>
        
                    <td>
                        ${obj.estilo}
                    </td>
                </tr>`
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


function funcoesAudio(elem) {

    const audioPlayer = document.querySelector(".audio-player");

    const timeline = audioPlayer.querySelector(".timeline");
    const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
    const musica = audioPlayer.querySelector(".controls .name");
    const playBtn = audioPlayer.querySelector(".controls .toggle-play");
    const progressBar = audioPlayer.querySelector("#progress");
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");

    let music = elem.children[0].value;
    let titulo = elem.children[1].innerText
    let artista = elem.children[2].innerText

    audioPlayer.style.display = "";
    audio.src = "musicas_recebidas/" + music

    
    playBtn.addEventListener(
        "click",
         (e) => {
            e.stopImmediatePropagation();
            e.stopPropagation();
            audioWillPause(!audio.paused);                     
        },
        false
    );
   
    audioPlayer.querySelector(".fa-solid").addEventListener("click", () => {
        let icon = volumeEl.children[0];
        audio.muted = !audio.muted;

        if (audio.muted) {
            icon.classList.remove(`fa-volume-high`)
            icon.classList.add(`fa-volume-xmark`)
        } else {
            icon.classList.add(`fa-volume-high`)
            icon.classList.remove(`fa-volume-xmark`)
        }
    });


    audio.addEventListener(
        "loadeddata",
        () => {
            audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                audio.duration
            );

            musica.innerHTML = titulo + " - "+ artista
        },
        false
    );

    timeline.addEventListener("click", e => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
        audio.currentTime = timeToSeek;
    }, false);

    //click volume slider to change volume
    volumeSlider.addEventListener('click', e => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
    }, false)

    //check audio percentage and update time accordingly
    setInterval(() => {
        let perc = audio.currentTime / audio.duration * 100
        progressBar.style.width = perc + "%";

        if (perc >= 100) {
            progressBar.classList.remove("progressRadius")
            audioWillPause(1);
        }
        else {
            progressBar.classList.add("progressRadius")
        }

        audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
            audio.currentTime
        );

    }, 500);




    audio.addEventListener("canplaythrough", (e) => {
       
        audioWillPause(0);
        e.stopImmediatePropagation();
        e.stopPropagation();
       
        
    })

    function audioWillPause(willPause) {
        console.log(willPause);
        if (willPause) {
            playBtn.classList.remove("pause");
            playBtn.classList.add("play");
            audio.pause();
        }
        else {
            playBtn.classList.remove("play");
            playBtn.classList.add("pause");
            audio.play();
        }
        
    }
}
//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
}