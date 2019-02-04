(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{607:function(e,t,n){var i;window,e.exports=(i=n(1),function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=13)}({0:function(e,t){e.exports=i},1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(0),a=(i=r)&&i.__esModule?i:{default:i},s=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.tag=null,n.defaultTag="div",n.listeningEvents=[],n.$element=null,n.editor=null,n.config={immediateReactModelUpdate:!1,reactIgnoreAttrs:null},n.editorInitialized=!1,n.SPECIAL_TAGS=["img","button","input","a"],n.INNER_HTML_ATTR="innerHTML",n.hasSpecialTag=!1,n.oldModel=null,n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,a.default.Component),o(t,[{key:"componentWillMount",value:function(){this.tag=this.props.tag||this.defaultTag}},{key:"componentDidMount",value:function(){var e=this.refs.el.tagName.toLowerCase();-1!=this.SPECIAL_TAGS.indexOf(e)&&(this.tag=e,this.hasSpecialTag=!0),this.props.onManualControllerReady?this.generateManualController():this.createEditor()}},{key:"componentWillUnmount",value:function(){this.destroyEditor()}},{key:"componentDidUpdate",value:function(){JSON.stringify(this.oldModel)!=JSON.stringify(this.props.model)&&this.setContent()}},{key:"createEditor",value:function(){this.editorInitialized||(this.config=this.props.config||this.config,this.$element=$(this.refs.el),this.setContent(!0),this.registerEvents(),this.$editor=this.$element.froalaEditor(this.config).data("froala.editor").$el,this.initListeners())}},{key:"setContent",value:function(e){(this.props.model||""==this.props.model)&&(this.oldModel=this.props.model,this.hasSpecialTag?this.setSpecialTagContent():this.setNormalTagContent(e))}},{key:"setNormalTagContent",value:function(e){var t=this,n=this;function i(){n.$element.froalaEditor("html.set",n.props.model||"",!0),n.editorInitialized&&(n.$element.froalaEditor("undo.reset"),n.$element.froalaEditor("undo.saveStep"))}e?this.config.initOnClick?(this.registerEvent(this.$element,"froalaEditor.initializationDelayed",function(){i()}),this.registerEvent(this.$element,"froalaEditor.initialized",function(){t.editorInitialized=!0})):this.registerEvent(this.$element,"froalaEditor.initialized",function(){t.editorInitialized=!0,i()}):i()}},{key:"setSpecialTagContent",value:function(){var e=this.props.model;if(e){for(var t in e)e.hasOwnProperty(t)&&t!=this.INNER_HTML_ATTR&&this.$element.attr(t,e[t]);e.hasOwnProperty(this.INNER_HTML_ATTR)&&(this.$element[0].innerHTML=e[this.INNER_HTML_ATTR])}}},{key:"destroyEditor",value:function(){this.$element&&(this.listeningEvents&&this.$element.off(this.listeningEvents.join(" ")),this.$editor.off("keyup"),this.$element.froalaEditor("destroy"),this.listeningEvents.length=0,this.$element=null,this.editorInitialized=!1)}},{key:"getEditor",value:function(){return this.$element?this.$element.froalaEditor.bind(this.$element):null}},{key:"generateManualController",value:function(){var e=this,t={initialize:function(){return e.createEditor.call(e)},destroy:function(){return e.destroyEditor.call(e)},getEditor:function(){return e.getEditor.call(e)}};this.props.onManualControllerReady(t)}},{key:"updateModel",value:function(){if(this.props.onModelChange){var e="";if(this.hasSpecialTag){for(var t=this.$element[0].attributes,n={},i=0;i<t.length;i++){var o=t[i].name;this.config.reactIgnoreAttrs&&-1!=this.config.reactIgnoreAttrs.indexOf(o)||(n[o]=t[i].value)}this.$element[0].innerHTML&&(n[this.INNER_HTML_ATTR]=this.$element[0].innerHTML),e=n}else{var r=this.$element.froalaEditor("html.get");"string"==typeof r&&(e=r)}this.oldModel=e,this.props.onModelChange(e)}}},{key:"initListeners",value:function(){var e=this;this.registerEvent(this.$element,"froalaEditor.contentChanged",function(){e.updateModel()}),this.config.immediateReactModelUpdate&&this.registerEvent(this.$editor,"keyup",function(){e.updateModel()})}},{key:"registerEvent",value:function(e,t,n){e&&t&&n&&(this.listeningEvents.push(t),e.on(t,n))}},{key:"registerEvents",value:function(){var e=this.config.events;if(e)for(var t in e)e.hasOwnProperty(t)&&this.registerEvent(this.$element,t,e[t])}}]),t}();t.default=s},12:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=a(n(0)),r=a(n(1));function a(e){return e&&e.__esModule?e:{default:e}}var s=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.default),i(t,[{key:"render",value:function(){return o.default.createElement(this.tag,{ref:"el"},this.props.children)}}]),t}();t.default=s},13:function(e,t,n){e.exports=n(12)}}))}}]);