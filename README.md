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

This library uses modern JavaScript methods, so polyfills will be needed for developers supporting legacy browsers.

## Performance & Control Considerations

There are two implementations - one for uncontrolled forms and one for controlled. Controlled forms solve some problems
but come with some performance challenges when the data is managed by a single store. To avoid this, it's recommended to
add basic memoization to all inputs being controlled, as well as any nested form sections. Uncontrolled forms do not
suffer from the same performance challenges, but make it harder to take control of an input's value programmatically,
which requires a ref or additional complexity.

## 🚀 Usage

### useFormState

```ts
import { useFormState } from 'react-form-state-hooks/uncontrolled';
import { useFormState } from 'react-form-state-hooks/controlled';
```

`useFormState` is the primary hook for managing a form's state. Alone it's a simple tool for managing form state, but it
can be nested and combined with the other hooks and utilities to provide state management for complex form structures.
Used with a React Context it provides robust logic with a minimum of boilerplate.

There is a simple example of this in the
<a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/stories/uncontrolled/basicFormExample/BasicForm.tsx">uncontrolled</a>
and
<a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/stories/controlled/basicFormExample/BasicForm.tsx">controlled</a>
examples.

### useListFormState

```ts
import { useListFormState } from 'react-form-state-hooks/uncontrolled';
import { useListFormState } from 'react-form-state-hooks/controlled';
```

`useListFormState` takes an array of data and exposes it with a similar interface as `useFormState`.
It supports simple add/remove and with proper memoization can prevent unnecessary renders for large
lists.

There is a simple example of this in the
<a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/stories/uncontrolled/listFormExample/FormWithList.tsx">uncontrolled</a>
and
<a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/stories/controlled/listFormExample/FormWithList.tsx">controlled</a>
examples.

### Context Utilities

```ts
import { FormStateContext, connectFormStateInput } from 'react-form-state-hooks/uncontrolled';
import { FormStateContext, connectFormStateInput } from 'react-form-state-hooks/controlled';
```

`FormStateContext` is a React Context for providing the current `FormState` or `ListFormState` to a set of components.

```tsx
<FormStateContext.Provider value={useFormState()}>
	...
</FormStateContext.Provider>
```

Apart from assisting with the prop-drilling issue, this context also allows you to reduce the boilerplate for writing
your form, using the provided `connectFormStateInput` higher-order component.

```tsx
const ConnectedInput = connectFormStateInput('input');

<FormStateContext.Provider value={useFormState()}>
	<label htmlFor="foo">Foo</label>
	<ConnectedInput id="foo" name="foo" />
</FormStateContext.Provider>
```

`connectFormStateInput` is a higher order component that links the provided component to `FormStateContext`, providing a
standard input `onChange` event handler hooked into the context. The uncontrolled implementation will derive
`defaultValue` from the context, while controlled syncs `value`.

You can see these utilities in action in the
<a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/stories/uncontrolled/contextExample/ContextForm.tsx">uncontrolled</a>
and
<a href="https://github.com/bvalyou/react-form-state-hooks/blob/master/stories/controlled/contextExample/ContextForm.tsx">controlled</a>
examples.

You can also provide your own context to `connectFormStateInput` if for whatever reason you have an existing context to use.

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
