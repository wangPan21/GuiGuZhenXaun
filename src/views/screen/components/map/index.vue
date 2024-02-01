<template>
    <div class="box" ref="map"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
import chinaJson from './china.json'
let map = ref()

echarts.registerMap('china', chinaJson as any)

onMounted(() => {
    let mychart = echarts.init(map.value);
    mychart.setOption({
        geo: {
            map: 'china',
            roam: true,
            layoutCenter: ["50%", "50%"],
            zoom: 1.2,
            label: {
                show: true,
                color: '#fff',
                fontSize: 14
            },
            itemStyle: {
                normal: {
                    areaColor: '#12235c',
                    borderColor: '#2ab8ff',
                    borderWidth: .5,
                    shadowColor: 'rgba(0,54,255, 0.4)',
                    shadowBlur: 100

                },
                emphasis: {
                    areaColor: '#02102b',
                    label: {
                        color: "#fff"
                    }

                }
            },
            emphasis: {
                itemStyle: {
                    color: 'red',

                },
                label: {
                    fontsize: 40
                }
            }
        },
        grid: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        series: [
            {
                type: 'lines',
                data: [
                    {
                        coords: [
                            [108.948024, 34.263161],
                            [106.504962, 29.533155]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: 0.1,
                            opacity:0.3
                        },

                    },
                    {
                        coords: [
                            [108.948024, 34.263161],
                            [91.132212, 29.660361]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: 0.1
                        },

                    },
                    {
                        coords: [
                            [116.405285,39.904989],
                            [119.306239, 26.075302]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: -0.1
                        },

                    },
                    {
                        coords: [
                            [108.948024, 34.263161],
                            [112.549248,37.857014]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: 0.1
                        },

                    },
                    {
                        coords: [
                            [116.405285,39.904989],
                            [101.778916, 36.623178]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: -0.1
                        },

                    },
                    {
                        coords: [
                            [126.642464,45.756967],
                            [114.298572,30.584355]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: -0.1
                        },

                    },
                    {
                        coords: [
                            [87.617733,43.792818],
                            [104.065735,30.659462]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: -0.1,

                        },

                    },
                    {
                        coords: [
                            [ 113.665412,34.757975],
                            [113.280637,23.125178]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: -0.1,

                        },

                    },
                    {
                        coords: [
                            [121.472644,31.231706],
                            [ 102.712251,25.040609]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: 0.1,

                        },

                    },
                    {
                        coords: [
                            [ 102.712251,25.040609],
                            [116.405285,39.904989]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: -0.1,

                        },

                    },
                    {
                        coords: [
                            [108.948024,34.263161],
                            [ 121.509062,25.044332]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                            curveness: -0.1,

                        },

                    },
                ],
                effect: {
                    show: true,
                    symbol: 'arrow',
                    symbolSize: 10,
                    roundTrip:true
                }

            }
        ]
    })
})
</script>

<style lang="scss" scoped>
// .box{
//     // background-color: #fff;
// }
</style>