<template>
  <f7-page name="confirmation"> 
    <div class="page-content">
      <div class="text-align-center" style="font-size:18px">
        Saisir votre code de sécurité personnel
        <br />
        <span class="small-text">Enter your personal security code</span>
      </div>

      <div
        class="list no-hairlines-md display-flex justify-content-center align-items-center"
        style="min-height:40%" >
        <form style="width:80%">
              <div
                class="item-inner block passcode-input border-round display-flex align-items-center"
                style="min-height:80px"  >
                <input
                  type="text"
                  value="______"
                  id="demo-numpad-inline"
                  @click="openPad"
                  @focus="$event.target.blur()"
                />
              </div>
            <div style="text-align:center;color:#f00;min-height:24px">{{ errors }}</div>
        </form>
      </div>
      <div class="block">
        <div class="row justify-content-center">
          <div class="col" style="width:60%">
            <button class="button button-outline button-round" v-on:click="confirmed">
              Confirmer/
              <span class="small-text">Confirm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<style>
.secure_text input {
  font-size: 1.2em !important;
}
</style>

<script>
export default {
  data() {
    return {
      errors: " ",
      code: "",
      pwd: this.$root.user.pwd,
      UID: this.$root.user.UID,
      numpadSecure: null
    };
  },
  methods: {
    confirmed() {
      this.errors = " ";
      var code = this.numpadSecure.getValue();
      if (code == this.CryptoJS.AES.decrypt(this.pwd, "vitalkeys").toString(this.CryptoJS.enc.Utf8)) {
        this.$mqtt.publish(
          "notification/" + this.UID,
          JSON.stringify({ action: "ackNotify" },
          {qos:1})
        );
        this.numpadSecure.setValue("");
        this.$f7router.history.pop();
        this.$f7router.navigate({name:"otp"});
        return;
      }
      this.errors = "Code de sécurité incorrect/Invalid security code";
      var vm = this;
      setTimeout(function() {
        vm.errors = " ";
        vm.numpadSecure.setValue("");
        vm.numpadSecure.open();
      }, 1500);
      return;
    },
    openPad() {
      this.numpadSecure.open();
    }
  },
  mounted() {
    var vm = this;
    this.numpadSecure = this.$f7.keypad.create({
      inputEl: "#demo-numpad-inline",
      type: "numpad",
      valueMaxLength: 6,
      toolbar: false,
      routableModals: false,
      closeByOutsideClick:false,
      value: "",
      buttons: [
        { html: '<span class="keypad-button-number">1</span>', value: 1 },
        { html: '<span class="keypad-button-number">2</span>', value: 2 },
        { html: '<span class="keypad-button-number">3</span>', value: 3 },
        { html: '<span class="keypad-button-number">4</span>', value: 4 },
        { html: '<span class="keypad-button-number">5</span>', value: 5 },
        { html: '<span class="keypad-button-number">6</span>', value: 6 },
        { html: '<span class="keypad-button-number">7</span>', value: 7 },
        { html: '<span class="keypad-button-number">8</span>', value: 8 },
        { html: '<span class="keypad-button-number">9</span>', value: 9 },

        {
          html:
            "<span style='border:2px solid #000;border-radius:50%' class='keypad-button-number'>X</span>",
          value: "",
          dark: true,
          onClick: function() {
            vm.numpadSecure.close();
          }
        },
        { html: '<span class="keypad-button-number">0</span>', value: 0 },
        {
          html: '<i class="icon icon-keypad-delete"></i>',
          cssClass: "keypad-delete-button",
          dark: true
        }
      ],

      formatValue: function(value) {
        value = value.toString();
        if (value.length == 6) {
          vm.numpadSecure.close();
        }
        return value + "______".substring(0, 6 - value.length);
      }
    });
    setTimeout(function() {
      vm.numpadSecure.setValue("");
      vm.numpadSecure.open();
    }, 500);
  }
};
</script>
<style>
#demo-numpad-inline {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  box-sizing: border-box;
  border: none;
  background: none;
  border-radius: 0 0 0 0;
  box-shadow: none;
  display: block;
  padding: 0 0 0 5px;
  margin: 0;
  width: 100%;
  height: 43px;
  color: #dedede;
  font-family: inherit;
  letter-spacing: 15px;
  text-align: center;
  font-size: 2em;
  font-weight: 300;
}
</style>
