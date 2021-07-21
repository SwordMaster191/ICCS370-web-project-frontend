<template>
  <v-parallax src="https://i.imgur.com/hbQ7HPb.jpg" height="728">
    <div align="center">
      <h1>3D PRINTING BOOKING SERVICE</h1>

      <v-card elevation="10" outlined max-width="600">
        <h1>REGISTRATION</h1>

        <v-form ref="form">
          <v-col sm="10">
            <v-text-field
              label="Username"
              placeholder="Enter a Username"
              filled
              rounded
              dense
              v-model="username"
              required
            ></v-text-field>

            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              placeholder="Enter a Password"
              hint="At least 8 characters"
              class="input-group--focused"
              filled
              rounded
              dense
              v-model="password"
              required
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="confirmPasswordRules"
              :type="show1 ? 'text' : 'password'"
              label="Confirm Password"
              placeholder="Confirm Password"
              hint="At least 8 characters"
              class="input-group--focused"
              filled
              rounded
              dense
              v-model="confirmPassword"
              required
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>
        </v-form>

        <div>
          <v-col sm="10">
            <v-dialog v-model="dialog" max-width="290">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :disabled="!valid"
                  rounded
                  block
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Submit
                </v-btn>

                <div class="my-4">
                  <v-btn rounded color="error" block @click="reset">
                    Reset Form
                  </v-btn>
                </div>

                <div class="my-4">
                  <v-btn rounded color="warning" block @click="back">
                    Back
                  </v-btn>
                </div>
              </template>

              <v-card>
                <v-card-title class="text-h5"> Terms of Service </v-card-title>
                <v-card-text
                  ><a
                    href="https://www.youtube.com/watch?v=jyijnQFn5lA"
                    target="_blank"
                    >Yahallo</a
                  ></v-card-text
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Disagree
                  </v-btn>
                  <v-btn color="green darken-1" text @click="submit">
                    Agree
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </div>
      </v-card>
    </div>
  </v-parallax>
</template>

<script>
import Vue from "vue";
export default {
  data: () => ({
    valid: true,
    username: "",
    password: "",
    confirmPassword: "",
    dialog: false,
    show1: false,
    show2: false,

    passwordRules: [
      (value) => !!value || "Enter password.",
      (value) => (value && value.length >= 8) || "Minimum 8 characters",
    ],

    confirmPasswordRules: [
      (value) => !!value || "Confirm password",
      (value) => value === this.password || "The password does not match.",
    ],
  }),

  methods: {
    async submit() {
      let username = this.username;
      let password = this.password;
      let confirmPassword = this.confirmPassword;

      if (username == "" || password == "" || confirmPassword == "") {
        this.dialog = false;
        alert("Please complete the form");
        this.$refs.form.reset();
      }
      else if (password != confirmPassword) {
        this.dialog = false;
        alert("Password does not match");
        this.$refs.form.reset();
      }
      else{
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);
        let response = await Vue.axios.post("/api/register", formData);

        if (response.data.success) {
          alert("New account has been created.");
          this.$router.push({ path: "/login" });
        }
        else {
          alert("Username already exists. Please select a new username.")
          this.$router.push({ path: "/register" });
        }
      }
    },

    back() {
      this.$router.push({ path: "/login" });
    },

    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
