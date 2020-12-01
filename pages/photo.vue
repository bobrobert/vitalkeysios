<template>
  <f7-page name="photo">
    <div class="text-align-center" style="font-size:18px">
      Prenez la photo
      <br />
      <span class="small-text">Take picture</span>
    </div>
    <div style="display:flex;justify-content:center;min-height:50%"></div>
    <div class="block">
      <div class="row justify-content-space-around">
        <div class="col">
          <button class="button button-outline button-round" v-on:click="abort">
            Annuler/
            <span class="small-text">Abort</span>
          </button>
        </div>
        <div class="col">
          <button class="button button-outline button-round" v-on:click="save">
            Enregistrer/
            <span class="small-text">Save</span>
          </button>
        </div>
      </div>
    </div>
  </f7-page>
</template>


<script>
export default {
  name: "MySignaturePad",

  data() {
    return {
      inSave:false
    };
  },
  methods: {
    save() {
      if(this.inSvae) return;
      this.inSave = true;
      var vm = this;
      CameraPreview.takePicture({ width: 600, height: 600, quality:85 }, function(imgData) {
        switch (vm.$root.photo.index) {
          case 0:
            vm.$root.user.avatar = "data:image/jpeg;base64," + imgData;
            break;
          case 1:
            vm.$root.user.ciFrontSide = "data:image/jpeg;base64," + imgData;
            break;
          case 2:
            vm.$root.user.ciBackSide = "data:image/jpeg;base64," + imgData;
            break;
        }
        CameraPreview.hide();
        CameraPreview.stopCamera();
        vm.$f7router.back();
      });
    },

    abort() {
      CameraPreview.hide();
      CameraPreview.stopCamera();
      this.$f7router.back();
    }
  },
  mounted() {
    var vm = this;
    setTimeout(function() {
      CameraPreview.show();
      CameraPreview.startCamera({
        x: 40,
        y: 150,
        width: 300,
        height: 300,
        toBack: false,
        camera:
          vm.$root.photo.index == 0
            ? CameraPreview.CAMERA_DIRECTION.FRONT
            : CameraPreview.CAMERA_DIRECTION.BACK,
        previewDrag: false,
        tapPhoto: false
      });
      CameraPreview.show();
      if($root.photo.index == 0) {
        CameraPreview.setFlashMode(CameraPreview.FLASH_MODE.OFF);
      }else{
        CameraPreview.setFlashMode(CameraPreview.FLASH_MODE.ON);
      }
    }, 300);
  }
};
</script>