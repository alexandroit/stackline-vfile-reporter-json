# @stackline/vfile-reporter-json

> vfile utility to create a JSON report for a file.

[![npm version](https://img.shields.io/npm/v/@stackline/vfile-reporter-json.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/vfile-reporter-json)
[![license](https://img.shields.io/npm/l/@stackline/vfile-reporter-json.svg?style=flat-square)](https://github.com/alexandroit/stackline-vfile-reporter-json)
[![GitHub repository](https://img.shields.io/badge/GitHub-alexandroit%2Fstackline-vfile-reporter-json-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-vfile-reporter-json)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/vfile-reporter-json/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/vfile-reporter-json/)** | **[npm](https://www.npmjs.com/package/@stackline/vfile-reporter-json)** | **[Issues](https://github.com/alexandroit/stackline-vfile-reporter-json/issues)** | **[Repository](https://github.com/alexandroit/stackline-vfile-reporter-json)**

**Current package version:** `1.0.1`

---

## Why this package?

`@stackline/vfile-reporter-json` is the Stackline-maintained distribution of `vfile-reporter-json@3.3.0`. It is an independent continuation of [vfile-reporter-json](https://github.com/vfile/vfile-reporter-json); original authors and licenses remain credited below.

## Compatibility

| Item | Value |
| :--- | :--- |
| Package | `@stackline/vfile-reporter-json@1.0.1` |
| API target | `vfile-reporter-json@3.3.0` |
| Supported Node.js | `See supported framework requirements` |
| License | `MIT` |
| Module type | `module` |
| Main entry | `index.js` |
| Types | `index.d.ts` |
| Runtime dependencies | `vfile, vfile-message` |

## Installation

```bash
npm install @stackline/vfile-reporter-json
```

Preserve existing imports and plugin resolution with an npm alias:

```bash
npm install vfile-reporter-json@npm:@stackline/vfile-reporter-json
```

## Usage and API reference

### vfile-reporter-json


[vfile][] utility to create a report in machine readable JSON.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`reporterJson(files[, options])`](#reporterjsonfiles-options)
    *   [`JsonFile`](#jsonfile)
    *   [`JsonMessage`](#jsonmessage)
    *   [`Options`](#options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is like [`vfile-reporter`][vfile-reporter] but it outputs machine
readable JSON.

## When should I use this?

You can use this when you need to serialize lint results for machines, use
`vfile-reporter` itself for humans.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+ and 16.0+), install with [npm][]:

```sh
npm install @stackline/vfile-reporter-json
```

In Deno with [`esm.sh`][esmsh]:

```js
import {reporterJson} from 'https://esm.sh/vfile-reporter-json@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {reporterJson} from 'https://esm.sh/vfile-reporter-json@3?bundle'
</script>
```

## Use

```js
import {VFile} from 'vfile'
import {reporterJson} from '@stackline/vfile-reporter-json'

const one = new VFile({path: 'test/fixture/1.js'})
const two = new VFile({path: 'test/fixture/2.js'})

one.message('Warning!', {line: 2, column: 4})

console.log(reporterJson([one, two]))
```

Yields:

```json
[{"path":"test/fixture/1.js","cwd":"/Users/tilde/projects/oss/vfile-reporter-json","history":["test/fixture/1.js"],"messages":[{"reason":"Warning!","line":2,"column":4,"position":{"start":{"line":2,"column":4},"end":{"line":null,"column":null}},"ruleId":null,"source":null,"fatal":false,"stack":null}]},{"path":"test/fixture/2.js","cwd":"/Users/tilde/projects/oss/vfile-reporter-json","history":["test/fixture/2.js"],"messages":[]}]
```

## API

This package exports the identifier [`reporterJson`][api-reporter-json].
That identifier is also the default export.

### `reporterJson(files[, options])`

Create a **serialized** JSON report from one file or multiple files.

###### Parameters

*   `files` ([`VFile`][vfile] or `Array<VFile>`)
    — file or files to report
*   `options` ([`Options`][api-options], optional)
    — configuration

###### Returns

Report as serialized JSON (`string`).

Reporters must return strings, which is why serialized JSON is exposed.
You can parse the result with `JSON.parse`, in which case you will get
[`Array<JsonFile>`][api-json-file].

### `JsonFile`

JSON file (TypeScript type).

###### Fields

*   `path` (`string`)
    — full path (example: `'~/index.min.js'`)
*   `cwd` (`string`)
    — base of `path`
*   `history` (`Array<string>`)
    — list of filepaths the file moved between; the first is the original path
    and the last is the current path
*   `messages` ([`Array<JsonMessage>`][api-json-message])
    — list of filepaths the file moved between; the first is the original path
    and the last is the current path

### `JsonMessage`

JSON message (TypeScript type).

###### Fields

*   `stack` (`string | null`)
    — stack of message; this is used by normal errors to show where something
    happened in programming code
*   `reason` (`string`)
    — reason for message; you should use markdown
*   `fatal` (`boolean | null | undefined`)
    — state of problem; `true` marks associated file as no longer processable
    (error); `false` necessitates a (potential) change (warning);
    `null | undefined` for things that might not need changing (info)
*   `line` (`number | null`)
    — starting line of error
*   `column` (`number | null`)
    — starting column of error
*   `position` (`Position | null`)
    — full unist position
*   `source` (`string | null`)
    — namespace of message (example: `'my-package'`)
*   `ruleId` (`string | null`)
    — category of message (example: `'my-rule'`)
*   `actual` (`string | null | undefined`)
    — specify the source value that’s being reported, which is deemed incorrect
*   `expected` (`Array<string> | null | undefined`)
    — suggest acceptable values that can be used instead of `actual`
*   `url` (`string | null | undefined`)
    — link to docs for the message; this must be an absolute URL that can be
    passed as `x` to `new URL(x)`
*   `note` (`string | null | undefined`)
    — long form description of the message (should use markdown)

### `Options`

Configuration (TypeScript type).

###### Fields

*   `pretty` (`number | string | boolean`, default: `0`)
    — value of `space` of
    [`JSON.stringify(x, undefined, space)`][json-stringify]
*   `quiet` (`boolean`, default: `false`)
    — do not show files without messages
*   `silent` (`boolean`, default: `false`)
    — show errors only; this does not show info and warning messages; also sets
    `quiet` to `true`

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`JsonFile`][api-json-file],
[`JsonMessage`][api-json-message], and [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Contribute

See [`contributing.md`][contributing] in [`vfile/.github`][health] for ways to
get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]



[build-badge]: https://github.com/vfile/vfile-reporter-json/workflows/main/badge.svg

[build]: https://github.com/vfile/vfile-reporter-json/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/vfile/vfile-reporter-json.svg

[coverage]: https://codecov.io/github/vfile/vfile-reporter-json

[downloads-badge]: https://img.shields.io/npm/dm/vfile-reporter-json.svg

[downloads]: https://www.npmjs.com/package/vfile-reporter-json

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/vfile/vfile/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[contributing]: https://github.com/vfile/.github/blob/main/contributing.md

[support]: https://github.com/vfile/.github/blob/main/support.md

[health]: https://github.com/vfile/.github

[coc]: https://github.com/vfile/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[vfile]: https://github.com/vfile/vfile

[vfile-reporter]: https://github.com/vfile/vfile-reporter

[json-stringify]: https://developer.mozilla.org/JavaScript/Reference/Global_Objects/JSON/stringify

[api-reporter-json]: #reporterjsonfiles-options

[api-json-file]: #jsonfile

[api-json-message]: #jsonmessage

[api-options]: #options

## Credits and original authors

- Original project: [vfile-reporter-json](https://github.com/vfile/vfile-reporter-json).
- Titus Wormer.
- Copyright (c) 2016 Titus Wormer <tituswormer@gmail.com>.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
