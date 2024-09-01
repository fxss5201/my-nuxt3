<template>
  <div>
    <h1>首页</h1>
    <ClientOnly>
      <el-button @click="ElMessage('hello')">button</el-button>
      <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
      <LazyElButton type="warning">lazy button</LazyElButton>
    </ClientOnly>
  </div>
</template>
