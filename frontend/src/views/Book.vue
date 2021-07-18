<template>
  <v-container>
    <div align="center">
            <h2>Please select and fill available slots</h2>
      <div class="my-5">
        <v-btn x-large color="success" class="mr-4" @click="book"> Book a schedule</v-btn>
      </div>
    </div>
    <!--    <v-btn-->
    <!--        class="ma-2"-->
    <!--        outlined-->
    <!--        color="indigo"-->
    <!--    >-->
    <!--      Book a schedule-->
    <!--    </v-btn>-->

  </v-container>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import Vue from "vue";

export default {
  name: "Book",
  components: {
  },
  methods: {
    async book() { // check if user session valid, then book-able
      this.$router.push({ path: "/booking" });
    },
  },
};
</script>
