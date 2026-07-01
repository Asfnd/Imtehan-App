export type MessageGroupPos = 'single' | 'first' | 'middle' | 'last'

export type ChatMessage = {
  id: number
  user_id: string
  user_name: string
  message: string
  created_at: string
}

export type ChatListItem =
  | { kind: 'date'; key: string; label: string }
  | {
      kind: 'message'
      key: string
      message: ChatMessage
      mine: boolean
      group: MessageGroupPos
      showAvatar: boolean
      showName: boolean
      compact: boolean
    }

const GROUP_GAP_MS = 3 * 60 * 1000

const AVATAR_PALETTES = [
  { bg: 'from-blue-600 to-indigo-600', fg: 'text-white' },
  { bg: 'from-emerald-600 to-teal-600', fg: 'text-white' },
  { bg: 'from-orange-500 to-amber-600', fg: 'text-white' },
  { bg: 'from-violet-600 to-purple-600', fg: 'text-white' },
  { bg: 'from-pink-600 to-rose-600', fg: 'text-white' },
  { bg: 'from-cyan-600 to-teal-600', fg: 'text-white' },
]

export function avatarGradient(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0
  return AVATAR_PALETTES[Math.abs(h) % AVATAR_PALETTES.length]
}

export function formatMessageTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDateSeparator(iso: string) {
  const d = new Date(iso)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
}

function sameGroup(a: ChatMessage, b: ChatMessage, mineA: boolean, mineB: boolean) {
  if (mineA !== mineB) return false
  if (a.user_id !== b.user_id) return false
  return Math.abs(new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) <= GROUP_GAP_MS
}

export function buildChatListItems(messages: ChatMessage[], userId?: string | null): ChatListItem[] {
  const items: ChatListItem[] = []
  let lastDate = ''

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i]
    const mine = !!userId && m.user_id === userId
    const dateLabel = formatDateSeparator(m.created_at)
    if (dateLabel !== lastDate) {
      items.push({ kind: 'date', key: `d-${dateLabel}-${m.id}`, label: dateLabel })
      lastDate = dateLabel
    }

    const prev = messages[i - 1]
    const next = messages[i + 1]
    const minePrev = prev ? !!userId && prev.user_id === userId : false
    const mineNext = next ? !!userId && next.user_id === userId : false
    const withPrev = prev ? sameGroup(prev, m, minePrev, mine) : false
    const withNext = next ? sameGroup(m, next, mine, mineNext) : false

    let group: MessageGroupPos = 'single'
    if (withPrev && withNext) group = 'middle'
    else if (withPrev) group = 'last'
    else if (withNext) group = 'first'

    items.push({
      kind: 'message',
      key: `m-${m.id}`,
      message: m,
      mine,
      group,
      showAvatar: !mine && (group === 'single' || group === 'last'),
      showName: !mine && (group === 'single' || group === 'first'),
      compact: group === 'middle' || group === 'last',
    })
  }

  return items
}

export function bubbleRadiusClass(isOwn: boolean, group: MessageGroupPos) {
  if (group === 'single') return isOwn ? 'rounded-2xl rounded-tr-md' : 'rounded-2xl rounded-tl-md'
  if (group === 'first') return isOwn ? 'rounded-2xl rounded-tr-md rounded-br-md' : 'rounded-2xl rounded-tl-md rounded-bl-md'
  if (group === 'middle') return isOwn ? 'rounded-2xl rounded-tr-md rounded-br-md' : 'rounded-2xl rounded-tl-md rounded-bl-md'
  return isOwn ? 'rounded-2xl rounded-tr-md' : 'rounded-2xl rounded-tl-md'
}
