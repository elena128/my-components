<template>
  <div class="scroll_list" :style="{'transform': 'translate3d(0, ' + translateVal + 'px, 0)'}" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="list_box">
      <slot></slot>
    </div>
    <div v-if="isMoved || loading" :class="showIcon + ' loading'">
      <div class="loading_arrow"></div>
    </div>
  </div>
</template>

<script>
  function scrollY () {
    return window.pageYOffset || window.document.documentElement.scrollTop
  }
  export default {
    props: {
      refresh: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      more: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        translateVal: 0,
        firstTouchY: 0,
        isMoved: false,
        showIcon: '',
        triggerDistance: 100,
        isTop: false,
        isBottom: false
      }
    },
    methods: {
      touchStart (ev) {
        if (!this.more && !this.refresh) return
        this.translateVal = 0
        this.firstTouchY = parseInt(ev.changedTouches[0].clientY)
        this.isTop = scrollY() <= 0
        this.isBottom = scrollY() >= (document.body.scrollHeight - document.documentElement.clientHeight)
      },
      touchMove (ev) {
        if (!this.isBottom && !this.isTop) return
        const changeY = parseInt(ev.changedTouches[0].clientY) - this.firstTouchY
        if ((changeY < 0 && this.more) || (changeY > 0 && this.refresh)) {
          this.showIcon = changeY < 0 ? 'refresh_pull_up' : 'refresh_pull_down'
          this.translateVal = changeY < 0 ? -Math.pow(-changeY, 0.85) : Math.pow(changeY, 0.85)
          this.isMoved = true
        }
      },
      touchEnd (ev) {
        if ((!this.isBottom && !this.isTop) || !this.isMoved || (!this.more && !this.refresh)) return
        if (this.translateVal < 0) {
          this.translateVal = -60
          this.$emit('loadMore')
        } else if (this.translateVal >= this.triggerDistance) {
          this.translateVal = 60
          this.$emit('refresh')
        }
        this.showIcon += ' refreshing'
        this.isMoved = false
      },
      scrollY () {
        return window.pageYOffset || window.document.documentElement.scrollTop
      }
    },
    watch: {
      loading: function () {
        if (!this.loading) {
          this.translateVal = 0
          this.showIcon = ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes rotate {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
  .scroll_list{
    position: relative;
    width: 100%;
    transition: all .5s cubic-bezier(0, 1, 1, 1);
    .loading {
      width: 100%;
      height: 45px;
      position: absolute;
      left: 0;
      .loading_arrow {
        width: 20px;
        height: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -10px;
        margin-top: -10px;
        background: no-repeat center;
        background-image: url('data:image/svg+xml;charset=utf-8,<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M99.225 3.528c8.34 0 15.104 6.763 15.104 15.105 0 8.34-6.766 15.105-15.105 15.105-8.342 0-15.105-6.763-15.105-15.105S90.883 3.528 99.225 3.528zM76.567 48.843h45.315c4.17 0 7.552 3.38 7.552 7.552v5.035c0 4.172-3.382 7.552-7.552 7.552H76.567c-4.172 0-7.553-3.38-7.553-7.552v-5.035c0-4.172 3.38-7.552 7.553-7.552zm-10.07 35.245h65.455c4.17 0 7.552 3.38 7.552 7.552v5.035c0 4.172-3.382 7.552-7.552 7.552H66.497c-4.172 0-7.553-3.38-7.553-7.552V91.64c0-4.172 3.38-7.552 7.553-7.552zm8.044 87.596c-20.397-23.16-45.805-52.352-45.805-52.352h140.98s-25.146 28.735-45.4 51.884c-33.454 38.234-18.118 36.4-49.774.468z" fill="#707070" class="transform-group"/></svg>');
        background-size: 20px  20px;
        z-index: 10;
        transform: rotate(0deg);
        transition-duration: 300ms;
      }
      &.refresh_pull_down {
        top: -45px;
        .loading_arrow {
          transform: rotate(0deg);
        }
      }
      &.refresh_pull_up {
        bottom: -45px;
        .loading_arrow {
          transform: rotate(0deg);
        }
      }
      &.refreshing {
        .loading_arrow {
          background-image: url('data:image/svg+xml;charset=utf-8,<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="M99.917.167C45.52.167 1.28 43.642.03 97.737c1.153-47.204 37.045-85.08 81.153-85.08 44.834 0 81.184 39.147 81.184 87.426 0 10.346 8.387 18.738 18.733 18.738 10.342 0 18.733-8.39 18.733-18.737C199.833 44.9 155.1.167 99.917.167zm0 199.833c54.395 0 98.637-43.475 99.883-97.57-1.15 47.2-37.042 85.082-81.15 85.082-44.833 0-81.183-39.15-81.183-87.43 0-10.34-8.392-18.732-18.738-18.732C8.39 81.35 0 89.737 0 100.083 0 155.267 44.733 200 99.917 200z" fill="#707070" class="transform-group"/></svg>');
          animation: rotate 1s 0s linear infinite;
        }
      }
    }
  }
</style>
