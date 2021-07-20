<template>
  <v-parallax dark src="https://i.imgur.com/r3eu5rk.png">
    <v-container>
      <div align="center">
        <div>
          <h1>3D PRINTING BOOKING SERVICE</h1>
        </div>

        <v-card elevation="10" outlined max-width="600">
          <h1>Login</h1>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col sm="10">
              <v-text-field
                label="Username"
                placeholder="Enter Username"
                filled
                rounded
                dense
                v-model="username"
                :rules="usernameRules"
                required
              ></v-text-field>

              <v-text-field
                label="Password"
                placeholder="Enter Password"
                filled
                rounded
                dense
                type="password"
                v-model="password"
                :rules="passwordRules"
                required
              ></v-text-field>

              <div class="text-center">
                <v-btn
                  rounded
                  color="primary"
                  :disabled="!valid"
                  block
                  @click="submit"
                >
                  Login
                </v-btn>
              </div>

              <div class="my-4">
                <v-btn rounded color="primary" block @click="register">
                  Register
                </v-btn>
              </div>

              <div class="my-4">
                <v-btn rounded color="error" block @click="reset">
                  Reset Form
                </v-btn>
              </div>

              <template>
                <div class="text-center">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="green" dark v-bind="attrs" v-on="on" block rounded>
                        About
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5 grey lighten-2">
                        About this project
                      </v-card-title>

                      <v-card-text>
                        <p>
                          This project is a collaborative effort between Krit
                          Visitstump, James Kaewanan, Rinradee Sae-Lao, and
                          Natthakan Euaumpon.
                        </p>

                        <p>
                          Project: Room 1408 3D printer booking system
                        </p>

                        <p>
                          There is currently no management system for students
                          who wishes to utilize the 3D printer at the
                          university. Students come and ask to use the printer
                          at any time when the room might be busy or the fact
                          that the that the is currently in used by other
                          students. In addition, there are no centralized
                          platform for students to understand how to design
                          their own 3D model, or download the software that
                          allows the students to design students to design their
                          model on. Therefore, the creation of a 3D printer
                          booking system, alongside with resources on 3D
                          printing smooth operation of the 3D printer situated
                          in room 1408 at MUIC.
                        </p>

                        <p>
                          Our goals for this project is to design and implement a
                          Booking system in order to manage and organized the
                          queueing of and process handling of the 3D printer.
                        </p>

                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">
                          Ok
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
              </template>
            </v-col>
          </v-form>
        </v-card>
      </div>
    </v-container>
  </v-parallax>
</template>

<script>
import Vue from "vue";
export default {
  data: () => ({
    valid: true,
    username: "",
    password: "",
    usernameRules: [(v) => !!v || "Username is required"],
    passwordRules: [(v) => !!v || "Password is required"],
    dialog: false,
  }),

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        //if valid, submit to backend
        let formData = new FormData();
        formData.append("username", this.username);
        formData.append("password", this.password);
        let response = await Vue.axios.post("/api/login", formData);

        if (response.data.success) {
          this.$router.push({ path: "/" });
        }
      }
      console.log(this.username, this.password);
    },

    reset() {
      this.$refs.form.reset();
    },

    async register() {
      this.$router.push({ path: "/register" });
    },
  },
};
</script>
