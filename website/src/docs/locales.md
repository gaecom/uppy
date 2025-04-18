---
type: docs
order: 6
title: "Locale Packs"
permalink: docs/locales/
category: "Docs"
body_class: "page-docs-locales"
---

Uppy speaks many languages, English being the default. You can use a locale pack to translate Uppy into your language of choice.

[List of our locale packs](#List-of-locale-packs)

## Using a locale pack from npm

This is the recommded way. Install `@uppy/locales` package from npm, then [choose the locale](#List-of-locale-packs) you’d like to use: `@uppy/locales/lib/LANGUAGE_CODE`.

```bash
npm i @uppy/core @uppy/locales
```

```js
import Uppy from '@uppy/core'
import German from '@uppy/locales/lib/de_DE'
// see below for the full list of locales
const uppy = new Uppy({
  debug: true,
  locale: German,
})
```

## Using a locale pack from CDN

Add a `<script>` tag with Uppy bundle and the locale pack you’d like to use. You can copy/paste the link from the CDN column in the [locales table](#List-of-locale-packs). The locale will attach itself to the `Uppy.locales` object.

```html
<script src="https://releases.transloadit.com/uppy/v2.13.1/uppy.min.js"></script>
<script src="https://releases.transloadit.com/uppy/locales/v2.1.1/de_DE.min.js"></script>

<script>
var uppy = new Uppy.Core({
  debug: true,
  locale: Uppy.locales.de_DE
})
</script>
```

## Overriding locale strings for a specific plugin

Many plugins come with their own locale strings, and the packs we provide consist of most of those strings. You can, however, override a locale string for a specific plugin, regardless of whether you are using locale pack or not. See the plugin documentation for the list of locale strings it uses (for example, [here’s how to use it with the Dashboard UI](https://uppy.io/docs/dashboard/#locale)).

```js
import Uppy from '@uppy/core'
import DragDrop from '@uppy/drag-drop'
import Russian from '@uppy/locales/lib/ru_RU'

const uppy = new Uppy({
  debug: true,
  autoProceed: true,
  locale: Russian,
})
uppy.use(DragDrop, {
  target: '.UppyDragDrop',
  // We are using the ru_RU locale pack (set above in Uppy options),
  // but you can also override specific strings like so:
  locale: {
    strings: {
      browse: 'выберите ;-)',
    },
  },
})
```

## List of locale packs

<!-- md list_of_locale_packs.md -->

## Contributing a new language

If you speak a language we don’t yet support, you can contribute! Here’s how you do it:

1. Go to the [uppy/locales](https://github.com/transloadit/uppy/tree/main/packages/%40uppy/locales/src) directory in the Uppy GitHub repo.
2. Go to `en_US.js` and copy its contents, as English is the most up-to-date locale.
3. Press “Create new file”, name it according to the [`language_COUNTRY` format](http://www.i18nguy.com/unicode/language-identifiers.html), make sure to use underscore `_` as a divider. Examples: `en_US`, `en_GB`, `ru_RU`, `ar_AE`. Variants should be trailing, for example `sr_RS_Latin` for Serbian Latin vs Cyrillic.
4. If your language has different pluralization rules than English, update the `pluralize` implementation. If you are unsure how to do this, please ask us for help in a [GitHub issue](https://github.com/transloadit/uppy/issues/new).
5. Paste what you’ve copied from `en_US.js` and use it as a starting point to translate strings into your language.
6. When you are ready, save the file — this should create a PR that we’ll then review 🎉 Thanks!
