<template>
  <div align = "center">
      <h1>Register for the 3D Printing Service</h1>
    <v-form ref="form">
    <v-col cols="12" sm="6">
      <v-text-field
          label="Username"
          hide-details="auto"
          required
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
      <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="min"
          :type="show1 ? 'text' : 'password'"
          name="input-10-2"
          label="Password"
          hint="At least 8 characters"
          class="input-group--focused"
          required
          @click:append="show1 = !show1"
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
      <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="match"
          :type="show2 ? 'text' : 'password'"
          name="input-10-2"
          label="Confirm Password"
          hint="At least 8 characters"
          required
          @click:append="show2 = !show2"
    ></v-text-field>
    </v-col>
    </v-form>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="success"
              dark
              class="mr-4"
              v-bind="attrs"
              v-on="on"
          >
            Submit
          </v-btn>

    <v-btn color="warning" class="mr-4" @click="back"> Back </v-btn>
    <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Terms of Service
          </v-card-title>
          <v-card-text><a href="https://www.youtube.com/watch?v=jyijnQFn5lA" target="_blank">Yahallo</a></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
            >
              Disagree
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="submit"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>


<script>

export default {

  data: () => ({
    return: {
      show1: false,
      show2: false,
    },
    dialog: false,

      min: [v => v.length >= 8 || "Min 8 characters"],
      match:[() => (`The password you entered doesn't match`)],
  }),

  methods: {

    async submit() {
      await this.$router.push({path: "/login"});
    },

    back(){
     this.$router.push({ path: "/login" });
    },

    reset() {
      this.$refs.form.reset();
    },

  },

}
</script>