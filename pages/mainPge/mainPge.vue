<template>
    <div>
        <div class="bg">
            <div class="bgImg"></div>
        </div>
     </div>   
</template>

<script>
export default {
};
</script>

<style lang="scss">
.bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
}

.bgImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 160%;
    height: 70%;
    border-radius: 0 0 100% 0;
    background: linear-gradient(110.06deg, #FEFDF0 1.6%, #C5DFFE 72.87%, #E8D4FF 92.97%);
    transform-origin: top left;
    transform: scaleY(0.5);
}


</style>    