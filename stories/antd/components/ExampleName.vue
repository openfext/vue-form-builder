<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <a-form-item
      label="标题"
      size="default"
      :required="isRequired"
      :help="errors[0]"
      :extra="tip"
    >
      <a-input
        allowClear
        :value="localValue"
        @change="e => updateLocalValue(e.target.value)"
        type="text"
        placeholder="标题"
      >
        <template v-slot:addonAfter>
          <span class="input-addon-after" icon="phone" @click="doSomething">
            <a-icon type="phone" /> 触发表单事件
          </span>
        </template>
      </a-input>
    </a-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped>
.input-addon-after {
  cursor: pointer;
}
</style>

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
