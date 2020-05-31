<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <FormItem :size="size" :required="isRequired" :error="errors[0]">
      <template v-slot:label>
        <span>{{ label }}</span>
        <span v-if="tooltip">
          <Tooltip :content="tooltip" placement="top">
            <Icon type="md-help-circle"></Icon>
          </Tooltip>
        </span>
      </template>
      <component
        v-if="isSelect"
        :is="component"
        v-bind="props"
        :value="localValue"
        @input="updateLocalValue"
      >
        <Option v-for="item in items" :key="item.value" :value="item.value">
          {{ item.text }}
        </Option>
      </component>
      <component
        v-else-if="isRadio"
        :is="component"
        v-bind="props"
        :value="localValue"
        @input="updateLocalValue"
      >
        <Radio v-for="item in items" :key="item.value" :label="item.value">
          {{ item.text }}
        </Radio>
      </component>
      <component
        v-else-if="isCheckbox"
        :is="component"
        v-bind="props"
        :value="localValue"
        @input="updateLocalValue"
      >
        <Checkbox v-for="item in items" :key="item.value" :label="item.value">
          {{ item.text }}
        </Checkbox>
      </component>
      <component
        v-else
        :is="component"
        v-bind="props"
        :value="localValue"
        @input="updateLocalValue"
      >
      </component>
      <div class="ivu-form-item-tip" v-if="tip">{{ tip }}</div>
    </FormItem>
  </validation-provider>
</template>

<style lang="scss">
.ivu-form-item-tip {
  font-size: 12px;
  line-height: 12px;
  padding: 10px 0 5px 0;
  color: #737373;
}
</style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'view-form-adaptor',

  props: {
    tip: String,
    tooltip: String,
    name: String,
    size: {
      type: String,
      default: 'default'
    },
    label: String,
    rules: {
      type: [String, Object]
    },
    value: {
      required: false
    },
    props: {
      type: Object,
      default() {
        return {};
      },
      required: false
    },
    items: {
      type: Array,
      default() {
        return [];
      },
      required: false
    },
    extend: {
      type: Object,
      default() {
        return {};
      }
    },
    metadata: {
      type: Object,
      default() {
        return {};
      }
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

  computed: {
    component() {
      return this.extend.component || 'Input';
    },

    isSelect() {
      return this.component === 'Select';
    },

    isMultipleSelect() {
      return this.isSelect && this.props.multiple;
    },

    isRadio() {
      return this.component === 'RadioGroup';
    },

    isCheckbox() {
      return this.component === 'CheckboxGroup';
    }
  },

  created() {
    const { localValue, isMultipleSelect, isCheckbox } = this;

    if (localValue == null) {
      if (isMultipleSelect || isCheckbox) {
        this.setInitialValue([]);
      }
    }
  }
};
</script>
