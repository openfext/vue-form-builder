<template>
  <div class="preview">
    <el-card class="preview-card">
      <div slot="header">
        <span>动态表单示例</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-builder :config="config" :model="formValues" label-width="48px"></el-form-builder>
        </el-col>
        <el-col :span="16">
          <el-input type="textarea"></el-input>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'FormBuilderPreview',

  data() {
    return {
      config: {
        rules: {},
        elements: [
          {
            tag: 'el-input',
            item: {
              label: '标题'
            },
            detail: {
              name: 'title'
            }
          }
        ]
      },

      formValues: {
        title: ''
      }
    }
  }
}
</script>

<style scoped>
.preview {
  height: 100%;
  margin: 48px;
}
</style>
