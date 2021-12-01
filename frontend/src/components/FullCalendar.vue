<template>
  <div>
    <FullCalendar :options="calendarOptions" />
    <!-- {{ this.calendarOptions.events }} -->
  </div>
</template>
<script >
import { reactive } from "vue";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { mapState } from "vuex";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        events: []
      },
    };
  },
  computed: {
    ...mapState("auth", { loggedUser: (state) => state.loggedUser }),
    ...mapState("task", { taskList: (state) => state.taskList }),
  },
  methods: {
    getTasks() {
      return this.taskList.map((task) => {
        return {
          title: task.title,
          date: task.deadline,
        }
      });

    },
  },
};
</script>