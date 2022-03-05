<template>
  <section>
    <div class="contentBx">
      <div class="formBx">
        <form @submit.prevent="submitData">
          <div class="inputBx">
            <label for="user-name">Email</label>
            <input
              type="text"
              name="user-name"
              id="user-name"
              v-model.trim="enteredEmail.val"
              @blur="clearValidity('enteredEmail')"
            />
            <p v-if="!enteredEmail.isValid" id="warning">
              Please Enter an email
            </p>
          </div>
          <div class="inputBx">
            <label for="user-password">Password</label>
            <span>
              <input
                :type="ShowPassword"
                maxlength="16"
                name="user-password"
                id="user-password"
                v-model.trim="enteredPassword.val"
                @blur="clearValidity('enteredPassword')" />
              <i class="bi" :class="toggleClass" @click="togglePassword"></i
            ></span>

            <p v-if="!enteredPassword.isValid" id="warning">
              Password must not be empty
            </p>
          </div>

          <div class="inputBx">
            <button>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      enteredEmail: {
        val: '',
        isValid: true,
      },
      enteredPassword: {
        val: '',
        isValid: true,
      },
      showPassword: false,

      rememberMe: [],
      inputIsInvalid: false,
      formIsValid: true,
    };
  },

  computed: {
    ShowPassword() {
      return this.showPassword ? 'text' : 'password';
    },
    toggleClass() {
      return this.showPassword ? 'bi-eye-slash' : 'bi-eye';
    },
  },

  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },

    togglePassword() {
      return (this.showPassword = !this.showPassword);
    },

    validateForm() {
      this.formIsValid = true;
      if (
        this.enteredEmail.val === '' ||
        !this.enteredEmail.val.includes('@')
      ) {
        this.enteredEmail.isValid = false;
        this.inputIsInvalid = true;
        this.formIsValid = false;
      }
      if (this.enteredPassword.val === '') {
        this.enteredPassword.isValid = false;
        this.inputIsInvalid = true;
        this.formIsValid = false;
      }
    },

    submitData() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      console.log(
        this.enteredEmail.val,
        this.enteredPassword.val,
        this.rememberMe
      );
    },
    confirmError() {
      this.inputIsInvalid = false;
    },
  },
};
</script>

<style scoped>
section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
}

section .contentBx {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.forgot-pass {
  display: flex;
}

section .contentBx .formBx {
  width: 25%;
  height: 100%;
}

section .contentBx .formBx form {
  margin-top: 50px;
}

section .contentBx .formBx .inputBx {
  margin-bottom: 20px;
}

section .contentBx .formBx .inputBx label {
  font-size: 16px;
  margin-bottom: 5px;
  display: inline-block;
  color: #607d8b;
  font-weight: 300;
  letter-spacing: 1px;
}

section .contentBx .formBx .inputBx input {
  width: 100%;
  padding: 10px 20px;
  outline: none;
  font-weight: 400;
  border: 1px solid #607d8b;
  font-size: 16px;
  letter-spacing: 1px;
  color: #607d8b;
  background: transparent;
  border-radius: 30px;
}

section .contentBx .formBx .inputBx input:focus {
  border-color: rgba(0, 208, 228, 0.5);
  box-shadow: 0 0 4px 1px rgb(0 208 228 / 30%), 0 0 0 1px #00d0e4;
  outline: 0;
}

section .contentBx .formBx .inputBx button {
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  letter-spacing: 1px;
  border-radius: 30px;
  background: #ff45f0;
  color: #fff;
  outline: none;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: transform 80ms ease-in;
}

section .contentBx .formBx .inputBx button:active {
  transform: scale(0.95);
}

button {
  background: #d0342c;
  border-radius: 30px;
  padding: 10px 20px;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  letter-spacing: 1px;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

section .contentBx .formBx .inputBx button:hover {
  background: #f536d5;
}

section .contentBx .formBx .inputBx p {
  color: #607d8b;
}

section .contentBx .formBx .inputBx p a {
  color: #ff45f0;
}

section .contentBx .formBx h3 {
  color: #607d8b;
  text-align: center;
  margin: 40px 0 10px;
  font-weight: 500;
}

#warning {
  color: red;
}

.bi {
  float: right;
  margin-right: 16px;
  margin-top: -32px;
  position: relative;
  z-index: 2;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  section .contentBx {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  section .contentBx .formBx {
    width: 100%;
    padding: 40px;
    background: rgba(255, 255, 255, 0.9);
    margin: 50px;
  }
}
</style>
