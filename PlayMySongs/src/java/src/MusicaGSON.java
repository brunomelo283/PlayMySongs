/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package src;

/**
 *
 * @author 22gab
 */
public class MusicaGSON {
    private String titulo, artista, estilo, arquivo;

    public String getTitulo() {
        return titulo;
    }

    public String getArtista() {
        return artista;
    }

    public String getEstilo() {
        return estilo;
    }

    public String getArquivo() {
        return arquivo;
    }
     
     
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setArtista(String artista) {
        this.artista = artista;
    }
    
    public void setEstilo(String estilo) {
        this.estilo = estilo;
    }

    public void setArquivo(String arquivo) {
        this.arquivo = arquivo;
    }
        

    public MusicaGSON(String titulo, String artista, String estilo, String arquivo) {
        this.titulo = titulo;
        this.artista = artista;
        this.estilo = estilo;
        this.arquivo = arquivo;
    }
}
