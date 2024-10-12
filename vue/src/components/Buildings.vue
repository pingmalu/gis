<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
// import { Viewer,Ion } from 'cesium';
import * as Cesium from 'cesium';

onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMjc4ZmNkMy0zOGQ3LTQ2YzgtYjUxOS02MTNjM2E1ODBiNTkiLCJpZCI6MjQ3MjA3LCJpYXQiOjE3Mjg1NzMzMzh9.y0BpqJMjy-ZEMkTvSQrNPK4NwW8odENCklcm33kX3RI'
  // 创建 Cesium Viewer
  var viewer = new Cesium.Viewer('cesiumContainer');

  // 加载 3D Tiles
  var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles'
  }));

  // 相机飞到 3D Tiles 的位置
  tileset.readyPromise.then(function () {
    viewer.camera.flyTo({
      destination: tileset.boundingSphere.center,
      orientation: {
        heading: 0.0,
        pitch: Cesium.Math.toRadians(-30),
        roll: 0.0
      }
    });
  });


})

</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
