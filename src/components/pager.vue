<template>
  <aside class="pager" v-if="len>1">
    <div class="pager_box">
      <span :class="{disabled:now === 1}" @click="getData(now-1)"><</span>
      <span :class="{active:1 === now}" @click="getData(1)">1</span>
      <span title="向前5页" @click="getData(now-5)" v-if="now > 4">...</span>
      <span v-for="i in 5" :class="{active:(now - 3 + i) === now}" @click="getData(now - 3 + i)" :key="i" v-if="(now - 3 + i) < len && (now - 3 + i) > 1">{{ now - 3 + i }}</span>
      <span title="向后5页" @click="getData(now+5)" v-if="len - now >= 4">...</span>
      <span :class="{active:len === now}" @click="getData(len)">{{len}}</span>
      <span :class="{disabled:now === len}" @click="getData(now+1,1)">></span>
    </div>
  </aside>
</template>

<script>
  export default {
    name: 'pager',
    props: {
      len: {
        type: Number
      },
      now: {
        type: Number
      }
    },
    data () {
      return {

      }
    },
    methods: {
      getData (p, type) {
        if (p <= 0 || p > this.len) return false
        this.$emit('getList', p)
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  .pager{
    padding-top:20px;
    padding-bottom:50px;
    .pager_box{
      float: right;
      box-shadow: 5px 5px 5px #e0e6f3, -5px 5px 5px #e0e6f3;
      span{
        display: inline-block;
        width: 40px;
        text-align: center;
        line-height: 40px;
        height: 40px;
        color: #999;
        background: #fff;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all .1s;
        & + span {
          margin-left: 3px;
        }
      }
      span:not(:first-child):not(:last-child):hover,{
        border-color: #327fff;
        border-radius: 3px;
      }
      span.active{
        background: #327fff;
        color: #fff;
      }
      span.disabled{
        background: #f3eded;
        color: #c7c1c1;
      }
    }
  }
</style>
