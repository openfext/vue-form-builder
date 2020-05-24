<template>
  <div>
    <component
      :is="group.component"
      v-for="group in config"
      :key="group._key"
      v-bind="group.props"
    >
      <component
        v-for="comp in group.fields"
        v-bind="comp.props"
        v-model="formValues[comp.name]"
        @command="handleCommand"
        :is="comp.component"
        :key="comp.name"
        :tip="comp.tip"
        :tooltip="comp.tooltip"
        :name="comp.name"
        :hide="comp.hide"
        :rules="comp.rules"
        :label="comp.label"
        :items="comp.items"
        :props="comp.props"
        :extend="comp.extend"
        :metadata="metadata"
        :formValues="formValues"
      >
      </component>
    </component>
  </div>
</template>

<script>
import deepmerge from 'deepmerge';

const options = {
  name: 'form-builder',

  props: {
    // instance of form-compostion
    form: {
      type: Object,
      required: true
    },
    shares: {
      type: Object,
      default() {
        return {};
      }
    },
    config: {
      type: Array,
      required: true
    },
    metadata: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  setup(props) {
    const { formValues, updateFormValues } = props.form;

    return {
      // from form composition
      formValues,
      updateFormValues
    };
  },

  data() {
    return {};
  },

  computed: {},

  created() {
    this.prepare();
  },

  methods: {
    prepare() {
      const { config, shares, formValues } = this;
      const initialValues = {};

      config.forEach((group, index) => {
        group._key = `group_${index}`;
        group.fields = group.fields || [];
        group.component = group.component || 'div';

        group.fields = group.fields.map(comp => {
          if (!comp.name) {
            throw new Error(
              `FormBuilder: name is required, config - ${JSON.stringify(comp)}`
            );
          }

          if (comp.defaultValue != null) {
            if (formValues[comp.name] == null) {
              initialValues[comp.name] = comp.defaultValue;
            }
          }

          return deepmerge.all([{}, shares, comp]);
        });
      });

      this.updateFormValues(initialValues);
    },

    handleCommand(...args) {
      this.$emit('command', ...args);
    }
  }
};

export default options;
</script>
