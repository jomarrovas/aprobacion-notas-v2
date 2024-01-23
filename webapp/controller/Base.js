sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "sap/ui/model/Filter", 
    "sap/ui/model/FilterOperator", 
    "sap/ui/core/Fragment", 
    "zalcsa/aprobacionnotas/Constantes", 
    "sap/ui/core/BusyIndicator", 
    "sap/m/MessageToast", 
    "sap/m/MessageBox"], 
    function (e, o, r, s, t, i, n, c) {
        
"use strict";
return e.extend("zalcsa.aprobacionnotas.controller.Base", {
    init: function () {
        this.oServiceModel = this.getOwnerComponent().getModel("mainModel");
        this.i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle()
    },
    onAfterRendering: function () {
        this.i18n = this.getView().getModel("i18n").getResourceBundle()
    },
    onGetSolicitudes: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getZonaVentas, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listSolicitudes", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetZonaVentas: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getZonaVentas, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listZonaVentas", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetOficinaVentas: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getOficinaVenta, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listOficinaVentas", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetGrupoVendedores: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getGrupoVendedores, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listGrupoVendedores", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetAsesores: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getAsesores, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listAsesores", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetRutas: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getRutas, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listRutas", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetFormasJuridicas: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getFormasJuridicas, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listFormasJuridicas", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetRamoIndustrial: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getRamoIndustrial, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listRamoIndustrial", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetGrupoClientes: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getGrupoClientes, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listGrupoClientes", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetClaseClientes: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getClaseClientes, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listClaseClientes", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetTipoPagos: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getTipoPagos, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listTipoPagos", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetMunicipios: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getMunicipios, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listMunicipios", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetGrupoVendedores: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getGrupoVendedores, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listGrupoVendedores", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetPaises: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getPais, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listPais", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText +
                    ("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    onGetRegiones: function () {
        var e = this;
        i.show(0);
        this.localModelSrv.read(t.services.getRegiones, {
            success: function (o) {
                i.hide();
                e.localModel.setProperty("/listRegiones", o.results)
            },
            error: function (o) {
                i.hide();
                c.show(e.i18n.getText("ErrorServicio"), c.Icon.WARNING)
            }
        })
    },
    callSignedUrl: function (e, o, r, s) {
        $.ajax({
            url: "https://3abbpd6zp5.execute-api.us-east-1.amazonaws.com/WazeUrlInS3",
            data: JSON.stringify({
                fileName: e,
                fileType: o
            }),
            crossDomain: true,
            type: "POST",
            contentType: "application/json",
            success: function (e, o, s) {
                r(e)
            },
            error: function (e, o, r) {
                s({
                    error: "Error en servidor"
                })
            }
        })
    },
    onObtenerURLImagenAdjuntosS3: function (e, o, r, s) {
        i.show(0);
        var t = this;
        var n = [];
        var c = [];
        var l = [];
        let a = new Promise(r => {
            if (o.length === 0) {
                r("OK")
            }
            o.forEach(function (s, i) {
                var n = "." + s.name.substring(s.name.length - 3, s.name.length);
                var l = s.type;
                t.callSignedUrl(e + "-" + i + 1 + n, l, function (e) {
                    var t = e.url.split("?")[0];
                    if (t) {
                        $.ajax({
                            url: e.url,
                            data: s,
                            processData: false,
                            crossDomain: true,
                            type: "PUT",
                            contentType: l,
                            success: function (e, i, n) {
                                s.UrlFile = t;
                                if (t) {
                                    c.push(t)
                                }
                                if (c.length === o.length) {
                                    r("OK")
                                }
                            },
                            error: function (e, o, r) {}
                        })
                    }
                }, function (e) {
                    alert(e)
                })
            })
        });
        let u = new Promise(e => {
            var o = r.filter(e => e.ImagenCheck === "X");
            var s = r.filter(e => e.ImagenCheck !== "X");
            s.forEach(function (e) {
                e.Url_Imagen = ""
            });
            if (o.length === 0) {
                e("OK")
            }
            o.forEach(function (r, s) {
                var i = /.png/.test(r.DatosImagen.name);
                var n = /.jpg/.test(r.DatosImagen.name);
                var c = "";
                var a = "";
                if (i) {
                    c = ".png";
                    a = "image/png"
                }
                if (n) {
                    c = ".jpg";
                    a = "image/jpg"
                }
                t.callSignedUrl(Catnr + "-" + r.Item + c, a, function (s) {
                    var t = s.url.split("?")[0];
                    $.ajax({
                        url: s.url,
                        data: r.DatosImagen,
                        processData: false,
                        crossDomain: true,
                        type: "PUT",
                        contentType: a,
                        success: function (s, i, n) {
                            r.Url_Imagen = t;
                            if (t) {
                                l.push(t)
                            }
                            if (l.length === o.length) {
                                e("OK")
                            }
                        },
                        error: function (e, o, r) {}
                    })
                }, function (e) {
                    alert(e)
                })
            })
        });
        n.push(a, u);
        Promise.all(n).then(function () {
            i.hide();
            s("OK")
        })
    },
    onAprobarDetalle: function (e) {
        var o = this;
        i.show(0);
        this.localModelSrv.create(t.services.getAprobar, e, {
            method: "POST",
            success: function (e, r) {
                console.log(e);
                o.localModel.setProperty("/detalle", {});
                o.localModel.setProperty("/direccionCollection", []);
                i.hide();
                sap.m.MessageBox.show("Se aprobo con éxito", sap.m.MessageBox.Icon.SUCCESS)
            },
            error: function (e) {
                i.hide();
                sap.m.MessageBox.show("Error de interacción, verifique conexión y reporte al personal de soporte para ver detalles.", sap.m.MessageBox.Icon.WARNING)
            }
        })
    }
})
});
//# sourceMappingURL=Base.js.map
