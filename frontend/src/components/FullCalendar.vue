
<script >
import { reactive } from "vue";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        events: [
          { title: "Prova POO", date: "2021-11-18" },
          { title: "Prova Design", date: "2021-11-20" },
        ],
      },
    };
  },
};
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
<style>
</style>