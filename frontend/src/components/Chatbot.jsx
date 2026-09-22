import { useEffect, useRef, useState } from 'react'
import { getMockReply } from '../utils/mockBot'
import './Chatbot.css'

const INITIAL_MESSAGE = {
  id: 'welcome',
  role: 'bot',
  text: 'Bonjour 👋 Je suis votre assistant IA. Comment puis-je vous aider ?',
}

export default function Chatbot() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  async function handleSend(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || isTyping) return

    const userMessage = { id: crypto.randomUUID(), role: 'user', text }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    const reply = await getMockReply(text)

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'bot', text: reply },
    ])
    setIsTyping(false)
  }

  return (
    <div className="chatbot">
      <header className="chatbot-header">
        <div className="chatbot-avatar">🤖</div>
        <div>
          <h1>Assistant IA</h1>
          <p className="chatbot-status">{isTyping ? 'en train d\'écrire…' : 'en ligne'}</p>
        </div>
      </header>

      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chatbot-message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="chatbot-message bot typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez votre message…"
          autoFocus
        />
        <button type="submit" disabled={!input.trim() || isTyping}>
          Envoyer
        </button>
      </form>
    </div>
  )
}
