<template>
  <f7-page name="cgv"    >
   <div class="page-content">
      <div class="text-align-center" style="font-size:20px">Condition générales d'utilisation</div>
      <div class="small-text text-align-center">Terms of use </div>
<!--      <div class="row" style="height:50%;width:100%; overflow:scroll">
        <iframe  src="https://vitalkeys.fr/cguv-vitalkeys.html"  
         style="height:100%;width:100%;padding:0 ;border:none;pointer-events:none"  ></iframe >
      </div>

      -->
      <div  style="height:60%;width:100%;overflow-y:scroll;overflow-x:hidden;" >
        <div  style="padding:20px ;border:none;height:100%;pointer-events:none" 
          v-html="cgv"
          v-if="termsOfUse == true">
        </div >
      </div>

      
      
      <div    v-if="termsOfUse == true">
        <div class="col" style="padding:10px 20px 20px 20px;text-align:left;">
          <label class="checkbox" style="float:left;margin-right:10px">
            <!-- checkbox input -->
            <input type="checkbox" id="cgv-checkbox" v-model="checkedCgv"
            >
            <!-- checkbox icon -->
            <i class="icon-checkbox"
            style="height:30px;width:30px;font-size:33px"></i>
          </label>
          <div >J'acccepte les conditions générales de ventes</div>
          <div > I accept the general conditions of sale</div>
        </div>
      </div>

      <div class="row justify-content-flex-end" v-if="termsOfUse == true">
        <div class="col " style="width:50%; margin-right:20px">
          <button class="button button-outline button-round" v-on:click="confirmed">
            suivant
            <span class="small-text">/ Next</span>
          </button>
        </div>
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
      checkedCgv: false,
      termsOfUse:false,
      cgv: "En attente des conditions générales d'utilisation<br/>Waiting for Terms of use<br/><br/>Check your internet connection"
    };
  },
  methods: {
    confirmed() {
      if (!this.checkedCgv) {
        this.$f7.dialog.alert(
          "Vous devez accepter les conditions générales de ventes avant de continuer<br/>You must accept the general conditions of sale before continuing"
        );
      } else {
        this.$f7router.navigate({name:"register"});
      }
    }
  },
  beforeMount() {
    
    var vm = this;
//  .get("https://deepblock.eu/mentions-VitalKeys.php", {
//    .get("https://vitalsign.fr/?page_id=452", {
//    .get("https://deepblock.eu/mentions-VitalKeys.php", {

    this.$http
    .get("https://vitalkeys.fr/cguv-vitalkeys.html", {

          headers: { "content-type": "text/html" }
      })
      .then(
        result => {
          vm.cgv = result.body;
          vm.termsOfUse = true;
        },
        error => {
          this.cgv = "Can't connect to server. ";
        }
      );
  }
  
};
</script>
