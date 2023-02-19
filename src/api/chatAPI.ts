
let subscribers = {
    'messageReceived': [] as MessagesReceivedSubscriberType[],
    'statusChanged': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null =null


const closeWsHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

let messageWSHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messageReceived'].forEach(s => s(newMessages))
}

let openWSHandler = () => {
    notifySubscribersAboutStatus('ready')
}

let errorWSHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('restart page')
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeWsHandler)
    ws?.removeEventListener('message', messageWSHandler)
    ws?.removeEventListener('open', openWSHandler)
    ws?.removeEventListener('error', errorWSHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['statusChanged'].forEach(s => s(status))
}

function createChannel() {
    cleanUp()
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

    notifySubscribersAboutStatus('pending')

    ws.addEventListener('close', closeWsHandler)
    ws.addEventListener('message', messageWSHandler)
    ws.addEventListener('open', openWSHandler)
    ws.addEventListener('error', errorWSHandler)
}


export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messageReceived']=[];
        subscribers['statusChanged']=[];
        cleanUp()
        ws?.close()
    },
    subscribe( eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }

}


//================TYPES==============

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

type EventsNamesType = 'messageReceived' | 'statusChanged'

export type StatusType = 'pending' | 'ready' | 'error'