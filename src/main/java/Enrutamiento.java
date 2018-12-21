import Modelos.Persona;
import Servicios.SerPers;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.Version;

import java.io.StringWriter;
import java.util.*;

import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.staticFiles;
import static spark.debug.DebugScreen.enableDebugScreen;

public class Enrutamiento {
    public static void crearRutas(){
        final Configuration configuration = new Configuration(new Version(2, 3, 23));
        configuration.setClassForTemplateLoading(Main.class, "/");

        staticFiles.location("/publico");

        enableDebugScreen();

        get("/", (req, res) -> {
            StringWriter writer = new StringWriter();
            Map<String, Object> atributos = new HashMap<>();
            Template template = configuration.getTemplate("plantillas/index.ftl");

            template.process(atributos, writer);

            return writer;
        });

        get("/agregarRegistro", (req, res) -> {
            StringWriter writer = new StringWriter();
            Map<String, Object> atributos = new HashMap<>();
            Template template = configuration.getTemplate("plantillas/addreg.ftl");

            template.process(atributos, writer);

            return writer;
        });

        get("/mapa", (req, res) -> {
            StringWriter writer = new StringWriter();
            Map<String, Object> atributos = new HashMap<>();
            Template template = configuration.getTemplate("plantillas/map.ftl");
            List<Persona> personas = SerPers.getInstancia().listar();

            atributos.put("personas", personas);
            template.process(atributos, writer);

            return writer;
        });

        post("/sincronizar", (req, res) -> {
            String data = req.queryParams("datos");
            data = data.replace("[", "");
            data = data.replace(']', ' ');
            data = data.replace('}', ' ');
            data = data.replace("\"", "");

            String[] datosAux = data.split("\\{");
            ArrayList<String[]> datos = new ArrayList<>();
            ArrayList<String[]> arregloAux = new ArrayList<>();

            for(String dato : datosAux) {
                datos.add(dato.split(","));
            }

            for (String[] dato : datos) {
                for(String dat : dato) {
                    arregloAux.add(dat.split(":"));
                }
            }

            for (int i = 0; i < arregloAux.size(); i++) {
                if ((i + 1) % 6 == 0) {
                    Persona personaNueva = new Persona(
                            arregloAux.get(i - 4)[arregloAux.get(i - 4).length - 1],
                            arregloAux.get(i - 3)[arregloAux.get(i - 3).length - 1],
                            arregloAux.get(i - 2)[arregloAux.get(i - 2).length - 1],
                            arregloAux.get(i - 1)[arregloAux.get(i - 1).length - 1],
                            arregloAux.get(i)[arregloAux.get(i).length - 1]
                    );

                    SerPers.getInstancia().crear(personaNueva);
                }
            }

            return "";
        });
    }
}
