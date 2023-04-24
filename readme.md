# chatgpt-api

封装 OpenAI 网页版最新 ChatGPT 接口, 不需要使用 API Key, 完全免费

## 更新日志

### 最新更新 20230420

- 更换默认 `reverse_proxy` 为 `https://ai.fakeopen.com/api/conversation`
- 新增获取 `access_token` 方式三

### [历史更新](https://github.com/zhuweiyou/chatgpt-api/releases)

## 部署方式

建议 `部署在海外服务器` 或 `使用代理`, 否则可能无法正常调用 OpenAI

### 方式一

```bash
docker run -d -p 3000:3000 zhuweiyou/chatgpt-api:20230420
```

### 方式二

安装 `nodejs 18.x` 环境

```bash
npm install --production
npm start
```

程序会打印 `Listening on http://localhost:3000` 表示启动成功

### 方式三

自己部署太麻烦, 想要快速测试? 可以将文档中的 `BASE_URL` 更换成以下地址

<https://zhuweiyou-chatgpt-api.vercel.app>

> API 演示站点, 仅供测试

## 使用文档

BASE_URL `http://localhost:3000`

POST Body 格式为 `x-www-form-urlencoded`

### 第一步: 获取网页版 access_token

#### 方式一: POST `/get_access_token` 登录获取

<details>
  <summary><del>暂不可用</del></summary>

-   `email` OpenAI 帐号 (不支持谷歌/微软授权登录)
-   `password` OpenAI 密码

响应

```json
{
    "access_token": "token内容"
}
```

![get_access_token截图](https://user-images.githubusercontent.com/8413791/230726142-7bc08fad-a46b-497b-be57-1ca4cd57e4f8.png)

> 获取成功之后建议缓存本地, 不用每次都调用获取
</details>

#### 方式二: 如果方式一获取失败, 或者你是谷歌/微软帐号注册的 OpenAI, 可以手动登录获取

访问 <https://chat.openai.com/chat> 成功登录之后, 打开浏览器开发者工具 (F12) -> 刷新页面- > Network
找到 `/api/auth/session` 请求, 复制 `accessToken` 存到你本地配置

![截图](https://user-images.githubusercontent.com/8413791/225305658-188ec53c-c3ee-4ec6-9306-9ff9ce2c94af.png)

#### 方式三: 如果方式二你上不去官网, 可以尝试以下方式更简单获取

[点击这里获取 token](https://ai.fakeopen.com/auth)

### 第二步: 向 ChatGPT 提问

#### POST `/send_message`

不消耗免费额度, 也不需要花钱

-   `access_token` 在 [第一步] 中获取的 access_token
-   `prompt` 提问内容
-   `model` 可选. 默认 `gpt-3.5-turbo`, 如果你是 ChatGPT Plus 账号可以传入 `gpt-4` 来切换模型
-   `timeout` 可选. 超时时间(毫秒), 默认无限等待
-   `conversation_id` 可选. 前一次 /send_message 的结果中返回, 用于上下文连续会话
-   `parent_message_id` 可选. 前一次 /send_message 的结果中返回, 用于上下文连续会话
-   `reverse_proxy` 可选. 反向代理服务器, 用于绕过 cloudflare 人机验证
    1. `https://ai.fakeopen.com/api/conversation` (当前默认)
    2. `https://api.pawan.krd/backend-api/conversation`

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
