<template>
  <f7-page name="cgv">
    <div class="text-align-center" style="font-size:20px">Déclaration sur l'honneur</div>
    <div class="small-text text-align-center">Statement of honour</div>
    <div class="row" style="height:60%;padding:10px; justify-content:center">
      <div
        class="col"
        style="width:100%;height:100%;background:#f8f8f8;overflow-y:scroll;padding:10px;text-align:left;font-size:1.1em"
      >
        Sachant que cette procédure sera utilisée en justice et connaissance prise des dispositions de l’article
        441-7 du code pénal réprimant l’établissement d’information faisant état de faits inexacts ci-après rappelés :
        <br />« Est puni d’un an d’emprisonnement et de 15000 euros d’amende le fait d’établir une fausse déclaration de ses informations personnelles ou un état d'éléments inexacts ».
        <br />Aware that this procedure will be used in court and aware of the provisions of Article 441-7 of the Penal Code punishing the preparation of information reporting inaccurate facts as set out below:
        <br />« It is punishable by one year's imprisonment and a fine of 15,000 euros for making a false statement of personal information or a statement of inaccurate information ».
      </div>
    </div>
    <div class="row">
      <div class="col" style="padding:0 10px 10px 10px;text-align:left;">
        <label class="checkbox" style="float:left;margin-right:10px">
          <!-- checkbox input -->
          <input type="checkbox" id="cgv-checkbox" v-model="checkedCodePenal" />
          <!-- checkbox icon -->
          <i class="icon-checkbox"></i>
        </label>
        <div>Je garantis l'exactitude des informations fournies</div>
        <div>I guarantee the accuracy of the information provided</div>
      </div>
    </div>

    <div class="row justify-content-space-around" style="display:flex">
      <div class="col" style="width:40%;">
        <button class="button button-outline button-round" @click="previousClicked">previous</button>
      </div>
      <div class="col" style="width:40%; ">
        <button class="button button-outline button-round" @click="register">Valid</button>
      </div>
    </div>
  </f7-page>
</template>
<style>
</style>
<script>
export default {
  data() {
    return {
      user: this.$root.user,
      checkedCodePenal: false,
      registerInProgress: false
    };
  },
  methods: {
    previousClicked() {
      this.$f7router.back();
    },
    register() {
      if (!this.checkedCodePenal) {
        this.$f7.dialog.alert(
          "Vous devez garantir l'exactitude des documents fournis<br/>You must guarantee the accuracy of the documents"
        );
      } else {
        if (this.registerInProgress == true) {
          return;
        }
        this.registerInProgress = true;
        this.user.UID =
          this.user.firstName +
          this.user.lastName +
          this.user.email +
          this.user.phone +
          Math.random()
            .toString(36)
            .substring(2, 10);

        this.$root.user = this.user;
        localStorage.setItem("user", JSON.stringify(this.$root.user));
        // send data user
        var user = JSON.parse(JSON.stringify(this.$root.user));
        delete user.pwd;
        delete user.register;
        user.phone = "+" + user.indicatif + " " + user.phone;
        delete user.indicatif;
        var birthday =
          user.birthday.substring(6) +
          "-" +
          user.birthday.substring(3, 5) +
          "-" +
          user.birthday.substring(0, 2);
        user.birthday = birthday;
        console.log("req " + JSON.stringify(user));
        this.$http
          .post("http://vital.chaize.org:3000/user", user, {
          //   .post("https://vitalkeys-api.deepblock.io/user", user, {
            headers: { "content-type": "application/json" }
          })
          .then(
            result => {
              this.registerInProgress = false;
              console.log("result " + JSON.stringify(result.body));
              if (result.body.success) {
                this.$root.user.register = true;
                this.$root.user.pwd = this.CryptoJS.AES.encrypt(this.$root.user.pwd,  "vitalkeys").toString()

                localStorage.setItem("user", JSON.stringify(this.$root.user));
                this.$f7router.navigate({ name: "registered" });
              } else {
                this.$f7.dialog.alert(
                  result.body.msg + " " + result.body.errors[0]
                );
              }
            },
            error => {
              this.registerInProgress = false;
              this.$f7.dialog.alert(
                "Erreur pendant l'enregistrement à VitalSign. Vérifier votre connexion internet. Error during registration to VitalSign. Check your internet connection"
              );
              this.regErrors = "Can't connect to server. Please retry";
            }
          );
      }
    }
  },
  beforeMount() {}
};
</script>
