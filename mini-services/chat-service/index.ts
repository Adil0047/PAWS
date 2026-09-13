import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  // DO NOT change the path, it is used by Caddy to forward the request to the correct port
  path: '/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  pingTimeout: 60000,
  pingInterval: 25000,
})

interface ChatMessage {
  id: string
  sender: 'user' | 'agent'
  content: string
  timestamp: number
}

interface Session {
  id: string
  name: string
  email: string
  messages: ChatMessage[]
  lastActivity: number
}

const sessions = new Map<string, Session>()

const generateId = () => Math.random().toString(36).slice(2, 11)

// Knowledge base for smart auto-replies
const replyRules: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['price', 'cost', 'charge', 'fee', 'how much', 'pkr', 'rate'],
    reply:
      "Our pricing starts from just 750 PKR per page for undergraduate work and adjusts based on academic level, page count, and deadline. You can get an instant exact quote using the Price Calculator on our homepage — no signup needed!",
  },
  {
    keywords: ['deadline', 'urgent', 'fast', 'quick', 'asap', 'rush', 'hours'],
    reply:
      "We offer deadlines as fast as 6 hours for urgent tasks! Our speedy writers have an outstanding track record of delivering quality work on time, every time. What's your deadline?",
  },
  {
    keywords: ['plagiarism', 'original', 'copy', 'ai', 'chatgpt', 'unique'],
    reply:
      "100% human-written and plagiarism-free, guaranteed! We never use ChatGPT or AI tools. Every paper is crafted by expert writers and comes with a free plagiarism report.",
  },
  {
    keywords: ['phd', 'doctoral', 'doctorate'],
    reply:
      "We have PhD-qualified writers specializing in dissertations and doctoral theses. They guide you through every stage — from proposal to defense. Would you like to see our PhD writers' profiles?",
  },
  {
    keywords: ['master', 'msc', 'mphil', 'masters'],
    reply:
      "Our Master's thesis writers hold advanced degrees and ensure your work meets the highest academic standards. We provide end-to-end assistance with original ideas and proper formatting.",
  },
  {
    keywords: ['dissertation', 'thesis'],
    reply:
      "We handle dissertations and theses at all levels. Our experts dig out the most relevant information from authentic sources to deliver content that reflects deep understanding. What's your topic or discipline?",
  },
  {
    keywords: ['assignment', 'essay', 'coursework', 'homework'],
    reply:
      "We cover assignments, essays, and coursework across all subjects — theoretical or technical. Every piece is customized, well-researched, and plagiarism-free. What subject do you need help with?",
  },
  {
    keywords: ['research', 'proposal', 'paper'],
    reply:
      "From topic selection to a winning conclusion, our research proposal writing service covers all subjects and levels. We help you showcase your potential and make an impact.",
  },
  {
    keywords: ['payment', 'pay', 'card', 'bank', 'transfer', 'method'],
    reply:
      "We accept credit/debit cards and bank transfers. All payments are processed through secure, encrypted channels. Your financial information is never stored or shared.",
  },
  {
    keywords: ['refund', 'money back', 'guarantee', 'revision', 'edit'],
    reply:
      "We offer free unlimited revisions until you're 100% satisfied, plus a money-back guarantee if we fail to meet agreed requirements. Your success is our priority.",
  },
  {
    keywords: ['contact', 'phone', 'email', 'call', 'reach'],
    reply:
      "You can reach us 24/7 at +92 336 5162383 or info@thesiswritingservice.com.pk. Our support team responds within minutes during business hours.",
  },
  {
    keywords: ['privacy', 'confidential', 'safe', 'secure', 'anonymous'],
    reply:
      "Your privacy is our top priority. We never share your personal information or order details with any third party. All communications are encrypted and confidential.",
  },
  {
    keywords: ['discount', 'offer', 'deal', 'promo', 'coupon'],
    reply:
      "Yes! We offer generous discounts for bulk orders and referrals. Plus, every package includes premium features worth €112.94 absolutely free. Check the Premium Features section for details!",
  },
  {
    keywords: ['hi', 'hello', 'hey', 'salam', 'assalam'],
    reply:
      "Hello! Welcome to Thesis Writing Service PK. How can I help you today? You can ask about pricing, deadlines, services, or anything else.",
  },
  {
    keywords: ['thanks', 'thank', 'shukriya', 'great', 'awesome'],
    reply:
      "You're very welcome! Feel free to place your order anytime or reach out if you have more questions. We're here 24/7.",
  },
]

function getSmartReply(userMessage: string): string {
  const lower = userMessage.toLowerCase()
  for (const rule of replyRules) {
    if (rule.keywords.some((k) => lower.includes(k))) {
      return rule.reply
    }
  }
  return "Thanks for your message! Our team typically responds within a few minutes. Meanwhile, you can check our FAQ section or use the Price Calculator for instant pricing. Would you like me to connect you with a writer?"
}

function getWelcomeMessage(name: string): ChatMessage {
  return {
    id: generateId(),
    sender: 'agent',
    content: `Hi ${name}! 👋 Welcome to Thesis Writing Service PK. I'm here to help with any questions about pricing, deadlines, services, or placing an order. What can I assist you with today?`,
    timestamp: Date.now(),
  }
}

io.on('connection', (socket) => {
  console.log(`[chat-service] Client connected: ${socket.id}`)

  socket.on('start-session', (data: { name: string; email: string }) => {
    const session: Session = {
      id: socket.id,
      name: data.name || 'Guest',
      email: data.email || '',
      messages: [getWelcomeMessage(data.name || 'Guest')],
      lastActivity: Date.now(),
    }
    sessions.set(socket.id, session)
    socket.emit('session-started', { messages: session.messages })
    console.log(`[chat-service] Session started for ${session.name}`)
  })

  socket.on('send-message', (data: { content: string }) => {
    const session = sessions.get(socket.id)
    if (!session) return

    const userMessage: ChatMessage = {
      id: generateId(),
      sender: 'user',
      content: data.content,
      timestamp: Date.now(),
    }
    session.messages.push(userMessage)
    session.lastActivity = Date.now()

    // Emit typing indicator
    socket.emit('agent-typing', {})

    // Smart auto-reply after a realistic delay
    const replyDelay = 900 + Math.random() * 800
    setTimeout(() => {
      const agentMessage: ChatMessage = {
        id: generateId(),
        sender: 'agent',
        content: getSmartReply(data.content),
        timestamp: Date.now(),
      }
      session.messages.push(agentMessage)
      session.lastActivity = Date.now()
      socket.emit('agent-message', { message: agentMessage })
    }, replyDelay)
  })

  socket.on('disconnect', () => {
    sessions.delete(socket.id)
    console.log(`[chat-service] Client disconnected: ${socket.id}`)
  })

  socket.on('error', (error) => {
    console.error(`[chat-service] Socket error (${socket.id}):`, error)
  })
})

const PORT = 3003
httpServer.listen(PORT, () => {
  console.log(`[chat-service] Live chat server running on port ${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('[chat-service] Received SIGTERM, shutting down...')
  httpServer.close(() => process.exit(0))
})
process.on('SIGINT', () => {
  console.log('[chat-service] Received SIGINT, shutting down...')
  httpServer.close(() => process.exit(0))
})
