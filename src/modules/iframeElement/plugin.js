import Element from '@/modules/iframeElement/vue.vue'

let Data = {
  module: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
}

export default {
  install: (app, options) => {
    app.component(Element.name, Element)
  },
  props: {
    data: {
      type: Data,
      required: true
    }
  }
}
