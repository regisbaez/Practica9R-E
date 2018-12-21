package Modelos;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


@Entity
public class Persona implements Serializable {
    @Id
    @GeneratedValue
    private long id;

    private String nombre;
    private String sector;
    private String nivelEscolar;
    private String ubicacion_latitud;
    private String ubicacion_longitud;

    public Persona() { }

    public Persona(String nombre, String sector, String nivelEscolar, String ubicacion_latitud, String ubicacion_longitud) {
        this.nombre = nombre;
        this.sector = sector;
        this.nivelEscolar = nivelEscolar;
        this.ubicacion_latitud = ubicacion_latitud;
        this.ubicacion_longitud = ubicacion_longitud;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getNivelEscolar() {
        return nivelEscolar;
    }

    public void setNivelEscolar(String nivelEscolar) {
        this.nivelEscolar = nivelEscolar;
    }

    public String getUbicacion_latitud() {
        return ubicacion_latitud;
    }

    public void setUbicacion_latitud(String ubicacion_latitud) {
        this.ubicacion_latitud = ubicacion_latitud;
    }

    public String getUbicacion_longitud() {
        return ubicacion_longitud;
    }

    public void setUbicacion_longitud(String ubicacion_longitud) {
        this.ubicacion_longitud = ubicacion_longitud;
    }

    @Override
    public String toString() {
        return "Persona{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", sector='" + sector + '\'' +
                ", nivelEscolar='" + nivelEscolar + '\'' +
                ", ubicacion_latitud='" + ubicacion_latitud + '\'' +
                ", ubicacion_longitud='" + ubicacion_longitud + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Persona persona = (Persona) o;
        return id == persona.id &&
                Objects.equals(nombre, persona.nombre) &&
                Objects.equals(sector, persona.sector) &&
                Objects.equals(nivelEscolar, persona.nivelEscolar) &&
                Objects.equals(ubicacion_latitud, persona.ubicacion_latitud) &&
                Objects.equals(ubicacion_longitud, persona.ubicacion_longitud);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nombre, sector, nivelEscolar, ubicacion_latitud, ubicacion_longitud);
    }
}
