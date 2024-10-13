<template>
    <div id="cesiumContainer"></div>
    <button id="startAnimationButton" @click="toggleAnimation">{{ isPaused ? '继续动画' : '暂停动画' }}</button>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as Cesium from 'cesium';

// 定义航线的视角数组，每段飞行的时间（单位：秒）
const flightPath = ref([
    [120.685362, 31.320238, 1191.32, 259.48, -54.28, 0.00, 1],
    [120.678636, 31.319388, 245.08, 259.96, -21.48, 0.00, 3],
    [120.666342, 31.317554, 93.84, 263.41, -21.99, 0.00, 3],
    [120.660931, 31.312462, 155.03, 35.33, -24.74, 0.00, 3],
    [120.665106, 31.313974, 82.81, 349.97, -18.73, 0.00, 3],
    [120.682508, 31.310557, 496.76, 320.34, -19.98, 0.00, 3],
    [120.687852, 31.321756, 598.69, 262.76, -25.74, 0.00, 3],
]);

// Cesium viewer 的引用
const viewer = ref(null);
let isPaused = ref(false); // 控制动画暂停和恢复的标志
let animationFrameId = null;
let currentIndex = ref(0); // 当前视角索引

// 初始化 Cesium Viewer
onMounted(async () => {
    viewer.value = new Cesium.Viewer('cesiumContainer', {
        terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(1),
    });

    // 设置黑色背景
    viewer.value.scene.backgroundColor = Cesium.Color.BLACK;
    viewer.value.scene.globe.baseColor = Cesium.Color.BLACK;

    // 确保深度检测开启
    viewer.value.scene.globe.depthTestAgainstTerrain = true;

    // 加载3D Tiles建筑物模型
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(96188);
    viewer.value.scene.primitives.add(tileset);

    // 将建筑物颜色改为半透明白色
    tileset.style = new Cesium.Cesium3DTileStyle({
        color: "color('white', 0.7)"
    });

    // 设置初始视角
    let first_view = flightPath.value[0];
    viewer.value.scene.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(first_view[0], first_view[1], first_view[2]),
        orientation: new Cesium.HeadingPitchRoll.fromDegrees(first_view[3], first_view[4], first_view[5])
    });

    // 开始循环动画
    startAnimationLoop();
});

// 开始循环动画
const startAnimationLoop = () => {
    // 如果动画已经暂停，不继续播放
    if (isPaused.value) return;

    // 飞到下一个视角点
    flyToDestination(flightPath.value[currentIndex.value]).then(() => {
        // 更新索引，确保循环播放
        currentIndex.value = (currentIndex.value + 1) % flightPath.value.length;

        // 使用 requestAnimationFrame 递归调用以继续动画
        animationFrameId = requestAnimationFrame(startAnimationLoop);
    });
};

// 飞行到目标视角点
const flyToDestination = async (view) => {
    return new Promise(resolve => {
        viewer.value.scene.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
                view[0],
                view[1],
                view[2],
            ),
            orientation: {
                heading: Cesium.Math.toRadians(view[3]),
                pitch: Cesium.Math.toRadians(view[4]),
                roll: Cesium.Math.toRadians(view[5]),
            },
            duration: view[6], // 设置飞行时间
            maximumHeight: 50, // 控制最大高度
            easingFunction: Cesium.EasingFunction.LINEAR_NONE, // 设置缓动函数
            // easingFunction: Cesium.EasingFunction.SINUSOIDAL_IN_OUT, // 设置缓动函数
            complete: resolve, // 完成时解析 Promise
        });
    });
};

// 切换动画的暂停和恢复
const toggleAnimation = () => {
    if (isPaused.value) {
        // 如果处于暂停状态，恢复动画
        isPaused.value = false;
        startAnimationLoop(); // 恢复动画播放
    } else {
        // 暂停动画
        isPaused.value = true;
        cancelAnimationFrame(animationFrameId); // 停止动画循环
    }
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