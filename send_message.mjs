import { ChatGPTUnofficialProxyAPI } from 'chatgpt'

export async function send_message(req, res) {
    const {
        access_token,
        reverse_proxy = 'https://api.pawan.krd/backend-api/conversation',
        prompt,
        prompt_prefix,
        prompt_suffix,
        conversation_id,
        parent_message_id,
        timeout = 0,
        model = 'gpt-3.5-turbo',
    } = req.body
    if (!access_token || !prompt) {
        throw new Error('invalid [access_token] or [prompt]')
    }

    const chatgpt_api = new ChatGPTUnofficialProxyAPI({
        accessToken: access_token,
        apiReverseProxyUrl: reverse_proxy,
        model,
    })
    const send_message_response = await chatgpt_api.sendMessage(prompt, {
        conversationId: conversation_id,
        parentMessageId: parent_message_id,
        promptPrefix: prompt_prefix,
        promptSuffix: prompt_suffix,
        timeoutMs: Number(timeout),
    })
    res.json({
        text: send_message_response.text,
        conversation_id: send_message_response.conversationId,
        parent_message_id: send_message_response.id,
    })
}
