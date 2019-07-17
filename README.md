# Predictor-GUI
汎用GUI分類器実行プログラム．  
デフォルト分類器は501統合戦闘航空団のキャラクター推定（ストライクウィッチーズ）．  
拡張子は「jpeg/jpg, png, bmp」をサポート．

General-purpose GUI classifier execution program.
The default classifier is the character estimation of the 501st Joint fighter wing (Strike Witches).  
The extension supports "jpeg / jpg, png, bmp".

![main view](https://raw.githubusercontent.com/takkaO/Predictor-GUI/image/image.png "Main View")

## Require
- Node.js
- JavaScript Package
	- *see package.json*
- Python3
	- tensorflow 1.14.0
	- numpy
	- opencv-python
	- urllib3

## How to use
### Use only
Windows exe file is [HERE](https://github.com/takkaO/Predictor-GUI/releases).

### Build
```
npm i
npm run set_env
npm run mybuild
npm start
npm run pack_win
```

## How to use custom predictor
任意のフォルダにネットワークモデルと分類プログラムを配置する．  
[Files] -> [Preference] から実行コマンド，分類プログラム，ネットワークモデルをセットする．  
分類プログラムでは以下の入出力を行う．

- **入力**
分類プログラムのパス，モデルファイルのパス，分類する画像のパス
- **出力**
URIエンコード済みの文字列を標準出力

日本語などの幅広い言語に対応するために，Pythonからの出力はURIエンコードした文字列とする．  


Place the network model and classification program in any folder.
Set the execution command, classification program, and network model from [Files]-> [Preference].
The classification program performs the following inputs and outputs.

- **Input**
Path of classification program, path of model file, path of image to be classified
- **Output**
Standard output of URI encoded string

The output from Python is a URI-encoded string to support a wide range of languages such as Japanese.