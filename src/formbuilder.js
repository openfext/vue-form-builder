export default {
  name: 'ElFormBuilder',
  model: {
    prop: 'model'
  },
  props: {
    model: {
      type: Object,
      default () {
        return {}
      }
    },
    config: {
      type: Object,
      default () {
        return {
          rules: {},
          elements: []
        }
      }
    }
  },

  data () {
    return {
      updating: false,
      formValues: this.mergeValues()
    }
  },

  watch: {
    formValues: {
      handler (formValues) {
        this.updating = true
        this.$emit('input', formValues)
      },
      deep: true
    },
    model: {
      handler (model) {
        if (!this.updating) {
          this.formValues = this.mergeValues()
        } else {
          this.updating = false
        }
      },
      deep: true
    }
  },

  render (h) {
    const vm = this

    return h(
      'el-form',
      {
        props: {
          model: vm.formValues,
          rules: vm.config.rules,
          ...vm.$attrs
        }
      },
      [
        ...(vm.$slots.prepend || []),
        ...(vm.renderFormItems(h) || []),
        ...(vm.$slots.append || [])
      ]
    )
  },

  created () {
    this.$emit('input', this.formValues)
  },

  methods: {
    mergeValues () {
      const vm = this
      const { model } = vm
      const defaultValues = {}

      this.config.elements.forEach(({ tag, detail = {} }) => {
        let { defaultValue = null, name } = detail

        if (tag === 'el-checkbox' || (tag === 'el-select' && detail.multiple)) {
          defaultValue = defaultValue != null ? defaultValue : []
        }

        defaultValues[name] = defaultValue
      })

      return {
        ...defaultValues,
        ...model
      }
    },

    filterAttrs (detail = {}) {
      const keys = Object.keys(detail)
      const attrs = {}

      keys.forEach(key => {
        const value = detail[key]

        if (
          typeof value === 'number' ||
          typeof value === 'string' ||
          typeof value === 'boolean'
        ) {
          attrs[key] = value
        }
      })

      return attrs
    },

    renderFormItem (h, { tag, item: label = {}, detail = {} }) {
      const vm = this
      const { formValues, size } = vm
      const { name } = detail
      const value = formValues[name] || null
      const modelEvents = {
        input: function (value) {
          formValues[name] = value
        }
      }

      let children = []

      if (tag === 'el-select') {
        const select = h(
          tag,
          {
            attrs: {
              ...vm.filterAttrs(detail)
            },
            props: {
              value,
              ...detail
            },
            on: {
              ...modelEvents
            }
          },
          (detail.items || []).map(option => {
            return h('el-option', {
              attrs: {
                ...vm.filterAttrs(option)
              },
              props: {
                key: option.value,
                ...option
              }
            })
          })
        )
        children = [select]
      } else if (tag === 'el-checkbox') {
        const checkbox = h(
          'el-checkbox-group',
          {
            attrs: {
              ...vm.filterAttrs(detail)
            },
            props: {
              value,
              ...detail
            },
            on: {
              ...modelEvents
            }
          },
          (detail.items || []).map(option => {
            return h(
              'el-checkbox',
              {
                attrs: {
                  ...vm.filterAttrs(option)
                },
                props: {
                  key: option.value,
                  label: option.value,
                  ...option
                }
              },
              [option.text]
            )
          })
        )

        children = [checkbox]
      } else if (tag === 'el-radio') {
        const radios = (detail.items || []).map(option => {
          option = {
            name: detail.name,
            ...option
          }
          return h(
            tag,
            {
              attrs: {
                ...vm.filterAttrs(option)
              },
              props: {
                value,
                ...option
              },
              on: {
                ...modelEvents
              }
            },
            [option.text]
          )
        })
        children = [...radios]
      } else {
        const input = h(tag || 'el-input', {
          attrs: {
            ...vm.filterAttrs(detail)
          },
          props: {
            value,
            ...detail
          },
          on: {
            ...modelEvents
          }
        })
        children = [input]
      }

      return h(
        'el-form-item',
        {
          props: {
            size,
            prop: name,
            ...label
          }
        },
        children
      )
    },

    renderFormItems (h) {
      const vm = this

      return this.config.elements.map((item, index) => {
        return vm.renderFormItem(h, item, index)
      })
    }
  }
}
