<template>
    <div class="box">
        <div class="top">
            <p class="title">热门景区排行</p>
            <p class="imgs"></p>
        </div>
        <div class="bottom">
            <div class="text">
                <p class="one">排名</p>
                <p class="two">景区</p>
                <p class="three">预约数量</p>
            </div>
            <div class="datas">
                <ul>
                    <li>
                        <p class="a">1</p>
                    </li>
                    <li>
                        <p class="b">2</p>
                    </li>
                    <li>
                        <p class="c">3</p>
                    </li>
                    <li>
                        <p class="d">4</p>
                    </li>
                    <li>
                        <p class="d">5</p>
                    </li>
                </ul>
                <div class="echarts" ref="progress"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'

let progress = ref()

const dataX = ['北京故宫', '万里长城', '九寨沟', '稻城亚丁', '峨眉山']
const dataPercent = ['20', '30', '45', '55', '60'];
const dataSum = new Array(dataX.length).fill(100);


onMounted(() => {
    let mycharts = echarts.init(progress.value)
    let myColor = ['#3C83FF'];
    let option = {
        grid: { // 直角坐标系内绘图网格
            left: '25%', //grid 组件离容器左侧的距离,
            right: '20%',
            top: 0,
            bottom: 0
        },
        xAxis: { //直角坐标系grid中的x轴,
            //一般情况下单个grid组件最多只能放上下两个x轴,
            //多于两个x轴需要通过配置offset属性防止同个位置多个x轴的重叠。
            type: 'value', //坐标轴类型,分别有：
            //'value'-数值轴；'category'-类目轴;
            //'time'-时间轴;'log'-对数轴
            splitLine: {
                show: false
            }, //坐标轴在 grid 区域中的分隔线
            axisLabel: {
                show: false
            }, //坐标轴刻度标签
            axisTick: {
                show: false
            }, //坐标轴刻度
            axisLine: {
                show: false
            }, //坐标轴轴线
        },
        yAxis: {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                color: '#fff',
                fontSize: 18,
                margin: 50,
                textStyle: {
                    align: 'center',
                    rich: {
                        a: {
                            fontSize: 14,
                            width: 100,
                        },
                        b: {
                            fontSize: 14,
                            align: 'center',
                            color: '#3C83FF',
                            fontWeight: 600,
                        },
                        c: {
                            padding: [0, 0, 0, 5],
                            fontSize: 14,
                            align: 'center',
                        }
                    }
                },
            },
            data: dataX //类目数据，在类目轴（type: 'category'）中有效。
            //如果没有设置 type，但是设置了axis.data,则认为type 是 'category'。
        },
        series: [ //系列列表。每个系列通过 type 决定自己的图表类型
            {
                name: '', //系列名称
                type: 'bar', //柱状、条形图
                barWidth: 15, //柱条的宽度,默认自适应
                data: dataPercent, //系列中数据内容数组
                barCategoryGap: '30%',
                barGap: '10%',
                label: { //图形上的文本标签
                    show: true,
                    position: 'right', //标签的位置
                    offset: [0, -40], //标签文字的偏移，此处表示向上偏移40
                    //formatter: '{c}{a}',//标签内容格式器 {a}-系列名,{b}-数据名,{c}-数据值
                    formatter: function () {
                        //.toFixed(0)去掉小数位，如果为2就是保留两位小数
                        //let b = data.percent.toFixed(0) + "%";
                        //subText = b;
                        return '';
                    },
                    color: 'rgba(0,0,0,.7)', //标签字体颜色
                    fontSize: 26 //标签字号
                },
                itemStyle: { //图形样式
                    normal: { //normal 图形在默认状态下的样式;
                        //emphasis图形在高亮状态下的样式
                        barBorderRadius: 10, //柱条圆角半径,单位px.
                        //此处统一设置4个角的圆角大小;
                        //也可以分开设置[10,10,10,10]顺时针左上、右上、右下、左下
                        color: function (params: any) {
                            let num = myColor.length; //得到myColor颜色数组的长度
                            return myColor[params.dataIndex % num]; //返回颜色数组中的一个对应的颜色值
                        },
                    }
                },
                zlevel: 1 //柱状图所有图形的 zlevel 值,
                //zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
            },
            {
                name: '进度条背景',
                type: 'bar',
                label: { //图形上的文本标签
                    show: true,
                    position: 'right', //标签的位置
                    offset: [0, 0], //标签文字的偏移，此处表示向上偏移40
                    //formatter: '{c}{a}',//标签内容格式器 {a}-系列名,{b}-数据名,{c}-数据值
                    formatter: function (data: any) {
                        //.toFixed(0)去掉小数位，如果为2就是保留两位小数
                        var traceValue;
                        for (var i = 0; i < dataX.length; i++) {
                            if (data.name === dataX[i]) {
                                traceValue = dataPercent[i]
                                break
                            }
                        }
                        var arr = [
                            '{a|' + traceValue + '}',
                            '{b|%}'
                        ]
                        return arr.join('');
                    },
                    textStyle: {
                        rich: {
                            a: {
                                fontSize: 20,
                                color: '#fff',
                                fontWeight: 560,
                                padding: [0, 0, 0, 15],
                            },
                            b: {
                                fontSize: 20,
                                color: '#fff',
                                padding: [0, 0, 0, 3],
                                align: 'center',
                            },
                        }
                    },
                },
                barGap: '-100%', //不同系列的柱间距离，为百分比。
                // 在同一坐标系上，此属性会被多个 'bar' 系列共享。
                // 此属性应设置于此坐标系中最后一个 'bar' 系列上才会生效，
                //并且是对此坐标系中所有 'bar' 系列生效。
                barWidth: 15,
                data: dataSum,
                color: '#DEE0E3', //柱条颜色
                itemStyle: {
                    normal: {
                        barBorderRadius: 10
                    }
                }
            },

        ]
    };
    mycharts.setOption(option)
})

