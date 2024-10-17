<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';

const viewer = ref(null);
const droneEntity = ref(null);
const speed = 0.0000001; // 每帧移动的速度，调节这个值可以改变移动速度

onMounted(async () => {
  viewer.value = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1),
  });

  droneEntity.value = viewer.value.entities.add({
    position: Cesium.Cartesian3.fromDegrees(120.67473, 31.29948, 50),
    billboard: {
      image: './aircraft.png', // 替换为您的PNG文件路径
      width: 130, // 图像宽度
      height: 130 // 图像高度
    }
  });

  viewer.value.trackedEntity = droneEntity.value;

  // 用于保存当前方向
  const direction = {
    x: 0,
    y: 0,
  };

  // 监听键盘事件
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'w') {
      direction.y = speed;
    } else if (keyName === 's') {
      direction.y = -speed;
    } else if (keyName === 'a') {
      direction.x = -speed;
    } else if (keyName === 'd') {
      direction.x = speed;
    }
  });

  document.addEventListener('keyup', (event) => {
    const keyName = event.key;

    if (keyName === 'w' || keyName === 's') {
      direction.y = 0;
    } else if (keyName === 'a' || keyName === 'd') {
      direction.x = 0;
    }
  });

  viewer.value.scene.preRender.addEventListener(() => {
    const oldPosition = droneEntity.value.position.getValue(viewer.value.clock.currentTime);
    const cartographic = Cesium.Cartographic.fromCartesian(oldPosition);
    const newLongitude = cartographic.longitude + direction.x;
    const newLatitude = cartographic.latitude + direction.y;

    droneEntity.value.position = Cesium.Cartesian3.fromRadians(newLongitude, newLatitude, cartographic.height);
  });
});
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
}
</style>
