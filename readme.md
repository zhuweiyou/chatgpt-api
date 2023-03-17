# chatgpt-api

封装 OpenAI 网页版最新 ChatGPT 接口, 不需要使用 API Key, 完全免费

## 部署

建议 `部署在海外服务器` 或 `使用代理`, 否则可能无法正常调用 OpenAI

### 方式一

```bash
docker run -d -p 3000:3000 zhuweiyou/chatgpt-api:20230317
```

### 方式二

安装 `nodejs 18.x` 环境

```bash
npm install
npm start
```

## 使用

### 第一步

#### 手动登录网页版获取 access_token

访问 <https://chat.openai.com/chat> 成功登录之后, 打开浏览器开发者工具 (F12) -> 刷新页面- > Network 找到 `/api/auth/session` 请求, 复制 `accessToken` 存到你本地配置

![截图](https://user-images.githubusercontent.com/8413791/225305658-188ec53c-c3ee-4ec6-9306-9ff9ce2c94af.png)

### 第二步

#### POST <http://127.0.0.1:3000/send_message> 向 ChatGPT 提问

不消耗免费额度, 也不需要花钱

-   `access_token` 在 [第一步] 中获取的 access_token
-   `prompt` 提问内容
-   `timeout` 可选. 超时时间(毫秒), 默认无限等待
-   `conversation_id` 可选. 前一次 /send_message 的结果中返回, 用于上下文连续会话
-   `parent_message_id` 可选. 前一次 /send_message 的结果中返回, 用于上下文连续会话
-   `prompt_prefix` 可选. 默认为 `return the result in Chinese` 会让它尽量用中文回答
-   `prompt_suffix` 可选. 默认为 `空`
-   `reverse_proxy` 可选. 反向代理服务器, 用于绕过 cloudflare 人机验证, 默认内置

#### 成功响应

```json
{
    "text": "ChatGPT的回答",
    "conversation_id": "xxx",
    "parent_message_id": "yyy"
}
```

#### 失败响应

```json
{
    "message": "错误消息"
}
```

## 其它

-   [go-cqhttp](https://github.com/go-cqhttp) 有了 ChatGPT, 何不搭建一个 QQ 机器人?
