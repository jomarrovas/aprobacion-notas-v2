sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/f/library",
    "zalcsa/aprobacionnotasv2/model/models"
],
function (UIComponent, Device, library, models) {
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