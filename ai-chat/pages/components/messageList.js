import styles from './messageList.module.css'
import React, {useState} from 'react';
const MessageList = () => {
    // const chats = [
    //     { sender: 'user', message: 'Hello, how are you?' },
    //     { sender: 'ai', message: 'I am fine, thank you!' }
    // ];

    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const sendMessage = async () => {
        if (!userMessage.trim()) return;
        setLoading(true);

        try {
            const response = await fetch('https://ai-talkforge.onrender.com/chat', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt: userMessage, }),
            });
            if (!response.ok) {
                throw new Error("Failed to get the AI response");
            }
            const data = await response.json();
            setChatHistory((prev) => [...prev, { sender: 'user', message: userMessage }, { sender: 'ai', message: data.response }]);
            setUserMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Error sending message. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>AI Chat</h1>
            </div>
            <div className={styles.chatBox}>
                {chatHistory.map((chat, index) => (
                    <div key={index} className={`${styles.message} ${chat.sender === 'user' ? styles.userMessage : styles.botMessage}`}>
                        <strong>{chat.sender}:</strong> {chat.message}
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    className={styles.input}
                    disabled={loading}
                />
                <button onClick={sendMessage} className={styles.button} disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
                {/* Input field for new messages */}
            </div>
        </div>
    );
};

export default MessageList;