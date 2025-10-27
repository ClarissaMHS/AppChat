import React, { useState, useRef, useEffect } from "react";
import { 
    View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, 
    KeyboardAvoidingView, Platform, Keyboard 
} from "react-native";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const flatListRef = useRef(null);

    // Auto-scroll al enviar mensaje
    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const sendMessage = () => {
        if (text.trim()) {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: text.trim(),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isUser: true
            }]);
            setText("");
            Keyboard.dismiss();
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >

            {/* Lista de mensajes */}
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.message, item.isUser && styles.userMessage]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                style={styles.messagesList}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Input area simple */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Escribe un mensaje..."
                    onSubmitEditing={sendMessage}
                    returnKeyType="send"
                />
                <TouchableOpacity 
                    style={[styles.sendButton, !text.trim() && styles.sendButtonDisabled]} 
                    onPress={sendMessage}
                    disabled={!text.trim()}
                >
                    <Text style={styles.sendText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#007AFF',
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    messagesList: {
        flex: 1,
    },
    messagesContent: {
        padding: 10,
    },
    message: {
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 15,
        marginVertical: 4,
        maxWidth: '80%',
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#007AFF',
    },
    messageText: {
        color: 'black',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
        backgroundColor: '#f9f9f9',
    },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        justifyContent: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendText: {
        color: 'white',
        fontWeight: 'bold',
    },
});