<template>
  <div class="preview">
    <el-card class="preview-card">
      <div slot="header">
        <span>动态表单示例</span>
        <div class="pull-right">
          <a target="_blank" href="https://codetrial.github.io">@Codetrial</a>
        </div>
      </div>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-builder :config="formConfig" :model="formValues" label-width="80px">
            <el-button>提交</el-button>
          </el-form-builder>
        </el-col>
        <el-col :span="8">
          <el-input v-model="config.elements" type="textarea" rows="24"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="config.rules" type="textarea" rows="24"></el-input>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'FormBuilderPreview',

  watch: {
    config: {
      deep: true,
      immediate: true,
      handler({ rules, elements }) {
        try {
          this.formConfig = {
            rules: JSON.parse(rules),
            elements: JSON.parse(elements)
          }
        } catch (err) {
          console.error('[JSON Parse Error] -> ', err.message)
        }
      }
    }
  },

  data() {
    return {
      formValues: {
        title: ''
      },

      formConfig: {
        rules: {},
        elements: []
      },

      config: {
        rules: JSON.stringify(
          {
            title: [
              { required: true, message: '请输入名称' },
              { max: 5, message: '最多 5 个字符' }
            ]
          },
          null,
          4
        ),

        elements: JSON.stringify(
          [
            {
              tag: 'el-input',
              item: {
                label: '标题'
              },
              detail: {
                name: 'title'
              }
            }
          ],
          null,
          4
        )
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

.pull-right {
  float: right;
}
</style>
