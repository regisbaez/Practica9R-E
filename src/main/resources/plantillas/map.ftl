<#import "/plantillas/principal.ftl" as base>
<@base.pagina>
    <style>
        #mapa {
            height: 500px;
            width: 95%;
        }
    </style>
        <script type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBistV5JTxDvWjhAPbgUV09bhSOZ1YEcR8'></script>
        <script>
            function initialize() {
                var latitudes = document.querySelectorAll(".latitud");
                var longitudes = document.querySelectorAll(".longitud");

                var map = new google.maps.Map(document.getElementById('mapa'), {
                    zoom: 7,
                    center: new google.maps.LatLng(19.487759, -70.6157308),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                var marker, i;
                for (i = 0; i < latitudes.length; i++) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(latitudes[i].innerHTML, longitudes[i].innerHTML),
                        map: map
                    });
                }
            }
            google.maps.event.addDomListener(window, 'load', initialize);
        </script>
<div id="mapa" class="mx-auto"></div>
 <table class="table table-hover table-responsive-sm">
     <thead>
     <tr>
         <th>Nombre</th>
         <th>Sector</th>
         <th>Nivel Escolar</th>
         <th>Latitud</th>
         <th>Longitud</th>
     </tr>
     </thead>
     <tbody>
        <#list personas as persona>
        <tr>
            <td>${persona.nombre}</td>
            <td>${persona.sector}</td>
            <td>${persona.nivelEscolar}</td>
                <#if persona.ubicacion_latitud != "" && persona.ubicacion_longitud != "">
                    <td class="latitud" id="latitud-${persona.id?string['0']}" >${persona.ubicacion_latitud}</td>
                    <td class="longitud" id="longitud-${persona.id?string['0']}">${persona.ubicacion_longitud}</td>
                </#if>
                <#if persona.ubicacion_longitud == "" && persona.ubicacion_latitud == "">
                    <td>N/A</td>
                    <td>N/A</td>
                </#if>
        </tr>
        </#list>
     </tbody>
 </table>
</@base.pagina>