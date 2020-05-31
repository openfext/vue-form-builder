<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <a-form-item
      label="节目类型"
      size="default"
      :required="isRequired"
      :validateStatus="errors.length ? 'error' : null"
      :help="errors[0]"
      :extra="tip"
    >
      <a-radio-group :value="localValue" @input="updateLocalValue">
        <a-radio v-for="item in items" :key="item.value" :value="item.value">
          {{ item.text }}
        </a-radio>
      </a-radio-group>
    </a-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-type',

  props: {
    name: String,
    tip: String,
    tooltip: String,
    hide: Boolean,
    rules: {
      type: [String, Object]
    },
    value: {
      required: false
    },
    defaultValue: {
      required: false
    },
    items: {
      type: Array,
      default() {
        return [
          { value: 1, text: '正片' },
          { value: 2, text: '花絮' }
        ];
      }
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

  created() {
    if (!this.localValue) {
      this.setInitialValue(this.defaultValue);
    }
  }
};
</script>
