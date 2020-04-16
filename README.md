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

## 📚 API Reference

```js
import { useFormState, useListFormState, createOnChange } from 'react-form-state-hooks';
```

## Modules

<dl>
<dt><a href="#module_createOnChange">createOnChange</a></dt>
<dd></dd>
<dt><a href="#module_useFormState">useFormState</a></dt>
<dd></dd>
<dt><a href="#module_useListFormState">useListFormState</a></dt>
<dd></dd>
</dl>

<a name="module_createOnChange"></a>

## createOnChange

* [createOnChange](#module_createOnChange)
    * [createOnChange(updateData)](#exp_module_createOnChange--createOnChange) ⇒ <code>onChange</code> ⏏
        * [~onChange](#module_createOnChange--createOnChange..onChange) : <code>function</code>

<a name="exp_module_createOnChange--createOnChange"></a>

### createOnChange(updateData) ⇒ <code>onChange</code> ⏏
Creates an onChange callback for an HTML input which is bound to the updateData callback

**Kind**: Exported function  
**Returns**: <code>onChange</code> - Takes a change event and uses it to update the form state  

| Param | Type | Description |
| --- | --- | --- |
| updateData | <code>updateData</code> | Handles a change to a field in the form state |

<a name="module_createOnChange--createOnChange..onChange"></a>

#### createOnChange~onChange : <code>function</code>
**Kind**: inner typedef of [<code>createOnChange</code>](#exp_module_createOnChange--createOnChange)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>React.ChangeEvent</code> | The triggered DOM event |

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


## Run tests

```sh
npm test
```

## Author

👤 **Benjamin Valyou**

* Github: [@bvalyou](https://github.com/bvalyou)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/bvalyou/react-form-state-hooks/issues). You can also take a look at the [contributing guide](https://github.com/bvalyou/react-form-state-hooks/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Benjamin Valyou](https://github.com/bvalyou).

This project is [MIT](https://github.com/bvalyou/react-form-state-hooks/blob/master/LICENSE) licensed.

***
_This README was initially generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

_The API Reference was generated by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown)_
