<template>
  <div>
    <el-config-provider :locale="zhCn">
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
