<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
// import { Viewer,Ion } from 'cesium';
import * as Cesium from 'cesium';

onMounted(async () => {
  // Grant CesiumJS access to your ion assets
  // Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMjc4ZmNkMy0zOGQ3LTQ2YzgtYjUxOS02MTNjM2E1ODBiNTkiLCJpZCI6MjQ3MjA3LCJpYXQiOjE3Mjg1NzMzMzh9.y0BpqJMjy-ZEMkTvSQrNPK4NwW8odENCklcm33kX3RI";

  // 初始化Cesium Viewer并将背景设置为黑色
  const viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1),
    // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    //   url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark', // 使用深色背景地图
    //   layer: 'alidade_smooth_dark',
    //   style: 'default',
    //   format: 'image/png',
    //   tileMatrixSetID: 'GoogleMapsCompatible',
    //   maximumLevel: 19
    // }),
    // baseLayerPicker: false, // 隐藏地图图层选择器
  });

  // 设置黑色背景
  viewer.scene.backgroundColor = Cesium.Color.BLACK;
  viewer.scene.globe.baseColor = Cesium.Color.BLACK;

  // 确保深度检测开启
  viewer.scene.globe.depthTestAgainstTerrain = true;

  // 加载3D Tiles建筑物模型
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
  viewer.scene.primitives.add(tileset);

  // 将建筑物颜色改为暗色系
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: "color('white', 0.7)" // 将建筑物变成半透明黑色
  });

  // 设置初始视角到苏州工业园区的大裤衩附近
  const initialPosition = Cesium.Cartesian3.fromDegrees(120.67473, 31.29948, 1500);
  const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(0, -30, 0);
  viewer.scene.camera.setView({
    destination: initialPosition,
    orientation: initialOrientation
  });



})

</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
