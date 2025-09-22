FROM node:18

# 作業ディレクトリ
WORKDIR /usr/src/app

# グローバルにionic/cordovaをインストール
RUN npm install -g @ionic/cli

# package.jsonだけを先にコピー（キャッシュを効かせる）
COPY package*.json ./

RUN npm install

# srcや設定ファイルをコピー
COPY . .

# ionic serveを実行（ホットリロードあり）
CMD ["ionic", "serve", "--external", "--host=0.0.0.0", "--port=8100"]
