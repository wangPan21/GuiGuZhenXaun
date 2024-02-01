<template>
  <div class="container">
    <!-- 内容展示区域 -->
    <div class="screen" ref="screen">

      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="Tourist"></Tourist>
          <Sex class="Sex"></Sex>
          <Age class="Age"></Age>
        </div>
        <div class="center">
          <item class="config"></item>
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <number class="number"></number>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Top from './components/top/index.vue';
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import item from './components/item/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import number from './components/number/index.vue'

let screen = ref()


//组件挂载
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

//定义大屏,缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh
}

//监听视口的变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`

}

</script>
<script lang="ts">
export default {
  name: 'screen',
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images//bg.png) no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;

        .rank {
          width: 100%;
          flex: 1.5;
        }

        .year {
          width: 100%;
          flex: 1.5;

        }

        .number {
          width: 100%;
          flex: 1;

        }
      }

      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;

        .Tourist {
          flex: 1.5;
        }

        .Sex {
          flex: 1.5;
        }

        .Age {
          flex: 1;
        }
      }

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        margin: 30px 20px 0;

        .config {
          width: 100%;
          height: 10%;
        }

        .map {
          flex: 3;
          width: 100%;
        }

        .line {
          flex: 1;
          width: 100%;
        }
      }
    }
  }
}
</style>
