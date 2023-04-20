import { ChatGPTUnofficialProxyAPI } from 'chatgpt'

export async function send_message(req, res) {
    const {
        access_token,
        reverse_proxy = 'https://ai.fakeopen.com/api/conversation',
        prompt,
        conversation_id,
        parent_message_id,
        timeout = 0,
        model = 'gpt-3.5-turbo',
    } = req.body
    if (!access_token || !prompt) {
        throw new Error('invalid [access_token] or [prompt]')
    }

    const chatgpt = new ChatGPTUnofficialProxyAPI({
        accessToken: access_token,
        apiReverseProxyUrl: reverse_proxy,
        model,
    })
    const response = await chatgpt.sendMessage(prompt, {
        conversationId: conversation_id,
        parentMessageId: parent_message_id,
        timeoutMs: Number(timeout),
    })
    res.json({
        text: response.text,
        conversation_id: response.conversationId,
        parent_message_id: response.id,
    })
}
