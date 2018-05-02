<template>
  <div class="message">
    <ul>
      <li v-for="item in pointCount" :key="item">
        <comment :index='item-1'></comment>
      </li>
    </ul>
  </div>
</template>

<script>
import comment from "@/components/Comment";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    comment
  },
  methods: {
  },
  computed: {
    ...mapGetters(["pointCount"])
  },
  created() {
  }
};
</script>

