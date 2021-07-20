<template>
  <v-app>
    <v-app-bar app color="purple" dark>
      <div class="d-flex align-center">
<!--        Welcome to 3D-printer reservation site-->
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://i.imgur.com/kvLhqBV.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href=""
        target="_blank"
        text
      >
        <span class="mr-2">{{ $store.state.name }}</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
