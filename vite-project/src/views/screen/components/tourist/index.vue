<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span>99999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <!-- 盒子将来echarts展示图形图标的节点 -->
        <div class="charts" ref="charts">123</div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
let people = ref('215908人');

//获取节点
let charts = ref();
onMounted(() => {
    //获取echarts类的实例
    let mycharts = echarts.init(charts.value);
    //设置实例的配置项
    mycharts.setOption({
        //标题组件
        title: {
            text: '游客占比',
            textStyle: {
                color: '#fff'
            }
        },
        //系列:决定你展示什么样的图形图标
        series: [{
            type: 'gauge',//仪表盘
            radius: '80%',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
                lineStyle: {
                    width: 30,
                    color: [
                        [0.6, '#58D9F9'],
                        [1, '#FF7875']
                    ]
                }
            },
            pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                length: '12%',
                width: 20,
                offsetCenter: [0, '-60%'],
                itemStyle: {
                    color: 'auto'
                }
            },
            axisTick: {
                length: 12,
                lineStyle: {
                    color: 'auto',
                    width: 2
                }
            },
            splitLine: {
                length: 20,
                lineStyle: {
                    color: 'auto',
                    width: 5
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: 12,
                distance: -60,
                formatter: function (value: any) {
                    if (value === 0 || value === 100) {
                        return value;
                    } else {
                        return '';
                    }
                }
            },
            detail: {
                fontSize: 30,
                offsetCenter: [0, '-10%'],
                valueAnimation: true,
                formatter: function (value: any) {
                    return Math.round(value) + '%';
                },
                color: 'auto'
            },
            data: [{
                value: 60,
                name: '游客占比'
            }]
        }],
        //布局组件
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }

    })
})
</script>

<style scoped lang="scss">
.box {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
        margin-left: 20px;

        .title {
            color: white;
            font-size: 20px;

        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }

        .right {
            float: right;
            color: white;
            font-size: 20px;

            span {
                color: yellowgreen;
            }
        }
    }

    .number {
        padding: 10px;
        margin-top: 30px;
        display: flex;


        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
        }
    }

    .charts {
        width: 100%;
        height: 270px;
    }
}
</style>