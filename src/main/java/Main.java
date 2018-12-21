import Servicios.SerBS;

public class Main {


    public static void main(String[] args){
        try {
            SerBS.iniciarBaseDatos();
            Enrutamiento.crearRutas();
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
