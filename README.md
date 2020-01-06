# Weather

右下角简易天气展示小插件

![demo.png](https://i.loli.net/2020/01/05/tNFlcrfiOhLgVpj.png)

## Features
- 支持主动刷新天气数据
- 支持展示数据定制化

## Build from Source Code

```bash
git clone https://github.com/Makcy/Tressa.git
cd vscode-instant-weather
yarn install
yarn global add vsce 
vsce package .
```

## Extension Settings

* `Weather.Weather.Display`: 显示 / 移除 天气
* `Weather.Temperature.Display`: 显示 / 移除 气温
* `Weather.City.Display`: 显示 / 移除 城市
