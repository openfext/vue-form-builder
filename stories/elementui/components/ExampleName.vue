<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item
      label="标题"
      size="medium"
      :required="isRequired"
      :error="errors[0]"
    >
      <el-input
        clearable
        :value="localValue"
        @input="updateLocalValue"
        type="text"
        placeholder="标题"
      >
        <template v-slot:append>
          <el-tooltip content="通过事件触发整体表单操作" placement="top">
            <el-button icon="el-icon-phone-outline" @click="doSomething"
              >触发表单事件</el-button
            >
          </el-tooltip>
        </template>
      </el-input>
      <div class="el-form-item__tip" v-if="tip">{{ tip }}</div>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-name',

  props: {
    name: String,
    tip: String,
    tooltip: String,
    hide: Boolean,
    rules: {
      type: [String, Object]
    },
    extend: Object,
    metadata: Object,
    value: {
      required: false
    },
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
      setInitialValue,
      updateLocalValue
    } = useFormElement(props, context);

    return {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue
    };
  },

  data() {
    return {};
  },

  methods: {
    doSomething(evt) {
      this.$emit('command', 'doSomething', { id: 123456 });
    }
  }
};
</script>
