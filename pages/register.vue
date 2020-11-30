<template>
  <f7-page name="register">

    <div class="text-align-center" style="font-size:18px">
      Vos informations personnelles
      <br>
      <span class="small-text">Your personal information</span>
    </div>
    <div class="list no-hairlines-md" style="border:none">
      <form id="registerForm" style="border:0px solid #000">
          <div class="item-content item-input item-input-outline">
            <div class="item-inner">
              <div class="item-title item-floating-label">
                Prénom /
                <span class="small-text">First name</span>
              </div>
              <div class="item-input-wrap">
                <input
                  id="firstName"
                  :value="user.firstName"
                  @input="user.firstName = $event.target.value"
                  type="text"
                  placeholder="Jean"
                >
                <span class="input-clear-button"></span>
              </div>
            </div>
          </div>
          <div class="item-content item-input item-input-outline">
            <div class="item-inner">
              <div class="item-title item-floating-label">
                Nom /
                <span class="small-text">Last name</span>
              </div>
              <div class="item-input-wrap">
                <input
                  id="lastName"
                  :value="user.lastName"
                  @input="user.lastName = $event.target.value"
                  type="text"
                  placeholder="Dupond"
                >
                <span class="input-clear-button"></span>
              </div>
            </div>
          </div>
          <div class="item-content item-input item-input-outline">
            <div class="item-inner">
              <div class="item-title item-floating-label">Email</div>
              <div class="item-input-wrap">
                <input
                  id="email"
                  :value="user.email"
                  @input="user.email = $event.target.value"
                  type="email"
                  placeholder="Email"
                  @keydown.enter="$event.target.blur();openBirthday()"
                >
                <span class="input-clear-button"></span>
              </div>
            </div>
          </div>
          <div class="item-content item-input item-input-outline">
            <div class="item-inner">
              <div class="item-title item-floating-label">
                Date de naissance /
                <span class="small-text">Birthday (jj/mm/aaaaa)</span>
              </div>
              <div class="item-input-wrap">
                <input
                  type="text"
                  placeholder="01/01/1971"
                pattern="[0-9]*" inputmode="numeric"
              v-on:input="birthdayChange($event)"
                  :value="user.birthday"
                  @input="user.birthday = $event.target.value"
                >
                 <span class="input-clear-button"></span>
              </div>
            </div>
          </div>
          <div class="item-content item-input item-input-outline">
            <div class="item-inner" style="width:30%">
              <div class="item-title item-floating-label">
                +&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div class="item-input-wrap">
                <input
                  type="text"
                  pattern="[0-9]*" inputmode="numeric"
                  placeholder="   "
                  :value="user.indicatif"
                   @input="user.indicatif = $event.target.value">
                 
              </div>
            </div>
            <div class="item-inner" style="width:70%">
              <div class="item-title item-floating-label">
                Télephone /
                <span class="small-text">Phone</span>
              </div>
              <div class="item-input-wrap">
                
                <input
                  type="text"
                  pattern="[0-9]*" inputmode="numeric"
                  placeholder="612345678"
                  id="inputPhone"
                  v-on:input="phoneChange($event)"
                  :value="user.phone"
                  @input="user.phone = $event.target.value"  >
                 <span class="input-clear-button"></span>
              </div>
            </div>
          </div>
          <div class="item-content item-input item-input-outline">
            <div class="item-inner">
              <div class="item-title item-floating-label">
                Code personnel /
                <span class="small-text">Personal code</span>
                <span>ex:999999</span>
              </div>
              <div class="item-input-wrap">
                <input
                  type="text"
                  placeholder="999999"
                  id="inputCode"
                    v-on:input="codeChange($event)"
                  :value="user.pwd"
                  @input="user.pwd = $event.target.value"
                  
                  pattern="[0-9]*" inputmode="numeric"
                >
                 <span class="input-clear-button"></span>
              </div>
            </div>
          </div>
        <div style="text-align:center;color:#f00;min-height:24px;border:0px solid #000">{{ regErrors }}</div>
      </form>
    </div>
    <div class="block">
      <div class="row justify-content-space-between">
        <div class="col"></div>
        <div class="col">
          <button class="button button-outline button-round" @click="checkForm">
            Suivant/
            <span class="small-text">Next</span>
          </button>
        </div>
      </div>
    </div>
  </f7-page>
