<template>
    <div id="cesiumContainer"></div>
    <button id="startAnimationButton" @click="startAnimation">开始动画</button>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';

// 定义航线的视角数组，每段飞行的时间（单位：秒）
const flightPath = ref([
    {
        longitude: 120.67473,
        latitude: 31.29948,
        height: 1500,
        heading: 0,
        pitch: -30,
        roll: 0,
        duration: 1, // 飞行时间为3秒
    },
    {
        longitude: 120.67950,
        latitude: 31.29580,
        height: 1300,
        heading: 45,
        pitch: -25,
        roll: 0,
        duration: 1, // 飞行时间为4秒
    },
    {
        longitude: 120.68400,
        latitude: 31.29000,
        height: 1000,
        heading: 90,
        pitch: -20,
        roll: 0,
        duration: 1, // 飞行时间为5秒
    },
    // 可以继续添加更多航线视角
]);

// Cesium viewer 的引用
const viewer = ref(null);

// 初始化 Cesium Viewer
onMounted(async () => {
    viewer.value = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1),
    });

    // 设置初始视角
    viewer.value.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(120.67473, 31.29948, 1500),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-30),
            roll: Cesium.Math.toRadians(0),
        },
    });
});

// 开始动画函数
const startAnimation = async () => {
    for (let i = 0; i < flightPath.value.length; i++) {
        const currentView = flightPath.value[i];
        const destination = Cesium.Cartesian3.fromDegrees(
            currentView.longitude,
            currentView.latitude,
            currentView.height
        );

        // 飞到下一个视角点
        await flyToDestination(destination, currentView);
    }
};

// 飞行到目标视角点
const flyToDestination = async (destination, view) => {
    return new Promise(resolve => {
        viewer.value.scene.camera.flyTo({
            destination: destination,
            orientation: {
                heading: Cesium.Math.toRadians(view.heading),
                pitch: Cesium.Math.toRadians(view.pitch),
                roll: Cesium.Math.toRadians(view.roll),
            },
            duration: view.duration, // 设置飞行时间
            complete: resolve, // 完成时解析 Promise
        });
    });
};
</script>

<style scoped>
#cesiumContainer {
    width: 100%;
    height: 100vh;
}

#startAnimationButton {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#startAnimationButton:hover {
    background-color: #0056b3;
}
</style>