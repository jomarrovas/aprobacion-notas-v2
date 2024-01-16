sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/f/library",
    "zalcsa/aprobacionnotasv2/model/models",
    "sap/ui/model/json/JSONModel", 
    "sap/f/FlexibleColumnLayoutSemanticHelper", 
    "sap/ui/model/odata/v2/ODataModel"
],
function (UIComponent, Device, library, models, o, i, a) {
    "use strict";
    let UUIComponent;
    let goSelCobranza;

    UUIComponent = UIComponent.extend("zalcsa.aprobacionnotasv2.Component", {
        metadata: {
            manifest: "json",
            config: {
                fullWidth: true
            }
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Definición de métodos para consumo de CDS
            a.prototype.readAsync = async function (UIComponent, Device) {
                var n = this;
                return new Promise(function (o, i) {
                    Device = Device ? Device : {};
                    Device.success = function (UIComponent) {
                        if (UIComponent.results) {
                            o(UIComponent.results)
                        } else {
                            o(UIComponent)
                        }
                    };
                    Device.error = function (UIComponent) {
                        i(UIComponent)
                    };
                    n.read(UIComponent, Device)
                })
            };
            a.prototype.createAsync = async function (UIComponent, Device, models) {
                var o = this;
                return new Promise(function (i, a) {
                    models = models ? models : {};
                    models.success = function (UIComponent) {
                        i(UIComponent)
                    };
                    models.error = function (UIComponent) {
                        a(UIComponent)
                    };
                    o.create(UIComponent, Device, models)
                })
            };

            // enable routing
            this.getRouter().initialize();

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
        },

        /**
         *@memberOf zalcsa.aprobacionnotasv2.Component
         * @returns {object} getSelCobranza
         */
        getSelCobranza: function () {
            return goSelCobranza;
        },
        /**
         *@memberOf zalcsa.aprobacionnotasv2.Component
         * @param {object} thisgoSelCobranza setSelCobranza
         */
        setSelCobranza: function (thisgoSelCobranza) {
            goSelCobranza = thisgoSelCobranza;
        }
    });
    return UUIComponent;
}
);