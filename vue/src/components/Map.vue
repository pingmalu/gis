<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Viewer,Ion } from 'cesium';
// import * as Cesium from 'cesium';

onMounted(() => {
  // Ion.defaultAccessToken = ''
  const viewer = new Viewer('cesiumContainer',{
    timeline: false, // 关闭时间轴
    animation: false, // 关闭动画效果
    baseLayerPicker: false, // 关闭底图切换按钮
    fullscreenButton: false, // 关闭全屏按钮
    baseLayerPicker: false, // 关闭底图切换按钮
    geocoder: false, // 关闭地理编码器
    homeButton: false, // 关闭默认的地图导航按钮
    infoBox: false, // 关闭默认的信息框
    sceneModePicker: false, // 关闭场景模式切换按钮
    navigationHelpButton: false, // 关闭帮助按钮
    navigationInstructionsInitiallyVisible: false, // 隐藏默认的导航提示
    // scene3DOnly: true, // 仅3D视图
    // clock: new Cesium.Clock(), // 开启时钟
    // terrainProvider: Cesium.createWorldTerrain(), // 开启地形
    // imageryProvider: Cesium.createOpenStreetMapImageryProvider(), // 开启影像
    // skyBox: new Cesium.SkyBox({
    //   sources: {
    //     positiveX: 'https://assets.cesium.com/1.82/skybox/Skybox2048.jpg',
    //     negativeX: 'https://assets.cesium.com/1.82/skybox/Skybox2048.jpg',
    //     positiveY: 'https://assets.cesium.com/1.82/skybox/Skybox2048.jpg',
    //     negativeY: 'https://assets.cesium.com/1.82/skybox/Skybox2048.jpg',
    //     positiveZ: 'https://assets.cesium.com/1.82/skybox/Skybox2048.jpg',
    //     negativeZ: 'https://assets.cesium.com/1.82/skybox/Skybox2048.jpg',
    //   },
    // }),  
  });
})


// export default {
//   name: 'Map',
//   setup() {
//     const viewer = ref(null);

//     return {
//       viewer,
//     };
//   },
//   mounted() {
//     this.viewer = new Viewer(this.$el);
//   },
// };
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}

</style>
