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
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu v-if="$store.state.name"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn href="" target="_blank" v-bind="attrs"
                   v-on="on"  text>
              <span class="mr-2">{{ "Logged in as: " + $store.state.name }}</span>
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img
                      src="https://vuejs.org/images/logo.png"
                      alt="Vue logo"
                  >
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{$store.state.username}}</v-list-item-title>
                  <v-list-item-subtitle>{{$store.state.role}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn color="error" class="ma-2" @click="logout">
                    Log out</v-btn
                  >
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                      v-model="message"
                      color="purple"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable messages</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-action>
                  <v-switch
                      v-model="hints"
                      color="purple"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>Enable hints</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                  text
                  @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="primary"
                  text
                  @click="menu = false"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
        <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";

export default {
  name: "App",

  data: () => ({
    items: [
      { title: 'Profile' },
      { title: 'Logout' },
    ],
  }),
  methods:
      {
        async logout() {
          let response = await Vue.axios.get("/api/logout")
          if (response.data.success) {
            this.$router.push({path: "/login"});
          }
        }
}};
</script>

