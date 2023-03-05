/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import src.MusicaGSON;

/**
 *
 * @author Bruno
 */
@WebServlet(name = "ServletPesquisaMusica", urlPatterns = {"/ServletPesquisaMusica"})

@MultipartConfig(
        location = "/",
        fileSizeThreshold = 1024 * 1024, // 1MB *      
        maxFileSize = 1024 * 1024 * 100, // 100MB **
        maxRequestSize = 1024 * 1024 * 10 * 10 // 100MB ***
)

public class ServletPesquisaMusica extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String chave = request.getParameter("chave");

        response.setContentType("text/html;charset=UTF-8");
        try {
            /* TODO output your page here. You may use following sample code. */
            File pastaweb = new File(request.getServletContext().getRealPath("") + "/musicas_recebidas");

            Gson gson = new GsonBuilder().create();
            ArrayList array = new ArrayList<>();
            String[] musica;

            if (chave == null || chave.isEmpty()) {
                for (File file : pastaweb.listFiles()) {
                    if (file.isFile()) {
                        musica = file.getName().substring(0, file.getName().lastIndexOf(".")).split("_");

                        array.add(
                                new MusicaGSON(musica[0],
                                        musica[2],
                                        musica[1],
                                        file.getName())
                        );
                    }
                }
            } else {
                for (File file : pastaweb.listFiles()) {
                    if (file.isFile()) {
                        if (file.getName().toLowerCase().contains(chave.toLowerCase())) {
                            musica = file.getName().substring(0, file.getName().lastIndexOf(".")).split("_");

                            array.add(
                                    new MusicaGSON(musica[0],
                                            musica[2],
                                            musica[1],
                                            file.getName())
                            );
                        }
                    }
                }
            }

            response.getWriter().println(gson.toJson(array));
            response.getWriter().close();
        } catch (Exception e) {
            response.getWriter().println("Erro ao receber o arquivo " + e);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
