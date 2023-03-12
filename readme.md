# chatgpt-api

封装 OpenAI 网页版最新 ChatGPT 接口

## 部署

```bash
docker-compose up -d
```

或者自己装环境, 安装 `nodejs v18+`

```bash
npm install
npm start
```

## 文档

### Base URL

<http://127.0.0.1:3000>

### 请求失败响应

```json
{
    "message": "错误消息"
}
```

### 所有 API 都使用 POST 请求

#### `/get_access_token` 登录获取 token

-   `email` openai 帐号 (不消耗 18 美元免费额度, 只用于登录)
-   `password` openai 密码

#### 响应

```json
{
    "access_token": "xxx"
}
```

> 大概 8 小时有效期, 建议开发者缓存至少 1 个小时以上, 而不是每次都调用获取

#### `/send_message` 向 ChatGPT 提问

-   `access_token` 在 /get_access_token 中获取的 access_token
-   `prompt` 提问内容
-   `timeout` 可选. 超时时间(毫秒), 默认无限等待
-   `conversation_id` 可选. 前一次 /send_message 的结果中返回, 用于上下文连续会话
-   `parent_message_id` 可选. 前一次 /send_message 的结果中返回, 用于上下文连续会话
-   `prompt_prefix` 可选. 默认为 'return the result in Chinese' 会让它尽量用中文回答
-   `prompt_suffix` 可选. 默认为 空
-   `reverse_proxy` 可选. 反向代理服务器, 用于绕过 cloudflare 人机验证, 默认内置

#### 响应

```json
{
    "text": "ChatGPT的回答",
    "conversation_id": "xxx",
    "parent_message_id": "yyy"
}
```

## 感谢

-   [transitive-bullshit/chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api)
-   [acheong08/OpenAIAuth](https://github.com/acheong08/OpenAIAuth)
