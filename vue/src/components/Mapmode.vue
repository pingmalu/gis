<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
// import { Viewer,Ion } from 'cesium';
import * as Cesium from 'cesium';

onMounted(() => {
  // Ion.defaultAccessToken = ''
  const viewer = new Cesium.Viewer('cesiumContainer', {
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
  });


  // 初始化无人机位置（以某个坐标为起点，例如苏州）
  let initialLongitude = 120.5855;
  let initialLatitude = 31.2980;
  const position = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude, 200);
  // console.log(position);

  // 创建无人机实体，使用 PNG 图片作为标识
  const droneEntity = viewer.entities.add({
    name: '无人机',
    position: position,
    billboard: {
      image: './public/aircraft.png', // 替换为您的PNG文件路径
      width: 130, // 图像宽度
      height: 130 // 图像高度
    }
  });

  // 保持相机视角跟踪实体
  var droneposition = droneEntity.position.getValue(Cesium.JulianDate.now());
  var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(droneposition);

  // 计算相机的位置，并确保实体在中心(计算视角偏移)
  var destination = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude - 0.00009, cartographic.height + 500);

  viewer.camera.setView({
    destination: destination,
    orientation: {
      heading: Cesium.Math.toRadians(0), // 水平角度
      pitch: Cesium.Math.toRadians(-40),  // 垂直角度
      roll: 0.0  // 翻滚角度
    }
  });

  // 相机会自动保持追踪该实体，并始终将其放在屏幕中心
  // viewer.trackedEntity = droneEntity;

})

</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
