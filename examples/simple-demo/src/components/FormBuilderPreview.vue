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
          <el-form-builder :config="formConfig" v-model="formValues" label-width="80px">
            <div slot="append" class="submit-item">
              <el-button type="primary" @click="showResultModal = true">提交</el-button>
            </div>
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

    <el-dialog title="提交结果" :visible.sync="showResultModal" width="30%">
      <pre>{{ JSON.stringify(formValues, null, 4) }}</pre>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showResultModal = false">确 定</el-button>
      </span>
    </el-dialog>
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
      showResultModal: false,

      formValues: {
        title: '',
        desc: '',
        date: null,
        area: [],
        subject: [],
        tag: []
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
                name: 'title',
                defaultValue: '默认标题'
              }
            },
            {
              tag: 'el-input',
              item: {
                label: '描述'
              },
              detail: {
                type: 'textarea',
                name: 'desc',
                placeholder: '请填写一个精彩的描述',
                rows: 3
              }
            },
            {
              tag: 'el-date-picker',
              item: {
                label: '日期'
              },
              detail: {
                name: 'date',
                placeholder: '请选择日期',
                valueFormat: 'yyyyMMdd'
              }
            },
            {
              tag: 'el-radio',
              item: {
                label: '地区'
              },
              detail: {
                name: 'area',
                items: [
                  { text: '北京', label: '1' },
                  { text: '上海', label: '2' },
                  { text: '广州', label: '3' },
                  { text: '深圳', label: '4' }
                ]
              }
            },
            {
              tag: 'el-checkbox',
              item: {
                label: '主题'
              },
              detail: {
                name: 'subject',
                items: [
                  { text: '历史', label: '1' },
                  { text: '战争', label: '2' },
                  { text: '科幻', label: '3' },
                  { text: '爱情', label: '4' },
                  { text: '文艺', label: '5' },
                  { text: '生活', label: '6' }
                ]
              }
            },
            {
              tag: 'el-select',
              item: {
                label: '标签'
              },
              detail: {
                name: 'tag',
                multiple: true,
                items: [
                  { label: '温暖', value: '1' },
                  { label: '感动', value: '2' },
                  { label: '刺激', value: '3' },
                  { label: '紧张', value: '4' },
                  { label: '有爱', value: '5' },
                  { label: '搞笑', value: '6' }
                ]
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

<style>
.preview {
  height: 100%;
  margin: 48px;
}

.submit-item {
  margin-left: 80px;
}

.pull-right {
  float: right;
}

.el-radio-group .el-radio,
.el-checkbox-group .el-checkbox {
  margin-right: 30px;
}

.el-radio-group .el-radio + .el-radio,
.el-checkbox-group .el-checkbox + .el-checkbox {
  margin-left: 0;
}
</style>
