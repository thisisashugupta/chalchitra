export async function deliverMessage(message: string) {
    await new Promise((res) => setTimeout(res, 1000));
    
    return (Math.random() > 0.3) ? message : 'Message failed to send'
}