<template>
  <div class="message">
    <ul>
      <li v-for="item in pointCount" :key="item">
        <message :index='item'></message>
      </li>
    </ul>
  </div>
</template>

<script>
import message from "@/components/Message";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    message
  },
  methods: {
    ...mapActions(["getPointsFromServer"]),
    async initPoints() {
      await this.getPointsFromServer();
    }
  },
  computed: {
    ...mapGetters(["pointCount"])
  },
  created() {
    this.initPoints();
  }
};
</script>

