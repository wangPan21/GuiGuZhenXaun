<template>
    <div class="box">
        <div class="right">
            <div class="imgs">
                平台高峰预警信息(2条)
            </div>
        </div>
        <div class="left">
            <p class="title">景区实时客流量</p>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.box {
    width: '100%';
    display: flex;
    flex-direction: column;

    // background-color: #fff;
    .left {
        flex: 1;

        .title {
            color: #fff;
            line-height: 40px;
            width: 300px;
            height: 40px;
            font-size: 18px;
            padding-left: 30px;
            background: url(../../images/map-title-bg.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .right {
        flex: 2;
        width: 100%;
        display: flex;
        justify-content: center;

        .imgs {
            width: 70%;
            height: 50px;
            color: #fff;
            text-align: center;
            line-height: 50px;
            background: url(../../images/dataScreen-header-warn-bg.png)no-repeat;
            background-size: 100% 100%;
            // background-color: #fff;
        }
    }
}</style>