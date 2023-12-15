<template>
    <div>
        <svg :style="{width,height}">
            <use :xlink:href="prefix+name" :fill="color"></use>
        </svg>
    </div>
</template>

<script lang="ts" setup>
//接收父组件传递过来的参数
defineProps({
    //xlink：href属性值
    prefix:{
        type:String,
        default:'#icon-',
    },
    //提供使用图标
    name:String,
    //接受父组件传递的颜色
    color:{
        type:String,
        default:''
    },
    //接受父组件传递图标的宽度
    width:{
        type:String,
        default:'16px'
    },
    //接受父组件传递图标的高度
    height:{
        type:String,
        default:'16px'
    },
})
</script>

<style lang="scss" scoped></style>