// Simple rule-based mock "AI" responder — swap this out later for a real API call.
const RULES = [
  { pattern: /bonjour|salut|hello|coucou/i, responses: [
    'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
    'Salut ! Que puis-je faire pour vous ?',
  ] },
  { pattern: /ça va|comment vas-tu|comment allez-vous/i, responses: [
    'Je suis une IA, donc toujours en pleine forme ! Et vous ?',
  ] },
  { pattern: /merci/i, responses: [
    'Avec plaisir !',
    'Je vous en prie 😊',
  ] },
  { pattern: /ton nom|qui es-tu|qui êtes-vous/i, responses: [
    'Je suis un chatbot de démonstration créé avec React.',
  ] },
  { pattern: /aide|help/i, responses: [
    'Je peux discuter avec vous. Essayez de me dire bonjour, ou posez-moi une question !',
  ] },
  { pattern: /au revoir|bye|à bientôt/i, responses: [
    'Au revoir, à bientôt !',
  ] },
]

const FALLBACKS = [
  'Intéressant, dites-m\'en plus.',
  'Je ne suis pas sûr de comprendre, pouvez-vous reformuler ?',
  'D\'accord, continuez.',
  'Je note ça !',
]

function pick(list) {
  return list[Math.floor(Math.random() * list.length)]
}

// Simulates network latency and returns a mock reply for the given message.
export function getMockReply(message) {
  const rule = RULES.find((r) => r.pattern.test(message))
  const reply = rule ? pick(rule.responses) : pick(FALLBACKS)
  const delay = 500 + Math.random() * 700

  return new Promise((resolve) => {
    setTimeout(() => resolve(reply), delay)
  })
}
