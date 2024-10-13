<template>
  <div id="cesiumContainer"></div>
  <!-- 添加获取视角信息的按钮 -->
  <button id="getLocationButton" @click="showCameraInfo">获取视角信息</button>

  <!-- 弹窗，用于显示获取到的相机信息 -->
  <div id="infoWindow" v-if="showInfoWindow">
    <p><strong>当前视角信息:</strong></p>
    <p><strong>经度:</strong> {{ cameraInfo.longitude.toFixed(6) }}</p>
    <p><strong>纬度:</strong> {{ cameraInfo.latitude.toFixed(6) }}</p>
    <p><strong>高度:</strong> {{ cameraInfo.height.toFixed(2) }} 米</p>
    <p><strong>航向:</strong> {{ cameraInfo.heading.toFixed(2) }}°</p>
    <p><strong>俯仰:</strong> {{ cameraInfo.pitch.toFixed(2) }}°</p>
    <p><strong>横滚:</strong> {{ cameraInfo.roll.toFixed(2) }}°</p>
    <!-- 复制到剪贴板的按钮 -->
    <button @click="copyToClipboard_arr" class="btn-primary">复制到剪贴板</button>
    <button @click="showInfoWindow = false">关闭</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';

// 定义状态变量来控制弹窗显示
const showInfoWindow = ref(false);
const cameraInfo = ref({
  longitude: 0,
  latitude: 0,
  height: 0,
  heading: 0,
  pitch: 0,
  roll: 0
});

let viewer;

// 当组件挂载时初始化 Cesium Viewer
onMounted(async () => {
  // 初始化Cesium Viewer并将背景设置为黑色
  viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1),
  });

  // 设置黑色背景
  viewer.scene.backgroundColor = Cesium.Color.BLACK;
  viewer.scene.globe.baseColor = Cesium.Color.BLACK;

  // 确保深度检测开启
  viewer.scene.globe.depthTestAgainstTerrain = true;

  // 加载3D Tiles建筑物模型
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
  viewer.scene.primitives.add(tileset);

  // 将建筑物颜色改为半透明白色
  tileset.style = new Cesium.Cesium3DTileStyle({
    color: "color('white', 0.7)"
  });

  // 设置初始视角到苏州工业园区的大裤衩附近
  const initialPosition = Cesium.Cartesian3.fromDegrees(120.67473, 31.29948, 1500);
  const initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(0, -30, 0);
  viewer.scene.camera.setView({
    destination: initialPosition,
    orientation: initialOrientation
  });
});

// 获取相机的经纬度和方向信息
const showCameraInfo = () => {
  if (!viewer) return;

  const camera = viewer.scene.camera;
  const position = camera.positionCartographic;  // 获取相机的地理位置 (Cartographic)

  // 更新相机信息
  cameraInfo.value.longitude = Cesium.Math.toDegrees(position.longitude); // 经度
  cameraInfo.value.latitude = Cesium.Math.toDegrees(position.latitude);  // 纬度
  cameraInfo.value.height = position.height;  // 高度
  cameraInfo.value.heading = Cesium.Math.toDegrees(camera.heading);  // 航向角
  cameraInfo.value.pitch = Cesium.Math.toDegrees(camera.pitch);  // 俯仰角
  cameraInfo.value.roll = Cesium.Math.toDegrees(camera.roll);  // 横滚角

  // 显示弹窗
  showInfoWindow.value = true;
};


// 复制相机信息到剪贴板
const copyToClipboard_arr = () => {
  const infoText = `[${cameraInfo.value.longitude.toFixed(6)},${cameraInfo.value.latitude.toFixed(6)},${cameraInfo.value.height.toFixed(2)},${cameraInfo.value.heading.toFixed(2)},${cameraInfo.value.pitch.toFixed(2)},${cameraInfo.value.roll.toFixed(2)},1],\n`;

  navigator.clipboard.writeText(infoText).then(() => {
    // alert('视角信息已复制到剪贴板');
  }).catch(err => {
    console.error('复制失败: ', err);
  });
};

// 复制相机信息到剪贴板
const copyToClipboard_str = () => {
  const infoText = `
    经度: ${cameraInfo.value.longitude.toFixed(6)}
    纬度: ${cameraInfo.value.latitude.toFixed(6)}
    高度: ${cameraInfo.value.height.toFixed(2)} 米
    航向: ${cameraInfo.value.heading.toFixed(2)}°
    俯仰: ${cameraInfo.value.pitch.toFixed(2)}°
    横滚: ${cameraInfo.value.roll.toFixed(2)}°
  `;

  navigator.clipboard.writeText(infoText).then(() => {
    // alert('视角信息已复制到剪贴板');
  }).catch(err => {
    console.error('复制失败: ', err);
  });
};
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100vh;
  display: block;
}

#getLocationButton {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
}

#getLocationButton:hover {
  background-color: #0056b3;
}

#infoWindow {
  position: absolute;
  top: 50px;
  left: 10px;
  padding: 15px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 100;
}

#infoWindow button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#infoWindow button:hover {
  background-color: #d32f2f;
}

#infoWindow button.btn-primary {
  background-color: #b6ec00;
  margin-right: 10px;
}
</style>
