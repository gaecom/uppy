# @uppy/companion

## 3.7.1

Released: 2022-07-27
Included in: Uppy v2.13.1

- @uppy/companion: Companion app type (Mikael Finstad / #3899)

## 3.7.0

Released: 2022-07-06
Included in: Uppy v2.12.2

- @uppy/companion: Getkey safe behavior (Mikael Finstad / #3592)
- @uppy/companion: doc: fix Google Drive example (Antoine du Hamel / #3855)
- @uppy/companion: build an ARM64 container (Stuart Auld / #3841)

## 3.6.0

Released: 2022-05-30
Included in: Uppy v2.11.0

- @uppy/companion: expire redis keys after 1 day (Mikael Finstad / #3771)
- @uppy/companion: fix some linter warnings (Antoine du Hamel / #3752)

## 3.5.2

Released: 2022-04-27
Included in: Uppy v2.9.5

- @uppy/companion: Bump moment from 2.29.1 to 2.29.2 (dependabot[bot] / #3635)

## 3.5.0

Released: 2022-03-24
Included in: Uppy v2.9.0

- @uppy/companion: Companion server upload events (Mikael Finstad / #3544)
- @uppy/companion: fix `yarn test` command (Antoine du Hamel / #3590)
- @uppy/companion: Allow setting no ACL (Mikael Finstad / #3577)
- @uppy/companion: Small companion code and doc changes (Mikael Finstad / #3586)

## 3.4.0

Released: 2022-03-16
Included in: Uppy v2.8.0

- @uppy/companion: always log errors with stack trace (Mikael Finstad / #3573)
- @uppy/companion: Companion refactor (Mikael Finstad / #3542)
- @uppy/companion: Fetch all Google Drive shared drives (Robert DiMartino / #3553)
- @uppy/companion: Order Google Drive results by folder to show all folders first (Robert DiMartino / #3546)
- @uppy/companion: upgrade node-redis-pubsub (Mikael Finstad / #3541)
- @uppy/companion: reorder reqToOptions (Antoine du Hamel / #3530)

## 3.3.1

Released: 2022-03-02
Included in: Uppy v2.7.0

- @uppy/companion: fix unstable test (Mikael Finstad)
- @uppy/companion: replace debug (Mikael Finstad)
- @uppy/companion: Fix COMPANION_PATH (Mikael Finstad / #3515)
- @uppy/companion: Upload protocol "s3-multipart" does not use the chunkSize option (Gabi Ganam / #3511)

## 3.3.0

Released: 2022-02-17
Included in: Uppy v2.6.0

- @uppy/companion: fix unpslash author meta, sanitize metadata to strings and improve companion tests (Mikael Finstad / #3478)

## 3.2.1

Released: 2022-02-16
Included in: Uppy v2.5.1

- @uppy/companion: fix periodicPingUrls oops (Mikael Finstad / #3490)

## 3.2.0

Released: 2022-02-14
Included in: Uppy v2.5.0

- @uppy/companion: add support for COMPANION_UNSPLASH_SECRET (Mikael Finstad / #3463)
- @uppy/companion-client,@uppy/companion,@uppy/provider-views,@uppy/robodog: Finishing touches on Companion dynamic Oauth (Renée Kooi / #2802)
- @uppy/companion: fix broken thumbnails for box and dropbox (Mikael Finstad / #3460)
- @uppy/companion: Implement periodic ping functionality (Mikael Finstad / #3246)
- @uppy/companion: fix callback urls (Mikael Finstad / #3458)
- @uppy/companion: Fix TypeError when invalid initialization vector (Julian Gruber / #3416)
- @uppy/companion: Default to HEAD requests when the Companion looks to get meta information about a URL (Zack Bloom / #3417)

## 3.1.5

Released: 2022-01-04
Included in: Uppy v2.3.3

- @uppy/companion: improve private ip check (Mikael Finstad / #3403)

## 3.1.4

Released: 2021-12-21
Included in: Uppy v2.3.2

- @uppy/angular,@uppy/companion,@uppy/svelte,@uppy/vue: add `.npmignore` files to ignore `.gitignore` when packing (Antoine du Hamel / #3380)
- @uppy/companion: Upgrade ws in companion (Merlijn Vos / #3377)

## 3.1.3

Released: 2021-12-09
Included in: Uppy v2.3.1

- @uppy/companion: fix Dockerfile and deploy automation (Mikael Finstad / #3355)
- @uppy/companion: don't pin Yarn version in `package.json` (Antoine du Hamel / #3347)

## 3.1.2

Released: 2021-12-07
Included in: Uppy v2.3.0

- @uppy/companion: fix deploy Yarn version (Antoine du Hamel / #3327)
- @uppy/companion: upgrade aws-sdk (Mikael Finstad / #3334)
- @uppy/companion: Remove references of incorrect `options` argument for `companion.socket` (Mikael Finstad / #3307)
- @uppy/companion: Upgrade linting to 2.0.0-0 (Kevin van Zonneveld / #3280)
