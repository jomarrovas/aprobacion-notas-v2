sap.ui.define([
    "sap/ui/core/mvc/Controller", 
    "./Base", 
    "zwaze/clientenuevo/model/models", 
    "sap/m/MessageToast", 
    "sap/ui/core/Fragment", 
    "sap/ui/core/BusyIndicator", 
    "sap/m/MessageBox", 
    "sap/ui/model/Filter", 
    "sap/ui/model/FilterOperator", 
    "zwaze/clientenuevo/service/Solicitud"
], 
                
function (e, t, o, i, a, l, n, s, r, c) {

    "use strict";
    return t.extend("zwaze.clientenuevo.controller.Detail", {

        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oModel = this.getOwnerComponent().getModel();
            this.init();
            c.init(this.oServiceModel);
            this.oRouter.getRoute("master").attachPatternMatched(this._onDetailMatched, this);
            this.oRouter.getRoute("detail").attachPatternMatched(this._onDetailMatched, this)
        },

        onAfterRendering: async function () {
            var e = this;
            this.localModel = this.getView().getModel("localModel");
            this.localModel.setSizeLimit(1e3);
            this.cuadroDireccion = sap.ui.xmlfragment("zwaze.clientenuevo.view.fragments.cuadroDireccion", this);
            this.getView().addDependent(this.cuadroDireccion);
            this.datosExpedicion = sap.ui.xmlfragment("zwaze.clientenuevo.view.fragments.datosExpedicion", this);
            this.getView().addDependent(this.datosExpedicion);
            this.motivoRechazo = sap.ui.xmlfragment("zwaze.clientenuevo.view.fragments.motivoRechazo", this);
            this.getView().addDependent(this.motivoRechazo);
            this.localModelSrv = this.getView().getModel("mainModel");
            l.show(0);
            const t = await c.obtenerZonaVentas();
            e.localModel.setProperty("/listZonaVentas", t);
            const o = await c.obtenerOficinaVentas();
            e.localModel.setProperty("/listOficinaVentas", o);
            const i = await c.obtenerGrupoVendedores();
            e.localModel.setProperty("/listGrupoVendedores", i);
            const a = await c.obtenerAsesores();
            e.localModel.setProperty("/listAsesores", a);
            const n = await c.obtenerRutas();
            e.localModel.setProperty("/listRutas", n);
            const s = await c.obtenerFormasJuridicas();
            e.localModel.setProperty("/listFormasJuridicas", s);
            const r = await c.obtenerRamoIndustrial();
            e.localModel.setProperty("/listRamoIndustrial", r);
            const d = await c.obtenerGrupoClientes();
            e.localModel.setProperty("/listGrupoClientes", d);
            const u = await c.obtenerZonaTransporte();
            e.localModel.setProperty("/listZonaTransporte", u);
            const p = await c.obtenerRegiones();
            e.localModel.setProperty("/listRegiones", p);
            const h = await c.obtenerClaseClientes();
            e.localModel.setProperty("/listClaseClientes", h);
            const g = await c.obtenerTipoPagos();
            e.localModel.setProperty("/listTipoPagos", g);
            const f = await c.obtenerMunicipios();
            e.localModel.setProperty("/listMunicipios", f);
            const m = await c.obtenerPaises();
            e.localModel.setProperty("/listPais", m);
            const M = await c.obtenerCentroDistribucion();
            e.localModel.setProperty("/listCentroDistribucion", M);
            this.onChangePais();
            this._bus = sap.ui.getCore().getEventBus();
            l.hide()
        },

        changeSwitch: function (e) {
            var t = e.getSource().getBindingContext("localModel").getObject();
            var o = e.getSource().getBindingContext("localModel").getModel().getData().mostrar_datos.datos;
            o.map(function (e) {
                if (e.valor == t.valor) {
                    e.estado = true
                } else {
                    e.estado = false
                }
            });
            e.getSource().getBindingContext("localModel").getModel().getData().mostrar_datos.datos = o
        },

        onAgregarDireccion: function () {
            this.localModel.setProperty("/cuadroDireccion", {
                editable: false
            });
            this.cuadroDireccion.open()
        },

        onCloseDireccion: function () {
            this.cuadroDireccion.close()
        },
        onListItemPress: function (e) {
            var t = e.getSource().getBindingContextPath();
            var o = this.localModel.getProperty(t);
            console.log(o);
            o.editable = true;
            this.localModel.setProperty("/cuadroDireccion", o);
            this.cuadroDireccion.open()
        },

        onSaveDatosExpedicion: function (e) {
            var t = e
        },
        onCloseDatosExpedicion: function () {
            this.datosExpedicion.close()
        },
        _validateRequiredFields: function () {
            var e = this.localModel.getProperty("/perfilCampos/");
            var t = e.filter(e => e.requerido);
            console.log(t);
            var o = false;
            for (let e = 0; e < t.length; e++) {
                const i = t[e];
                if (this.byId(i.campo) && !this.byId(i.campo).getSelectedKey()) {
                    o = true
                }
            }
            if (o) {
                n.warning(this.i18n.getText( +
                        "requerido"))
            }
            return o
        },

        onSaveDetalle: async function (e) {
            await this.sendDetalle("APROB")
        },
        onSeleccionarAdjunto: function (e) {
            var t = e.getParameters("files").files;
            var o = this.localModel.getProperty("/_adjuntos");
            if (o === undefined) {
                this.localModel.setProperty("/ _adjuntos", []);
                o = this.localModel.getProperty(" / _adjuntos")
            }
            for (var i = 0; i < t.length; i++) {
                var a = e.getParameters("files").files[i];
                o.push(a)
            }
        },

        onEliminarAdjunto: function (e) {
            var t = e.getSource();
            var o = this.localModel.getProperty(" / Adjuntos");
            const i = t.getBindingContext("localModel").getObject();
            var a = o.findIndex(e => e.Nombre == i.Nombre);
            o.splice(a, 1);
            this.localModel.refresh(true)
        },

        sendDetalle: async function (e) {
            if (this._validateRequiredFields()) {
                return false
            }
            var t = this;
            var o = {};
            var i = this.localModel.getProperty("/mostrar_datos");
            var a = this.localModel.getProperty("/detalle");
            var s = this.localModel.getProperty("/_adjuntos");
            var r = this.localModel.getProperty("/Adjuntos");
            delete a.__metadata;
            var d = this.localModel.getProperty("/direccionCollection");
            d.forEach(e => {
                delete e.__metadata;
                delete e.editable
            });
            o.Oper = e;
            o.direccionesAprobar = [];
            o.Codigo = i.CodigoSolicitud;
            o.Cliente = i.Codigo;
            o.direccionesAprobar = d;
            o.detalleAprobar = a;
            var u = this.i18n.getText("confirmarActualizacion");
            if (e == "RECH") {
                u = this.i18n.getText("confirmarRechazar")
            } else {
                a.MotivoRechazo = ""
            }
            console.log(o.detalleAprobar);
            n.warning(u, {
                actions: [n.Action.OK, n.Action.CANCEL],
                emphasizedAction: n.Action.OK,
                onClose: async function (e) {
                    var a = [];
                    if (e === "OK") {
                        if (s) {
                            l.show(0);
                            await c.onObtenerURLImagenAdjuntosS3(i.CodigoSolicitud, s);
                            var d = 10;
                            s.forEach(e => {
                                a.push({
                                    Url: e.url,
                                    Nombre: e.name
                                })
                            })
                        }
                        a = a.concat(r);
                        o.adjuntosAprobar = a;
                        try {
                            const e = await c.onAprobarDetalle(o);
                            if (e.Mensaje == "") {
                                n.success("Se actualizo con éxito", {
                                    onClose: function () {
                                        t._bus.publish("", "onRefresh")
                                    }
                                })
                            } else {
                                n.warning(e.Mensaje, {
                                    onClose: function () {
                                        t._bus.publish("", "onRefresh")
                                    }
                                })
                            }
                            t.localModel.setProperty("/detalle", {});
                            t.localModel.setProperty("/direccionCollection", []);
                            t.localModel.setProperty("/Adjuntos", []);
                            t.localModel.setProperty("/_adjuntos", [])
                        } catch (e) {
                            n.success(e.responseText)
                        }
                        l.hide()
                    }
                }
            })
        },

        onUpdateDetalle: async function (e) {
            await this.sendDetalle("UPDAT")
        },
        onRechazarDetalle: async function (e) {
            var t = this;
            if (!this._oDialog) {
                this._oDialog = new sap.m.Dialog({
                    title: "Motivo Rechazo",
                    content: [new sap.m.TextArea({
                            id: "inputDialog",
                            rows: 3,
                            cols: 37
                        })],
                    beginButton: new sap.m.Button({
                        text: "Aceptar",
                        press: async function () {
                            var e = sap.ui.getCore().byId("inputDialog").getValue();
                            t.localModel.setProperty("/detalle/MotivoRechazo", e);
                            await t.sendDetalle("RECH");
                            t._oDialog.close()
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancelar",
                        press: function () {
                            t._oDialog.close()
                        }
                    })
                });
                this._oDialog.open()
            } else {
                sap.ui.getCore().byId("inputDialog").setValue("");
                this._oDialog.open()
            }
        },

        onSaveDireccion: function (e) {
            var t = this.localModel.getProperty("/cuadroDireccion");
            var o = this.localModel.getProperty("/direccionCollection");
            var i = o.find(e => e.TipoDireccion == t.TipoDireccion);
            if (t) {
                if (!i) {
                    this.localModel.getProperty("/direccionCollection").push(t)
                } else {
                    if (!t.editable) {
                        n.warning(this.i18n.getText("direccionexite"));
                        return
                    }
                }
            }
            this.onClearDireccion(this);
            this.onCloseDireccion()
        },

        onClearDireccion: function (e) {
            e.localModel.setProperty("/cuadroDireccion", {})
        },
        onClosePressedOrder: function () {
            this._oValueHelpDialog1.close()
        },
        handleOpenDialog: function () {
            this.oRouter.navTo("detail", {
                layout: "MidColumnFullScreen",
                detail: this._detail
            });
            if (!this._oValueHelpDialog1) {
                a.load({
                    name: "zwaze.clientenuevo.view.fragments.treeTable",
                    controller: this
                }).then(function (e) {
                    this._oValueHelpDialog1 = e;
                    this.getView().addDependent(this._oValueHelpDialog1);
                    this._oValueHelpDialog1.open()
                }
                    .bind(this))
            } else {
                this._oValueHelpDialog1.open()
            }
        },

        handleFullScreen: function () {
            var e = this.oModel.getProperty("/actionButtonsInfo/midColumn/fullScreen");
            this.oRouter.navTo("detail", {
                layout: e,
                detail: this._detail
            })
        },

        handleExitFullScreen: function () {
            var e = this.oModel.getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
            this.oRouter.navTo("detail", {
                layout: e,
                detail: this._detail
            })
        },
        handleClose: function () {
            var e = this.oModel.getProperty("/actionButtonsInfo / midColumn / closeColumn");
            this.oRouter.navTo("master", {
                layout: e
            })
        },

        refreshMached: async function (e) {
            const t = e.split("_");
            const o = t[0];
            const i = t[1];
            var a = await c.obtenerCliente(o, i);
            var l = await c.obtenerPerfilCampo(a.detalleCliente.PerfilCodigo);
            var n = {};
            l.forEach(e => {
                n[e.campo] = e
            });
            this.localModel.setProperty("/perfilCampos/", l);
            this.localModel.setProperty("/perfilCampo/", n);
            this.localModel.refresh();
            console.log(a);
            this.localModel.setProperty("/detalle", a.detalleCliente);
            this.localModel.setProperty +
            ("/direccionCollection", a.direccionesCliente.results);
            const s = a.adjuntosCliente.results;
            for (const e of s) {}
            this.localModel.setProperty("/Adjuntos", a.adjuntosCliente.results);
            this.localModel.setProperty("/_adjuntos", []);
            this.getView().bindElement({
                path: "/listadoDocumentos/ " + this._detail,
                model: "localModel"
            });
            var r = this.localModel.getProperty(" / detalle");
            var d = await c.obtenerFlujo(r.LibCodigo);
            this.localModel.setProperty(" / flujoCollection", d);
            this.onChangePais()
        },

        mimeTypeToExtension: function (e) {
            const t = {
                "text / plain": "txt",
                "text / html": "html",
                "application / pdf": "pdf",
                "image / jpeg": "jpg",
                "image / png": "png",
                "audio / mpeg": "mp3",
                "video / mp4": "mp4",
                "application / json": "json",
                "application / xml": "xml",
                "application / msword": "doc",
                "application / vnd.openxmlformats - officedocument.wordprocessingml.document": "docx",
                "application / vnd.ms - excel": "xls",
                "application / vnd.openxmlformats - officedocument.spreadsheetml.sheet": "xlsx"
            };
            return t[e] || null
        },
        downloadFile: async function (e) {
            var t = e.getSource();
            const o = t.getBindingContext("localModel").getObject();
            l.show(0);
            if (o) {
                try {
                    var i = await c.downloadFile(o.Nombre);
                    var a = document.createElement("a");
                    var n = i.data.split("; ");
                    var s = n[0].replace("data: ", "");
                    a.href = i.data;
                    a.style = "visibility:hidden";
                    a.download = o.Nombre + "." + this.mimeTypeToExtension( +
                            s);
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a)
                } catch (e) {}
                l.hide()
            }
        },

        _onDetailMatched: async function (e) {
            this._detail = e.getParameter("arguments").detail || this._detail || "0";
            this.refreshMached(this._detail)
        },
        onChangePais: async function (e) {
            var t = this.byId("C42").getSelectedKey();
            var o = this.localModel.getProperty("/listZonaTransporte");
            o = o ? o.filter(e => e.Pais == t) : [];
            var i = this.localModel.getProperty("/listRegiones");
            i = i ? i.filter(e => e.Pais == t) : [];
            this.localModel.setProperty("/listZonaTransporteFiltrado", o);
            this.localModel.setProperty(" / listRegionesFiltrado", i)
        },
        onChangePaisDirec: async function (e) {
            var t = this.localModel.getProperty(" / cuadroDireccion / Pais");
            var o = this.localModel.getProperty(" / listRegiones");
            o = o.filter(e => e.Pais == t);
            this.localModel.setProperty("/listRegionesDirecFiltrado", o)
        }
    })
});
//# sourceMappingURL=Detail.controller.js.map
