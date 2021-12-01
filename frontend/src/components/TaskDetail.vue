<template>
  <div>
    <div
      class="flex py-2 px-2 rounded-md min-h-12"
      :class="backgroundColor"
    >
      <p class="font-semibold flex-grow text-left">
        {{ this.title }}
        <span class="font-normal text-sm">
          ({{ this.getDateDifference(this.deadline) == 0 ? 'O dia de entrega é hoje' :
          this.getDateDifference(this.deadline) == 1 ?
          `${this.getDateDifference(this.deadline)} dia para a entrega` :
          this.getDateDifference(this.deadline) > 1 ?
          `${this.getDateDifference(this.deadline)} dias para a entrega` :
          `A tarefa está atrasada em ${this.getDateDifference(this.deadline) * -1} dias` }})</span>
      </p>
      <h1>Prazo: <b>{{ this.getDate(this.deadline) }}</b></h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      monthsWith31Days: [1, 3, 5, 7, 8, 10, 12]
    }
  },
  props:{
    title: String,
    description: String,
    deadline: String,
    priority: Number,
    status: String
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
  methods:{
    getDate(date) {
      const deadline = date.split('-');
      return `${deadline[2]}/${deadline[1]}/${deadline[0]}`;
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
