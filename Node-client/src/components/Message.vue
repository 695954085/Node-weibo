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
  },
  mounted(){
    this.$nextTick().then(()=>{
      this.$el.children.item(0).scrollTop = this.$el.children.item(0).scrollHeight -
        this.$el.clientHeight;
        console.log(this.$el.children.item(0).scrollTop)
        console.log(this.$el.clientHeight)
        console.log(this.$el.children.item(0).scrollHeight)
    })
  }
};
</script>

<style lang="scss" scoped>
.message__content{
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>

