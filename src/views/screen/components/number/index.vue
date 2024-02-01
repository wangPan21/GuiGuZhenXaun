<template>
  <div class="box">
    <div class="top">
      <p class="title">预约渠道数据统计</p>
      <p class="imgs"></p>
    </div>
    <div class="echarts" ref="number"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'

let number = ref()

var data:any = [];
var color = ['#00ffff', '#409B5C', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];

onMounted(() => {  
  let mycharts = echarts.init(number.value);  
  var seriesOption = [
    {
        name: '',
        type: 'pie',
        clockWise: false,
        radius: ['85%', '86%'],
        hoverAnimation: false,
        label:{
          normal:{
            show:false
          }
        },
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'outside',
                    color: '#ddd',
                    formatter: function (params:any) {
                        let percent:number = 0;
                        var total = 0;
                        for (var i = 0; i < trafficWay.length; i++) {
                            total += trafficWay[i].value;
                        }
                        //@ts-ignore
                        percent= ((params.value / total) * 100).toFixed(0);
                        if (params.name !== '') {
                            return '设备状态：' + params.name + '\n' + '\n' + '占百分比：' + percent + '%';
                        } else {
                            return '';
                        }
                    },
                },
                labelLine: {
                  show:false,
                },
            },
        },
        data: data as any,
    },
    {
        name: '',
        type: 'pie',
        clockWise: true,
        radius: ['65%', '66%'],
        label:{
          normal:{
            show:false
          }
        },
        hoverAnimation: false,
        itemStyle: {
            normal: {
                label: {
                    show: false,
                    position: 'outside',
                    color: '#ddd',
                },
                labelLine: {
                    show: false,
                },
            },
        },
        data: datas,
    },
];
let option = {
    // backgroundColor: '#0A2E5D',
    color: color,
    legend: {
        icon: 'circle',
        orient: 'vertical',
        // x: 'left',
        data: ['微信小程序', '美团', '大众点评', '公众号'],
        left: 20,
        top: 20,
        align: 'right',
        textStyle: {
            color: '#fff',

        },
        itemGap: 10,
    },
    grid:{
      top:0,
      right:0,
      bottom:0,
      left:300
    },
    series: seriesOption,
};
  mycharts.setOption(option);  
})

var trafficWay = [
    {
        name: '微信小程序',
        value: 14294,
    },
    {
        name: '美团',
        value: 314,
    },
    {
        name: '大众点评',
        value: 5137,
    },
    {
        name: '公众号',
        value: 245,
    },
];


for (var i = 0; i < trafficWay.length; i++) {
    data.push(
        {
            value: trafficWay[i].value,
            name: trafficWay[i].name,
            itemStyle: {
                normal: {
                    borderWidth: 5,
                    shadowBlur: 20,
                    borderColor: color[i],
                    shadowColor: color[i],
                },
            },
        },
        {
            value: 2,
            name: '',
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false,
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0,
                },
            },
        }
    );
}
var scaleData = [20, 20, 27, 23];

var placeHolderStyle = {
    normal: {
        label: {
            show: false,
        },
        labelLine: {
            show: false,
        },
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0,
    },
};
var datas:any = [];
for (var i = 0; i < scaleData.length; i++) {
    datas.push(
        {
            value: scaleData[i],
            itemStyle: {
                normal: {
                    borderWidth: 5,
                    shadowBlur: 30,
                    borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        {
                            offset: 0,
                            color: '#F3C004',
                        },
                        {
                            offset: 1,
                            color: '#F3C004',
                        },
                    ]),
                    shadowColor: 'rgba(142, 152, 241, 0.6)',
                },
            },
        },
        {
            value: 4,
            itemStyle: placeHolderStyle,
        }
    );
}

</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background: url(../../images/dataScreen-main-rb.png) no-repeat;
  background-size: 100% 100%;

  .top {
    width: 100%;
    margin-bottom: 12px;

    .title {
      font-size: 20px;
      color: #fff;
    }

    .imgs {
      width: 68px;
      height: 7px;
      margin-top: 10px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;

    }
  }

  .echarts {
    width: 100%;
    height: 100%;
    // background-color: #fff;
  }
}
</style>