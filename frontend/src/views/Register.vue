<template>
  <div>

    <v-col cols="12" sm="6">
      <v-text-field
          label="Username"
          :rules="required"
          hide-details="auto"
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
      <v-text-field
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[required, min]"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="Password"
          hint="At least 8 characters"
          class="input-group--focused"
          @click:append="show = !show"
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="6">
      <v-text-field
          :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[required, match]"
          :type="show ? 'text' : 'password'"
          name="input-10-2"
          label="Confirm Password"
          hint="At least 8 characters"
          error
          @click:append="show = !show"
    ></v-text-field>
    </v-col>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit"> Submit </v-btn>
    <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>

  </div>
</template>

<script>

export default {

  data: () => ({
    return: {
      show: false,
    },

      required: [(value) => !!value || "Required."],
      min: [v => v.length >= 8 || "Min 8 characters"],
      match:[() => (`The password you entered doesn't match`)],
  }),

  methods: {

    async submit() {

    },

    reset() {
      this.$refs.form.reset();
    },

  },

}
</script>