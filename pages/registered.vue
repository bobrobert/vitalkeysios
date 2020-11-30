<template>
  <f7-page name="registered">
    <f7-block style="height:100%">
      <f7-col   style="height:100%;width:100%;align-items:center">

        <f7-row style="height:50%;align-items:middle">
          <span style="font-size:20px;margin:auto">Your registration is now complete</span>
        </f7-row>
      </f7-col>
    </f7-block>
    <f7-block>
      <f7-row>
        <!--          <security-code v-model="code"></security-code>-->
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
var self = this;
export default {
  name: "registered",
 beforeMount() {
   var vm = this;
      setTimeout(function() {
        vm.$f7router.navigate({name:"welcome"});
    },3000);
 }
};
</script>
