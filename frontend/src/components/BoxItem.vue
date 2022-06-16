<template>
  <div class="flex flex-col justify-center mx-2 mt-2 min-h-12 rounded-r-md dark:bg-primary
    bg-medium-purple cursor-pointer">
    <div class="flex items-center rounded-r-md justify-between h-full" @click="entity ? sendToProject(id): ''">
      <h1 class="text-xs text-white ml-3 truncate hover:whitespace-normal">{{ title }}</h1>
      <div
        class="clip h-full w-5/12 min-w-24 min-h-12
          flex flex-col justify-center rounded-r-md"
        :class="this.deadline ? backgroundColor : 'bg-primary dark:bg-skin text-white'"
      >
        <h1 class="text-xs">{{status}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    status: String,
    entity: String,
    deadline: String,
    id: Number
  },
  computed: {
    backgroundColor() {
      const classes = this.getDateDifference(this.deadline) <= 2 ?
        'bg-error text-title' :
        this.getDateDifference(this.deadline) <= 7 ?
        'bg-warning text-title'
        :
        'bg-success text-title'
      return classes;
    }
  },
  methods: {
    sendToProject(id) {
      this.$router.push(`/project/${id}`);
    },
    getDateDifference(date) {
      if (!date) return;
      const deadline = date.split('-');
      const deadlineDate = new Date(`${deadline[1]}/${deadline[2]}/${deadline[0]}`);

      const todayDate = new Date();
      const [month, day, year] = [parseInt(todayDate.getMonth())+1, parseInt(todayDate.getDate()), parseInt(todayDate.getFullYear())];
      const newDate = new Date(`${month}/${day}/${year}`);
      
      const dateDiff = deadlineDate - newDate;
      const difference = dateDiff / (1000 * 3600 * 24);
      return difference;
    }
  }
}
</script>