</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background: url(../../images/dataScreen-main-rt.png) no-repeat;
    background-size: 100% 100%;

    .top {
        width: 100%;
        margin-bottom: 10px;

        .title {
            font-size: 20px;
            margin-top: 10px;
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

    .bottom {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .text {
            flex: 1;
            width: 100%;
            height: 20%;
            display: flex;
            margin-left: 1%;
            background: url(../../images/rankingChart-bg.png) no-repeat;
            background-size: 97% 90%;

            .one {
                flex: 1.3;
                text-align: center;
                margin: auto;
                color: #f3af4e;
                font-size: 16px;
            }

            .two {
                flex: 1.2;
                text-align: center;
                color: #f3af4e;
                font-size: 16px;
                margin: auto;
            }

            .three {
                flex: 3;
                text-align: center;
                color: #f3af4e;
                font-size: 16px;
                margin: auto;
            }
        }

        .datas {
            flex: 5;
            width: 100%;
            height: 80%;
            display: flex;
        }

        ul {
            flex: 1;
            width: 20%;
            height: 100%;
            display: flex;
            flex-direction: column;

            li {
                width: 100%;
                height: 20%;
                text-align: center;
                color: #ccc8c8;
                font-size: 20px;
                font-weight: bolder;
                display: flex;
                justify-content: center;
                align-items: center;

                .a {
                    width: 70%;
                    height: 60px;
                    line-height: 60px;
                    background: url(../../images/three.png) no-repeat;
                    background-size: 100% 100%;
                }

                .b {
                    width: 70%;
                    height: 60px;
                    line-height: 60px;
                    background: url(../../images/one.png) no-repeat;
                    background-size: 100% 100%;
                }
                .c {
                    width: 70%;
                    height: 60px;
                    line-height: 60px;
                    background: url(../../images/two.png) no-repeat;
                    background-size: 100% 100%;
                }
            }
        }

        .echarts {
            width: 100%;
            height: 100%;
            flex: 3;
        }
    }
}
</style>