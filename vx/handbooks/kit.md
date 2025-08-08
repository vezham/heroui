# kill $(lsof -t -i:3000)
- @vx/ws:changeset:update-versions | sync pkg ver with NPM

1. vx, .vezham, CHANGELOG.md, README.md
[*] heroui-inc/heroui [->] vezham/heroui
[*] github.com/heroui-inc/heroui [->] github.com/heroui/heroui

2. vx, .vezham, CHANGELOG.md
[*] "homepage": "https://heroui.com" [->] "homepage": "https://vezham.com"
[*] "author": "HeroUI <support@heroui.com>" [->] "author": "Vx OSS Devs <oss-developers@vezham.com>"
- "contributors": [] [->] -

2. [A] vx, .vezham, CHANGELOG.md
- "version": "2.*.* [->] "version": "0.0.*
- "@heroui/theme": ">= [->] "@vx-oss/theme": ">=0.0.0
- "@heroui/system": ">= [->] "@vx-oss/system": ">=0.0.0

[*] heroui-cli [->] vezham-cli
[*] @heroui [->] @vx-oss
