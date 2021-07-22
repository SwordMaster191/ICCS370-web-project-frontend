<template>
  <v-container>
    <div align="center">
        <title>Home</title>
      <h1>Welcome to 3D-printer reservation</h1>
    </div>
    <h2>You have {{currentUserReservations.length}} reservations:</h2>
    <v-container fluid>
      <v-row>
        <v-col v-for="currentReservation in currentUserReservations" :key="currentReservation">
          <v-card color="purple"
                  dark class="mx-auto" max-width="300">
            <v-card-text>
              <div>Time • Date</div>
              <p class="text-h5">
                {{ currentReservation.startTime }} - {{ currentReservation.endTime }} • {{ currentReservation.date }}
              </p>
              <p>3D-printer reservation</p>
              <p>
                Duration of usage:
                {{ getTimeDifference(currentReservation.startTime, currentReservation.endTime) }} hr(s)
              </p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="red" @click="deleteCurrentUserReservation(
                    currentReservation.startTime,
                    currentReservation.endTime,
                    currentReservation.date
              )"> Cancel reservation </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <h2>Current reservations:</h2>
    <div align="center">
      <div class="my-5">
        <Book></Book>
      </div>
    </div>

    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
          ></v-calendar>
          <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import Book from "./Book.vue";

export default {
  name: "Home",
  components: {
    Book,
  },
  data: () => ({
    username: "",
    currentUserReservations: [],
    allReservationDetails: [],
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    promise: null,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.username = this.$store.state.name;
    Vue.axios.get("/api/allReservations").then(response => {
      this.allReservationDetails = response.data;
    });
    this.promise = this.getCurrentUserReservationDetails()
    .then(response => {
      this.currentUserReservations = response;
    })
  },
  methods: {
    async getCurrentUserReservationDetails() {
      let formData = new FormData();
      formData.append("username", this.$store.state.name)
      let response = await Vue.axios.post("/api/currentUserReservations", formData)

      return response.data;
    },
    getTimeDifference(start, end) {
      start = start.split(":");
      end = end.split(":");
      var startDate = new Date(0, 0, 0, start[0], start[1], 0);
      var endDate = new Date(0, 0, 0, end[0], end[1], 0);
      var diff = endDate.getTime() - startDate.getTime();
      var hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      var minutes = Math.floor(diff / 1000 / 60);

      if (hours < 0)
        hours = hours + 24;

      return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
    },
    reloadPage() {
      window.location.reload();
    },
    async deleteCurrentUserReservation(startTime, endTime, date) {
      if (confirm("Are you sure you want to cancel scheduled reservation at "+startTime+" to "+endTime+" on "+date+"?")) {
        let formData = new FormData();
        formData.append("startTime", startTime);
        formData.append("endTime", endTime);
        formData.append("date", date)
        let response = await Vue.axios.post("/api/deleteReservation", formData);

        if (response.data.success) {
          alert("Reservation at "+startTime+" to "+endTime+" on "+date+" cancelled.");
          this.reloadPage();
        }
        else {
          alert("Reservation cannot be cancelled.")
        }
      }
    },
    async book() {
      this.$router.push({ path: "/booking" });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
            requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }
      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);
      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        });
      }
      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>




