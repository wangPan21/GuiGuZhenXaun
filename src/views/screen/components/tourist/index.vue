<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="text">可预约总量<span>9999</span>人</p>
    </div>
    <div class="center">
      <span v-for="(item, index) in people" :key="index" class="num">
        {{ item }}
      </span>
    </div>

    <!-- eacharts展示图形 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
import 'echarts-liquidfill'

let people = ref('2199023人')

let charts = ref()

const rate = 0.60

//组件挂载完毕
onMounted(() => {
  //获取echarts类的实例
  let mycharts = echarts.init(charts.value)
  let option = {
    // backgroundColor: '#081736',
    polar: {
      radius: ['75%', '80%'],
      center: ['50%', '50%'],
    },
    angleAxis: {
      max: 100,
      clockwise: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      { // 水波球
        // value: 50, //  内容 配合formatter
        type: 'liquidFill',
        name: '预估量',
        radius: '70%', // 控制中间圆球的尺寸（此处可以理解为距离外圈圆的距离控制）
        center: ['50%', '50%'],
        data: [
          rate,
          rate,
          rate
        ], // data个数代表波浪数
        backgroundStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
              offset: 0,
              color: 'transparent' // 0% 处的颜色
            }, {
              offset: 0.5,
              color: 'transparent' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#29fcff' // 100% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        },
        amplitude: '6%', //波浪的振幅
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 1,
                color: '#11fbf3',
              },
              {
                offset: 0,
                color: '#41e8d1',
              },
            ],
            globalCoord: false,
          },
        ],
        label: {
          formatter: '{a}',
          fontSize: 24,
          color: '#fff',
        },
        outline: {
          borderDistance: 2,
          itemStyle: {
            borderWidth: 0,
            borderColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(69, 73, 240, 0)'
              }, {
                offset: 1,
                color: 'rgba(69, 73, 240, 1)'
              }],
              // globalCoord: false
            },
            shadowBlur: 30,
            shadowColor: 'red',
          }
        },
      },
      { // 外层虚线环
        type: 'pie',
        zlevel: 0,
        silent: true,
        radius: ['76%', '78%'],
        z: 1,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: Pie(),
      },
      { // 进度条环
        name: '',
        type: 'bar',
        roundCap: true,
        z: 2,
        showBackground: false,
        data: [rate * 100],
        rotate: 95,
        label: {
        },
        coordinateSystem: 'polar',
        // rotate:-90,
        barWidth: 50, //大的占比环
        itemStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: '#19A4BB',
            },
            {
              offset: 1,
              color: '#22C7DA',
            },
          ]),
        },
      },
    ],
  }
  mycharts.setOption(option)
})

const Pie = () => { // 外层虚线圈数据
  let dataArr = [];
  for (var i = 0; i < 150; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 50,
        itemStyle: {
          color: '#19A4BB',
          borderWidth: 10,
          borderColor: 'rgba(0,0,0,0)',
        },
      });
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 100,
        itemStyle: {
          color: 'rgba(0,0,0,0)',
          borderWidth: 10,
          borderColor: 'rgba(0,0,0,0)',
        },
      });
    }
  }
  return dataArr;
}
</script>

<style lang="scss" scoped>
.box {
  margin-top: 10px;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;

  .top {

    .title {
      font-size: 20px;
      margin-top: 20px;
      color: #fff;
    }

    .bg {
      width: 68px;
      height: 7px;
      margin-top: 10px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;

    }

    .text {
      float: right;
      font-size: 20px;
      color: #fff;
      margin: 15px 10px 0 0;

      span {
        color: yellowgreen;
      }
    }
  }

  .center {
    width: 100%;
    display: flex;
    margin-top: 30px;
    padding: 20px;

    .num {
      flex: 1;
      color: #fff;
      height: 50px;
      font-size: 30px;
      text-align: center;
      line-height: 50px;
      color: #29fcff;
      margin: 0 3px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;

    }
  }

  .charts {
    width: 100%;
    height: 260px;
    // background-color: #fff;
  }
}
</style>