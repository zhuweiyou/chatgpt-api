import { ChatGPTUnofficialProxyAPI } from 'chatgpt'

export async function send_message(req, res) {
	let {
		access_token,
		reverse_proxy,
		prompt,
		prompt_prefix,
		prompt_suffix,
		conversation_id,
		parent_message_id,
		timeout = 0,
	} = req.body
	if (!access_token || !prompt) {
		throw new Error('invalid [access_token] or [prompt]')
	}
	timeout = Number(timeout)
	if (isNaN(timeout)) {
		throw new Error('invalid [timeout]')
	}
	const chatgpt_api = new ChatGPTUnofficialProxyAPI({
		accessToken: access_token,
		apiReverseProxyUrl: reverse_proxy,
	})
	const send_message_response = await chatgpt_api.sendMessage(prompt, {
		conversationId: conversation_id,
		parentMessageId: parent_message_id,
		promptPrefix: prompt_prefix ?? 'return the result in Chinese',
		promptSuffix: prompt_suffix,
		timeoutMs: timeout,
	})
	res.json({
		text: send_message_response.text,
		conversation_id: send_message_response.conversationId,
		parent_message_id: send_message_response.id,
	})
}
