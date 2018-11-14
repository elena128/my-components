<template>
  <div class="select">
    <select @change="select($event.target.value, l)" v-for="(l, key) in sources.level" :key="key">
      <option :value="v.value || v.name" v-for="(v, k) in (key === 0 ? sources.data : children[key-1])" :key="k" :selected="value[key] === v.name">{{v.name}}</option>
    </select>
  </div>
</template>

<script>
  let l = 0
  function checkData (data, level) {
    l++
    const newArr = filter(data)
    if (!newArr && l !== level) return false
    else if (l === level) return true
    else return checkData(newArr, level)
  }
  function filter (data) {
    const returnData = data.filter(item => item.children && item.children.length)
    return !returnData.length ? false : returnData.reduce((pre, item) => {
      pre.push(...item.children)
      return pre
    }, [])
  }
  export default {
    name: 'MyCascader',
    props: {
      initValue: {
        type: Array
      },
      sources: {
        type: Object,
        validator (value) {
          return checkData(value.data, value.level)
        }
      }
    },
    data () {
      return {
        children: [],
        value: []
      }
    },
    methods: {
      select (v, level, first) {
        if (level !== this.sources.level) {
          for (let k = 1; k <= this.sources.level; k++) {
            const firstValue = this.initValue[k - 1]
            const children = k === 1 ? this.sources.data : this.children[k - 2]
            const initValue = (first && firstValue) ? firstValue : (children && children[0] && children[0].name)
            this.clearValue(k, this.sources.level)

            if (initValue && k >= level && k <= this.sources.level - 1) {
              const value = (k === level && v) ? v : initValue
              this.value[k - 1] = value
              this.$set(this.children, k - 1, this.setValue(children, value))
            }

            if (k === this.sources.level) this.value[k - 1] = initValue
          }
        } else this.value[level - 1] = v

        this.$emit('onChange', this.value)
      },
      setValue (arr, value) {
        const filterArr = arr.filter((v) => v.name === value)
        const returnArr = filterArr.length ? filterArr[0] : arr[0]
        return returnArr.children
      },
      clearValue (f, e) {
        for (let k = f; k < e; k++) {
          this.value[k] = ''
          this.$set(this.children, k, [])
        }
      }
    },
    mounted () {
      this.select(this.value[0], 1, 1)
    }
  }
</script>

<style type="text/css" lang="scss">
  .select{
    width: 300px;
    margin: 15px 40px;
    display: flex;
    justify-content: space-between;
    select{
      width:33%;
      height:32px;
      line-height: 32px;
      border:none;
    }
  }
</style>
