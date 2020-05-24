import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { useForm, useLoading } from '@fext/vue-use';
import ElementUI from 'element-ui';
import {
  ValidationProvider,
  ValidationObserver,
  localize
} from 'vee-validate/dist/vee-validate.full';

import markdown from './FormBuilder.md';
import { createFormBuilder } from '@/src';
import { ElFormAdaptor } from '@/src/el-form-adaptor';
import ExampleComponents from './components';

import 'element-ui/lib/theme-chalk/index.css';
import './style.scss';

Vue.use(VueCompositionApi);
Vue.use(ElementUI);

localize({
  zh: {
    name: 'zh',
    messages: {
      max: '该字段最大长度为 {length} 个字符',
      min: '该字段最小长度为 {length} 个字符',
      required: '该字段不能为空'
    }
  }
});

localize('zh');

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// =============== Start of Basic Usage =============== //

export const BasicUsage = () => ({
  template: `
    <div class="form-builder-example">
      <validation-observer ref="observer" v-slot="{ invalid }">
        <el-row :gutter="10">
          <el-col :span="12" :xs="24">
            <el-form
              label-width="80px"
              v-loading="loading"
            >
              <el-card v-if="!formConfig.length">
                <div class="placeholder"></div>
              </el-card>
              <form-builder
                @command="handleCommand"
                :form="form"
                :shares="formShares"
                :config="formConfig"
                :metadata="metadata"
              ></form-builder>

              <div class="form-action">
                <el-button :disabled="loading" type="primary" @click="save">
                  提交
                </el-button>
              </div>
            </el-form>
          </el-col>
          <el-col :span="12" :xs="24">
            <el-card header="表单配置">
              <el-input type="textarea" v-model="formConfigJSON" rows="45" />
            </el-card>
          </el-col>
        </el-row>
      </validation-observer>
      <el-dialog title="提交结果" :visible.sync="showResultModal" width="80%">
        <pre>{{ JSON.stringify(formValues, null, 4) }}</pre>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showResultModal = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  `,

  components: {
    FormBuilder: createFormBuilder({
      components: {
        ElFormAdaptor,

        ...ExampleComponents
      }
    })
  },

  setup() {
    const form = useForm();
    const { formValues, setInitialFormValues, updateFormValues } = form;
    const { loading, withLoading } = useLoading();

    return {
      // from form composition
      form,
      formValues,
      setInitialFormValues,
      updateFormValues,

      // from loading composition
      loading,
      withLoading
    };
  },

  data() {
    return {
      showResultModal: false,

      metadata: {},

      formShares: {
        size: 'medium',

        props: {
          clearable: true
        }
      },

      formConfig: [],

      formConfigJSON: JSON.stringify(
        [
          {
            component: 'el-card',
            props: {
              header: '基础信息'
            },
            fields: [
              {
                name: 'channel',
                component: 'ExampleChannel',
                rules: {
                  required: true
                }
              },
              {
                name: 'name',
                component: 'ExampleName',
                rules: {
                  required: true
                }
              },
              {
                name: 'comment',
                component: 'ElFormAdaptor',
                label: '评语',
                tip: '一句话评价（使用 FormAdaptor 的自定义字段）',
                tooltip: '精彩点评',
                rules: {
                  required: true,
                  max: 50,
                  min: 10
                },
                props: {
                  placeholder: '不超过 20 个字'
                }
              }
            ]
          },
          {
            component: 'el-card',
            props: {
              header: '高级信息'
            },
            fields: [
              {
                name: 'type',
                component: 'ExampleType',
                defaultValue: 2
              },
              {
                name: 'actor',
                component: 'ExampleActorComplex'
              },
              {
                name: 'date',
                component: 'ElFormAdaptor',
                label: '发行日期',
                extend: {
                  component: 'el-date-picker'
                },
                props: {
                  placeholder: '请通过日期选择器'
                }
              },
              {
                name: 'description',
                component: 'ElFormAdaptor',
                label: '描述',
                tip: '剧情描述（使用 FormAdaptor 的自定义字段）',
                rules: {
                  max: 180
                },
                props: {
                  type: 'textarea',
                  rows: 5,
                  placeholder: '不超过 180 个字'
                }
              }
            ]
          }
        ],
        null,
        2
      )
    };
  },

  watch: {
    formConfigJSON: {
      handler(value) {
        try {
          this.formConfig = JSON.parse(this.formConfigJSON);
        } catch (err) {
          // this.formConfig = this.formConfig;
        }
      },
      immediate: true
    }
  },

  created() {
    this.registerEvents();
    this.renderForm();
  },

  methods: {
    delay(timeout = 1000) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, timeout);
      });
    },

    getInitialValues() {
      return {};
    },

    registerEvents() {
      this.$on('doSomething', options => {
        this.$message({
          type: 'success',
          message: '触发表单事件成功！'
        });
      });
    },

    handleCommand(cmd, ...args) {
      this.$emit(cmd, ...args);
    },

    async renderForm() {
      return this.withLoading(() => {
        return Promise.all([this.getRenderMetadata(), this.getFormValues()]);
      });
    },

    async getRenderMetadata() {
      await this.delay();

      return Promise.resolve({
        channels: [
          {
            id: 1,
            code: 'dy',
            name: '电影'
          },
          {
            id: 2,
            code: 'dm',
            name: '动漫'
          }
        ]
      }).then(data => {
        this.metadata = data;
      });
    },

    async getFormValues() {
      await this.delay();

      return Promise.resolve({
        channel: 2,
        name: 'Form Builder',
        comment: 'A powerful form builder',
        actor: ['Yang', 'Zhang'],
        description: 'What a nice tool'
      }).then(data => {
        const { formValues } = this;

        this.updateFormValues({
          ...formValues,
          ...data
        });
      });
    },

    async save() {
      const valid = await this.$refs.observer.validate();

      if (!valid) {
        this.$message({
          type: 'error',
          message: '部分表单填写错误，请检查！'
        });
        return;
      }

      this.showResultModal = true;
    }
  }
});

BasicUsage.story = {
  name: 'Basic Usage'
};

// =============== End of Basic Usage =============== //

export default {
  title: 'UI|FormBuilder',
  parameters: {
    notes: {
      markdown
    }
  }
};
