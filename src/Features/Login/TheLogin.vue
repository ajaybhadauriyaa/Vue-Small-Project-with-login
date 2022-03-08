<template>
  <section>
    <div class="imgBx"></div>
    <div class="contentBx">
      <div class="formBx">
        <form @submit.prevent="submitData">
          <div class="inputBx">
            <label for="user-name">Username</label>
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
          <div class="remember">
            <div>
              <input
                id="remember-checkbox"
                type="checkbox"
                v-model="rememberMe"
                value="Remember Me"
              /><label for="remember-checkbox">Remember me</label>
            </div>
            <a href="">
              <div class="forgot-pass">
                <img
                  src="../../assets/question-circle-fill.svg"
                  alt="question mark"
                />
                Forgot Password
              </div></a
            >
          </div>
          <div class="inputBx">
            <button>Sign in</button>
          </div>
          <div class="inputBx">
            <p>
              Don't have an account ?
              <router-link to="/signUp">Sign up</router-link>
            </p>
          </div>
        </form>
        <h3>Login with social media</h3>
        <ul class="sci">
          <li><img src="../../assets/facebook.svg" alt="facebook icon" /></li>
          <li><img src="../../assets/twitter.svg" alt="twitter icon" /></li>
          <li><img src="../../assets/google.svg" alt="google icon" /></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
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

    async submitData() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      let response = await axios.get(
        `http://localhost:3000/users?email=${this.enteredEmail.val}&password=${this.enteredPassword.val}`
      );

      if (response.status == 200 && response.data.length > 0) {
        localStorage.setItem('user-info', JSON.stringify(response.data[0]));
        this.$router.push('/usersList');
      }
    },
    confirmError() {
      this.inputIsInvalid = false;
    },
  },
  mounted() {
    let user = localStorage.getItem('user-info');
    if (user) {
      this.$router.push('/usersList');
    }
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

section .imgBx {
  position: relative;
  width: 50%;
  height: 100%;
  background-image: url('../../assets/login.jpg');
}

section .imgBx:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(225deg, #e91e63, #03a9f4);
  z-index: 1;
  mix-blend-mode: screen;
}

section .imgBx img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

section .contentBx {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
}

.forgot-pass {
  display: flex;
}

section .contentBx .formBx {
  width: 50%;
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

section .contentBx .formBx .remember {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #607d8b;
  font-weight: 400;
  font-size: 14px;
}

section .contentBx .formBx .remember a img {
  height: 20px;
  width: 20px;
}

.remember input[type='checkbox'] {
  margin-right: 5px;
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

section .contentBx .formBx .sci {
  display: flex;
  justify-content: center;
  align-items: center;
}

section .contentBx .formBx .sci li {
  list-style: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #607d8b;
  border-radius: 50%;
  margin: 0 7px;
  cursor: pointer;
}

section .contentBx .formBx .sci li:hover {
  background: #ff45f0;
}

section .contentBx .formBx .sci li img {
  transform: scale(0.9);
  filter: invert(1);
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
  section .imgBx {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

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

  section .contentBx .formBx h3 {
    margin: 30px 0 10px;
  }
}
</style>
