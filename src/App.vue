<template>
  <div id="app">
    <Swipe :pagination-visible="true" :loop="true" :paginationClickable="true" :autoPlay="0"></Swipe>
    <!-- <my-cascader :sources="sources" :initValue="['A', 'a2']" @onChange="onChange"></my-cascader> -->
    <pager :len="41" :now="now" @getList="now = $event || 1"></pager>
  </div>
</template>

<script>
import Swipe from './components/swipe'
import MyCascader from './components/my-cascader'
import city from '@/util/city'
import Pager from '@/components/pager'

export default {
  name: 'app',
  components: {
    Swipe, MyCascader, Pager
  },
  data () {
    return {
      sources: {
        data: [
          { name: 'A',
            children: [
              {name: 'a1'},
              {name: 'a2'}
            ]
          },
          { name: 'B',
            children: [
              { name: 'b1',
                children: [
                  { name: 'b11',
                    children: [
                      {name: 'b111'},
                      {name: 'b112'},
                      {name: 'b113'},
                      {name: 'b114'}
                    ]
                  },
                  { name: 'b12',
                    children: [
                      {name: 'b121'},
                      {name: 'b122'},
                      {name: 'b123'},
                      {name: 'b124'}
                    ]
                  }
                ]
              },
              { name: 'b2',
                children: [
                  { name: 'b21',
                    children: [
                      {name: 'b211'},
                      {name: 'b212'},
                      {name: 'b213'},
                      {name: 'b214'}
                    ]
                  },
                  { name: 'b22',
                    children: [
                      {name: 'b221'},
                      {name: 'b222'},
                      {name: 'b223'},
                      {name: 'b224'}
                    ]
                  }
                ]
              }
            ]
          }
        ],
        level: 4
      },
      sources2: {data: city, level: 2},
      now: 1
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    }
  }
}
</script>

<style>
body{
  margin:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