</template>
<script>
var monthDays = [0, 31,29,31,30,31,30, 31,31,30,31,30,31];
export default {
  data() {
    return {
      regErrors: " ",
      user: this.$root.user,
    };
  },
  methods: {
       birthdayChange: function(evt) {
      var value = evt.target.value.replace(/\//g, '');
      if(value.length >=8) {
        var yearInt = parseInt(value.substring(4));
        var month = parseInt(value.substring(2,4)) > 12 ? "12" : value.substring(2,4);
        var day = parseInt(value.substring(0,2)) > monthDays[parseInt(value.substring(2,4))] ? monthDays[parseInt(value.substring(2,4))] : value.substring(0,2)
        if(parseInt(month) == 2 && parseInt(day) == 29) {
          if((yearInt % 4) || (yearInt % 100) || !(yearInt % 400)) {
            evt.target.value = "28/"+month+"/"+value.substring(4);
          }
        }
        document.getElementById("inputPhone").focus();
      }else 
      if (value.length > 4) {
        var month = parseInt(value.substring(2,4)) > 12 ? "12" : value.substring(2,4);
        var day = parseInt(value.substring(0,2)) > monthDays[parseInt(value.substring(2,4))] ? monthDays[parseInt(value.substring(2,4))] : value.substring(0,2);
  
        evt.target.value = day+"/"+month+"/"+value.substring(4);
      }else if(value.length > 2){
        if(parseInt(value.substring(0,2)) > 31) {
          evt.target.value = "31/"+value.substring(2);
        }else{
          evt.target.value = value.substring(0,2)+"/"+value.substring(2);
        }
      }
    },
    phoneChange: function(evt) {
      if (evt.target.value.length >= 12) {
        evt.target.value = evt.target.value.substring(0,12); 
      }
      
    },
    codeChange: function(evt) {
     if (evt.target.value.length >= 6) {
        evt.target.value = evt.target.value.substring(0,6); 
        document.getElementById("inputCode").blur();
      }
    },
    openBlur(value) {
      var vm = this;
      switch (value) {
        case "birthday":
          setTimeout(function() {
            vm.numpadBirthday.setValue(vm.user.birthday);
          }, 500);
          break;
        case "phone":
          setTimeout(function() {
            vm.numpadBirthday.setValue(vm.user.birthday);
          }, 500);
          break;
        case "code":
          setTimeout(function() {
            vm.numpadBirthday.setValue(vm.user.birthday);
          }, 500);
          break;
      }
    },
    openBirthday() {
      var vm = this;
      setTimeout(function() {
        vm.numpadBirthday.open();
      }, 200);
    },
    
    checkForm() {
       this.regErrors = " ";

      var birthdayValid = false;
      var userAge = 0;
      if (this.user.birthday) {
        var birthday = new Date(
          this.user.birthday.substring(6),
          this.user.birthday.substring(3, 5),
          this.user.birthday.substring(0, 2)
        );
        birthdayValid = !isNaN(new Date(birthday));
        if (birthdayValid) {
          const getAge = birthDate =>
            Math.floor(
              (new Date() - new Date(birthDate).getTime()) / 3.15576e10
            );
          userAge = getAge(birthday);
        }
      }

      var emailValid = false;
      if (this.user.email) {
        emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.user.email
        );
      }

      if (
        this.user.firstName &&
        this.user.lastName &&
        birthdayValid &&
        userAge > 14 &&
        userAge < 100 &&
        emailValid &&
        this.user.pwd &&
        this.user.pwd.length == 6 &&
        this.user.phone.length >=7
      ) {
        this.$root.user = this.user;
        localStorage.setItem("user", JSON.stringify(this.$root.user));
        this.$f7router.navigate({name:"register-pict"});

        return;
      }
      this.regErrors = " ";
      if (!this.user.firstName) {
        this.regErrors = "Prénom obligatoire / First name required";
      } else if (!this.user.lastName) {
        this.regErrors = "Nom obligatoire / Last name required.";
      } else if (!this.user.email) {
        this.regErrors = "Email obligatoire / Email required.";
      } else if (!emailValid) {
        this.regErrors = "Adresse mail incorrecte / Invalid email";
      } else if (!this.user.birthday) {
        this.regErrors = "Date de naissance obligatoire / Birthday required.";
      } else if (!birthdayValid) {
        this.regErrors = "Date de naissance incorrecte / invalid Birthday";
      } else if (userAge < 14 || userAge >= 100) {
        this.$f7.dialog.alert(
          "Ce service est réservé aux plus de 14 ans<br/>This service is reserved for people over 14 years old"
        );
      } else if (!this.user.phone) {
        this.regErrors = "Téléphone obligatoire / Phone required";
      } else if (this.user.phone.length < 7 ) {
        this.regErrors =
          "Numéro de téléphone incorrect / invalid phone number (ex:612345678)";
      } else if (!this.user.pwd) {
        this.regErrors = "Code de sécurité obligatoire/Security code required.";
      } else if (this.user.pwd.length < 6) {
        this.regErrors =
          "Code de sécurité, 6 chiffres/at least 6 digits for security code";
      }

      var vm = this;
      setTimeout(function() {
        vm.regErrors = " ";
      }, 3000);
   
    }
  },
  mounted() {
/*    var birthday = this.user.birthday.replace(/\//g, '');
       /*this.user.birthday.substring(0,2)+"/"+
          this.user.birthday.substring(2, 4)+"/"+
          this.user.birthday.substring(4);
          *
          this.user.birthday = birthday;
          */
  }
};
</script>


