<template>
  <div class="position-absolute z-1 bg-primary bg-opacity-25 h-93 min-w-100 d-flex align-items-center justify-content-center">
    <span class="loader"></span>
  </div>
</template>
<style scoped>
.h-93 {
  min-height: 93vh;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid;
  border-color: white transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>