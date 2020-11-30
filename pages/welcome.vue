<template>
  <f7-page>
    <f7-row style="height:55%;justify-content:center;align-items:center;overflow-y:scroll">
      <div v-html="zonecom"></div>
    </f7-row>
    <f7-row style="text-align:center">
      <f7-row style="margin:0 auto;width:100%">
        <img v-bind:src="image" width="Automatic" height="80px" style="margin:auto" />
      </f7-row>
      <f7-row style="font-size:20px;margin:0 auto">
        <div>
          En attente de notification
          <br />
          <span class="small-text">Waiting notifications</span>
        </div>
      </f7-row>
    </f7-row>
      <f7-row v-if="version.length >0" style="justify-content:center;color:#cecece">
        <div v-html="version" ></div>
      </f7-row>
  </f7-page>
</template>
<script>
//import SecurityCode from "vue-security-code";
export default {
  topic: "",
  name: "welcome",
  data() {
    return {
      code: "",
      UID: this.$root.user.UID,
      image: "./static/img/wait.gif",
      zonecom: "",
      version:""
    };
  },
  mqtt: {
    "notification/#"(data) {
      var mess = JSON.parse(data);

      if (mess.action == "notify") {
        if (this.$root.user.device != "iOS") {
          cordova.plugins.notification.local.schedule({
            title: "Demande de vérification de signature ",
            actions: [{ id: "yes", title: "Lancer VitalSign" }]
          });
        }
        this.$f7router.history.pop();
        this.$f7router.navigate({ name: "confirmation" });
      }
    }
  },

  beforeMount() {
    var vm = this;
    console.log("deviceToken "+this.$root.user.deviceToken+" "+this.$root.user.device);
    if (this.$root.user.UID) {
      console.log(this.UID);
      this.$mqtt.subscribe("notification/" + this.UID, {qos:1});
    }
    //this.topic = "notification/" + this.UID;
    // .get("https://deepblock.eu/zonedecom.html", {
    this.$http
      .get("https://deepblock.eu/zonedecom.html", {
        headers: { "content-type": "text/html" }
      })
      .then(
        result => {
          vm.zonecom = result.body;
        },
        error => {}
      );
         cordova.getAppVersion.getVersionNumber().then(function(version){
          vm.version = "VitalKeys version : "+version;
         });
  }
};
</script>
