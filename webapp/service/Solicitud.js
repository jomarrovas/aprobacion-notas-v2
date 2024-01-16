sap.ui.define([
    "zalcsa/aprobacionnotasv2/Constantes"
], 
function (e) {
    "use strict";
    return {
        oServiceModel: null,
        init: function (e) {
            this.oServiceModel = e
        },
        obtenerCliente: async function (n, t) {
            const r = await this.oServiceModel.readAsync(e.services.getCliente + "(Codigo_Interno='" + t + "',Codigo_Cliente='" + n + "')", {
                urlParameters: {
                    $expand: "detalleCliente,direccionesCliente,adjuntosCliente"
                }
            });
            return r
        },
        obtenerSolicitudes: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getSolicitudes, {});
            return n
        },
        obtenerZonaVentas: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getZonaVentas, {});
            return n
        },
        obtenerOficinaVentas: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getOficinaVenta, {});
            return n
        },
        obtenerGrupoVendedores: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getGrupoVendedores, {});
            return n
        },
        obtenerAsesores: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getAsesores, {});
            return n
        },
        obtenerRutas: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getRutas, {});
            return n
        },
        obtenerFormasJuridicas: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getFormasJuridicas, {});
            return n
        },
        obtenerRamoIndustrial: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getRamoIndustrial, {});
            return n
        },
        obtenerGrupoClientes: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getGrupoClientes, {});
            return n
        },
        obtenerClaseClientes: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getClaseClientes, {});
            return n
        },
        obtenerTipoPagos: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getTipoPagos, {});
            return n
        },
        obtenerMunicipios: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getMunicipios, {});
            return n
        },
        obtenerGrupoVendedores: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getGrupoVendedores, {});
            return n
        },
        obtenerPaises: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getPais, {});
            return n
        },
        obtenerRegiones: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getRegiones, {});
            return n
        },
        obtenerPerfilCampo: async function (n) {
            const t = {
                urlParameters: {
                    $filter: "perfil_codigo eq '" + n + "'"
                }
            };
            const r = await this.oServiceModel.readAsync(e.services.getPerfilCampo, t);
            return r
        },
        obtenerFlujo: async function (n) {
            const t = {
                urlParameters: {
                    $filter: "lib_codigo eq '" + n + "'"
                }
            };
            const r = await this.oServiceModel.readAsync(e.services.getFlujo, t);
            return r
        },
        obtenerCentroDistribucion: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getCentroDistribucion, {});
            return n
        },
        obtenerZonaTransporte: async function () {
            const n = await this.oServiceModel.readAsync(e.services.getZonaTransporte, {});
            return n
        },
        callSignedUrl: function (e, n, t, r) {
            return new Promise(function (t, r) {
                $.ajax({
                    url: "https://3abbpd6zp5.execute-api.us-east-1.amazonaws.com/WazeUrlInS3",
                    data: JSON.stringify({
                        fileName: e,
                        fileType: n
                    }),
                    crossDomain: true,
                    type: "POST",
                    contentType: "application/json",
                    success: function (e, n, r) {
                        t(e)
                    },
                    error: function (e, n, t) {
                        r(n)
                    }
                })
            })
        },
        onObtenerURLImagenAdjuntosS3: async function (e, n) {
            var t = this;
            for (var r of n) {
                var i = "." + r.name.substring(r.name.length - 3, r.name.length);
                var s = r.type;
                var o = await t.callSignedUrl(e + "-" + r.name, s);
                var c = o.url.split("?")[0];
                if (c) {
                    await $.ajax({
                        url: o.url,
                        data: r,
                        processData: false,
                        crossDomain: true,
                        type: "PUT",
                        contentType: s,
                        success: function (e, n, t) {
                            r.UrlFile = c
                        },
                        error: function (e, n, t) {}
                    })
                }
                r.url = c
            }
        },
        onAprobarDetalle: async function (n) {
            const t = await this.oServiceModel.createAsync(e.services.getAprobar, n);
            return t
        },
        downloadFile: function (e) {
            return new Promise(function (n, t) {
                $.ajax({
                    url: "https://logistics.alcsa.net:5443/api/v1/s3/archivo",
                    data: JSON.stringify({
                        codigo: e
                    }),
                    crossDomain: true,
                    type: "POST",
                    contentType: "application/json",
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjb2RpZ28iOiJhc2Rma2FqaWRpIiwidG9rZW4iOiJjLG5qa28xLTA5ODIxM2o5MGE4c2Zhc2ZqYXNqZmtscyJ9.n9aeY34LQGwyf5_zk7T6p3Ubh4LRyvMTPFnVmWilbcJD6voVwphOf9OYyVxJEfYu02HNlUxP7L"
                    },
                    success: function (e, t, r) {
                        n(e)
                    },
                    error: function (e, n, r) {
                        t(n)
                    }
                })
            })
        }
    }
});
//# sourceMappingURL=Solicitud.js.map
