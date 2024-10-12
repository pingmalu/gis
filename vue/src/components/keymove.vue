<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
// import { Viewer,Ion } from 'cesium';
import * as Cesium from 'cesium';
// import SuperGif from '../ex/libgif.js';

onMounted(async () => {
  // Ion.defaultAccessToken = ''
  const viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false, // 关闭时间轴
    animation: false, // 关闭动画效果
    baseLayerPicker: false, // 关闭底图切换按钮
    fullscreenButton: false, // 关闭全屏按钮
    baseLayerPicker: false, // 关闭底图切换按钮
    geocoder: false, // 关闭地理编码器
    homeButton: false, // 关闭默认的地图导航按钮
    // infoBox: false, // 关闭默认的信息框
    sceneModePicker: false, // 关闭场景模式切换按钮
    navigationHelpButton: false, // 关闭帮助按钮
    navigationInstructionsInitiallyVisible: false, // 隐藏默认的导航提示
  });

  // 加载3D Tiles建筑物模型
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
  viewer.scene.primitives.add(tileset);

  // 将建筑物颜色改为暗色系
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: "color('white', 0.7)" // 将建筑物变成半透明黑色
  });

  // 开启深度测试，防止建筑物被遮挡
  viewer.scene.globe.depthTestAgainstTerrain = true;


  // 初始化无人机位置（以某个坐标为起点，例如苏州）
  let initialLongitude = 120.67473;
  let initialLatitude = 31.31659;
  const position = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude, 200);
  // console.log(position);

  // 创建无人机实体，使用 PNG 图片作为标识
  const droneEntity = viewer.entities.add({
    name: '无人机',
    position: position,
    billboard: {
      image: './aircraft.png', // 替换为您的PNG文件路径
      width: 130, // 图像宽度
      height: 130 // 图像高度
    }
  });


  // 保持相机视角跟踪实体
  var droneposition = droneEntity.position.getValue(Cesium.JulianDate.now());
  var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(droneposition);

  // 计算相机的位置，并确保实体在中心(计算视角偏移)
  var destination = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude - 0.00009, cartographic.height + 500);

  viewer.camera.flyTo({
    destination: destination,
    orientation: {
      heading: Cesium.Math.toRadians(0), // 水平角度
      pitch: Cesium.Math.toRadians(-40),  // 垂直角度
      roll: 0.0  // 翻滚角度
    }
  });


  // 添加键盘事件监听器，控制无人机移动
  window.addEventListener('keydown', (event) => {
    const moveAmount = 0.00001; // 移动的距离（经纬度变化量）
    let newPosition = position;

    switch (event.key) {
      case 'ArrowUp': // 上箭头
        initialLatitude += moveAmount;
        newPosition = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude, 200);
        break;
      case 'ArrowDown': // 下箭头
        initialLatitude -= moveAmount;
        newPosition = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude, 200);
        break;
      case 'ArrowLeft': // 左箭头
        initialLongitude -= moveAmount;
        newPosition = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude, 200);
        break;
      case 'ArrowRight': // 右箭头
        initialLongitude += moveAmount;
        newPosition = Cesium.Cartesian3.fromDegrees(initialLongitude, initialLatitude, 200);
        break;
    }

    // 更新无人机的位置
    droneEntity.position = newPosition;

    // 确保相机跟随无人机
    // viewer.camera.lookAt(newPosition, new Cesium.Cartesian3(0, 0, 1000)); // 相机高度设定为100米，可以根据需要进行调整


    // 保持相机视角跟踪实体
    droneposition = droneEntity.position.getValue(Cesium.JulianDate.now());
    cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(droneposition);

    // 计算相机的位置，并确保实体在中心(计算视角偏移)
    destination = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude - 0.00009, cartographic.height + 500);

    viewer.camera.flyTo({
      destination: destination,
      orientation: {
        heading: Cesium.Math.toRadians(0), // 水平角度
        pitch: Cesium.Math.toRadians(-40),  // 垂直角度
        roll: 0.0  // 翻滚角度
      }
    });

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
