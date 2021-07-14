<template>
  <v-container>
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="submit"
        >
          Login
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>

      </v-form>
    </template>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    username:'',
    password:'',
    usernameRules: [(v) => !!v || "Userame is required"],
    passwordRules: [(v) => !!v || "Password is required"],
  }),

  methods: {
    submit() {
      this.$refs.form.validate();
      console.log(this.usernameRules, this.password)
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
