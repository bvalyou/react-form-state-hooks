<h1 align="center">Welcome to react-form-state-hooks 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/react-form-state-hooks" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/react-form-state-hooks.svg">
  </a>
  <a href="https://codecov.io/gh/bvalyou/react-form-state-hooks">
    <img alt="Coverage" src="https://codecov.io/gh/bvalyou/react-form-state-hooks/branch/master/graph/badge.svg" />
  </a>
  <a href="https://github.com/bvalyou/react-form-state-hooks#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/bvalyou/react-form-state-hooks/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/bvalyou/react-form-state-hooks" />
  </a>
</p>

> Manage your React form state with hooks and helpful components.

### 🏠 [Homepage](https://github.com/bvalyou/react-form-state-hooks#readme)

## Install

```sh
npm install react-form-state-hooks
```

## Browser Compatibility

This library uses ES2020 methods, so for developers supporting legacy browsers or server-side JS environments,
polyfills will be needed.

## Performance Considerations

This is designed for controlled forms, which solve some problems but come with some performance challenges when managed
centrally. To avoid this, it's recommended to add basic memoization to all inputs being controlled, as well as any
nested form sections.

## 🚀 Usage

There are currently two pieces available, the main file which provides the hooks and utilities,
and a secondary file, context, that provides utilities for using form state propagation through
React's Context feature.

### useFormState

```js
import { useFormState, useListFormState, createOnChange } from 'react-form-state-hooks';
```

`useFormState` is the primary hook for managing a form's state. Alone it isn't very powerful, but it
has a recursive interface that allows it to provide state management for complex form structures.
Used with a React Context (and the Context Utilities below) it provides robust logic with a minimum
of boilerplate.

There is a simple example of this in
<a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/stories/basicFormExample/BasicForm.js">the examples</a>.

### useListFormState

`useListFormState` takes an array of data and exposes it with a similar interface as `useFormState`.
It supports simple add/remove and with proper memoization can prevent unnecessary renders for large
lists.

There is a simple example of this in
<a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/stories/listFormExample/FormWithList.js">the examples</a>.

### Context Utilities

```js
import { FormStateContext, connectFormStateInput } from 'react-form-state-hooks/context';
```

`FormStateContext` is a React Context for providing the current `formState` or `listFormState` to a set of components.

```jsx harmony
<FormStateContext.Provider value={useListFormState()}>
	...
</FormStateContext.Provider>
```

Apart from assisting with the prop-drilling issue, this context also allows you to reduce the boilerplate for writing
your form, using the provided `connectFormStateInput` higher-order component.

```jsx harmony
const ConnectedInput = connectFormStateInput('input');

<FormStateContext.Provider value={useListFormState()}>
	<label htmlFor="foo">Foo</label>
	<ConnectedInput id="foo" name="foo" />
</FormStateContext.Provider>
```

`connectFormStateInput` links the provided component to `FormStateContext`, and will derive the `value` (or `checked`)
prop, and bind the `onChange` callback.

You can see these utilities in action in the examples
<a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/stories/contextExample/ContextForm.js">the examples</a>.

## 📚 API Reference

## Modules

<dl>
<dt><a href="#module_useFormState">useFormState</a></dt>
<dd></dd>
<dt><a href="#module_useListFormState">useListFormState</a></dt>
<dd></dd>
<dt><a href="#module_connectFormStateInput">connectFormStateInput</a></dt>
<dd></dd>
<dt><a href="#module_createOnChange">createOnChange</a></dt>
<dd></dd>
</dl>

<a name="module_useFormState"></a>

## useFormState

