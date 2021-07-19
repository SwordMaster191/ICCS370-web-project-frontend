<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-large color="success" class="mr-4" @click="book" v-bind="attrs" v-on="on">
            Book a schedule
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Book a schedule</span>
          </v-card-title>
          <v-card-text>
            <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-dialog
                        ref="dialog1"
                        v-model="modal1"
                        :return-value.sync="startTime"
                        persistent
                        width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="startTime"
                            label="Starting time*"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                          v-if="modal1"
                          v-model="startTime"
                          full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="modal1 = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog1.save(startTime)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>

                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-dialog
                        ref="dialog2"
                        v-model="modal2"
                        :return-value.sync="endTime"
                        persistent
                        width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="endTime"
                            label="Ending time*"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                          v-if="modal2"
                          v-model="endTime"
                          full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="modal2 = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog2.save(endTime)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>

                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Date*"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="date"
                          @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="dialog = false"
            >
              Book schedule
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";

export default {
  name: "Book",
  components: {
  },
  data: () => ({
    startTime: null,
    endTime: null,
    modal1: false,
    modal2: false,
    menu: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    valid: true,
    dialog: false,
    dialog1: false,
    dialog2: false,
  }),
  methods: {
  },
};
</script>