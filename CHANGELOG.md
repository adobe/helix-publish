# [6.4.0](https://github.com/adobe/helix-publish/compare/v6.3.3...v6.4.0) (2020-08-17)


### Features

* **vcl:** add surrogate key for ref ([7f6780d](https://github.com/adobe/helix-publish/commit/7f6780de4a6ae2a56b239a19ded1357982dfbb8f))
* **vcl:** add surrogate keys for repo and url ([43508a4](https://github.com/adobe/helix-publish/commit/43508a4a155f69437b1f4752c6867c1a20f97d25)), closes [#569](https://github.com/adobe/helix-publish/issues/569)

## [6.3.3](https://github.com/adobe/helix-publish/compare/v6.3.2...v6.3.3) (2020-08-14)


### Bug Fixes

* **blocklist:** allow more paths ([9065a52](https://github.com/adobe/helix-publish/commit/9065a5203e76f8aa5eb443fd9f91c7d6b7ce41c4))

## [6.3.2](https://github.com/adobe/helix-publish/compare/v6.3.1...v6.3.2) (2020-08-11)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v8.1.3 ([#568](https://github.com/adobe/helix-publish/issues/568)) ([deba0b8](https://github.com/adobe/helix-publish/commit/deba0b8445e74f11ed5dc86a346fe7048d83b6a0))

## [6.3.1](https://github.com/adobe/helix-publish/compare/v6.3.0...v6.3.1) (2020-08-10)


### Bug Fixes

* **deps:** update [@adobe](https://github.com/adobe) fixes ([866acf7](https://github.com/adobe/helix-publish/commit/866acf74cf735a201a47db760c5c0e649be63af0))

# [6.3.0](https://github.com/adobe/helix-publish/compare/v6.2.0...v6.3.0) (2020-08-10)


### Features

* **static:** allow redirect requests from the outside ([373c016](https://github.com/adobe/helix-publish/commit/373c016292ccfa88a3c035b430577c8eb1a3412e)), closes [#563](https://github.com/adobe/helix-publish/issues/563)

# [6.2.0](https://github.com/adobe/helix-publish/compare/v6.1.14...v6.2.0) (2020-08-09)


### Features

* **blobs:** include SAS token for fetching blobs if configured ([9eeb94b](https://github.com/adobe/helix-publish/commit/9eeb94b6b0e1bf27b29d6eeb95cfd307ddf36633)), closes [#556](https://github.com/adobe/helix-publish/issues/556)

## [6.1.14](https://github.com/adobe/helix-publish/compare/v6.1.13...v6.1.14) (2020-08-08)


### Bug Fixes

* **deps:** update dependency @adobe/fastly-native-promises to v1.17.2 ([9d69704](https://github.com/adobe/helix-publish/commit/9d697044c78c33c2f1971926c23c4c175d0a727c))

## [6.1.13](https://github.com/adobe/helix-publish/compare/v6.1.12...v6.1.13) (2020-08-05)


### Bug Fixes

* **vcl:** block more typical scanning target URLs ([f1ae281](https://github.com/adobe/helix-publish/commit/f1ae281226d49cf7df88bea3841862bbba33983d))
* **vcl:** do not use lookbehind regex ([5ed4179](https://github.com/adobe/helix-publish/commit/5ed4179e4f1189deef28e2b5eaf817e437028707))

## [6.1.12](https://github.com/adobe/helix-publish/compare/v6.1.11...v6.1.12) (2020-08-03)


### Bug Fixes

* **deps:** update dependency @adobe/fastly-native-promises to v1.17.1 ([37fb06b](https://github.com/adobe/helix-publish/commit/37fb06bfb00023c61539f93de86116cc421458b1))

## [6.1.11](https://github.com/adobe/helix-publish/compare/v6.1.10...v6.1.11) (2020-08-03)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.9.0 ([3369d94](https://github.com/adobe/helix-publish/commit/3369d945ae2d1dda68c4b4351035915b777c76db))

## [6.1.10](https://github.com/adobe/helix-publish/compare/v6.1.9...v6.1.10) (2020-07-31)


### Bug Fixes

* **backends:** increase Fastly timeouts ([55a2ad5](https://github.com/adobe/helix-publish/commit/55a2ad54b016a000ea86c296f7b080f86cd4a795))
* **backends:** return to default between bytes timeout ([50d3135](https://github.com/adobe/helix-publish/commit/50d31359b4da7c4d2b208ec05e3b56fe6260d2bf))
* **backends:** use 5 second timeouts ([a4de1d6](https://github.com/adobe/helix-publish/commit/a4de1d66637df2f1aeb78114763e29a2a8eda790))

## [6.1.9](https://github.com/adobe/helix-publish/compare/v6.1.8...v6.1.9) (2020-07-29)


### Bug Fixes

* **deps:** update dependency @adobe/fastly-native-promises to v1.17.0 ([ab36d9c](https://github.com/adobe/helix-publish/commit/ab36d9ce43b39133269616a4b9ba38ac34a0e3a3))

## [6.1.8](https://github.com/adobe/helix-publish/compare/v6.1.7...v6.1.8) (2020-07-27)


### Bug Fixes

* make sure "helix/vcl" ends up being the "main" script ([25f408f](https://github.com/adobe/helix-publish/commit/25f408f3e117b25e2195b98cc288d28ce5837e0a)), closes [#549](https://github.com/adobe/helix-publish/issues/549)
* make sure "helix/vcl" ends up being the "main" script ([bb2cd59](https://github.com/adobe/helix-publish/commit/bb2cd590bc64df86120520e61f64fb49af4ce0e9)), closes [#549](https://github.com/adobe/helix-publish/issues/549)

## [6.1.7](https://github.com/adobe/helix-publish/compare/v6.1.6...v6.1.7) (2020-07-23)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v8.1.2 ([#547](https://github.com/adobe/helix-publish/issues/547)) ([e8af655](https://github.com/adobe/helix-publish/commit/e8af655d38fbb05e5eff6e61c1b8a50f4087dd77))

## [6.1.6](https://github.com/adobe/helix-publish/compare/v6.1.5...v6.1.6) (2020-07-22)


### Bug Fixes

* **deps:** update [@adobe](https://github.com/adobe) fixes ([dd43967](https://github.com/adobe/helix-publish/commit/dd4396732fad8e11d8510aeb33d55f6c6a7e3d20))

## [6.1.5](https://github.com/adobe/helix-publish/compare/v6.1.4...v6.1.5) (2020-07-21)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.10.0 ([#545](https://github.com/adobe/helix-publish/issues/545)) ([b6ff066](https://github.com/adobe/helix-publish/commit/b6ff066063c9ab0bc7519cee3434e28798c0ff11))

## [6.1.4](https://github.com/adobe/helix-publish/compare/v6.1.3...v6.1.4) (2020-07-21)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v8.1.1 ([#544](https://github.com/adobe/helix-publish/issues/544)) ([a7bb17a](https://github.com/adobe/helix-publish/commit/a7bb17afb7723004a2cc9fb9e768b5cf0178077e))

## [6.1.3](https://github.com/adobe/helix-publish/compare/v6.1.2...v6.1.3) (2020-07-20)


### Bug Fixes

* **deps:** update [@adobe](https://github.com/adobe) fixes ([3ad09c5](https://github.com/adobe/helix-publish/commit/3ad09c56149067687be3942aaaac0fd0595a0399))

## [6.1.2](https://github.com/adobe/helix-publish/compare/v6.1.1...v6.1.2) (2020-07-13)


### Bug Fixes

* **deps:** update [@adobe](https://github.com/adobe) fixes ([6ad4e4b](https://github.com/adobe/helix-publish/commit/6ad4e4b835cb482c2800bd35f9e7909979610831))

## [6.1.1](https://github.com/adobe/helix-publish/compare/v6.1.0...v6.1.1) (2020-07-13)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.7.1 ([a8b768e](https://github.com/adobe/helix-publish/commit/a8b768e967b6179ca66b60e0c39db5faa1e82a4f))

# [6.1.0](https://github.com/adobe/helix-publish/compare/v6.0.2...v6.1.0) (2020-07-07)


### Features

* **epsagon:** add fiddle to vcl_error ([26a48a0](https://github.com/adobe/helix-publish/commit/26a48a0524889bf5d0c0f0fe1a6b3c5d31aa22db))
* **epsagon:** add fiddle tracing to vcl_miss ([b893e8f](https://github.com/adobe/helix-publish/commit/b893e8ff71e0fcd56450a2fdd7267fd01d73edb7))
* **epsagon:** add fiddle vars to vcl_deliver ([dd0db69](https://github.com/adobe/helix-publish/commit/dd0db69e91b3183460de3d7cee98af3ded5ef184))
* **epsagon:** add fiddle vars to vcl_pass ([6fe56ed](https://github.com/adobe/helix-publish/commit/6fe56ede21b5ad940c987d15c2c272179117d3cb))
* **epsagon:** add fiddle-like tracing to vcl_hash ([009516a](https://github.com/adobe/helix-publish/commit/009516a8a7316d3d0513ae2689fae644420169cf))
* **epsagon:** add fiddle-like tracing to vcl_hit ([0c79a1e](https://github.com/adobe/helix-publish/commit/0c79a1eeb22bee9fea4adf306fba615fbb3bc132))
* **epsagon:** add new tracing vars from fastly fiddle to vcl_recv ([a032cb7](https://github.com/adobe/helix-publish/commit/a032cb7a080e436ec4bd0c91e76a89b8101e9a1f))

## [6.0.2](https://github.com/adobe/helix-publish/compare/v6.0.1...v6.0.2) (2020-07-02)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.13 ([d9c226a](https://github.com/adobe/helix-publish/commit/d9c226a7d3dd1794222ed1ffcd4dff136fba4351))

## [6.0.1](https://github.com/adobe/helix-publish/compare/v6.0.0...v6.0.1) (2020-07-02)


### Bug Fixes

* **deps:** update dependency @adobe/fastly-native-promises to v1.16.1 ([1fa7a64](https://github.com/adobe/helix-publish/commit/1fa7a643d0490461edeaba7d20fd5eae01bcf16f))

# [6.0.0](https://github.com/adobe/helix-publish/compare/v5.13.17...v6.0.0) (2020-07-02)


### Bug Fixes

* **dispatch:** use new dispatch version ([ff1e8f9](https://github.com/adobe/helix-publish/commit/ff1e8f9d3be8e5941980cc20d0d67278d2a7528d)), closes [#519](https://github.com/adobe/helix-publish/issues/519)


### BREAKING CHANGES

* **dispatch:** uses the new dispatch version that removes dynamic defaults and the README.html directory index

## [5.13.17](https://github.com/adobe/helix-publish/compare/v5.13.16...v5.13.17) (2020-07-02)


### Bug Fixes

* URLs with valid UTF-8 escaped characters are rejected ([#523](https://github.com/adobe/helix-publish/issues/523)) ([fdbffdf](https://github.com/adobe/helix-publish/commit/fdbffdf374f28b339a2a09e8209770a05caef18f))

## [5.13.16](https://github.com/adobe/helix-publish/compare/v5.13.15...v5.13.16) (2020-07-02)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v8.1.0 ([#524](https://github.com/adobe/helix-publish/issues/524)) ([7d54b53](https://github.com/adobe/helix-publish/commit/7d54b53dab833201b24e8ed06aa480fa129827f4))

## [5.13.15](https://github.com/adobe/helix-publish/compare/v5.13.14...v5.13.15) (2020-07-02)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v8 ([#520](https://github.com/adobe/helix-publish/issues/520)) ([ba87af9](https://github.com/adobe/helix-publish/commit/ba87af986b670cc7a83e5df35cfdeb24d457231a))

## [5.13.14](https://github.com/adobe/helix-publish/compare/v5.13.13...v5.13.14) (2020-06-30)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.7.0 ([e81007b](https://github.com/adobe/helix-publish/commit/e81007b9cda80a7c0daf4a2597f1b70a60b830cf))

## [5.13.13](https://github.com/adobe/helix-publish/compare/v5.13.12...v5.13.13) (2020-06-29)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v4.2.3 ([d58a118](https://github.com/adobe/helix-publish/commit/d58a118c50135366a089917f546411beb61af140))

## [5.13.12](https://github.com/adobe/helix-publish/compare/v5.13.11...v5.13.12) (2020-06-27)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.9.0 ([b37ef44](https://github.com/adobe/helix-publish/commit/b37ef44fb7487de922f3290ed80f518171362ad7))

## [5.13.11](https://github.com/adobe/helix-publish/compare/v5.13.10...v5.13.11) (2020-06-27)


### Bug Fixes

* **vcl:** allow frames on same domain ([3ca6b45](https://github.com/adobe/helix-publish/commit/3ca6b45d83667fdf7e7cf07042f7b9d4b11a8944))

## [5.13.10](https://github.com/adobe/helix-publish/compare/v5.13.9...v5.13.10) (2020-06-26)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.8.1 ([575ce48](https://github.com/adobe/helix-publish/commit/575ce482c7d33530f93b2241953c79810c1efe9b))

## [5.13.9](https://github.com/adobe/helix-publish/compare/v5.13.8...v5.13.9) (2020-06-26)


### Bug Fixes

* **vcl:** suppress Age header ([82c13e5](https://github.com/adobe/helix-publish/commit/82c13e5ee0c816f23ad6920591ada115d2598b52)), closes [#506](https://github.com/adobe/helix-publish/issues/506)

## [5.13.8](https://github.com/adobe/helix-publish/compare/v5.13.7...v5.13.8) (2020-06-26)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.8.0 ([d15f6d2](https://github.com/adobe/helix-publish/commit/d15f6d24474434140135e61bcb2694e577d5f656))

## [5.13.7](https://github.com/adobe/helix-publish/compare/v5.13.6...v5.13.7) (2020-06-25)


### Bug Fixes

* **vcl:** Vary on XFH ([be38a96](https://github.com/adobe/helix-publish/commit/be38a96bdd86b9a4eba116a5825b64b0cbed2798))

## [5.13.6](https://github.com/adobe/helix-publish/compare/v5.13.5...v5.13.6) (2020-06-25)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.7.1 ([c58e19d](https://github.com/adobe/helix-publish/commit/c58e19da7a53dde746450f17e7d80ab0b265d638))

## [5.13.5](https://github.com/adobe/helix-publish/compare/v5.13.4...v5.13.5) (2020-06-24)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.7.0 ([551b305](https://github.com/adobe/helix-publish/commit/551b305a2e0f1abb36bd440449fc8d931d24919c))

## [5.13.4](https://github.com/adobe/helix-publish/compare/v5.13.3...v5.13.4) (2020-06-24)


### Bug Fixes

* **frames:** deny usage in frames ([ca77b11](https://github.com/adobe/helix-publish/commit/ca77b11569bed70664131621964256b7ad630630))

## [5.13.3](https://github.com/adobe/helix-publish/compare/v5.13.2...v5.13.3) (2020-06-23)


### Bug Fixes

* **helix.vcl:** fastly-Stats header cannot be removed ([c3ff7bb](https://github.com/adobe/helix-publish/commit/c3ff7bb96631f3b2614f69628c40943283ac192b))
* **helix.vcl:** remove chatty image headers ([da343c8](https://github.com/adobe/helix-publish/commit/da343c8bcef1b6d066d05ad65a0dac687580fd41)), closes [#502](https://github.com/adobe/helix-publish/issues/502)

## [5.13.2](https://github.com/adobe/helix-publish/compare/v5.13.1...v5.13.2) (2020-06-19)


### Bug Fixes

* **docs:** trigger re deploy ([1176e68](https://github.com/adobe/helix-publish/commit/1176e68fd919016c76d6e1ca775973cd132e1c71)), closes [#498](https://github.com/adobe/helix-publish/issues/498) [#500](https://github.com/adobe/helix-publish/issues/500)

## [5.13.1](https://github.com/adobe/helix-publish/compare/v5.13.0...v5.13.1) (2020-06-18)


### Bug Fixes

* **vcl:** keep last-activation-id around for epsagon ([59eb429](https://github.com/adobe/helix-publish/commit/59eb42903a6729d2be61657f1e4bf8acdf8c9343))
* **vcl:** relax the block list a bit for ESI ([fc4b039](https://github.com/adobe/helix-publish/commit/fc4b0390af91bfa23c4a99d5cb60d2a47b2df48a))

# [5.13.0](https://github.com/adobe/helix-publish/compare/v5.12.0...v5.13.0) (2020-06-17)


### Bug Fixes

* **vcl:** escape % with %25 ([80ead00](https://github.com/adobe/helix-publish/commit/80ead00b5a7384278bc30b21cea0bdaf481da7a4))
* **vcl:** escape percent sign ([fb5041c](https://github.com/adobe/helix-publish/commit/fb5041ce3aacc1777adfc70027e7bdba877a9ce4))
* **vcl:** one more percent sign to escape ([21786b5](https://github.com/adobe/helix-publish/commit/21786b5e277712da104de58f15452516fbe51dac))
* **vcl-parser:** deal with comments al line end ([c4d441b](https://github.com/adobe/helix-publish/commit/c4d441bccbb96fd0e4330c331032a6eea1b4c803))


### Features

* **vcl:** block requests by URL pattern ([deb83e0](https://github.com/adobe/helix-publish/commit/deb83e082ec154f24223dc408344ecd03a3e1adc))

# [5.12.0](https://github.com/adobe/helix-publish/compare/v5.11.0...v5.12.0) (2020-06-16)


### Bug Fixes

* **content-proxy:** fix vcl syntax ([8a20cb8](https://github.com/adobe/helix-publish/commit/8a20cb831499d414b73fcad874ffdff31aa6d08e))
* **deps:** update dependency @adobe/helix-epsagon to v1.3.12 ([bf5da58](https://github.com/adobe/helix-publish/commit/bf5da583e96645309c6df27a81619eb705cc5dff))


### Features

* **content-proxy:** pass along querybuilder parameters ([c0002f4](https://github.com/adobe/helix-publish/commit/c0002f4221da58fd76fa89c310c29a961bd2d268))

# [5.11.0](https://github.com/adobe/helix-publish/compare/v5.10.4...v5.11.0) (2020-06-15)


### Features

* **epsagon:** set token header ([5ff853c](https://github.com/adobe/helix-publish/commit/5ff853c02153e2ba9ca3eadc1a37a5700231b709))

## [5.10.4](https://github.com/adobe/helix-publish/compare/v5.10.3...v5.10.4) (2020-06-15)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.6.0 ([1d5f83d](https://github.com/adobe/helix-publish/commit/1d5f83db89b475f84c29e795b53c94e2c0757b63))

## [5.10.3](https://github.com/adobe/helix-publish/compare/v5.10.2...v5.10.3) (2020-06-15)


### Bug Fixes

* **epsagon:** add method (again) ([1e8a2ce](https://github.com/adobe/helix-publish/commit/1e8a2cececfaba825aa352108d60c2e19dfde567))

## [5.10.2](https://github.com/adobe/helix-publish/compare/v5.10.1...v5.10.2) (2020-06-13)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.11 ([25e8c15](https://github.com/adobe/helix-publish/commit/25e8c1530b80980d5413a93247c93d882a016dfd))

## [5.10.1](https://github.com/adobe/helix-publish/compare/v5.10.0...v5.10.1) (2020-06-12)


### Bug Fixes

* **epsagon:** add data (compressed) ([73c81a0](https://github.com/adobe/helix-publish/commit/73c81a0579ef90eb78ea4cd458fb86e411a92f0c))
* **epsagon:** add some basic info back in ([1000374](https://github.com/adobe/helix-publish/commit/100037450bd5d35577fba6c87242e0ccf50aacee))
* **epsagon:** do not urlencode ([4f58f97](https://github.com/adobe/helix-publish/commit/4f58f970df72e9d1a391b3f86aa2e7a55935caba))
* **epsagon:** exclude all data ([28ada0f](https://github.com/adobe/helix-publish/commit/28ada0fcb1d9e9c3c2f7903fae7ff2c6bc890fb0)), closes [#480](https://github.com/adobe/helix-publish/issues/480)
* **epsagon:** further reduce size ([11f90ae](https://github.com/adobe/helix-publish/commit/11f90ae4825de87712d463548650dd885e3d12dc))
* **epsagon:** minimize schema ([48a9954](https://github.com/adobe/helix-publish/commit/48a9954972588031412042425767afb7667245b1))
* **epsagon:** reduce log size ([45415d2](https://github.com/adobe/helix-publish/commit/45415d2924a3e15dfb5d6eed4544c05031161a26)), closes [#480](https://github.com/adobe/helix-publish/issues/480)
* **epsagon:** send less data ([ae776d4](https://github.com/adobe/helix-publish/commit/ae776d45faa8eda078c54170cb115555c48c8f1a))
* **epsagon:** send more data ([e2a5505](https://github.com/adobe/helix-publish/commit/e2a550523d6839bcc308b9ca5ecf5cc72bdc718b))
* **epsagon:** trace fastly state ([9195088](https://github.com/adobe/helix-publish/commit/9195088916ff71499722516790a72214815b3162))
* **epsagon:** trace only VCL functions ([4550bbc](https://github.com/adobe/helix-publish/commit/4550bbc83028bc9938c0dd7c323ef92922cb8881))
* **epsagon:** use urlencode instead of json encode ([0ded9b6](https://github.com/adobe/helix-publish/commit/0ded9b6b268c20f7adc82c2d2d755e5a2db16be7))

# [5.10.0](https://github.com/adobe/helix-publish/compare/v5.9.0...v5.10.0) (2020-06-11)


### Features

* **epsagon:** trace HTTP method ([f9277d0](https://github.com/adobe/helix-publish/commit/f9277d068847e222147eee3af160ddb63c44fb8a)), closes [#482](https://github.com/adobe/helix-publish/issues/482)

# [5.9.0](https://github.com/adobe/helix-publish/compare/v5.8.2...v5.9.0) (2020-06-11)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.10 ([8758b0b](https://github.com/adobe/helix-publish/commit/8758b0b1e41dfc900325d35265752d272af3218a))


### Features

* **vcl:** enable content proxy for json ([b32397e](https://github.com/adobe/helix-publish/commit/b32397e94035fa475bdbbc4fdb0925d8c229a701))

## [5.8.2](https://github.com/adobe/helix-publish/compare/v5.8.1...v5.8.2) (2020-06-09)


### Bug Fixes

* **deps:** update dependency p-limit to v3 ([#477](https://github.com/adobe/helix-publish/issues/477)) ([72c51c7](https://github.com/adobe/helix-publish/commit/72c51c74078706af57935afc26b89cd0e543a562))

## [5.8.1](https://github.com/adobe/helix-publish/compare/v5.8.0...v5.8.1) (2020-06-08)


### Bug Fixes

* **deps:** pin dependency p-limit to 2.3.0 ([7203f88](https://github.com/adobe/helix-publish/commit/7203f8808788ed5567dd636786fad8d509f0f856))
* **epsagon:** escape strings in json ([cd2fd54](https://github.com/adobe/helix-publish/commit/cd2fd5421a11764253c945d68e4fd8ece94656ff))

# [5.8.0](https://github.com/adobe/helix-publish/compare/v5.7.7...v5.8.0) (2020-06-08)


### Bug Fixes

* **content:** do not allow raw content to override cgi-bin or queries ([245a0e4](https://github.com/adobe/helix-publish/commit/245a0e4b8ef6eb30d39148765a0e9483fdb22c79))
* **content:** fix VCL syntax ([88612fe](https://github.com/adobe/helix-publish/commit/88612fec06970c95df677a8ea6944f5e1ec89cf3))
* **content:** ref in URL can override ref in strain ([736f60e](https://github.com/adobe/helix-publish/commit/736f60ebeb832dc37a9c5b430c4da53501423d4d))
* **content:** use correct url ([ec8ff87](https://github.com/adobe/helix-publish/commit/ec8ff87e58aba781b47343765b147c608d8989e8))
* **dictionaries:** reduce paralellism when updating dictionaries ([4cbeeeb](https://github.com/adobe/helix-publish/commit/4cbeeeb0b656e503b5110d176211f01721bc91c5))
* **http:** report timeouts ([779d400](https://github.com/adobe/helix-publish/commit/779d400e625aa4872adaa4367c2efefa4e922838))


### Features

* **vcl:** add support for helix-content-proxy and create new request type ([ae8f1ff](https://github.com/adobe/helix-publish/commit/ae8f1ff6c3b8e3ffd566023c631884b870f1a1b6))
* **vcl:** send md requests to content proxy request type ([6246771](https://github.com/adobe/helix-publish/commit/6246771cb42840b4fbc069bd6dae21e6989b921b))

## [5.7.7](https://github.com/adobe/helix-publish/compare/v5.7.6...v5.7.7) (2020-06-08)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.5.0 ([0edb0f4](https://github.com/adobe/helix-publish/commit/0edb0f4f44fbd6e16d10229dc8306c40cbc3a5d0))

## [5.7.6](https://github.com/adobe/helix-publish/compare/v5.7.5...v5.7.6) (2020-06-08)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.9 ([6f24d32](https://github.com/adobe/helix-publish/commit/6f24d32bad76c014b132db506919a39f4520bb1d))

## [5.7.5](https://github.com/adobe/helix-publish/compare/v5.7.4...v5.7.5) (2020-06-08)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.8 ([ff460f1](https://github.com/adobe/helix-publish/commit/ff460f1bb9ce75b6efb7b917bb25e391da893517))

## [5.7.4](https://github.com/adobe/helix-publish/compare/v5.7.3...v5.7.4) (2020-06-05)


### Bug Fixes

* **vcl:** forward x-forwarded-host as hlx-forwarded-host to fix runtime ([cc690a2](https://github.com/adobe/helix-publish/commit/cc690a29a073d470abc25f98ef75d7fc50e5c403)), closes [#451](https://github.com/adobe/helix-publish/issues/451)

## [5.7.3](https://github.com/adobe/helix-publish/compare/v5.7.2...v5.7.3) (2020-06-05)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.7 ([575f336](https://github.com/adobe/helix-publish/commit/575f336d56314b5fc036c8e5009c4a0034219098))

## [5.7.2](https://github.com/adobe/helix-publish/compare/v5.7.1...v5.7.2) (2020-06-05)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.6 ([8551440](https://github.com/adobe/helix-publish/commit/855144079d152e16031b9bbf25f329044abbd9a0))

## [5.7.1](https://github.com/adobe/helix-publish/compare/v5.7.0...v5.7.1) (2020-06-03)


### Bug Fixes

* **re-enable-image-optimization-for-dispatch,-static,-and-static-redirect-request-types:** the only request type where it was enabled was hlx-blob ([306ee23](https://github.com/adobe/helix-publish/commit/306ee230808318699220da2ae2e0bcc38be41d4c)), closes [#318](https://github.com/adobe/helix-publish/issues/318)

# [5.7.0](https://github.com/adobe/helix-publish/compare/v5.6.4...v5.7.0) (2020-06-03)


### Features

* **vcl:** add hlx-forwarded-host header ([0d5420a](https://github.com/adobe/helix-publish/commit/0d5420adaa9441d1a2892c36b6d8cb10ccd91a13)), closes [#451](https://github.com/adobe/helix-publish/issues/451)

## [5.6.4](https://github.com/adobe/helix-publish/compare/v5.6.3...v5.6.4) (2020-06-03)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.4.0 ([34ac988](https://github.com/adobe/helix-publish/commit/34ac98876977f889145ad5768f5f2b74c04b4dab))

## [5.6.3](https://github.com/adobe/helix-publish/compare/v5.6.2...v5.6.3) (2020-06-03)


### Bug Fixes

* **vcl:** serve 429 error page when no response body exists ([0ba8b15](https://github.com/adobe/helix-publish/commit/0ba8b15bdbcf26c1453a600379be223c9c3a0c7a))

## [5.6.2](https://github.com/adobe/helix-publish/compare/v5.6.1...v5.6.2) (2020-06-03)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.5 ([a3242f2](https://github.com/adobe/helix-publish/commit/a3242f2426d65f272fea44b657e8140fdf742b45))

## [5.6.1](https://github.com/adobe/helix-publish/compare/v5.6.0...v5.6.1) (2020-06-03)


### Bug Fixes

* **deps:** update dependency @adobe/helix-fetch to v1.6.1 ([#457](https://github.com/adobe/helix-publish/issues/457)) ([21675e8](https://github.com/adobe/helix-publish/commit/21675e8fd6d3e2c3468bd1b0b3b5af513e52fc23))

# [5.6.0](https://github.com/adobe/helix-publish/compare/v5.5.2...v5.6.0) (2020-06-03)


### Features

* **publish:** fix package check ([#425](https://github.com/adobe/helix-publish/issues/425)) ([4eae668](https://github.com/adobe/helix-publish/commit/4eae6684c22a672506310321254a55cb5a1abbaa))

## [5.5.2](https://github.com/adobe/helix-publish/compare/v5.5.1...v5.5.2) (2020-06-02)


### Bug Fixes

* **deps:** update [@adobe](https://github.com/adobe) ([6a88c80](https://github.com/adobe/helix-publish/commit/6a88c80b8e4b23a06c0512ed8cbde220bfa246d9))

## [5.5.1](https://github.com/adobe/helix-publish/compare/v5.5.0...v5.5.1) (2020-06-01)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.3 ([4864d20](https://github.com/adobe/helix-publish/commit/4864d201d5513ef1315b4168a60d7ec040077433))

# [5.5.0](https://github.com/adobe/helix-publish/compare/v5.4.1...v5.5.0) (2020-05-29)


### Bug Fixes

* **epsagon:** fix typo in comment ([ac997ca](https://github.com/adobe/helix-publish/commit/ac997ca98f9afac9f5dc31875f50137f313b6256))
* **epsagon:** instrument vcl before processing includes ([2bf2273](https://github.com/adobe/helix-publish/commit/2bf22732aa423cdc9c6fc81b18a66bf6ab4c67bb))
* **epsagon:** replace esi_level with topurl ([0a66f16](https://github.com/adobe/helix-publish/commit/0a66f1604ff886d0d230315e41771f8c8e390530))
* **epsagon:** use empty string instead of empty object as default log value ([4a2a446](https://github.com/adobe/helix-publish/commit/4a2a446f59da1b348ca63c69ef3c24db7ee38b93))
* **errors:** use correct CSS url syntax ([53a863f](https://github.com/adobe/helix-publish/commit/53a863fb1bd13a296c74ae41ddf6091b78d373b2))
* **errors:** use hotlinked images for error pages ([2063d68](https://github.com/adobe/helix-publish/commit/2063d687e98c9162a9f88a0db1147ae43a962e64))
* **vcl:** fix variable name ([770b02e](https://github.com/adobe/helix-publish/commit/770b02e7e06c8aafb87cba90960e431092f4e2dc))
* **vcl:** x-cdn-request-id is now one character longer ([52785a6](https://github.com/adobe/helix-publish/commit/52785a6144b7b88702531f4ce0e3f5d8c9c82b4f)), closes [/github.com/adobe/helix-publish/pull/446#issuecomment-632021386](https://github.com//github.com/adobe/helix-publish/pull/446/issues/issuecomment-632021386)


### Features

* **epsagon:** allow specifying epsagon application name in parameters ([31a95fc](https://github.com/adobe/helix-publish/commit/31a95fcc4b176c2cf9eec4667405241c625569bf))
* **epsagon:** instrument helix.vcl with espagon logging ([f2dffe2](https://github.com/adobe/helix-publish/commit/f2dffe24dd88ade04fa96a403886aa55ed4f2b46))
* **epsagon:** log all variables that have been set in the sub ([47e9e7f](https://github.com/adobe/helix-publish/commit/47e9e7f349f9f1655ffe579ede872c2eea3e8da8))
* **epsagon:** log more things ([8d2fc87](https://github.com/adobe/helix-publish/commit/8d2fc8738106f28a5f70c55b43baf71140ce532d))
* **epsagon:** maintain ignore and block list of parameters to never trace ([2c019a4](https://github.com/adobe/helix-publish/commit/2c019a416d416a0fddfcd817e4c73fbb72d5bc41))
* **epsagon:** pass x-request-id as well ([7ae33b2](https://github.com/adobe/helix-publish/commit/7ae33b2d1f475eb604129ee973e0ca2a297c2a2d))
* **epsagon:** trace additional variables ([3897674](https://github.com/adobe/helix-publish/commit/3897674a3e445483877ca8560f70467268a6fe40))
* **epsagon:** trace user-agent, accept and referer by default ([1b94a27](https://github.com/adobe/helix-publish/commit/1b94a27e9c2deb037b6cd58d3a06ebf780989081))
* **publish:** add epsagon log configuration if token has been provided ([b60bbbc](https://github.com/adobe/helix-publish/commit/b60bbbc6b7707affd9f8521b59c97bea175b29ad))
* **vcl:** add simple VCL parser for post-processing ([31926fe](https://github.com/adobe/helix-publish/commit/31926fe03b466b65959f359653da8d48abb0ee96))
* **vcl:** track x-request-id ([08dda1e](https://github.com/adobe/helix-publish/commit/08dda1eea6a8cfdc744ad0fde7fb3be3c14ca983)), closes [#305](https://github.com/adobe/helix-publish/issues/305)

## [5.4.1](https://github.com/adobe/helix-publish/compare/v5.4.0...v5.4.1) (2020-05-26)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.2 ([7f074c8](https://github.com/adobe/helix-publish/commit/7f074c8c895ee4613a6fef74916d0c0224de92c5))

# [5.4.0](https://github.com/adobe/helix-publish/compare/v5.3.8...v5.4.0) (2020-05-20)


### Features

* **blob:** support SVG ([5f268b7](https://github.com/adobe/helix-publish/commit/5f268b75118cead56f866536250995e477b7dc1e))

## [5.3.8](https://github.com/adobe/helix-publish/compare/v5.3.7...v5.3.8) (2020-05-18)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.1 ([d25dd19](https://github.com/adobe/helix-publish/commit/d25dd192ed210222defca14cf9759ace526ef4f2))

## [5.3.7](https://github.com/adobe/helix-publish/compare/v5.3.6...v5.3.7) (2020-05-18)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.3.0 ([225084d](https://github.com/adobe/helix-publish/commit/225084d5315d33ee4e09ed9dfb08beb628483094))

## [5.3.6](https://github.com/adobe/helix-publish/compare/v5.3.5...v5.3.6) (2020-05-14)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.3.2 ([3045f3d](https://github.com/adobe/helix-publish/commit/3045f3dd46f9e333b5e48b44e89d1f1696796137))

## [5.3.5](https://github.com/adobe/helix-publish/compare/v5.3.4...v5.3.5) (2020-05-12)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.2.2 ([c36c245](https://github.com/adobe/helix-publish/commit/c36c245fa76a6dc0a5c0db8ed6f228895100a545))

## [5.3.4](https://github.com/adobe/helix-publish/compare/v5.3.3...v5.3.4) (2020-05-07)


### Bug Fixes

* **vcl:** make sure trace is complete and available in synthetic error responses [#383](https://github.com/adobe/helix-publish/issues/383) ([afafd72](https://github.com/adobe/helix-publish/commit/afafd727d8c881e6a194556eb5d4ad8a739a4255))

## [5.3.3](https://github.com/adobe/helix-publish/compare/v5.3.2...v5.3.3) (2020-05-07)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.3.0 ([e624bc6](https://github.com/adobe/helix-publish/commit/e624bc6c701a247c1b147d63c8f8c362d4f8a3cc))

## [5.3.2](https://github.com/adobe/helix-publish/compare/v5.3.1...v5.3.2) (2020-05-07)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.2.1 ([eb9a8dc](https://github.com/adobe/helix-publish/commit/eb9a8dcfe3151a5d8dbbb67e6c479eb74098915a))

## [5.3.1](https://github.com/adobe/helix-publish/compare/v5.3.0...v5.3.1) (2020-05-04)


### Bug Fixes

* **vcl:** a question of taste ([d979535](https://github.com/adobe/helix-publish/commit/d979535d397e93d8c51b9fdc364b606cbbc59989))
* **vcl:** make sure activation id gets logged when serving error pages ([460e9da](https://github.com/adobe/helix-publish/commit/460e9dac9456d18b926f416802df10fe7295eeb4)), closes [#427](https://github.com/adobe/helix-publish/issues/427)

# [5.3.0](https://github.com/adobe/helix-publish/compare/v5.2.3...v5.3.0) (2020-05-04)


### Bug Fixes

* **errors:** show 429 error page for any response body length ([c1933f7](https://github.com/adobe/helix-publish/commit/c1933f7ab3954b2963ecfb07cc84fadf6adc436c))
* **package:** include missing error page ([94f8211](https://github.com/adobe/helix-publish/commit/94f82115d269aeaff4b544f30082c0689ec66c92)), closes [#421](https://github.com/adobe/helix-publish/issues/421)
* **vcl:** stop leaking x-last-activation-id header ([6cf8b2d](https://github.com/adobe/helix-publish/commit/6cf8b2d0ec5b7f8fa50bd3a67e97bf63ba650ae5))


### Features

* **errors:** custom error page for 429 errors ([e90b798](https://github.com/adobe/helix-publish/commit/e90b7989963c7833cb2f6f6f7103b2db9e614ca4)), closes [#421](https://github.com/adobe/helix-publish/issues/421)

## [5.2.3](https://github.com/adobe/helix-publish/compare/v5.2.2...v5.2.3) (2020-04-30)


### Bug Fixes

* **strain:** remove check for no longer supported strain.url ([#429](https://github.com/adobe/helix-publish/issues/429)) ([c4889e9](https://github.com/adobe/helix-publish/commit/c4889e9f68d06bde75fd85c2ab69001521f65f07))
* **strains:** implicit url condition is not backward compatible ([#373](https://github.com/adobe/helix-publish/issues/373)) ([e8c195e](https://github.com/adobe/helix-publish/commit/e8c195e186f641d197c5b3eea5224fbed0de74c1))

## [5.2.2](https://github.com/adobe/helix-publish/compare/v5.2.1...v5.2.2) (2020-04-28)


### Bug Fixes

* **backends:** disable SSL host verification for fonts backend ([#424](https://github.com/adobe/helix-publish/issues/424)) ([3633791](https://github.com/adobe/helix-publish/commit/3633791f94d6c634945efbf73fe29351528703f1))

## [5.2.1](https://github.com/adobe/helix-publish/compare/v5.2.0...v5.2.1) (2020-04-27)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.2.1 ([2b67488](https://github.com/adobe/helix-publish/commit/2b67488ad3e1954c21517702f64c16a081a7bdae))

# [5.2.0](https://github.com/adobe/helix-publish/compare/v5.1.2...v5.2.0) (2020-04-27)


### Bug Fixes

* **checkpkgs:** hotfix ([5150025](https://github.com/adobe/helix-publish/commit/5150025683d8472f7eb5442afab34efadb8afd6e)), closes [#416](https://github.com/adobe/helix-publish/issues/416)


### Features

* **index.js:** enable fallback ([c3afb64](https://github.com/adobe/helix-publish/commit/c3afb64172b21195841522719934cec64bffc8b5)), closes [#394](https://github.com/adobe/helix-publish/issues/394)
* **publish:** add package checking ([df61bd5](https://github.com/adobe/helix-publish/commit/df61bd5c832ee357e08cfe30184de7f452f75327)), closes [#167](https://github.com/adobe/helix-publish/issues/167)

## [5.1.2](https://github.com/adobe/helix-publish/compare/v5.1.1...v5.1.2) (2020-04-24)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.2.0 ([f5d7b03](https://github.com/adobe/helix-publish/commit/f5d7b0322eaf80030222edd5ac5120584d0a796d))

## [5.1.1](https://github.com/adobe/helix-publish/compare/v5.1.0...v5.1.1) (2020-04-24)


### Bug Fixes

* **deps:** update dependency @adobe/fastly-native-promises to v1.16.0 ([5ac8367](https://github.com/adobe/helix-publish/commit/5ac83676237660d678bc80e26cc7dce20c39e5f1))

# [5.1.0](https://github.com/adobe/helix-publish/compare/v5.0.2...v5.1.0) (2020-04-23)


### Features

* **publish:** add package checking ([e9dbb5b](https://github.com/adobe/helix-publish/commit/e9dbb5bae485f007b665e3fed66e1277a8ea411e))

## [5.0.2](https://github.com/adobe/helix-publish/compare/v5.0.1...v5.0.2) (2020-04-22)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7.1.0 ([e92e554](https://github.com/adobe/helix-publish/commit/e92e5546a7f32b5ba67ac7993a17db27da9bc8f1))

## [5.0.1](https://github.com/adobe/helix-publish/compare/v5.0.0...v5.0.1) (2020-04-20)


### Bug Fixes

* **deps:** npm audit fix ([8bd89ad](https://github.com/adobe/helix-publish/commit/8bd89ade158c898805cf3dc9f2021305eae4a322))
* **redirects:** use req.url.path for more robust redirect conditions ([95a17f8](https://github.com/adobe/helix-publish/commit/95a17f8ca2406fa7da7b0d7592f6bda486077518)), closes [#407](https://github.com/adobe/helix-publish/issues/407)

# [5.0.0](https://github.com/adobe/helix-publish/compare/v4.4.7...v5.0.0) (2020-04-16)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v7 ([#402](https://github.com/adobe/helix-publish/issues/402)) ([e2ed09d](https://github.com/adobe/helix-publish/commit/e2ed09d0afdb749532189a05844e00d5b300792d))


### BREAKING CHANGES

* **deps:** strains with url property are no longer supported

## [4.4.7](https://github.com/adobe/helix-publish/compare/v4.4.6...v4.4.7) (2020-04-14)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v7.1.3 ([15ceb0f](https://github.com/adobe/helix-publish/commit/15ceb0fb0e236b0e709e608798265b212e1b78f0))

## [4.4.6](https://github.com/adobe/helix-publish/compare/v4.4.5...v4.4.6) (2020-04-14)


### Bug Fixes

* **deploy:** use helix-services package ([#400](https://github.com/adobe/helix-publish/issues/400)) ([d4ba50a](https://github.com/adobe/helix-publish/commit/d4ba50a3f7df66cd6cbc91d11710b5664cdb6e86))

## [4.4.5](https://github.com/adobe/helix-publish/compare/v4.4.4...v4.4.5) (2020-04-08)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.2.0 ([2f906fa](https://github.com/adobe/helix-publish/commit/2f906fa10dfd4e4c5c35f865c33d043501b89a50))

## [4.4.4](https://github.com/adobe/helix-publish/compare/v4.4.3...v4.4.4) (2020-04-08)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.14 ([f927243](https://github.com/adobe/helix-publish/commit/f927243c2cc69b77009fd84982adf3ba53baf127))

## [4.4.3](https://github.com/adobe/helix-publish/compare/v4.4.2...v4.4.3) (2020-04-07)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.13 ([421925a](https://github.com/adobe/helix-publish/commit/421925aea2e20bb78d0a9ab57f3d649e3fcd29e8))

## [4.4.2](https://github.com/adobe/helix-publish/compare/v4.4.1...v4.4.2) (2020-04-06)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.12 ([f9c2748](https://github.com/adobe/helix-publish/commit/f9c2748988c7c8a0097cd74b03e5273fe504c949))

## [4.4.1](https://github.com/adobe/helix-publish/compare/v4.4.0...v4.4.1) (2020-04-02)


### Bug Fixes

* **deps:** update dependency @adobe/fastly-native-promises to v1.15.1 ([afeb400](https://github.com/adobe/helix-publish/commit/afeb400682a2e43cb3209d87e7894943558faf79))

# [4.4.0](https://github.com/adobe/helix-publish/compare/v4.3.0...v4.4.0) (2020-03-31)


### Features

* **errors:** specific errors handling ([3a1850b](https://github.com/adobe/helix-publish/commit/3a1850b2a73ba63f056be08e0f374ff5a93ab537))

# [4.3.0](https://github.com/adobe/helix-publish/compare/v4.2.0...v4.3.0) (2020-03-31)


### Features

* **helix.vcl:** preserve ow activation id for logging ([def89b6](https://github.com/adobe/helix-publish/commit/def89b6a466163a8c39c95e54c7fef64c73f9ac6))

# [4.2.0](https://github.com/adobe/helix-publish/compare/v4.1.14...v4.2.0) (2020-03-31)


### Features

* **errors:** new error pages for errors 403, 404, 500, 502, 503, 504 ([4ce1a20](https://github.com/adobe/helix-publish/commit/4ce1a20173ffa5f42a081371779f490082c7660f))

## [4.1.14](https://github.com/adobe/helix-publish/compare/v4.1.13...v4.1.14) (2020-03-26)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.11 ([3216872](https://github.com/adobe/helix-publish/commit/321687284d3f8989f591ce8352cf28d6326c2d76))

## [4.1.13](https://github.com/adobe/helix-publish/compare/v4.1.12...v4.1.13) (2020-03-24)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.10 ([ed71ab7](https://github.com/adobe/helix-publish/commit/ed71ab7c179287f809623ca8661111f72b004024))

## [4.1.12](https://github.com/adobe/helix-publish/compare/v4.1.11...v4.1.12) (2020-03-23)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v6.0.5 ([c73830d](https://github.com/adobe/helix-publish/commit/c73830dd69fe0d395013407c7a3d7085712139e2))

## [4.1.11](https://github.com/adobe/helix-publish/compare/v4.1.10...v4.1.11) (2020-03-23)


### Bug Fixes

* **deps:** update dependency fs-extra to v9 ([a98e443](https://github.com/adobe/helix-publish/commit/a98e443b54f49c70f89b1490d48f2ff21633f2a2))

## [4.1.10](https://github.com/adobe/helix-publish/compare/v4.1.9...v4.1.10) (2020-03-23)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.9 ([d589a13](https://github.com/adobe/helix-publish/commit/d589a137518f11ab07a8cf3c86bbd75b6f1b6aaa))

## [4.1.9](https://github.com/adobe/helix-publish/compare/v4.1.8...v4.1.9) (2020-03-19)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.8 ([c327134](https://github.com/adobe/helix-publish/commit/c32713446832c39f2c38726f3bd8eac728ef7dec))

## [4.1.8](https://github.com/adobe/helix-publish/compare/v4.1.7...v4.1.8) (2020-03-17)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v6.0.4 ([39c5700](https://github.com/adobe/helix-publish/commit/39c570068fdac3317256af82c617fae08937b76d))

## [4.1.7](https://github.com/adobe/helix-publish/compare/v4.1.6...v4.1.7) (2020-03-17)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.7 ([3a6e71b](https://github.com/adobe/helix-publish/commit/3a6e71b8f54c2599001a41ff76cb188d18b27be3))

## [4.1.6](https://github.com/adobe/helix-publish/compare/v4.1.5...v4.1.6) (2020-03-16)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.6 ([0f55656](https://github.com/adobe/helix-publish/commit/0f55656867afbdb9c7471db748aff19461dee486))

## [4.1.5](https://github.com/adobe/helix-publish/compare/v4.1.4...v4.1.5) (2020-03-09)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v6.0.3 ([1ed2a4f](https://github.com/adobe/helix-publish/commit/1ed2a4f57dbad0aad6b07958ea79e8eba3c29d62))

## [4.1.4](https://github.com/adobe/helix-publish/compare/v4.1.3...v4.1.4) (2020-03-09)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v4.2.2 ([1611978](https://github.com/adobe/helix-publish/commit/1611978a98873c703191303e2afdd8d3863d85d9))

## [4.1.3](https://github.com/adobe/helix-publish/compare/v4.1.2...v4.1.3) (2020-03-06)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v4.2.1 ([226da4a](https://github.com/adobe/helix-publish/commit/226da4afcc0654bfdb7b2a1ffc0e7006690318d1))

## [4.1.2](https://github.com/adobe/helix-publish/compare/v4.1.1...v4.1.2) (2020-03-06)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v4.2.0 ([6ee7464](https://github.com/adobe/helix-publish/commit/6ee746403f041cd8ca875c32b3479d7dbf61f2ca))

## [4.1.1](https://github.com/adobe/helix-publish/compare/v4.1.0...v4.1.1) (2020-03-04)


### Bug Fixes

* **vcl:** X-CDN-Request-ID pattern typo ([59d88b0](https://github.com/adobe/helix-publish/commit/59d88b0a1b599d6b655d6b966f397dac68f92836))

# [4.1.0](https://github.com/adobe/helix-publish/compare/v4.0.2...v4.1.0) (2020-03-04)


### Features

* **vcl:** add X-CDN-URL with full URL ([86e5716](https://github.com/adobe/helix-publish/commit/86e57161bc82adb28f3c8873a757794207d34903))

## [4.0.2](https://github.com/adobe/helix-publish/compare/v4.0.1...v4.0.2) (2020-03-04)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-logger to v2.2.0 ([7cb9c40](https://github.com/adobe/helix-publish/commit/7cb9c4044ed1b17d9408ecd03b0c0a55150314e1))

## [4.0.1](https://github.com/adobe/helix-publish/compare/v4.0.0...v4.0.1) (2020-03-03)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v6.0.2 ([6b70424](https://github.com/adobe/helix-publish/commit/6b70424b8891ea14e4a573e2f9e3837ae4fd28a7))

# [4.0.0](https://github.com/adobe/helix-publish/compare/v3.6.9...v4.0.0) (2020-03-03)


### Bug Fixes

* **condition:** synchronize version of epsagon ([6fb578a](https://github.com/adobe/helix-publish/commit/6fb578a150921c1908c0d9a03749d2ed714031c7))
* **conditions:** change expected output and functions invoked ([b4ea267](https://github.com/adobe/helix-publish/commit/b4ea26700d293efc365d9e688c34b78b8456934d))
* **conditions:** remove epsagon from dependencios ([289fc8a](https://github.com/adobe/helix-publish/commit/289fc8a74809450ae6e7ccab8c60db363638ec53))
* sync package.json files ([35a2852](https://github.com/adobe/helix-publish/commit/35a28521c8466929600553ec839968f1eff44b7c))
* **vcl:** conditions are no longer automatically sticky ([40be9d7](https://github.com/adobe/helix-publish/commit/40be9d7d8fad1cc91c227bcad536f83510ba0de9))
* **vcl:** use v6 release of helix-shared ([99c8e5c](https://github.com/adobe/helix-publish/commit/99c8e5c34f165159f9e308a0ce738b9bc4a9500a))


### Documentation

* **readme:** update version number in example ([e9a4e97](https://github.com/adobe/helix-publish/commit/e9a4e977afff74ff6556282b66939cb3d16db31e)), closes [#339](https://github.com/adobe/helix-publish/issues/339)


### Features

* **condition:** wip ([1ec02ed](https://github.com/adobe/helix-publish/commit/1ec02edea797afca48223a6aa8b9c6f804eaf98f))


### BREAKING CHANGES

* **readme:** this branch removes the ability to use VCL-based conditions for the new YAML-based condition language, which is more composable. However, this is a breaking change that requires a major release.

## [3.6.9](https://github.com/adobe/helix-publish/compare/v3.6.8...v3.6.9) (2020-03-03)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.5 ([b5f3e0d](https://github.com/adobe/helix-publish/commit/b5f3e0dcdb7dec509a36f90e2297141556396610))

## [3.6.8](https://github.com/adobe/helix-publish/compare/v3.6.7...v3.6.8) (2020-03-03)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.4 ([4cf6c1b](https://github.com/adobe/helix-publish/commit/4cf6c1b2d7c246312c376a23f07af12f174ad5af))

## [3.6.7](https://github.com/adobe/helix-publish/compare/v3.6.6...v3.6.7) (2020-02-26)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v5.3.0 ([0bd589d](https://github.com/adobe/helix-publish/commit/0bd589d54d2c6415d5596973f0eda0216caac91e))

## [3.6.6](https://github.com/adobe/helix-publish/compare/v3.6.5...v3.6.6) (2020-02-25)


### Bug Fixes

* **deps:** update [@adobe](https://github.com/adobe) ([#331](https://github.com/adobe/helix-publish/issues/331)) ([2b2bc73](https://github.com/adobe/helix-publish/commit/2b2bc73a74fabee1af28a94a5a24ad9724ed6348))

## [3.6.5](https://github.com/adobe/helix-publish/compare/v3.6.4...v3.6.5) (2020-02-25)


### Bug Fixes

* **deps:** update dependency @adobe/helix-log to v4.5.1 ([6900aba](https://github.com/adobe/helix-publish/commit/6900abaa5cdacbc55a9cc5b46f54162eb27dd27a))

## [3.6.4](https://github.com/adobe/helix-publish/compare/v3.6.3...v3.6.4) (2020-02-24)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v5.2.2 ([cf5bf76](https://github.com/adobe/helix-publish/commit/cf5bf7670b6bf3f0d0ea572274332cc13a17b786))

## [3.6.3](https://github.com/adobe/helix-publish/compare/v3.6.2...v3.6.3) (2020-02-21)


### Bug Fixes

* **vcl:** switch from iad to bwi ([#327](https://github.com/adobe/helix-publish/issues/327)) ([5beb808](https://github.com/adobe/helix-publish/commit/5beb808cfa4f017d237a34b2f3f00a1659ebd5c3))

## [3.6.2](https://github.com/adobe/helix-publish/compare/v3.6.1...v3.6.2) (2020-02-18)


### Bug Fixes

* **vcl:** use Vary instead of hash_always_miss and cleanup ([86fd016](https://github.com/adobe/helix-publish/commit/86fd0169806c5b79d89ccdd3fcd4e06a6901264e))

## [3.6.1](https://github.com/adobe/helix-publish/compare/v3.6.0...v3.6.1) (2020-02-14)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v5.2.1 ([2b067af](https://github.com/adobe/helix-publish/commit/2b067af52656e153bbb468c02d590ed37e78b93c))

# [3.6.0](https://github.com/adobe/helix-publish/compare/v3.5.2...v3.6.0) (2020-02-13)


### Bug Fixes

* **query:** prevent error 500 when triggering restart ([277bb3d](https://github.com/adobe/helix-publish/commit/277bb3d69e3dd72bb4ba62c655849d9039f10711))
* **query:** resolve the ref for fallback queries ([7237485](https://github.com/adobe/helix-publish/commit/7237485c5790b0bbce486a07949edc95e8cb0dde))


### Features

* **queries:** handle redirects from runtime ([f6697e3](https://github.com/adobe/helix-publish/commit/f6697e3095f7e9a5ed9d567de333f7f4a334eb19))
* **vcl:** implement fallback queries ([d8b8799](https://github.com/adobe/helix-publish/commit/d8b87998805dacb5d0a0154a645981f4e3e58a80))

## [3.5.2](https://github.com/adobe/helix-publish/compare/v3.5.1...v3.5.2) (2020-02-12)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v5.2.0 ([ae10b35](https://github.com/adobe/helix-publish/commit/ae10b356d9890767d301db5a0ed325d5602d472f))

## [3.5.1](https://github.com/adobe/helix-publish/compare/v3.5.0...v3.5.1) (2020-02-11)


### Bug Fixes

* **vcl:** remove x-forwarded-host header when talking to Adobe Fonts ([98fd530](https://github.com/adobe/helix-publish/commit/98fd53095621992a351921b99cc64fd87e433299))

# [3.5.0](https://github.com/adobe/helix-publish/compare/v3.4.2...v3.5.0) (2020-02-05)


### Features

* **sitemap:** allow ESI in XML, pass (owner,repo,ref) to cgi-bin ([#313](https://github.com/adobe/helix-publish/issues/313)) ([7c7debc](https://github.com/adobe/helix-publish/commit/7c7debc274eb9a23065b54f6d96531466afd6984))

## [3.4.2](https://github.com/adobe/helix-publish/compare/v3.4.1...v3.4.2) (2020-01-31)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-logger to v2.1.0 ([c30b717](https://github.com/adobe/helix-publish/commit/c30b7173306cb1388a539d0dc3e0f4dde4e7804c))

## [3.4.1](https://github.com/adobe/helix-publish/compare/v3.4.0...v3.4.1) (2020-01-31)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.3 ([bdf28c9](https://github.com/adobe/helix-publish/commit/bdf28c9ee2ec77735b5f33160d0b61035b39d4fc))

# [3.4.0](https://github.com/adobe/helix-publish/compare/v3.3.4...v3.4.0) (2020-01-30)


### Features

* **fonts:** add new backend for font serving (Adobe Fonts) ([964b103](https://github.com/adobe/helix-publish/commit/964b103ed8122283ff308224097c88b4f3faf0ee))
* **fonts:** add new request type for fonts ([0a7b6a1](https://github.com/adobe/helix-publish/commit/0a7b6a1314e5e99f836feace051e28d03c4e4ff1))

## [3.3.4](https://github.com/adobe/helix-publish/compare/v3.3.3...v3.3.4) (2020-01-29)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v4.1.0 ([1957ec2](https://github.com/adobe/helix-publish/commit/1957ec27f4f2ed3dc5487af1af47e1e9b4240b24))

## [3.3.3](https://github.com/adobe/helix-publish/compare/v3.3.2...v3.3.3) (2020-01-29)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.2 ([ba89881](https://github.com/adobe/helix-publish/commit/ba898813832746e6f7a14a2c1a86e613e2c01953))

## [3.3.2](https://github.com/adobe/helix-publish/compare/v3.3.1...v3.3.2) (2020-01-28)


### Bug Fixes

* **query:** guard against missing algolia app id parameter ([28a2994](https://github.com/adobe/helix-publish/commit/28a2994f799b9561d135cd8589eeef9b9db4fa50)), closes [#298](https://github.com/adobe/helix-publish/issues/298)

## [3.3.1](https://github.com/adobe/helix-publish/compare/v3.3.0...v3.3.1) (2020-01-26)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.1 ([db0fbdf](https://github.com/adobe/helix-publish/commit/db0fbdf6f76bfa92d1c9a5eb0e3c27b09e3aebfe))

# [3.3.0](https://github.com/adobe/helix-publish/compare/v3.2.4...v3.3.0) (2020-01-24)


### Features

* **vcl:** adds cgi-bin request type ([c96b405](https://github.com/adobe/helix-publish/commit/c96b405c9b828a53a170d739ec4a3142c1e96165)), closes [#88](https://github.com/adobe/helix-publish/issues/88)
* **vcl:** adds cgi-bin request type ([4d1aa25](https://github.com/adobe/helix-publish/commit/4d1aa25b8c7a845d53a7c37a147a511b08c2b79c)), closes [#88](https://github.com/adobe/helix-publish/issues/88)

## [3.2.4](https://github.com/adobe/helix-publish/compare/v3.2.3...v3.2.4) (2020-01-24)


### Bug Fixes

* **package:** include required schemas in deployment ([342d8d2](https://github.com/adobe/helix-publish/commit/342d8d2a44ba73910b84b830ad19c9e6939e9155))

## [3.2.3](https://github.com/adobe/helix-publish/compare/v3.2.2...v3.2.3) (2020-01-24)


### Bug Fixes

* **deps:** update dependency @adobe/helix-epsagon to v1.1.0 ([#294](https://github.com/adobe/helix-publish/issues/294)) ([384c40e](https://github.com/adobe/helix-publish/commit/384c40e3de79224b3e53e4d04d99a08e91246402))

## [3.2.2](https://github.com/adobe/helix-publish/compare/v3.2.1...v3.2.2) (2020-01-24)


### Bug Fixes

* **epsagon:** use helix-epsagon wrapper ([#291](https://github.com/adobe/helix-publish/issues/291)) ([c90a0a3](https://github.com/adobe/helix-publish/commit/c90a0a39bc89fa2ec1a435f0cf4cebcd2e2d3db2))

## [3.2.1](https://github.com/adobe/helix-publish/compare/v3.2.0...v3.2.1) (2020-01-23)


### Bug Fixes

* **deps:** update [@adobe](https://github.com/adobe) ([6350a63](https://github.com/adobe/helix-publish/commit/6350a63fb130902e8b7981c1150c659e022ad19b))

# [3.2.0](https://github.com/adobe/helix-publish/compare/v3.1.6...v3.2.0) (2020-01-22)


### Bug Fixes

* **dependencies:** npm audit fix ([db6ff0f](https://github.com/adobe/helix-publish/commit/db6ff0f806b9b2de68ad2c162dfc3c6a0232c810))
* **query:** load owner and repo from strain ([67e50c6](https://github.com/adobe/helix-publish/commit/67e50c6d26d521a072f2df6337fb6831536e8746))
* **vcl:** add missing semicolon ([cab0e3a](https://github.com/adobe/helix-publish/commit/cab0e3aa874b2b619c650e23d30a0f9a7a0c62c7))
* **vcl:** correctly escape expressions in queries ([de2a447](https://github.com/adobe/helix-publish/commit/de2a447ef52e3cbf865e9b86add6385cda2a863d))
* **vcl:** fix regex for query string parsing ([15ba6e2](https://github.com/adobe/helix-publish/commit/15ba6e2da5ba77cd6b957920de81e5e54f031d94))
* **vcl:** fix typo in query handling ([dbce851](https://github.com/adobe/helix-publish/commit/dbce851112a40842461ae109729e0f5477a8a4ff))
* **vcl:** remove extranous semicolon in generated vcl ([125eaf5](https://github.com/adobe/helix-publish/commit/125eaf546a3f51f5af65ce69dbc579f58ea62439))


### Features

* **query:** pass algolia options to publish function ([b290650](https://github.com/adobe/helix-publish/commit/b2906501054a3296b8914e6d848060baaab7307b))
* **vcl:** add new request type query ([c03aa7e](https://github.com/adobe/helix-publish/commit/c03aa7ecb0d7b56f00aae8500655171043884701))
* **vcl:** generate vcl to wrap query ([bb8a6b0](https://github.com/adobe/helix-publish/commit/bb8a6b08913a7c8d91f85434d93f47e3ba0ba1ae))
* **vcl:** support page and hitsPerPage parameters ([0b39324](https://github.com/adobe/helix-publish/commit/0b393247f1ab260abb919184a92ab4957cd11808))

## [3.1.6](https://github.com/adobe/helix-publish/compare/v3.1.5...v3.1.6) (2020-01-22)


### Bug Fixes

* **deps:** update [@adobe](https://github.com/adobe) ([053d07b](https://github.com/adobe/helix-publish/commit/053d07be2a79591800160887ec9faad547b7b58b))

## [3.1.5](https://github.com/adobe/helix-publish/compare/v3.1.4...v3.1.5) (2020-01-22)


### Bug Fixes

* **deps:** update dependency @adobe/helix-log to v4.5.0 ([a5a7637](https://github.com/adobe/helix-publish/commit/a5a76374af3c8f3fca6bc31dbc845b80e77cfb69))

## [3.1.4](https://github.com/adobe/helix-publish/compare/v3.1.3...v3.1.4) (2020-01-20)


### Bug Fixes

* **deps:** update external ([#285](https://github.com/adobe/helix-publish/issues/285)) ([16c8bf6](https://github.com/adobe/helix-publish/commit/16c8bf67c5895e776196db327dadc691d3ecfd84))

## [3.1.3](https://github.com/adobe/helix-publish/compare/v3.1.2...v3.1.3) (2020-01-16)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v5 ([#283](https://github.com/adobe/helix-publish/issues/283)) ([40b0db1](https://github.com/adobe/helix-publish/commit/40b0db1fdfe5ed487f760cca6df46bc8ac4e158d))

## [3.1.2](https://github.com/adobe/helix-publish/compare/v3.1.1...v3.1.2) (2020-01-16)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v4 ([#282](https://github.com/adobe/helix-publish/issues/282)) ([2afb5a2](https://github.com/adobe/helix-publish/commit/2afb5a23a01a6fa8e400b1a0d51fe6b36df9468a))

## [3.1.1](https://github.com/adobe/helix-publish/compare/v3.1.0...v3.1.1) (2020-01-15)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v4.0.1 ([10ad1d1](https://github.com/adobe/helix-publish/commit/10ad1d1811a6caad0ea6a411077df9385b45a8d1))

# [3.1.0](https://github.com/adobe/helix-publish/compare/v3.0.5...v3.1.0) (2020-01-15)


### Bug Fixes

* **vcl:** fix vcl syntax ([1e62dd5](https://github.com/adobe/helix-publish/commit/1e62dd59552f3b6c79a1aaa541c2a25b71f94d05))
* **vcl:** set correct host header for azure blobs and fix regex ([ae926b8](https://github.com/adobe/helix-publish/commit/ae926b83d1f8a4cd43e7d7261562a11369ee50d4))
* **vcl:** surpress chatty headers from Azure ([78000fa](https://github.com/adobe/helix-publish/commit/78000fa438e6f8cb3aa26a87fb0bd5050b0228f5))
* **vcl:** use only path for blob serving, to enable image optimization ([6f2703f](https://github.com/adobe/helix-publish/commit/6f2703f207e9ff2e0398f078d0cbefd617055d2e))


### Features

* **vcl:** add backend for proxying Azure Blob storage ([ff1c8ca](https://github.com/adobe/helix-publish/commit/ff1c8ca892c7a5b5019ac48b7ad4fecb56690539))
* **vcl:** add new request type for blobs ([6eec876](https://github.com/adobe/helix-publish/commit/6eec876788f5e0331c8bfbf681349acf503eab98))

## [3.0.5](https://github.com/adobe/helix-publish/compare/v3.0.4...v3.0.5) (2020-01-14)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v4 ([425a855](https://github.com/adobe/helix-publish/commit/425a8551b0a2e3aef8e8dc2c2d3494f8f52a5c5e))

## [3.0.4](https://github.com/adobe/helix-publish/compare/v3.0.3...v3.0.4) (2020-01-10)


### Bug Fixes

* **vcl:** do not set token auth for github when no token has been provided ([8c098fd](https://github.com/adobe/helix-publish/commit/8c098fd613835e6d311de9c068c56dea0f49a179)), closes [#274](https://github.com/adobe/helix-publish/issues/274)

## [3.0.3](https://github.com/adobe/helix-publish/compare/v3.0.2...v3.0.3) (2020-01-09)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v7.0.3 ([#272](https://github.com/adobe/helix-publish/issues/272)) ([9e9b742](https://github.com/adobe/helix-publish/commit/9e9b742d76de65a9b68af9f6a726117d902e5dc3))

## [3.0.2](https://github.com/adobe/helix-publish/compare/v3.0.1...v3.0.2) (2020-01-09)


### Bug Fixes

* **deps:** update [@adobe](https://github.com/adobe) ([#271](https://github.com/adobe/helix-publish/issues/271)) ([5f660d0](https://github.com/adobe/helix-publish/commit/5f660d02b81e66827b149ef0123589ae37e0fc02))

## [3.0.1](https://github.com/adobe/helix-publish/compare/v3.0.0...v3.0.1) (2020-01-06)


### Bug Fixes

* **deps:** update external ([67c58c9](https://github.com/adobe/helix-publish/commit/67c58c9a1ae2449935f0d42e77221ab72ac5a400))

# [3.0.0](https://github.com/adobe/helix-publish/compare/v2.9.13...v3.0.0) (2020-01-06)


### Features

* **dispatch:** update to dispatch@v3 with dynamic defaults ([796cbd6](https://github.com/adobe/helix-publish/commit/796cbd6fec735c5db0f14d673d0c352a7fbdab51))


### BREAKING CHANGES

* **dispatch:** This changes the default dispatch version from v2 to v3. v3 introduces dynamic defaults (fallback to `default.htnl` in the same folder if file can't be found), which is a breaking change

enables dynamic defaults, see https://github.com/adobe/helix-dispatch/issues/138

## [2.9.13](https://github.com/adobe/helix-publish/compare/v2.9.12...v2.9.13) (2019-12-20)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v3.3.0 ([4295cb4](https://github.com/adobe/helix-publish/commit/4295cb43ddfa94218746e1cfafff587d88ee26e2))

## [2.9.12](https://github.com/adobe/helix-publish/compare/v2.9.11...v2.9.12) (2019-12-20)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v3.2.0 ([72d5837](https://github.com/adobe/helix-publish/commit/72d5837636d25861f7f22db84bb7af9731f2d910))

## [2.9.11](https://github.com/adobe/helix-publish/compare/v2.9.10...v2.9.11) (2019-12-18)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-logger to v2.0.2 ([0cfaf60](https://github.com/adobe/helix-publish/commit/0cfaf60e629b273f66103ad0ef1009294751f133))

## [2.9.10](https://github.com/adobe/helix-publish/compare/v2.9.9...v2.9.10) (2019-12-18)


### Bug Fixes

* **deps:** update dependency @adobe/helix-log to v4.4.1 ([fd03bbb](https://github.com/adobe/helix-publish/commit/fd03bbb0397bacbb4c3092088555810fc6bccac4))

## [2.9.9](https://github.com/adobe/helix-publish/compare/v2.9.8...v2.9.9) (2019-12-17)


### Bug Fixes

* **deps:** update dependency @adobe/fastly-native-promises to v1.15.0 ([f360ab2](https://github.com/adobe/helix-publish/commit/f360ab2f3d163a0fece8958db5144178bafb060c))

## [2.9.8](https://github.com/adobe/helix-publish/compare/v2.9.7...v2.9.8) (2019-12-16)


### Bug Fixes

* **deps:** update external ([#258](https://github.com/adobe/helix-publish/issues/258)) ([77a53d0](https://github.com/adobe/helix-publish/commit/77a53d0e4e3c41d7d7419f476c36860b657b6d1e))

## [2.9.7](https://github.com/adobe/helix-publish/compare/v2.9.6...v2.9.7) (2019-12-05)


### Bug Fixes

* **deps:** update dependency @adobe/helix-log to v4.4.0 ([7cce0f9](https://github.com/adobe/helix-publish/commit/7cce0f9c341b4760247edd14841760050b3ca9a3))

## [2.9.6](https://github.com/adobe/helix-publish/compare/v2.9.5...v2.9.6) (2019-12-04)


### Bug Fixes

* **deps:** update dependency @adobe/helix-log to v4.3.0 ([70cb290](https://github.com/adobe/helix-publish/commit/70cb2909ab497256f5c2a1f206d2b7d58a4684e2))

## [2.9.5](https://github.com/adobe/helix-publish/compare/v2.9.4...v2.9.5) (2019-12-04)


### Bug Fixes

* **deps:** update dependency @adobe/helix-log to v4.2.0 ([b9d5716](https://github.com/adobe/helix-publish/commit/b9d5716f8202390e2031390a34732d30baedc4cc))

## [2.9.4](https://github.com/adobe/helix-publish/compare/v2.9.3...v2.9.4) (2019-12-02)


### Bug Fixes

* **release:** triggering release ([d029f10](https://github.com/adobe/helix-publish/commit/d029f10b9357bab4d22a44935ab9ba6d4dba2253))

## [2.9.3](https://github.com/adobe/helix-publish/compare/v2.9.2...v2.9.3) (2019-11-25)


### Bug Fixes

* **deps:** pin dependency @adobe/helix-log to 4.1.0 ([1c2d6e5](https://github.com/adobe/helix-publish/commit/1c2d6e5af8e97a068a47c549cd9a465b38b1676b))

## [2.9.2](https://github.com/adobe/helix-publish/compare/v2.9.1...v2.9.2) (2019-11-25)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v3 ([#246](https://github.com/adobe/helix-publish/issues/246)) ([c78f9b3](https://github.com/adobe/helix-publish/commit/c78f9b362cb39dfe3b047dc328a010f286850f4f))

## [2.9.1](https://github.com/adobe/helix-publish/compare/v2.9.0...v2.9.1) (2019-11-22)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v2.7.3 ([71ba749](https://github.com/adobe/helix-publish/commit/71ba749d39d5eb402d38e1428f42d7d5688bc78a))

# [2.9.0](https://github.com/adobe/helix-publish/compare/v2.8.8...v2.9.0) (2019-11-22)


### Features

* **helix.vcl:** avoid leaking of debug headers ([9ef9966](https://github.com/adobe/helix-publish/commit/9ef996642c43951b4974adcd67feb2b5331213ba))
* **helix.vcl:** avoid leaking of debug headers ([c5f322e](https://github.com/adobe/helix-publish/commit/c5f322e6a57906754b5976db5136b247ee18a358))

## [2.8.8](https://github.com/adobe/helix-publish/compare/v2.8.7...v2.8.8) (2019-11-21)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v7.0.2 ([1d56610](https://github.com/adobe/helix-publish/commit/1d56610dd77a732251fab9faa47e0184b6b66844))

## [2.8.7](https://github.com/adobe/helix-publish/compare/v2.8.6...v2.8.7) (2019-11-20)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v7 ([fd4aa49](https://github.com/adobe/helix-publish/commit/fd4aa49bc7e49c85e0f9e8b65cb2257c63aeb1a8))

## [2.8.6](https://github.com/adobe/helix-publish/compare/v2.8.5...v2.8.6) (2019-11-20)


### Bug Fixes

* **deps:** update dependency @adobe/fastly-native-promises to v1.14.2 ([67cd7fb](https://github.com/adobe/helix-publish/commit/67cd7fb216a33b742384d8b85e00c7ec68b4ed42))

## [2.8.5](https://github.com/adobe/helix-publish/compare/v2.8.4...v2.8.5) (2019-11-16)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v6 ([c07ade4](https://github.com/adobe/helix-publish/commit/c07ade4477b8cf7bd6787551e6872bdea6613175))

## [2.8.4](https://github.com/adobe/helix-publish/compare/v2.8.3...v2.8.4) (2019-11-14)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v2.7.2 ([059baf0](https://github.com/adobe/helix-publish/commit/059baf076c94e8c786e39251b8e8d49478ccd75a))

## [2.8.3](https://github.com/adobe/helix-publish/compare/v2.8.2...v2.8.3) (2019-11-12)


### Bug Fixes

* **deps:** update dependency @adobe/openwhisk-action-utils to v2.5.0 ([dc84361](https://github.com/adobe/helix-publish/commit/dc8436142b95df9f91fa5103b73f581a961fbca3))

## [2.8.2](https://github.com/adobe/helix-publish/compare/v2.8.1...v2.8.2) (2019-11-12)


### Bug Fixes

* **deps:** update any ([dd28e0e](https://github.com/adobe/helix-publish/commit/dd28e0ee003c7abbc3d41c9d38318ce65d5934fc))

## [2.8.1](https://github.com/adobe/helix-publish/compare/v2.8.0...v2.8.1) (2019-11-06)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v3.1.2 ([#225](https://github.com/adobe/helix-publish/issues/225)) ([87cc220](https://github.com/adobe/helix-publish/commit/87cc220016e4a5d0db909efb43f7389cd9ce40d8))

# [2.8.0](https://github.com/adobe/helix-publish/compare/v2.7.15...v2.8.0) (2019-10-31)


### Features

* **vcl:** remove `req.entry` for static requests ([#219](https://github.com/adobe/helix-publish/issues/219)) ([2545afd](https://github.com/adobe/helix-publish/commit/2545afdadca61e77a913cca5de5474ae534c4642))

## [2.7.15](https://github.com/adobe/helix-publish/compare/v2.7.14...v2.7.15) (2019-10-30)


### Bug Fixes

* **deps:** update any ([4e43328](https://github.com/adobe/helix-publish/commit/4e43328f38d30a74de975ea2ec93c45ceeef12df))

## [2.7.14](https://github.com/adobe/helix-publish/compare/v2.7.13...v2.7.14) (2019-10-22)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v5.2.0 ([#217](https://github.com/adobe/helix-publish/issues/217)) ([99783be](https://github.com/adobe/helix-publish/commit/99783be))

## [2.7.13](https://github.com/adobe/helix-publish/compare/v2.7.12...v2.7.13) (2019-10-21)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v3.1.0 ([ba2d577](https://github.com/adobe/helix-publish/commit/ba2d577))

## [2.7.12](https://github.com/adobe/helix-publish/compare/v2.7.11...v2.7.12) (2019-10-17)


### Bug Fixes

* **deps:** update any ([#213](https://github.com/adobe/helix-publish/issues/213)) ([2be372b](https://github.com/adobe/helix-publish/commit/2be372b))

## [2.7.11](https://github.com/adobe/helix-publish/compare/v2.7.10...v2.7.11) (2019-10-16)


### Bug Fixes

* **deps:** update dependency @adobe/helix-shared to v3.0.4 ([#210](https://github.com/adobe/helix-publish/issues/210)) ([4440c92](https://github.com/adobe/helix-publish/commit/4440c92))

## [2.7.10](https://github.com/adobe/helix-publish/compare/v2.7.9...v2.7.10) (2019-10-15)


### Bug Fixes

* **deps:** update any ([#208](https://github.com/adobe/helix-publish/issues/208)) ([a596dcb](https://github.com/adobe/helix-publish/commit/a596dcb))

## [2.7.9](https://github.com/adobe/helix-publish/compare/v2.7.8...v2.7.9) (2019-10-08)


### Bug Fixes

* **deps:** update any ([#202](https://github.com/adobe/helix-publish/issues/202)) ([18e1655](https://github.com/adobe/helix-publish/commit/18e1655))

## [2.7.8](https://github.com/adobe/helix-publish/compare/v2.7.7...v2.7.8) (2019-10-07)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v5.1.0 ([5eedc96](https://github.com/adobe/helix-publish/commit/5eedc96))

## [2.7.7](https://github.com/adobe/helix-publish/compare/v2.7.6...v2.7.7) (2019-10-05)


### Bug Fixes

* **deps:** update dependency @adobe/helix-status to v5.0.2 ([#198](https://github.com/adobe/helix-publish/issues/198)) ([729e3f3](https://github.com/adobe/helix-publish/commit/729e3f3))

## [2.7.6](https://github.com/adobe/helix-publish/compare/v2.7.5...v2.7.6) (2019-10-05)


### Bug Fixes

* **deploy:** fix semantic release ([27eb8f6](https://github.com/adobe/helix-publish/commit/27eb8f6))
* **deploy:** use correct version field ([5d5b955](https://github.com/adobe/helix-publish/commit/5d5b955))
* **deploy:** use helix-services-private ([ee4765e](https://github.com/adobe/helix-publish/commit/ee4765e))

## [2.7.5](https://github.com/adobe/helix-publish/compare/v2.7.4...v2.7.5) (2019-10-02)


### Bug Fixes

* **deps:** update any ([#190](https://github.com/adobe/helix-publish/issues/190)) ([7d5218a](https://github.com/adobe/helix-publish/commit/7d5218a))

## [2.7.4](https://github.com/adobe/helix-publish/compare/v2.7.3...v2.7.4) (2019-09-30)


### Bug Fixes

* **deps:** update any ([4ec8cbf](https://github.com/adobe/helix-publish/commit/4ec8cbf))

## [2.7.3](https://github.com/adobe/helix-publish/compare/v2.7.2...v2.7.3) (2019-09-30)


### Bug Fixes

* **package:** update @adobe/helix-status to version 5.0.1 ([502c59e](https://github.com/adobe/helix-publish/commit/502c59e))

## [2.7.2](https://github.com/adobe/helix-publish/compare/v2.7.1...v2.7.2) (2019-09-30)


### Bug Fixes

* **deps:** update dependencies ([7d6af28](https://github.com/adobe/helix-publish/commit/7d6af28))

## [2.7.1](https://github.com/adobe/helix-publish/compare/v2.7.0...v2.7.1) (2019-09-27)


### Bug Fixes

* **package:** update @adobe/helix-status to version 4.3.6 ([4d8be1d](https://github.com/adobe/helix-publish/commit/4d8be1d)), closes [#181](https://github.com/adobe/helix-publish/issues/181)

# [2.7.0](https://github.com/adobe/helix-publish/compare/v2.6.2...v2.7.0) (2019-09-23)


### Features

* **pub:** protect X-Debug with key ([#177](https://github.com/adobe/helix-publish/issues/177)) ([e0de6ad](https://github.com/adobe/helix-publish/commit/e0de6ad))

## [2.6.2](https://github.com/adobe/helix-publish/compare/v2.6.1...v2.6.2) (2019-09-04)


### Bug Fixes

* **package:** update @adobe/helix-status to version 4.3.3 ([792be5d](https://github.com/adobe/helix-publish/commit/792be5d))

## [2.6.1](https://github.com/adobe/helix-publish/compare/v2.6.0...v2.6.1) (2019-09-04)


### Bug Fixes

* **monitoring:** upgrade to fixed @adobe/helix-status version 4.3.3 ([ace0e1f](https://github.com/adobe/helix-publish/commit/ace0e1f))

# [2.6.0](https://github.com/adobe/helix-publish/compare/v2.5.5...v2.6.0) (2019-09-03)


### Features

* **vcl:** pass github token via header on backend request ([622c886](https://github.com/adobe/helix-publish/commit/622c886))

## [2.5.5](https://github.com/adobe/helix-publish/compare/v2.5.4...v2.5.5) (2019-09-03)


### Bug Fixes

* **package:** update @adobe/helix-status to version 4.3.1 ([b1e958a](https://github.com/adobe/helix-publish/commit/b1e958a)), closes [#170](https://github.com/adobe/helix-publish/issues/170)

## [2.5.4](https://github.com/adobe/helix-publish/compare/v2.5.3...v2.5.4) (2019-09-02)


### Bug Fixes

* **package:** update @adobe/fastly-native-promises to version 1.13.0 ([9605153](https://github.com/adobe/helix-publish/commit/9605153))

## [2.5.3](https://github.com/adobe/helix-publish/compare/v2.5.2...v2.5.3) (2019-09-02)


### Bug Fixes

* **package:** update @adobe/helix-shared to version 2.2.1 ([f2e06f4](https://github.com/adobe/helix-publish/commit/f2e06f4))

## [2.5.2](https://github.com/adobe/helix-publish/compare/v2.5.1...v2.5.2) (2019-08-28)


### Bug Fixes

* **package:** update @adobe/helix-shared to version 2.2.0 ([5c2fcba](https://github.com/adobe/helix-publish/commit/5c2fcba))

## [2.5.1](https://github.com/adobe/helix-publish/compare/v2.5.0...v2.5.1) (2019-08-26)


### Bug Fixes

* **monitoring:** upgrade epsagon and hide more params ([a1375c7](https://github.com/adobe/helix-publish/commit/a1375c7))

# [2.5.0](https://github.com/adobe/helix-publish/compare/v2.4.1...v2.5.0) (2019-08-22)


### Features

* **dispatch:** use released dispatch version instead of latest ([2de2109](https://github.com/adobe/helix-publish/commit/2de2109)), closes [/github.com/adobe/helix-publish/issues/128#issuecomment-513220213](https://github.com//github.com/adobe/helix-publish/issues/128/issues/issuecomment-513220213) [#128](https://github.com/adobe/helix-publish/issues/128) [#129](https://github.com/adobe/helix-publish/issues/129)

## [2.4.1](https://github.com/adobe/helix-publish/compare/v2.4.0...v2.4.1) (2019-08-22)


### Bug Fixes

* **vlc:** ensure that static redirect is handled before errors ([b1d7065](https://github.com/adobe/helix-publish/commit/b1d7065))

# [2.4.0](https://github.com/adobe/helix-publish/compare/v2.3.2...v2.4.0) (2019-08-21)


### Features

* **monitoring:** upgrade monitoring library to support JSON status ([bb84c7a](https://github.com/adobe/helix-publish/commit/bb84c7a))

## [2.3.2](https://github.com/adobe/helix-publish/compare/v2.3.1...v2.3.2) (2019-08-20)


### Bug Fixes

* **package:** update @adobe/fastly-native-promises to version 1.12.0 ([6f273f8](https://github.com/adobe/helix-publish/commit/6f273f8))

## [2.3.1](https://github.com/adobe/helix-publish/compare/v2.3.0...v2.3.1) (2019-08-19)


### Bug Fixes

* **package:** update @adobe/openwhisk-action-builder to version 2.0.0 ([a600a2a](https://github.com/adobe/helix-publish/commit/a600a2a))

# [2.3.0](https://github.com/adobe/helix-publish/compare/v2.2.6...v2.3.0) (2019-07-31)


### Bug Fixes

* **monitoring:** hide Epsagon and Fastly token from Epsagon ([9aaed69](https://github.com/adobe/helix-publish/commit/9aaed69))


### Features

* **vcl:** add `all` as a surrogate key header value to all requests for better soft purges ([eff8c9c](https://github.com/adobe/helix-publish/commit/eff8c9c)), closes [#152](https://github.com/adobe/helix-publish/issues/152)

## [2.2.6](https://github.com/adobe/helix-publish/compare/v2.2.5...v2.2.6) (2019-07-30)


### Bug Fixes

* **package:** update @adobe/fastly-native-promises to version 1.11.0 ([7923e74](https://github.com/adobe/helix-publish/commit/7923e74))

## [2.2.5](https://github.com/adobe/helix-publish/compare/v2.2.4...v2.2.5) (2019-07-26)


### Bug Fixes

* **package:** update @adobe/helix-pingdom-status to version 3.0.0 ([ecf1b22](https://github.com/adobe/helix-publish/commit/ecf1b22))

## [2.2.4](https://github.com/adobe/helix-publish/compare/v2.2.3...v2.2.4) (2019-07-24)


### Bug Fixes

* **package:** update @adobe/helix-pingdom-status to version 2.0.0 ([93e640a](https://github.com/adobe/helix-publish/commit/93e640a))

## [2.2.3](https://github.com/adobe/helix-publish/compare/v2.2.2...v2.2.3) (2019-07-19)


### Bug Fixes

* **vcl:** don't send synthetic errors for esi sub-requests ([#143](https://github.com/adobe/helix-publish/issues/143)) ([979b8b9](https://github.com/adobe/helix-publish/commit/979b8b9)), closes [#132](https://github.com/adobe/helix-publish/issues/132)

## [2.2.2](https://github.com/adobe/helix-publish/compare/v2.2.1...v2.2.2) (2019-07-16)


### Bug Fixes

* **dispatch:** add params.rootPath ([#140](https://github.com/adobe/helix-publish/issues/140)) ([9ef4f36](https://github.com/adobe/helix-publish/commit/9ef4f36)), closes [#139](https://github.com/adobe/helix-publish/issues/139)

## [2.2.1](https://github.com/adobe/helix-publish/compare/v2.2.0...v2.2.1) (2019-07-07)


### Bug Fixes

* **package:** update dependencies ([009573f](https://github.com/adobe/helix-publish/commit/009573f))
* **pingdom:** improve error reporting. ([04b56f0](https://github.com/adobe/helix-publish/commit/04b56f0))

# [2.2.0](https://github.com/adobe/helix-publish/compare/v2.1.0...v2.2.0) (2019-07-04)


### Features

* **dispatch:** allow dynamic version of the dispatch url ([#130](https://github.com/adobe/helix-publish/issues/130)) ([32f8645](https://github.com/adobe/helix-publish/commit/32f8645))

# [2.1.0](https://github.com/adobe/helix-publish/compare/v2.0.1...v2.1.0) (2019-07-04)


### Features

* **dispatch:** use latest instead of v1 ([0b564a2](https://github.com/adobe/helix-publish/commit/0b564a2))
* **dispatch:** use latest instead of v1 ([3384c85](https://github.com/adobe/helix-publish/commit/3384c85))

## [2.0.1](https://github.com/adobe/helix-publish/compare/v2.0.0...v2.0.1) (2019-07-03)


### Bug Fixes

* **vcl:** Avoid multiple requests if resource is not found and fix error page handling. ([#126](https://github.com/adobe/helix-publish/issues/126)) ([1b05bd1](https://github.com/adobe/helix-publish/commit/1b05bd1)), closes [#125](https://github.com/adobe/helix-publish/issues/125)

# [2.0.0](https://github.com/adobe/helix-publish/compare/v1.0.3...v2.0.0) (2019-06-26)


### Bug Fixes

* **error:** fix remaining resp ([d89b2f6](https://github.com/adobe/helix-publish/commit/d89b2f6))
* **error:** separate error handler from raw handler ([00beb7a](https://github.com/adobe/helix-publish/commit/00beb7a))
* **error:** use http.host ([03b4ec3](https://github.com/adobe/helix-publish/commit/03b4ec3))
* **error:** use new error subroutin ([29cac81](https://github.com/adobe/helix-publish/commit/29cac81))
* **error:** use resp instead of beresp in error delivery ([dab068b](https://github.com/adobe/helix-publish/commit/dab068b))
* **package:** add missing error pages ([ebcf05c](https://github.com/adobe/helix-publish/commit/ebcf05c))
* **raw:** set correct content type for popular file endings ([1455d3f](https://github.com/adobe/helix-publish/commit/1455d3f))
* **raw:** set correct content type for raw HTML responses ([fafd955](https://github.com/adobe/helix-publish/commit/fafd955))
* **static:** use the versioned shared static function ([2e18192](https://github.com/adobe/helix-publish/commit/2e18192))
* **vcl:** add missing equals sign for request parameters ([c238503](https://github.com/adobe/helix-publish/commit/c238503))
* **vcl:** always use HTML for error pages ([dec8b51](https://github.com/adobe/helix-publish/commit/dec8b51))
* **vcl:** fix data flow error ([22897d1](https://github.com/adobe/helix-publish/commit/22897d1))
* **vcl:** fix req.http.X-Action-Root ([c6c7e7d](https://github.com/adobe/helix-publish/commit/c6c7e7d))
* **vcl:** fix syntax error ([e28ec3d](https://github.com/adobe/helix-publish/commit/e28ec3d))
* **vcl:** fix syntax error ([6825bae](https://github.com/adobe/helix-publish/commit/6825bae))
* **vcl:** fix syntax error ([1fe37f2](https://github.com/adobe/helix-publish/commit/1fe37f2))
* **vcl:** fix syntax error ([b0b9829](https://github.com/adobe/helix-publish/commit/b0b9829))
* **vcl:** fix syntax error ([ebf0807](https://github.com/adobe/helix-publish/commit/ebf0807))
* **vcl:** fix syntax error ([d8afe05](https://github.com/adobe/helix-publish/commit/d8afe05))
* **vcl:** move error from fetch to deliver ([061fa10](https://github.com/adobe/helix-publish/commit/061fa10))
* **vcl:** relax conditions for 302 and url extensions ([8da5e1e](https://github.com/adobe/helix-publish/commit/8da5e1e))
* **vcl:** remove error request type ([9c72d4b](https://github.com/adobe/helix-publish/commit/9c72d4b))
* **vcl:** remove unused error subroutine ([a58e8e0](https://github.com/adobe/helix-publish/commit/a58e8e0))
* **vcl:** remove unused raw function ([9fb2e05](https://github.com/adobe/helix-publish/commit/9fb2e05))
* **vcl:** remove unused subroutines ([1cbdec4](https://github.com/adobe/helix-publish/commit/1cbdec4))
* **vcl:** shut up chatty headers ([31fcc7c](https://github.com/adobe/helix-publish/commit/31fcc7c))
* **vlc:** don't drop out of error handler function ([35a9f81](https://github.com/adobe/helix-publish/commit/35a9f81))


### Features

* **static:** Give content repository precedence in serving resources and error pages ([bf8cbae](https://github.com/adobe/helix-publish/commit/bf8cbae)), closes [#96](https://github.com/adobe/helix-publish/issues/96)
* **vcl:** introduce new dispatch flow ([53a3dbe](https://github.com/adobe/helix-publish/commit/53a3dbe)), closes [#96](https://github.com/adobe/helix-publish/issues/96) [#105](https://github.com/adobe/helix-publish/issues/105) [#96](https://github.com/adobe/helix-publish/issues/96)


### BREAKING CHANGES

* **static:** As described in #96, this introduces a new request type `raw` which works like the old `image` request type, but applies to all resources. In case `raw` fails, we will fall back to `pipeline`, which will fall back to `static` which will fall back to `error`. `error` is very similar to `raw` in that it tries to fetch an error page like `404.html` from the content repository

## [1.0.3](https://github.com/adobe/helix-publish/compare/v1.0.2...v1.0.3) (2019-06-25)


### Bug Fixes

* **bundle:** use different approach to access files ([845c0d9](https://github.com/adobe/helix-publish/commit/845c0d9))
* **vcl.js:** use different approach to detect webpack ([c356c1b](https://github.com/adobe/helix-publish/commit/c356c1b))

## [1.0.2](https://github.com/adobe/helix-publish/compare/v1.0.1...v1.0.2) (2019-06-25)


### Bug Fixes

* **dependencies:** move epsagon from dev to real dependencies ([99a9629](https://github.com/adobe/helix-publish/commit/99a9629))

## [1.0.1](https://github.com/adobe/helix-publish/compare/v1.0.0...v1.0.1) (2019-06-25)


### Bug Fixes

* **build:** include missing VCL and HTML files in deployment bundle ([17aa8ee](https://github.com/adobe/helix-publish/commit/17aa8ee))

# 1.0.0 (2019-06-24)


### Bug Fixes

* **static:** process ESI for static resources, too ([8ea480d](https://github.com/adobe/helix-publish/commit/8ea480d))
* .snyk & package.json to reduce vulnerabilities ([d68bf41](https://github.com/adobe/helix-publish/commit/d68bf41))
* .snyk & package.json to reduce vulnerabilities ([c2314e5](https://github.com/adobe/helix-publish/commit/c2314e5))
* **deploy:** use nodejs:10 container ([b64541e](https://github.com/adobe/helix-publish/commit/b64541e)), closes [#55](https://github.com/adobe/helix-publish/issues/55)
* **dictionaries:** set missing directory index ([ef56581](https://github.com/adobe/helix-publish/commit/ef56581)), closes [#59](https://github.com/adobe/helix-publish/issues/59)
* **linting:** linting again... ([b496576](https://github.com/adobe/helix-publish/commit/b496576))
* **linting:** linting... ([275494f](https://github.com/adobe/helix-publish/commit/275494f))
* **monitoring:** remove epsagon token from source code ([be35e31](https://github.com/adobe/helix-publish/commit/be35e31))
* **package:** update @adobe/fastly-native-promises to version 1.10.0 ([258c5eb](https://github.com/adobe/helix-publish/commit/258c5eb))
* **package:** update @adobe/fastly-native-promises to version 1.4.0 ([c29ed05](https://github.com/adobe/helix-publish/commit/c29ed05))
* **package:** update @adobe/fastly-native-promises to version 1.6.0 ([dba6bd0](https://github.com/adobe/helix-publish/commit/dba6bd0)), closes [#17](https://github.com/adobe/helix-publish/issues/17)
* **package:** update @adobe/fastly-native-promises to version 1.6.1 ([8b755ae](https://github.com/adobe/helix-publish/commit/8b755ae))
* **package:** update @adobe/fastly-native-promises to version 1.7.0 ([8955790](https://github.com/adobe/helix-publish/commit/8955790))
* **package:** update @adobe/fastly-native-promises to version 1.8.0 ([23c37eb](https://github.com/adobe/helix-publish/commit/23c37eb))
* **package:** update @adobe/fastly-native-promises to version 1.9.0 ([68c16f6](https://github.com/adobe/helix-publish/commit/68c16f6))
* **package:** update @adobe/fastly-native-promises to version 1.9.1 ([de465f3](https://github.com/adobe/helix-publish/commit/de465f3))
* **package:** update @adobe/helix-shared to version 0.10.3 ([7c9caef](https://github.com/adobe/helix-publish/commit/7c9caef))
* **package:** update @adobe/helix-shared to version 0.10.4 ([d4b5e92](https://github.com/adobe/helix-publish/commit/d4b5e92))
* **package:** update @adobe/helix-shared to version 0.10.5 ([fd67213](https://github.com/adobe/helix-publish/commit/fd67213))
* **package:** update @adobe/helix-shared to version 0.11.0 ([d976bcb](https://github.com/adobe/helix-publish/commit/d976bcb))
* **package:** update @adobe/helix-shared to version 0.6.2 ([20703f3](https://github.com/adobe/helix-publish/commit/20703f3))
* **package:** update @adobe/helix-shared to version 0.7.0 ([d49ba13](https://github.com/adobe/helix-publish/commit/d49ba13))
* **package:** update @adobe/helix-shared to version 0.8.0 ([4731732](https://github.com/adobe/helix-publish/commit/4731732))
* **package:** update @adobe/helix-shared to version 0.8.1 ([024f137](https://github.com/adobe/helix-publish/commit/024f137))
* **package:** update @adobe/helix-shared to version 0.8.3 ([6dd418b](https://github.com/adobe/helix-publish/commit/6dd418b))
* **package:** update @adobe/helix-shared to version 0.8.4 ([feaf8eb](https://github.com/adobe/helix-publish/commit/feaf8eb))
* **package:** update @adobe/helix-shared to version 1.0.1 ([ffad201](https://github.com/adobe/helix-publish/commit/ffad201)), closes [#67](https://github.com/adobe/helix-publish/issues/67)
* **package:** update @adobe/helix-shared to version 1.0.2 ([f3c27b6](https://github.com/adobe/helix-publish/commit/f3c27b6))
* **package:** update @adobe/helix-shared to version 1.1.1 ([c1bf275](https://github.com/adobe/helix-publish/commit/c1bf275))
* **package:** update @adobe/helix-shared to version 1.2.0 ([41faf50](https://github.com/adobe/helix-publish/commit/41faf50))
* **package:** update @adobe/helix-shared to version 1.3.1 ([d002710](https://github.com/adobe/helix-publish/commit/d002710))
* **package:** update @adobe/helix-shared to version 1.5.0 ([1a61355](https://github.com/adobe/helix-publish/commit/1a61355))
* **package:** update fs-extra to version 8.0.1 ([cffa67c](https://github.com/adobe/helix-publish/commit/cffa67c))
* **package:** update glob-to-regexp to version 0.4.1 ([5b0782f](https://github.com/adobe/helix-publish/commit/5b0782f))
* **proxy:** Don't attempt to recover from 404 errors in proxy strains ([8b84690](https://github.com/adobe/helix-publish/commit/8b84690)), closes [#75](https://github.com/adobe/helix-publish/issues/75)
* **proxy:** prevent duplicate creation of backends for proxy strains ([c157e8b](https://github.com/adobe/helix-publish/commit/c157e8b))
* **proxy:** use FastlyJSON when talking to Fastly API ([9d40b93](https://github.com/adobe/helix-publish/commit/9d40b93))
* **static:** add missing slash to GitHub raw URL ([c07f401](https://github.com/adobe/helix-publish/commit/c07f401))
* **static:** disable GZip for all backend requests that could contain ESI ([393ae0a](https://github.com/adobe/helix-publish/commit/393ae0a))
* **static:** don't redeclare var ([3f23556](https://github.com/adobe/helix-publish/commit/3f23556))
* **static:** drop accept-encoding to enforce esi ([2729f64](https://github.com/adobe/helix-publish/commit/2729f64))
* **static:** enable compression for ESI-processed resources ([0eaf027](https://github.com/adobe/helix-publish/commit/0eaf027))
* **static:** fix syntax error ([852969a](https://github.com/adobe/helix-publish/commit/852969a))
* **static:** fix syntax error ([82949b0](https://github.com/adobe/helix-publish/commit/82949b0))
* **static:** fix syntax error ([d22c465](https://github.com/adobe/helix-publish/commit/d22c465))
* **static:** fix variable name ([cbb125e](https://github.com/adobe/helix-publish/commit/cbb125e))
* **static:** fix VCL syntax error ([db4c524](https://github.com/adobe/helix-publish/commit/db4c524))
* **static:** fix VCL syntax error ([76749d6](https://github.com/adobe/helix-publish/commit/76749d6))
* **static:** handle immutable requests without restart ([79c0ba7](https://github.com/adobe/helix-publish/commit/79c0ba7))
* **static:** move esi handling into fetch ([46bc081](https://github.com/adobe/helix-publish/commit/46bc081))
* **static:** never use GZip when talking with Runtime, as there might be ESI ([21ce4a1](https://github.com/adobe/helix-publish/commit/21ce4a1))
* **static:** no slash between ref and path in static retrieval ([209cd7f](https://github.com/adobe/helix-publish/commit/209cd7f))
* **static:** protect against cache poisoning by verifying the etag ([1bc1e24](https://github.com/adobe/helix-publish/commit/1bc1e24))
* **static:** remove brackets in URL ([4009ff5](https://github.com/adobe/helix-publish/commit/4009ff5))
* **static:** restrict regex for immutable resources ([c71043f](https://github.com/adobe/helix-publish/commit/c71043f))
* **static:** strip 302 from URL when requesting a redirect ([fd5a5db](https://github.com/adobe/helix-publish/commit/fd5a5db))
* **static:** submit location headers for redirects, making actual redirects possible ([615bf33](https://github.com/adobe/helix-publish/commit/615bf33))
* **static:** throw error for invalid resource paths ([92d4c82](https://github.com/adobe/helix-publish/commit/92d4c82))
* **static:** turn on ESI processing when backend response requests it ([5459d30](https://github.com/adobe/helix-publish/commit/5459d30))
* **static:** unset Accept-Encoding more aggressively ([df42f20](https://github.com/adobe/helix-publish/commit/df42f20))
* **static:** use beresp instead of resp for ETag value ([112796d](https://github.com/adobe/helix-publish/commit/112796d))
* **static:** use correct location header ([5d1f8c7](https://github.com/adobe/helix-publish/commit/5d1f8c7))
* **static:** use correct path for entry for immutable resources ([c66f15f](https://github.com/adobe/helix-publish/commit/c66f15f))
* **static:** use local var for new extension ([c995533](https://github.com/adobe/helix-publish/commit/c995533))
* **static:** use re instead of req ([245b583](https://github.com/adobe/helix-publish/commit/245b583))
* **static:** use req for tracing instead of resp ([806d48d](https://github.com/adobe/helix-publish/commit/806d48d))
* **vcl:** bum version ([73d3f8e](https://github.com/adobe/helix-publish/commit/73d3f8e))
* **vcl:** copyright & unrelated change ([e88ed93](https://github.com/adobe/helix-publish/commit/e88ed93))
* **vcl:** include must be outside of a subroutine ([cef774f](https://github.com/adobe/helix-publish/commit/cef774f))
* **vcl:** is line break required ? ([67080b2](https://github.com/adobe/helix-publish/commit/67080b2))
* **vcl:** is linebreak required? ([9cc1ea2](https://github.com/adobe/helix-publish/commit/9cc1ea2))
* **vcl:** remove unnecessary line breaks ([8502341](https://github.com/adobe/helix-publish/commit/8502341))
* **vcl:** respect remapped url also in static ([f404c4d](https://github.com/adobe/helix-publish/commit/f404c4d)), closes [#101](https://github.com/adobe/helix-publish/issues/101)


### Features

* **monitoring:** add epsagon wrapper ([2d52627](https://github.com/adobe/helix-publish/commit/2d52627)), closes [#104](https://github.com/adobe/helix-publish/issues/104)
* **proxy:** make proxy strains respect the URL path and backend path ([ff77ba7](https://github.com/adobe/helix-publish/commit/ff77ba7))
* **static:** enable asset statification for assets loaded from static URLs ([befc1e2](https://github.com/adobe/helix-publish/commit/befc1e2))
* **static:** provide two new resource types for static resources: .esi to replace a static URL with a cacheable static URL and .hlx_[0-9a-f]+ for resources that are cached forever in the browser ([9f8e52c](https://github.com/adobe/helix-publish/commit/9f8e52c)), closes [/github.com/adobe/helix-pipeline/issues/224#issuecomment-476690621](https://github.com//github.com/adobe/helix-pipeline/issues/224/issues/issuecomment-476690621)
* **static:** rename static-esi to static-url, introduce static-302 which returns a redirect ([403ae1b](https://github.com/adobe/helix-publish/commit/403ae1b)), closes [/github.com/adobe/helix-publish/pull/61#issuecomment-487664612](https://github.com//github.com/adobe/helix-publish/pull/61/issues/issuecomment-487664612)
* **vcl:** Add extensions.vcl ([ae1b52c](https://github.com/adobe/helix-publish/commit/ae1b52c))
* **vcl:** add more extension points ([979cfbe](https://github.com/adobe/helix-publish/commit/979cfbe))
* **vcl:** Add more extension points ([3dee07e](https://github.com/adobe/helix-publish/commit/3dee07e))
* **vcl:** Documentation ([902f6f3](https://github.com/adobe/helix-publish/commit/902f6f3))
* **vcl:** Support Custom VCL ([b2ca735](https://github.com/adobe/helix-publish/commit/b2ca735))
* **vcl:** testing extension logic ([717c192](https://github.com/adobe/helix-publish/commit/717c192))
* **vcl:** Tests for synthetize method ([71bcd2d](https://github.com/adobe/helix-publish/commit/71bcd2d))


### Performance Improvements

* **static:** declare static files to be immutable ([f0369b7](https://github.com/adobe/helix-publish/commit/f0369b7))


### BREAKING CHANGES

* **proxy:** changes root paths of all proxy strains - fixes #64