* [useFormState](#module_useFormState)
    * [useFormState([options])](#exp_module_useFormState--useFormState) ⇒ <code>formState</code> ⏏
        * [~formState](#module_useFormState--useFormState..formState)
        * [~updateData](#module_useFormState--useFormState..updateData) : <code>function</code>

<a name="exp_module_useFormState--useFormState"></a>

### useFormState([options]) ⇒ <code>formState</code> ⏏
Manages state for an object-shaped form

**Kind**: Exported function  
**Returns**: <code>formState</code> - Tools for rendering your form  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> |  | Accepts the following: |
| [options.initialData] | <code>Object.&lt;\*&gt;</code> | <code>{}</code> | The initial values for the form |
| [options.name] | <code>string</code> |  | An identifier in the parent data where this section belongs |
| [options.updateData] | <code>updateData</code> |  | Propagates internal state up to the parent |
| [options.data] | <code>Object.&lt;\*&gt;</code> |  | The current data for the section - overrides internal data |

<a name="module_useFormState--useFormState..formState"></a>

#### useFormState~formState
**Kind**: inner typedef of [<code>useFormState</code>](#exp_module_useFormState--useFormState)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>Object.&lt;\*&gt;</code> | The current managed data object |
| updateData | <code>updateData</code> | Handles a change to a field in the data |

<a name="module_useFormState--useFormState..updateData"></a>

#### useFormState~updateData : <code>function</code>
**Kind**: inner typedef of [<code>useFormState</code>](#exp_module_useFormState--useFormState)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name the change belongs to |
| value | <code>\*</code> | The new value corresponding to name |

<a name="module_useListFormState"></a>

## useListFormState

* [useListFormState](#module_useListFormState)
    * [useListFormState(options)](#exp_module_useListFormState--useListFormState) ⇒ <code>listFormState</code> ⏏
        * [~listFormState](#module_useListFormState--useListFormState..listFormState)
        * [~listFormEntry](#module_useListFormState--useListFormState..listFormEntry)
        * [~updateData](#module_useListFormState--useListFormState..updateData) : <code>function</code>
        * [~addEntry](#module_useListFormState--useListFormState..addEntry) : <code>function</code>
        * [~removeEntry](#module_useListFormState--useListFormState..removeEntry) : <code>function</code>

<a name="exp_module_useListFormState--useListFormState"></a>

### useListFormState(options) ⇒ <code>listFormState</code> ⏏
Manages state for a list-shaped form

**Kind**: Exported function  
**Returns**: <code>listFormState</code> - Tools for rendering your form  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | Accepts the following: |
| [options.name] | <code>string</code> |  | The key in the parent state object where this list will go |
| [options.updateData] | <code>updateData</code> |  | A function to call when the data changes |
| [options.initialData] | <code>Array.&lt;\*&gt;</code> | <code>[]</code> | The initial values the list contains |
| [options.data] | <code>Array.&lt;\*&gt;</code> |  | The current values the list contains - overrides internal state |

<a name="module_useListFormState--useListFormState..listFormState"></a>

#### useListFormState~listFormState
**Kind**: inner typedef of [<code>useListFormState</code>](#exp_module_useListFormState--useListFormState)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| entries | <code>Array.&lt;listFormEntry&gt;</code> | Entries to render your form sections/fields |
| data | <code>Array.&lt;\*&gt;</code> | The current managed list values |
| mappedData | <code>Object.&lt;\*&gt;</code> | The internal object structure - works well for connecting a context built for formState |
| updateData | <code>updateData</code> | Handles a change to a field in the data |
| addEntry | <code>addEntry</code> | Adds a new entry to the list |
| removeEntry | <code>removeEntry</code> | Removes an entry from the list |

<a name="module_useListFormState--useListFormState..listFormEntry"></a>

#### useListFormState~listFormEntry
**Kind**: inner typedef of [<code>useListFormState</code>](#exp_module_useListFormState--useListFormState)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | A generated name for the entry |
| key | <code>string</code> | A unique identifier for an iterator function |
| value | <code>\*</code> | The current value held by this entry |

<a name="module_useListFormState--useListFormState..updateData"></a>

#### useListFormState~updateData : <code>function</code>
**Kind**: inner typedef of [<code>useListFormState</code>](#exp_module_useListFormState--useListFormState)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The generated name of the entry the change belongs to |
| value | <code>\*</code> | The new value |

<a name="module_useListFormState--useListFormState..addEntry"></a>

#### useListFormState~addEntry : <code>function</code>
**Kind**: inner typedef of [<code>useListFormState</code>](#exp_module_useListFormState--useListFormState)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | The initial value for the new entry |
| number |  | [index] - The index the entry should be inserted into |

<a name="module_useListFormState--useListFormState..removeEntry"></a>

#### useListFormState~removeEntry : <code>function</code>
**Kind**: inner typedef of [<code>useListFormState</code>](#exp_module_useListFormState--useListFormState)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the entry from `entries` |

<a name="module_connectFormStateInput"></a>

## connectFormStateInput

* [connectFormStateInput](#module_connectFormStateInput)
    * [connectFormStateInput(InputComponent, [Context])](#exp_module_connectFormStateInput--connectFormStateInput) ⇒ <code>function</code> ⏏
        * [~InputComponent](#module_connectFormStateInput--connectFormStateInput..InputComponent) : <code>string</code> \| <code>InputComponentFunc</code>
        * [~InputComponentFunc](#module_connectFormStateInput--connectFormStateInput..InputComponentFunc) : <code>function</code>

<a name="exp_module_connectFormStateInput--connectFormStateInput"></a>

### connectFormStateInput(InputComponent, [Context]) ⇒ <code>function</code> ⏏
Connects a form control to the FormStateContext

**Kind**: Exported function  
**Returns**: <code>function</code> - The component with the InputComponent props applied  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| InputComponent | <code>InputComponent</code> |  | A React input or component matching the input API |
| [Context] | <code>React.Context</code> | <code>FormStateContext</code> | A React context that will contain formState |

<a name="module_connectFormStateInput--connectFormStateInput..InputComponent"></a>

#### connectFormStateInput~InputComponent : <code>string</code> \| <code>InputComponentFunc</code>
**Kind**: inner typedef of [<code>connectFormStateInput</code>](#exp_module_connectFormStateInput--connectFormStateInput)  
<a name="module_connectFormStateInput--connectFormStateInput..InputComponentFunc"></a>

#### connectFormStateInput~InputComponentFunc : <code>function</code>
**Kind**: inner typedef of [<code>connectFormStateInput</code>](#exp_module_connectFormStateInput--connectFormStateInput)  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Standard React props |
| props.name | <code>string</code> | HTML input name - used to link to the context |
| props.onChange | <code>function</code> | HTML input change handler |
| [props.type] | <code>string</code> | HTML input type - used for checkbox/radio detection |
| [props.value] | <code>string</code> | HTML input value from the context |
| [props.checked] | <code>boolean</code> | HTML input checked attribute for checkbox/radio |

<a name="module_createOnChange"></a>

## createOnChange

* [createOnChange](#module_createOnChange)
    * [createOnChange(updateData, onChange)](#exp_module_createOnChange--createOnChange) ⇒ <code>onChange</code> ⏏
        * [~onChange](#module_createOnChange--createOnChange..onChange) : <code>function</code>

<a name="exp_module_createOnChange--createOnChange"></a>

### createOnChange(updateData, onChange) ⇒ <code>onChange</code> ⏏
Creates an onChange callback for an HTML input which is bound to the updateData callback

**Kind**: Exported function  
**Returns**: <code>onChange</code> - Takes a change event and uses it to update the form state  

| Param | Type | Description |
| --- | --- | --- |
| updateData | <code>updateData</code> | Handles a change to a field in the form state |
| onChange | <code>function</code> | Pass-through of HTML event handler |

<a name="module_createOnChange--createOnChange..onChange"></a>

#### createOnChange~onChange : <code>function</code>
**Kind**: inner typedef of [<code>createOnChange</code>](#exp_module_createOnChange--createOnChange)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>React.ChangeEvent</code> | The triggered DOM event |


## Run tests

```sh
npm test
```

## Author

👤 **Benjamin Valyou**

* Github: [@bvalyou](https://github.com/bvalyou)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Benjamin Valyou](https://github.com/bvalyou).

This project is [MIT](https://github.com/bvalyou/react-form-state-hooks/blob/master/LICENSE) licensed.

***
_This README was initially generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

_The API Reference was generated by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown)_
