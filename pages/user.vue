<template>
  <div class="p-4">
    <h1>post</h1>
    <ClientOnly>
      <div class="my-4">
        <el-button @click="dialogVisible = true">新增</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" :border="true">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="操作" min-width="120">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleEditorClick(row)">编辑</el-button>
            <el-popconfirm title="确定删除？" @confirm="handleDeleteClick(row)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        v-model="dialogVisible"
        :title="isEditor ? '编辑' : '新增'"
        width="500"
        :before-close="dialogClose"
      >
        <el-form
          ref="dialogFormRef"
          :model="dialogForm"
          :rules="dialogFormRules"
          label-width="auto"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="dialogForm.name" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="dialogForm.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogClose">取消</el-button>
            <el-button type="primary" @click="dialogConfirm(dialogFormRef)">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { postValidatorErrorItem } from './../types/index.d.ts'

const dialogVisible = ref(false)
const isEditor = ref(false)
const curRow = ref({})
const dialogConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const flag = await addUserFn()
      flag && dialogClose()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const addUserFn = async () => {
  try {
    const user = await $fetch(isEditor.value ? `/api/user/${dialogForm.value.id}` : '/api/user', {
      method: isEditor.value ? 'PUT' : 'POST',
      body: dialogForm.value
    })
    if (user) {
      ElMessage.success('新增成功')
      await refreshNuxtData('userList')
      return true
    } else {
      return false
    }
  } catch (error: any) {
    let message = error?.data?.message || error?.message
    if (error?.data?.statusCode === 400) {
      try {
        const errorList: postValidatorErrorItem[] = JSON.parse(error?.data?.message)
        message = errorList.map(x => x.message).join('，')
      } catch (err) {}
    }
    ElMessage.error(message)
    return false
  }
  
}
const handleEditorClick = (row: FormType) => {
  isEditor.value = true
  dialogVisible.value = true
  curRow.value = row
  dialogForm.value = row
}
const handleDeleteClick = async (row: FormType) => {
  try {
    const res = await $fetch(`/api/user/${row.id}`, {
      method: 'DELETE'
    })
    if (res) {
      ElMessage.success('删除成功')
      await refreshNuxtData('userList')
    } else {
      ElMessage.error('删除失败')
    } 
  } catch (error: any) {
    let message = error?.data?.message || error?.message
    if (error?.data?.statusCode === 400) {
      try {
        const errorList: postValidatorErrorItem[] = JSON.parse(error?.data?.message)
        message = errorList.map(x => x.message).join('，')
      } catch (err) {}
    }
    ElMessage.error(message)
  }
}
const dialogClose = () => {
  dialogVisible.value = false
  dialogFormRef.value?.resetFields()
}
interface FormType {
  id?: number
  name: string
  email: string
}
const dialogFormRef = ref<FormInstance>()
const dialogForm = ref<FormType>({
  name: '',
  email: ''
})
const dialogFormRules = reactive<FormRules<FormType>>({
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式有误', trigger: 'blur' }
  ]
})

const { data: tableData } = await useFetch('/api/user', {
  key: 'userList'
})
</script>