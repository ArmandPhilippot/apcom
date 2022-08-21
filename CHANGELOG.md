# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/ArmandPhilippot/apcom/compare/v1.1.0...v2.0.0) (2022-08-21)

### ⚠ BREAKING CHANGES

- rewrite most of the Typescript types, so the content format (the meta in particular) needs to be updated.

### Bug Fixes

- **article:** prevent TypeError on build ([baac7d6](https://github.com/ArmandPhilippot/apcom/commit/baac7d6eeaf522ff5faa28906cb1200e60a19c07))
- close Ackee tooltip on button click ([ef24078](https://github.com/ArmandPhilippot/apcom/commit/ef2407832202e5451751e26459e6bdcdbd152122))
- **comments:** allow a depth of 2 instead of 1 ([70bd37f](https://github.com/ArmandPhilippot/apcom/commit/70bd37fe14d4e0c1538291fa97b0522ab6d20941))
- **comments:** load all comments on a post ([a3eb518](https://github.com/ArmandPhilippot/apcom/commit/a3eb518dcccaebd0f48c708c189ad2fcb07f0f73))
- **comments:** refresh comments on changes or new comment ([fe3922d](https://github.com/ArmandPhilippot/apcom/commit/fe3922d039bdb5d4c063bc73543abc53a57d8464))
- convert undefined into null inside GetStaticProps ([f347cc1](https://github.com/ArmandPhilippot/apcom/commit/f347cc1e4ae32289198d698f05f84119a708b599))
- ensure all topics/thematics have the base url ([c51b5d9](https://github.com/ArmandPhilippot/apcom/commit/c51b5d9a5f217f8aa59c4bdcb04eb3c87f5129b3))
- ensure radio buttons are accessible ([7a87565](https://github.com/ArmandPhilippot/apcom/commit/7a875655daf9dfa0b4803e287ae59b37ffe4f342))
- improve help button accessibility with aria-pressed ([d7fa0a1](https://github.com/ArmandPhilippot/apcom/commit/d7fa0a16bebbb58e842f28396a0973f16a060996))
- improve settings accessibility ([#18](https://github.com/ArmandPhilippot/apcom/issues/18)) ([a8af53c](https://github.com/ArmandPhilippot/apcom/commit/a8af53c118478e6ed68975c32cc1202b7c7b798e))
- **media-queries:** use pixel based media queries ([b9f3024](https://github.com/ArmandPhilippot/apcom/commit/b9f3024987404e3617afcb0c0ff29e0944fa945b))
- **projects:** do not transform pre to Code component ([d0f2898](https://github.com/ArmandPhilippot/apcom/commit/d0f2898b91fe8fb2f58d96da6b52cf618b8d4e3b))
- render all images unoptimized in Storybook ([321dae4](https://github.com/ArmandPhilippot/apcom/commit/321dae4a47594af83269fa560b375965d7f35763))
- reset focus to top of the page on route change ([4ac14de](https://github.com/ArmandPhilippot/apcom/commit/4ac14dec8288183d930684fa07463994f561eecc))
- **settings:** avoid cropped tooltip on small devices ([cfdddac](https://github.com/ArmandPhilippot/apcom/commit/cfdddac43f10d06a8b0e9bcf69dc0ce77ce16649))
- **settings:** close tooltip when modal is closing ([58cb40f](https://github.com/ArmandPhilippot/apcom/commit/58cb40f031f395ca9efccff674ba0f2dae723f50))
- **settings:** reduce font-size on small devices ([36d1294](https://github.com/ArmandPhilippot/apcom/commit/36d129414b696bd2a633d379cac1dff867f64413))
- **storybook:** create a fake wrapper for Table of Contents story ([abdcc01](https://github.com/ArmandPhilippot/apcom/commit/abdcc01386fff0c1caa5d290cffcb0c5be906900))
- update CSP for media src ([e305cbb](https://github.com/ArmandPhilippot/apcom/commit/e305cbbdbc49af575e25957f6ab72ccf944339ec))

- use storybook and atomic design ([#16](https://github.com/ArmandPhilippot/apcom/issues/16)) ([c85ab5a](https://github.com/ArmandPhilippot/apcom/commit/c85ab5ad43ccf52881ee224672c41ec30021cf48))

## [1.1.0](https://github.com/ArmandPhilippot/apcom/compare/v1.0.0...v1.1.0) (2022-03-11)

### Features

- add HTTP security headers ([9eae470](https://github.com/ArmandPhilippot/apcom/commit/9eae4703c97c50e82d959a3e0859fe1553889b15))
- improve Ackee tracking ([#11](https://github.com/ArmandPhilippot/apcom/issues/11)) ([84903c1](https://github.com/ArmandPhilippot/apcom/commit/84903c1e5182124b1bb618b7d8754cb70d0a6647))
- provide pagination for users with js disabled ([#13](https://github.com/ArmandPhilippot/apcom/issues/13)) ([5b6639a](https://github.com/ArmandPhilippot/apcom/commit/5b6639a3cf9b6c63045cb82e6ef1a43b0742c367))
- replace Matomo with Ackee ([f18fe8c](https://github.com/ArmandPhilippot/apcom/commit/f18fe8caa611e9273c5504fa81522e1ac93b95d2))
- use Docker in production ([#12](https://github.com/ArmandPhilippot/apcom/issues/12)) ([774d5b4](https://github.com/ArmandPhilippot/apcom/commit/774d5b4c538d93889bf743b6cd7d01a85f8715e6))

### Bug Fixes

- add a spinner if blog page is loading ([555cf2f](https://github.com/ArmandPhilippot/apcom/commit/555cf2f748b88c47172e4292d438a91c01387f00))
- allow Ackee domain in CSP connect-src ([629483e](https://github.com/ArmandPhilippot/apcom/commit/629483ef7415a00bebfcfc44574e54dcc1283eef))
- **animations:** avoid zomm in/out effect on mobile ([c0a15ff](https://github.com/ArmandPhilippot/apcom/commit/c0a15ffdb798b7c9567827095cf1154614ca6fc4))
- improve Ackee tooltip display on small screen ([6d99a30](https://github.com/ArmandPhilippot/apcom/commit/6d99a308924a3ef286e2de6537a8733388527441))
- make schema.org markup valid ([#4](https://github.com/ArmandPhilippot/apcom/issues/4)) ([a9dce09](https://github.com/ArmandPhilippot/apcom/commit/a9dce097f6a076f243869a495d9ab6d9ddf6ecd2))
- **meta:** display full meta if posts count equal zero ([5b11726](https://github.com/ArmandPhilippot/apcom/commit/5b1172662662df1bc8a05dadda14ac9fd827c347))
- prevent cropped plus/minus icon on widgets ([#8](https://github.com/ArmandPhilippot/apcom/issues/8)) ([c0f7c1c](https://github.com/ArmandPhilippot/apcom/commit/c0f7c1c22749b66a0ec588753e7f705f3ca4224e))
- translate Ackee tooltip title ([2f1de56](https://github.com/ArmandPhilippot/apcom/commit/2f1de56509948e4aecac058adeb07c3502bdf818))
- typo in CSP ([94efbf7](https://github.com/ArmandPhilippot/apcom/commit/94efbf764afc9a2d0f9ababcfe43b50190ad8c32))
- typo in french translation ([3f5f175](https://github.com/ArmandPhilippot/apcom/commit/3f5f175ccab7e5f934cdd22808626d5547a27e0f))
- update content security policy ([#5](https://github.com/ArmandPhilippot/apcom/issues/5)) ([0c76e41](https://github.com/ArmandPhilippot/apcom/commit/0c76e4165bcdf688fabc52d585c6cec5ac568b90))
- update icons path in manifest ([4c7ba0a](https://github.com/ArmandPhilippot/apcom/commit/4c7ba0ac4b13fea4e6cb78481177ac7feca895ea))
- update wordpress gallery block styles ([588f76e](https://github.com/ArmandPhilippot/apcom/commit/588f76ecaaaa80159dbbadce9603f2da32953b3a))

## 1.0.0 (2022-02-15)

### Features

- add a setting to disable animations and transitions ([d42f9e3](https://github.com/ArmandPhilippot/apcom/commit/d42f9e348261fd1738e7977db89b06007ec8da10))
- add a sitemap ([d7df049](https://github.com/ArmandPhilippot/apcom/commit/d7df049ef40d4028ac5616f8bbe366d1476404de))
- add feeds (rss, atom, json) ([02ee023](https://github.com/ArmandPhilippot/apcom/commit/02ee023272c4f28fd866de40dd2b15a7f7b75a4a))
- **i18n:** replace linguijs with formatjs ([8fb5e4e](https://github.com/ArmandPhilippot/apcom/commit/8fb5e4ef3ae925ebc6622711fb5c8c6147642cbc))
- implement dark mode ([68138f0](https://github.com/ArmandPhilippot/apcom/commit/68138f0dcd8b3db2c23b31a20508726f245b5ba5))
- use mdx for pages ([ef79122](https://github.com/ArmandPhilippot/apcom/commit/ef7912256cb4765d553b002c24b9752c2d5096ac))

### Bug Fixes

- **back-to-top:** set translate with percentage ([5b1ecb1](https://github.com/ArmandPhilippot/apcom/commit/5b1ecb1990463889bc736029fcbe38d0756141db))
- change branding title tag on homepage ([0bc323a](https://github.com/ArmandPhilippot/apcom/commit/0bc323a777a607090af87636026f668104cf8a0c))
- check for undefined meta in post header ([09e0e2d](https://github.com/ArmandPhilippot/apcom/commit/09e0e2d1569e5098c960299746f7b8632e9b35f3))
- disable animations and transitions on pseudo elements ([8952a0c](https://github.com/ArmandPhilippot/apcom/commit/8952a0ce097405d3c66eff2b6c70a5bd139435e5))
- handle getStaticPaths fallback ([8233de7](https://github.com/ArmandPhilippot/apcom/commit/8233de7c5355f502eb335d00682c42e2f8dde456))
- handle translation with lingui ([2bae7c4](https://github.com/ArmandPhilippot/apcom/commit/2bae7c43764df5678fe2fc2e68be11ae95d85a41))
- keep logo consistent on zoom ([4d0b13d](https://github.com/ArmandPhilippot/apcom/commit/4d0b13d22be1297c91316d5e52c8fb30ded5c7dd))
- make links pseudo elements consistent between browsers ([a93b026](https://github.com/ArmandPhilippot/apcom/commit/a93b026af98ef5d20f242633871a2b222eb090b5))
- make progress bar styles consistent between browsers ([44a7232](https://github.com/ArmandPhilippot/apcom/commit/44a72320927ee3752ae600829c0c618b68e0f19d))
- open toolbar menu without double click ([68d93a6](https://github.com/ArmandPhilippot/apcom/commit/68d93a6310938f5dda378e9185cdfb0086f90de8))
- prevent content to be printed before transition end ([c69c107](https://github.com/ArmandPhilippot/apcom/commit/c69c107de84aa3b2cdbf0ed087d0314f22d30b18))
- **prism:** translate toolbar buttons on single article pages ([0565c01](https://github.com/ArmandPhilippot/apcom/commit/0565c019c77e4c67876dec5bd099a9de4564da30))
- **project:** make sure the project cover is displayed ([e9c68e4](https://github.com/ArmandPhilippot/apcom/commit/e9c68e4b3ddcfe638bc611f421d55f372e0100e9))
- remove focus on route change ([010e2e6](https://github.com/ArmandPhilippot/apcom/commit/010e2e68568b3894fcaefc1f7c735b810a29a5c4))
- replace dynamic import with require ([1ecc808](https://github.com/ArmandPhilippot/apcom/commit/1ecc8089dd1f90ee20064cfda39855fc8805e9cf))
- set current project title in breadcrumb ([657d11c](https://github.com/ArmandPhilippot/apcom/commit/657d11ce72c905832b9b169354352f521f42207a))
- switch prism theme on single article ([e83d13b](https://github.com/ArmandPhilippot/apcom/commit/e83d13bbbe4a7d19371a5be6782bd592a6ee7406))
- **toc:** render on each route change and exclude aside titles ([99014e5](https://github.com/ArmandPhilippot/apcom/commit/99014e5634c6216173bf90117750f95172924134))
- translate Prism toolbar buttons on MDX code blocks ([a070feb](https://github.com/ArmandPhilippot/apcom/commit/a070febae56f08b744079ebf52874fc8c0c51af9))
- typo in branding animation ([82de06b](https://github.com/ArmandPhilippot/apcom/commit/82de06b1bda8a9213d1147029e8a404084bf486e))
- update comments list when a new comment is send ([637350e](https://github.com/ArmandPhilippot/apcom/commit/637350e4d152de1346857d645bda8443900ec6f4))
- use state to define hostname in sharing component ([6917a57](https://github.com/ArmandPhilippot/apcom/commit/6917a572011489aafe62c9d2479615cb2928094f))
- **widget:** remove items limit for ThematicsList and TopicsList ([1a74d19](https://github.com/ArmandPhilippot/apcom/commit/1a74d19cf4ad080e822e84472288c701ce001e60))
