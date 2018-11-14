<template>
  <section class="swiper" :class="[direction?'horizontal':'vertical',{'dragging':dragging}]" @touchstart="onTouchStart" @mousedown="onTouchStart" ref="swiper-wrap">
    <div class="swiper-wrap" :style="{'transform':'translate3d('+translateX+'px,'+translateY+'px,0','transition-duration':transitionDuration+'ms', width: width*4+'px'}" @transitionend="onTransitionEnd">
      <div class="swiper_one" v-for="(n, k) in slideEls" :key="k" @mousemove="onMouseover" :style="{width: width+'px'}">
        <div :class="['swiper_box', {active: currentPage===k}]" v-if="currentPage===k">
          <template v-for="(b, key) in n">
            <img :src="require('@/assets/images/' + (k === 0 ? '4' : k === 5 ? '1' : k) + '_' + b + '.png')" :style="[{transform: 'translate3d('+offsetX+'px, '+offsetY+'px, 0px)'}]" v-if="b===1" :key="key">
            <img :src="require('@/assets/images/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" :key="key" v-else>
          </template>
        </div>
        <div class="swiper_box" v-else>
          <img :src="require('@/assets/images/'+(k===0?'4':k===5?'1':k)+'_'+b+'.png')" :style="[{transform: 'translate3d(0px, '+initY+'px, 0px)'}]" v-for="(b, key) in n" :key="key">
        </div>
      </div>
    </div>
    <div class="swiper-pagination" v-show="paginationVisiable">
      <span class="swiper-pagination-bullet" :class="{'active':k+1===currentPage}" v-for="(slide, k) in banners" @click="paginationClickable && setPage(k+1)" :key="k"></span>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'swiper',
    props: {
      direction: {
        type: Number,
        default: 1,
        validator: (value) => {
          return [1, 0].indexOf(value) > -1
        }
      },
      paginationVisiable: {
        type: Boolean,
        default: true
      },
      paginationClickable: {
        type: Boolean,
        default: false
      },
      loop: {
        type: Boolean,
        default: false
      },
      speed: {
        type: Number,
        default: 500
      },
      autoPlay: {
        type: Number,
        default: 3000
      }
    },
    data () {
      return {
        banners: [2, 2, 2, 2],
        slideEls: [],
        currentPage: 1,
        lastPage: 1,
        delta: 0,
        dragging: false,
        transitioning: false,
        startPos: null,
        startTranslate: 0,
        translateX: 0,
        translateY: 0,
        transitionDuration: 0,
        offset: 0,
        t: '',
        initY: 50,
        offsetX: 0,
        offsetY: 0,
        width: 0
      }
    },
    mounted () {
      this.onInit()
      window.addEventListener('resize', this.onResize, false)
    },
    destroyed () {
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      onMouseover (e) {
        clearInterval(this.t)
        this.t = ''
        if (this.transitioning) return false
        var w = window.innerWidth
        var h = window.innerHeight
        this.offsetX = e.clientX / w * 50
        this.offsetY = e.clientY / h * 30
        var self = this
        setTimeout(() => {
          if (this.t === '' && this.autoPlay) {
            self.t = setInterval(() => {
              self.next()
            }, this.autoPlay)
          }
        }, 3000)
      },
      onTouchStart (e) {
        this.startPos = this.getTouchPos(e)
        this.delta = 0
        this.startTranslate = this.currentPage * -this.offset
        this.startTime = new Date().getTime()
        this.dragging = true
        this.transitionDuration = 0
        document.addEventListener('touchmove', this.onTouchMove, false)
        document.addEventListener('mousemove', this.onTouchMove, false)
        document.addEventListener('touchend', this.onTouchEnd, false)
        document.addEventListener('mouseup', this.onTouchEnd, false)
        clearInterval(this.t)
        this.t = ''
      },
      onResize () {
        this.currentPage = 1
        this.onInit()
      },
      onTransitionEnd () {
        this.transitioning = false
        this.transitionDuration = 0
        this.delta = 0
        if (this.currentPage === 0) {
          this.currentPage = this.banners.length
        }
        if (this.currentPage >= this.banners.length + 1) {
          this.currentPage = 1
        }
        if (this.autoPlay) {
          this.setTranslate()
        }
        if (this.t === '' && this.autoPlay) {
          this.t = setInterval(() => {
            this.next()
          }, this.autoPlay)
        }
      },
      onTouchMove (e) {
        var event = e || window.event
        if (event.preventDefault) {
          event.preventDefault()
        }
        event.stopPropagation()
        // event.returnValue = false
        this.delta = this.getTouchPos(e) - this.startPos
        this.setTranslate(this.startTranslate + this.delta)
      },
      onTouchEnd (e) {
        document.removeEventListener('touchmove', this.onTouchMove)
        document.removeEventListener('touchend', this.onTouchEnd)
        document.removeEventListener('mousemove', this.onTouchMove)
        document.removeEventListener('mouseup', this.onTouchEnd)
        if (this.delta === 0) return false
        this.dragging = false
        this.transitionDuration = this.speed
        var isQuickAction = new Date().getTime() - this.startTime < 1000
        if (this.delta < -100 || (isQuickAction && this.delta < 50)) {
          this.next()
        } else if (this.delta > 100 || (isQuickAction && this.delta > 50)) {
          this.prev()
        } else {
          this.setPage(this.currentPage)
        }
      },
      setPage (page, e) {
        this.lastPage = this.currentPage
        this.currentPage = page
        this.setTranslate()
        this.transitioning = false
        this.transitionDuration = this.speed
      },
      next () {
        var page = this.currentPage
        if (page < this.banners.length || this.loop) {
          this.setPage(page + 1)
        } else {
          this.setPage(this.currentPage)
        }
      },
      prev () {
        var page = this.currentPage
        if (page > 1 || this.loop) {
          this.setPage(page - 1)
        } else {
          this.setPage(this.currentPage)
        }
      },
      setTranslate (value) {
        if (!value) {
          value = this.currentPage * -this.offset
        }
        var translateName = this.direction ? 'translateX' : 'translateY'
        this[translateName] = value
      },
      getTouchPos (e) {
        var key = this.direction ? 'pageX' : 'pageY'
        return e.changedTouches ? e.changedTouches[0][key] : e[key]
      },
      onInit () {
        this.width = document.body.clientWidth || document.documentElement.clientWidth
        clearInterval(this.t)
        this.offset = this.$refs['swiper-wrap'][this.direction ? 'offsetWidth' : 'offsetHeight']
        this.onTouchMove = this.onTouchMove.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        var arr = this.banners
        this.slideEls = [arr[arr.length - 1], ...arr, arr[0]]
        if (this.loop) {
          this.setTranslate()
        }
        if (this.autoPlay) {
          this.t = setInterval(() => {
            this.next()
          }, this.autoPlay)
        }
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  .swiper {
    position: relative;
    height: 550px;
    overflow: hidden;
    .swiper-wrap {
      display: flex;
      // width: 400vw;
      height: 100%;
      transition: all 0ms ease;
      .swiper_one{
        // width: 100vw;
        height: 100%;
        text-align: center;
        background-color: #5058fc;
        .swiper_box{
          position: relative;
          width: 100vw;
          height: 100%;
          transform: translate3d(0px, 30px, 0px);
          transition: all 1s .2s;
          &.active{
            transform: translate3d(0px, 0px, 0px)
          }
          img{
            position: absolute;
            transition: all .2s;
            transform-style: preserve-3d;
            backface-visibility: hidden;
          }
        }
        &:nth-child(6),&:nth-child(2){
          background-color: #1242ac;
        }
        &:nth-child(6),&:nth-child(2){
          img:first-child{
            top:0;
            left:0;
            width:100%;
            height:100%;
          }
        }
        &:nth-child(6),&:nth-child(2){
          img:nth-child(2){
            top:calc(50% - 87.5px);
            left:calc(50% - 289px);
            width:578px;
            height:175px;
          }
        }
        &:nth-child(3) img:first-child{
          right:10%;
          width:689px;
          top:calc(50% - 214px);
          height:428px;
        }
        &:nth-child(3) img:nth-child(2){
          top:calc(50% - 54px);
          left:10%;
          width:585px;
          height:108px;
        }
        &:nth-child(4){
          img:first-child{
            right:10%;
            width:646px;
            top:calc(50% - 223.5px);
            height:447px;
          }
        }
        &:nth-child(4){
          img:nth-child(2){
            top:calc(50% - 51px);
            left:10%;
            width:344px;
            height:102px;
          }
        }
        &:nth-child(5),&:nth-child(1){
          img:first-child{
            right:5%;
            width:1217px;
            top:calc(50% - 245px);
            height:490px;
          }
        }
        &:nth-child(5),&:nth-child(1){
          img:nth-child(2){
            top:calc(50% - 51px);
            left:10%;
            width:670px;
            height:102px;
          }
        }
      }
    }
    &.horizontal {
      flex-direction: row;
      .swiper-pagination .swiper-pagination-bullet{
        margin: 0 3px;
      }
    }
    &.vertical {
      flex-direction: column;
      .swiper-pagination {
        right: 10px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        .swiper-pagination-bullet{
          margin: 6px 0;
        }
      }
    }
    &.vertical,&.horizontal{
      .swiper-pagination {
        bottom: 80px;
        width: 100%;
        text-align: center;
      }
    }
    .swiper-pagination {
      position: absolute;
      .swiper-pagination-bullet {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #000000;
        opacity: .2;
        transition: all .5s ease;
        cursor: pointer;
        &.active {
          background: #fff;
          opacity: 1;
        }
      }
    }
  }
</style>
