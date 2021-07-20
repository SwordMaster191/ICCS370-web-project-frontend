<template>
  <v-app>
    <v-app-bar app color="blue" dark>
      <div class="d-flex align-center">
        <!--        Welcome to 3D-printer reservation site-->
        <v-img
          src="frontend/src/assets/Logo2.png"
          max-height="50"
          max-width="100"
          contain
        />

        <v-toolbar-title>3D Printing Booking Service</v-toolbar-title>
      </div>

      <v-btn href="" target="_blank" text>
        <span>{{ $store.state.name }}</span>
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
