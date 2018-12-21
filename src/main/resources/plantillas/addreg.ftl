<#import "/plantillas/principal.ftl" as base>
<@base.pagina>
<div class="col p-0">
    <div class="row">
        <div class="col-6 p-4 mt-4 mx-auto">
            <div class="form-group">
                <label><strong>Nombre:</strong></label>
                <input class="form-control" type="text" id="nombre" required=""/>
            </div>
            <div class="form-group">
                <label><strong>Sector:</strong></label>
                <input class="form-control" type="text" id="sector" required=""/>
            </div>
            <div class="form-group">
                <label><strong>Nivel escolar:</strong></label>
                <select class="form-control" id="nivelEscolar">
                    <option value="Básico">Básico</option>
                    <option value="Medio">Medio</option>
                    <option value="Grado Universitario">Universitario</option>
                    <option value="Postgrado">Postgrado</option>
                    <option value="Doctorado">Doctorado</option>
                </select>
            </div>
            <div class="form-group">
                <button onclick="agregarDelFormulario()" class="btn btn-primary">Procesar</button>
            </div>
        </div>
    </div>
</div>
    <script src="/js/jquery-3.2.1.min.js"></script>
    <script src="/js/baseDeDatos.js"></script>
</@base.pagina>