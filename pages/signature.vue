<template>
  <f7-page name="signature">

    <div class="text-align-center" style="font-size:18px">
      Signature
      <br>
      <span class="small-text">Signature</span>
    </div>
    <div style="display:flex;justify-content:center">
      <VueSignaturePad style="width:80%" ref="signaturePad"/>
    </div>
    <div class="block">
      <div class="row justify-content-space-around">
        <div class="col">
          <button class="button button-outline button-round" v-on:click="abort">Abort</button>
        </div>
        <div class="col">
          <button class="button button-outline button-round" v-on:click="clear">Reset</button>
        </div>
        <div class="col">
          <button class="button button-outline button-round" v-on:click="save">Valid</button>
        </div>
      </div>
    </div>

  </f7-page>
</template>

<style>
.opt_text {
  font-size: 2em !important;
  text-align: center;
  color: #999;
}
</style>
<script>
export default {
  name: "MySignaturePad",

  data() {
    return {
//      email: this.$root.user.email,
      misc:this.$root.misc,

    };
  },
  methods: {
    abort() {
      this.misc.signatureValid = false;
      this.$f7router.back();
    },

    clear() {
      this.misc.signatureValid = false;
      this.$refs.signaturePad.clearSignature();
    },
    save() {
      this.errors = [];
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (isEmpty == false) {
        this.misc.signatureData = data;
        this.misc.signatureValid = true;
      }
      this.$root.misc = this.misc;
      this.$f7router.back();
      
/*      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (isEmpty == false) {
        var user = { email: this.email, signature: data };
        this.$http
          .post("http://vital.chaize.org:3000/user", user, {
            headers: { "content-type": "application/json" }
          })
          .then(
            result => {
              this.$f7router.back();
            },
            error => {
              this.errors.push("Can't connect to server. Please retry");
            }
          );
      }
*/   
    }   
    } ,
  mounted()
  {
        if(this.misc.signatureValid) {
          this.$refs.signaturePad.fromDataURL(this.misc.signatureData);

        };
  }
};
</script>