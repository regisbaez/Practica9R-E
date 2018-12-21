package Servicios;

import Modelos.Persona;

public class SerPers extends SerBD<Persona> {
    private static SerPers instancia;

    private SerPers() {
        super(Persona.class);
    }

    public static SerPers getInstancia() {
        if (instancia == null) {
            instancia = new SerPers();
        }
        return instancia;
    }
}