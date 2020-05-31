import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import { useForm, useLoading } from '@fext/vue-use';
import Antd from 'ant-design-vue';
import {
  ValidationProvider,
  ValidationObserver,
  localize
} from 'vee-validate/dist/vee-validate.full';

import markdown from './FormBuilder.md';
import { createFormBuilder } from '@/src';
import { AntFormAdaptor } from '@/src/ant-form-adaptor';
import ExampleComponents from './components';

import 'ant-design-vue/dist/antd.css';
import './style.scss';

Vue.use(VueCompositionApi);
Vue.use(Antd);

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
        <a-row :gutter="10">
          <a-col :span="12">
          <a-spin :spinning="loading">
            <a-form
              :colon="false"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 16 }"
            >
              <a-card v-if="!formConfig.length">
                <div class="placeholder"></div>
              </a-card>
              <form-builder
                @command="handleCommand"
                :form="form"
                :shares="formShares"
                :config="formConfig"
                :metadata="metadata"
              ></form-builder>

              <div class="form-action">
                <a-button :disabled="loading" type="primary" @click="save">
                  提交
                </a-button>
              </div>
            </a-form>
          </a-spin>
          </a-col>
          <a-col :span="12">
            <a-card title="表单配置">
              <a-textarea v-model="formConfigJSON" :rows="45" />
            </a-card>
          </a-col>
        </a-row>
      </validation-observer>
      <a-modal title="提交结果" v-model="showResultModal" width="80%">
        <pre>{{ JSON.stringify(formValues, null, 4) }}</pre>
        <span slot="footer">
          <a-button type="primary" @click="showResultModal = false">确 定</a-button>
        </span>
      </a-modal>
    </div>
  `,

  components: {
    FormBuilder: createFormBuilder({
      components: {
        AntFormAdaptor,

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
        size: 'default',

        props: {
          allowClear: true
        }
      },

      formConfig: [],

      formConfigJSON: JSON.stringify(
        [
          {
            component: 'a-card',
            props: {
              title: '基础信息'
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
                component: 'AntFormAdaptor',
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
            component: 'a-card',
            props: {
              title: '高级信息'
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
                component: 'AntFormAdaptor',
                label: '发行日期',
                extend: {
                  component: 'a-date-picker'
                },
                props: {
                  placeholder: '请通过日期选择器'
                }
              },
              {
                name: 'description',
                component: 'AntFormAdaptor',
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
  title: 'FormBuilder|Ant Design Vue',
  parameters: {
    notes: {
      markdown
    }
  }
};
