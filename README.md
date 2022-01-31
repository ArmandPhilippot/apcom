# APcom

The source code of [my personal website](https://www.armandphilippot.com/).

## Introduction

The website is built with [Next.js](https://nextjs.org/), [WordPress](https://wordpress.org/) as headless CMS and [MDX](https://mdxjs.com/). To translate the website in French, I use [Formatjs](https://formatjs.io/). For syntax highlighting, I use [Prism](https://prismjs.com/). Others dependencies are used, feel free to take a look at `package.json`.

In addition to WordPress, the backend use:

- [ACF](http://advancedcustomfields.com/)
- [acf-post2post](https://github.com/Hube2/acf-post2post)
- [apcom-cpt](https://github.com/ArmandPhilippot/apcom-cpt) (the custom post types used)
- [wp-graphql](https://www.wpgraphql.com/)
- [wp-graphql-content-stats](https://github.com/ArmandPhilippot/wp-graphql-content-stats)
- [wp-graphql-get-extended](https://github.com/ArmandPhilippot/wp-graphql-get-extended)
- [wp-graphql-gravatar](https://github.com/ArmandPhilippot/wp-graphql-gravatar)
- [wp-graphql-send-mail](https://github.com/ashhitch/wp-graphql-send-mail)

## Private dependencies

Even if the source code and the contents are under free licenses, I don't want to see pure clones of my website. So I use a private repo as submodule to handle MDX content. Its structure looks like:

```
/
|--assets/
   |-- image.jpg
   |-- image2.jpg
|--pages/
   |-- page1.mdx
   |-- page2.mdx
|--projects/
   |-- project1.mdx
```

Other contents come from WordPress as headless CMS.

## Development

### First step

Clone this repo, then:

```bash
cp .env.example .env
```

And edit the different values.

### Second step

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Then, you can make your changes.

### i18n

When editing strings that require translation, run:

```bash
yarn run i18n:extract
```

Then copy/edit the corresponding strings inside `src/i18n/fr.json`.

If you need another language:

```bash
cp src/i18n/en.json src/i18n/[locale].json
```

Replace `[locale]` with your desired locale. Then edit this file to translate all the strings.

Once ready, run to update the website translation:

```bash
yarn run i18n:compile
```

## Licenses

The source code is licensed under the [MIT license](./LICENSE).  
The contents are licensed under the [CC BY SA license](https://creativecommons.org/licenses/by-sa/4.0/deed.fr).
