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
  methods: {},
  computed: {
    ...mapGetters(["pointCount"])
  },
  created() {},
  mounted() {},
  updated() {
    this.$nextTick().then(()=>{
      this.$el.scrollTop = this.$el.scrollHeight - this.$el.clientHeight;
    })
  }
};
</script>

<style lang="scss" scoped>
.message__content {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>

