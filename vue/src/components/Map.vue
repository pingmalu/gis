<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { Viewer,Ion } from 'cesium';
import * as Cesium from 'cesium';
import { Viewer, Entity, SampledPositionProperty, Clock, JulianDate } from 'cesium';



onMounted(() => {
  // Ion.defaultAccessToken = ''
  const viewer = new Viewer('cesiumContainer', {
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
  let initialLongitude = 120.5853;
  let initialLatitude = 31.2980;
  const position = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude);
  // console.log(position);
  
  // 创建无人机实体，使用 PNG 图片作为标识
  const droneEntity = viewer.entities.add({
    name: '无人机',
    position: position,
    billboard: {
      image: './public/vite.svg', // 替换为您的PNG文件路径
      width: 32, // 图像宽度
      height: 32 // 图像高度
    }
  });

  // 设置初始视角，定位到苏州
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude, 1000), // 1000为高度，可以根据需要调整
  });

  // 添加键盘事件监听器，控制无人机移动
  window.addEventListener('keydown', (event) => {
    const moveAmount = 0.00001; // 移动的距离（经纬度变化量）
    let newPosition = position;

    switch (event.key) {
      case 'ArrowUp': // 上箭头
        initialLatitude += moveAmount;
        newPosition = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude);
        break;
      case 'ArrowDown': // 下箭头
        initialLatitude -= moveAmount;
        newPosition = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude);
        break;
      case 'ArrowLeft': // 左箭头
        initialLongitude -= moveAmount;
        newPosition = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude);
        break;
      case 'ArrowRight': // 右箭头
        initialLongitude += moveAmount;
        newPosition = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude);
        break;
    }

    // 更新无人机的位置
    droneEntity.position = newPosition;

    // 确保相机跟随无人机
    viewer.camera.lookAt(newPosition, new Cesium.Cartesian3(0, 0, 1000)); // 相机高度设定为100米，可以根据需要进行调整
  });

})

</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
