import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Backend/config/firebase';

export default function Signup({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSignup = async () => {
		setError('');
		if (!email) return setError('Introduce un email válido');
		if (!password || password.length < 6)
			return setError('La contraseña debe tener al menos 6 caracteres');

		setLoading(true);
		try {
			await createUserWithEmailAndPassword(auth, email.trim(), password);
			setLoading(false);
			navigation.replace('Home');
		} catch (err) {
			setLoading(false);
			const code = err?.code || '';
			if (code.includes('email-already-in-use')) setError('El email ya está en uso');
			else if (code.includes('invalid-email')) setError('Email inválido');
			else setError('Error al crear la cuenta');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Regístrate</Text>

			<TextInput
				style={styles.input}
				placeholder="Email"
				keyboardType="email-address"
				autoCapitalize="none"
				value={email}
				onChangeText={setEmail}
			/>

			<TextInput
				style={styles.input}
				placeholder="Contraseña"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>

			{error ? <Text style={styles.errorText}>{error}</Text> : null}

			<TouchableOpacity
				style={[styles.button, loading ? styles.buttonDisabled : null]}
				onPress={handleSignup}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Crear cuenta</Text>
				)}
			</TouchableOpacity>

			<View style={styles.row}>
				<Text>¿Ya tienes cuenta?</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Login')}>
					<Text style={styles.link}> Inicia sesión</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		marginBottom: 20,
		alignSelf: 'center',
	},
	input: {
		height: 48,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		marginBottom: 12,
	},
	button: {
		height: 48,
		backgroundColor: '#28a745',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
	},
	buttonDisabled: { opacity: 0.7 },
	buttonText: { color: '#fff', fontWeight: '600' },
	row: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
	link: { color: '#3478f6', fontWeight: '600' },
	errorText: { color: 'red', marginBottom: 8, textAlign: 'center' },
});
