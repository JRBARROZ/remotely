
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
  computed: {
    ...mapState("task", {
      taskList: (state) => state.taskList,
    }),
  },
  mounted() {
    const tasksDays = [];
    this.taskList.forEach((item) => {
      tasksDays.push({
        title: item.title,
        date: item.deadline,
      });
    });
    this.$data.calendarOptions.events = tasksDays;

    return tasksDays;
  },

  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        events: [{}],
      },
    };
  },
  methods: {
    getTaskList() {},
  },
};
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
<style>
</style>