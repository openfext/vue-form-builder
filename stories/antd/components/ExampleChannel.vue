<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <a-form-item
      label="频道"
      size="default"
      :required="isRequired"
      :validateStatus="errors.length ? 'error' : null"
      :help="errors[0]"
      :extra="tip"
    >
      <a-select
        allowClear
        show-search
        option-filter-prop="children"
        :value="localValue"
        @change="updateLocalValue"
        placeholder="请输入关键词进行搜索"
      >
        <a-select-option
          v-for="ch in showChannels"
          :key="ch.id"
          :value="ch.id"
          :label="ch.name"
        >
          <span>{{ ch.name }} - {{ ch.id }}</span>
        </a-select-option>
      </a-select>
    </a-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-channel',

  props: {
    name: String,
    tip: {
      type: String,
      default: '支持中文名、拼音首字母检索'
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
    return {
      filteredChannels: []
    };
  },

  computed: {
    channels() {
      return this.metadata.channels || [];
    },

    showChannels() {
      const { channels, filteredChannels } = this;

      if (!filteredChannels.length) {
        return channels;
      }

      return filteredChannels;
    }
  },

  methods: {
    filterChannel(word) {
      const like = str => str.startsWith(word);

      if (word) {
        this.filteredChannels = this.channels.filter(ch => {
          return like(ch.name) || like(ch.code);
        });
      } else {
        this.filteredChannels = this.channels;
      }
    }
  }
};
</script>
