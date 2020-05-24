<template>
  <div class="el-form-adaptor">
    <validation-provider :rules="rules" v-slot="{ errors }">
      <el-form-item
        label="人物"
        size="medium"
        :required="isRequired"
        :error="errors[0]"
      >
        <el-input
          clearable
          v-model="actor.director"
          type="text"
          placeholder="请填写导演姓名"
        >
          <template slot="prepend">导演</template>
        </el-input>
      </el-form-item>
    </validation-provider>
    <validation-provider :rules="rules" v-slot="{ errors }">
      <el-form-item size="medium" :error="errors[0]">
        <el-input
          clearable
          v-model="actor.protagonist"
          type="text"
          placeholder="请填写主演姓名"
        >
          <template slot="prepend">主演</template>
        </el-input>
        <div class="el-form-item__tip" v-if="tip">{{ tip }}</div>
      </el-form-item>
    </validation-provider>
  </div>
</template>

<style lang="scss" scoped>
.el-select {
  ::v-deep .el-input {
    width: 100px;
  }
}
</style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  // 组合型组件，内部有多个输入元素
  // 整个组件有自己的 getValue/setValue 方法
  // 通过 composition api 与 v-model 进行同步
  name: 'example-actor-complex',

  props: {
    name: String,
    tip: {
      type: String,
      default: '必须同时填写导演、主演才有效'
    },
    tooltip: String,
    hide: Boolean,
    rules: {
      type: [String, Object]
    },
    value: {
      required: false
    },
    extend: Object,
    metadata: Object,
    formValues: {
      type: Object,
      required: false
    }
  },

  setup(props, context) {
    const {
      dirty,
      isRequired,
      localValue,
      watchPropValue,
      setInitialValue,
      updateLocalValue
    } = useFormElement(props, context);

    return {
      dirty,
      isRequired,
      localValue,
      watchPropValue,
      setInitialValue,
      updateLocalValue
    };
  },

  data() {
    return {
      actor: {
        director: '',
        protagonist: ''
      }
    };
  },

  watch: {
    actor: {
      handler() {
        this.updateLocalValue(this.getActorValue());
      },
      deep: true
    }
  },

  created() {
    this.setActorValue(this.value);

    this.watchPropValue(value => {
      this.setActorValue(value);
    });
  },

  methods: {
    getActorValue() {
      const { director, protagonist } = this.actor;

      if (!director || !protagonist) {
        return [];
      }

      return [director, protagonist];
    },

    setActorValue(value = []) {
      const [director = '', protagonist = ''] = value;
      this.actor = {
        director,
        protagonist
      };
    }
  }
};
</script>
