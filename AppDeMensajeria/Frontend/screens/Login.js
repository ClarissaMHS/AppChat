(function () {
	// placeholder to keep file from being treated as binary if empty before patch
})();

import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Alert,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Backend/config/firebase';

export default function Login({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleLogin = async () => {
		setError('');
		if (!email) return setError('Introduce un email válido');
		if (!password || password.length < 6)
			return setError('La contraseña debe tener al menos 6 caracteres');

		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email.trim(), password);
			setLoading(false);
			// reemplaza la pila para evitar volver al login
			navigation.replace('Home');
		} catch (err) {
			setLoading(false);
			// Mapear errores comunes de Firebase a mensajes en español
			const code = err?.code || '';
			if (code.includes('user-not-found')) setError('Usuario no encontrado');
			else if (code.includes('wrong-password')) setError('Contraseña incorrecta');
			else if (code.includes('invalid-email')) setError('Email inválido');
			else setError('Error al iniciar sesión. Revisa tus datos');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iniciar sesión</Text>

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
				onPress={handleLogin}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator color="#fff" />
				) : (
					<Text style={styles.buttonText}>Entrar</Text>
				)}
			</TouchableOpacity>

			<View style={styles.row}>
				<Text>¿No tienes cuenta?</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Signup')}>
					<Text style={styles.link}> Regístrate</Text>
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
		backgroundColor: '#3478f6',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
	},
	buttonDisabled: {
		opacity: 0.7,
	},
	buttonText: {
		color: '#fff',
		fontWeight: '600',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 16,
	},
	link: {
		color: '#3478f6',
		fontWeight: '600',
	},
	errorText: {
		color: 'red',
		marginBottom: 8,
		textAlign: 'center',
	},
});

