p 52


//点击全屏图标的方法
const fullScreen = () => {
    //DOM对象的一个属性，判断当前窗口是否为全屏，是为true，反之
    let full = document.fullscreenElement;
    //切换为全屏
    if (!full) { 
        //文档根节点方法 requestFullscreen ，实现全屏模式
        document.documentElement.requestFullscreen();
    } else {
        // 当前窗口为全屏，则退出全屏模式
        document.exitFullscreen();
    }
}