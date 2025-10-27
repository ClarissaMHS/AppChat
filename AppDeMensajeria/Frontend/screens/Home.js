import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../Backend/config/firebase';

export default function Home({ navigation }) {
	const handleSignOut = async () => {
		try {
			await signOut(auth);
			navigation.replace('Login');
		} catch (err) {
			console.log('Error signing out', err);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bienvenido</Text>

			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
				<Text style={styles.buttonText}>Ir al Chat</Text>
			</TouchableOpacity>

			<TouchableOpacity style={[styles.button, styles.signout]} onPress={handleSignOut}>
				<Text style={styles.buttonText}>Cerrar sesión</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
	title: { fontSize: 24, fontWeight: '700', marginBottom: 20 },
	button: {
		height: 48,
		width: '100%',
		backgroundColor: '#3478f6',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
	},
	signout: { backgroundColor: '#dc3545' },
	buttonText: { color: '#fff', fontWeight: '600' },
});
