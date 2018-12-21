package Servicios;

import org.h2.tools.Server;

import java.sql.SQLException;

public class SerBS {
    private static SerBS instancia;

    public static SerBS getInstancia() {
        if (instancia == null) {
            instancia = new SerBS();
        }
        return instancia;
    }

    public static void iniciarBaseDatos() throws SQLException {
        Server.createTcpServer("-tcpPort", "9092", "-tcpAllowOthers").start();
    }

    public static void detenerBaseDatos() throws SQLException {
        Server.shutdownTcpServer("tcp://localhost:9092", "", true, true);
    }
}