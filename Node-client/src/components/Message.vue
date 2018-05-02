<template>
  <div class="message">
    <ul class="message__content">
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

<style lang="scss" scoped>
.message__content{
  list-style: none;
}
</style>

