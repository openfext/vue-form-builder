/**
 * element-form-builder v1.2.0
 * (c) 2019 Felix Yang
 */
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var FormBuilder = {
  name: 'ElFormBuilder',
  model: {
    prop: 'model'
  },
  props: {
    model: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    config: {
      type: Object,
      default: function _default() {
        return {
          rules: {},
          elements: []
        };
      }
    },
    size: {
      type: String,
      default: 'medium'
    },
    labelWidth: {
      type: String,
      default: '150px'
    }
  },

  data: function data() {
    return {
      updating: false,
      formValues: this.mergeValues()
    };
  },


  watch: {
    formValues: {
      handler: function handler(formValues) {
        this.updating = true;
        this.$emit('input', formValues);
      },

      deep: true
    },
    model: {
      handler: function handler(model) {
        if (!this.updating) {
          this.formValues = this.mergeValues();
        } else {
          this.updating = false;
        }
      },

      deep: true
    }
  },

  render: function render(h) {
    var vm = this;

    return h('el-form', {
      props: _extends({
        model: vm.formValues,
        rules: vm.config.rules
      }, vm.$attr)
    }, [].concat(toConsumableArray(vm.$slots.prepend || []), toConsumableArray(vm.renderFormItems(h) || []), toConsumableArray(vm.$slots.append || [])));
  },
  created: function created() {
    this.$emit('input', this.formValues);
  },


  methods: {
    mergeValues: function mergeValues() {
      var vm = this;
      var model = vm.model;

      var defaultValues = {};

      this.config.elements.forEach(function (_ref) {
        var tag = _ref.tag,
            _ref$detail = _ref.detail,
            detail = _ref$detail === undefined ? {} : _ref$detail;
        var _detail$defaultValue = detail.defaultValue,
            defaultValue = _detail$defaultValue === undefined ? null : _detail$defaultValue,
            name = detail.name;


        if (tag === 'el-checkbox' || tag === 'el-select' && detail.multiple) {
          defaultValue = defaultValue != null ? defaultValue : [];
        }

        defaultValues[name] = defaultValue;
      });

      return _extends({}, defaultValues, model);
    },
    filterAttrs: function filterAttrs() {
      var detail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var keys = Object.keys(detail);
      var attrs = {};

      keys.forEach(function (key) {
        var value = detail[key];

        if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
          attrs[key] = value;
        }
      });

      return attrs;
    },
    renderFormItem: function renderFormItem(h, _ref2) {
      var tag = _ref2.tag,
          _ref2$item = _ref2.item,
          label = _ref2$item === undefined ? {} : _ref2$item,
          _ref2$detail = _ref2.detail,
          detail = _ref2$detail === undefined ? {} : _ref2$detail;

      var vm = this;
      var formValues = vm.formValues,
          size = vm.size;
      var name = detail.name;

      var value = formValues[name] || null;
      var modelEvents = {
        input: function input(value) {
          formValues[name] = value;
        }
      };

      var children = [];

      if (tag === 'el-select') {
        var select = h(tag, {
          attrs: _extends({}, vm.filterAttrs(detail)),
          props: _extends({
            value: value
          }, detail),
          on: _extends({}, modelEvents)
        }, (detail.items || []).map(function (option) {
          return h('el-option', {
            attrs: _extends({}, vm.filterAttrs(option)),
            props: _extends({
              key: option.value
            }, option)
          });
        }));
        children = [select];
      } else if (tag === 'el-checkbox') {
        var checkbox = h('el-checkbox-group', {
          attrs: _extends({}, vm.filterAttrs(detail)),
          props: _extends({
            value: value
          }, detail),
          on: _extends({}, modelEvents)
        }, (detail.items || []).map(function (option) {
          return h('el-checkbox', {
            attrs: _extends({}, vm.filterAttrs(option)),
            props: _extends({
              key: option.value,
              label: option.value
            }, option)
          }, [option.text]);
        }));

        children = [checkbox];
      } else if (tag === 'el-radio') {
        var radios = (detail.items || []).map(function (option) {
          option = _extends({
            name: detail.name
          }, option);
          return h(tag, {
            attrs: _extends({}, vm.filterAttrs(option)),
            props: _extends({
              value: value
            }, option),
            on: _extends({}, modelEvents)
          }, [option.text]);
        });
        children = [].concat(toConsumableArray(radios));
      } else {
        var input = h(tag || 'el-input', {
          attrs: _extends({}, vm.filterAttrs(detail)),
          props: _extends({
            value: value
          }, detail),
          on: _extends({}, modelEvents)
        });
        children = [input];
      }

      return h('el-form-item', {
        props: _extends({
          size: size,
          prop: name
        }, label)
      }, children);
    },
    renderFormItems: function renderFormItems(h) {
      var vm = this;

      return this.config.elements.map(function (item, index) {
        return vm.renderFormItem(h, item, index);
      });
    }
  }
};

var install = function installFormBuilder(Vue) {
  Vue.component('el-form-builder', FormBuilder);
};

var index = {
  install: install
};

export default index;
