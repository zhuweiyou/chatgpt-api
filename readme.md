# chatgpt-api

封装 OpenAI 网页版最新 ChatGPT 接口, 不需要使用 API Key, 完全免费

## 更新日志

<details>
  <summary>20230411</summary>

- 打印请求日志
- 失败时使用 status 500, 以区分错误请求
- prompt_prefix 默认为空
</details>

<details>
  <summary>20230409</summary>

-  `增加` 使用 API 登录 `/get_access_token`
</details>

<details>
  <summary>20230408</summary>

-  `修改` `reverse_proxy` 内置为 `https://api.pawan.krd/backend-api/conversation`
</details>

## 部署方式

建议 `部署在海外服务器` 或 `使用代理`, 否则可能无法正常调用 OpenAI

### 方式一

```bash
docker run -d -p 3000:3000 zhuweiyou/chatgpt-api:20230409
```

### 方式二

安装 `nodejs 18.x` 环境

```bash
npm install
npm start
```

程序会打印 `Listening on http://localhost:3000` 表示启动成功

## 使用文档

BASE_URL `http://localhost:3000`

POST Body 格式为 `x-www-form-urlencoded`

### 第一步: 获取网页版 access_token

#### 方式一: POST `/get_access_token` 登录获取

- `email` OpenAI 帐号 (不支持谷歌/微软授权登录)
- `password` OpenAI 密码

响应

```json
{
  "access_token": "token内容",
  "expires": "过期时间"
}
```

![get_access_token截图](https://user-images.githubusercontent.com/8413791/230726142-7bc08fad-a46b-497b-be57-1ca4cd57e4f8.png)

> 获取成功之后建议缓存本地, 不用每次都调用获取

#### 方式二: 如果以上方式获取失败, 或者你是谷歌/微软帐号注册的 OpenAI, 可以手动登录获取

访问 <https://chat.openai.com/chat> 成功登录之后, 打开浏览器开发者工具 (F12) -> 刷新页面- > Network
找到 `/api/auth/session` 请求, 复制 `accessToken` 存到你本地配置

![截图](https://user-images.githubusercontent.com/8413791/225305658-188ec53c-c3ee-4ec6-9306-9ff9ce2c94af.png)

### 第二步: 向 ChatGPT 提问

#### POST `/send_message`

不消耗免费额度, 也不需要花钱

- `access_token` 在 [第一步] 中获取的 access_token
- `prompt` 提问内容
- `timeout` 可选. 超时时间(毫秒), 默认无限等待
- `conversation_id` 可选. 前一次 /send_message 的结果中返回, 用于上下文连续会话
- `parent_message_id` 可选. 前一次 /send_message 的结果中返回, 用于上下文连续会话
- `prompt_prefix` 可选. 默认为 `空`. 比如你可以传入 `return the result in Chinese` 它会尽量用中文回答
- `prompt_suffix` 可选. 默认为 `空`
- `reverse_proxy` 可选. 反向代理服务器, 用于绕过 cloudflare 人机验证
    - 默认内置 `https://api.pawan.krd/backend-api/conversation` 50 req / 15 seconds (~3 r/s)
    - 如果出现报错, 尝试更换 `https://bypass.churchless.tech/api/conversation` 5 req / 10 seconds by IP

#### 成功响应

```json
{
  "text": "ChatGPT的回答",
  "conversation_id": "xxx",
  "parent_message_id": "yyy"
}
```

![send_message截图](https://user-images.githubusercontent.com/8413791/226363534-5c856f41-1acb-4615-bcbd-b169d3f294e1.png)

### 以上所有 API 失败响应

HTTP Status Code: 500

```json
{
  "message": "错误消息"
}
```
