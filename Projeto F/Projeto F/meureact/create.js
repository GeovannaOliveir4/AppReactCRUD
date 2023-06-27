import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

export default function App() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const navigation = useNavigation();

    const handleButtonPress = () => {
        navigation.navigate('Get');
    };

    const handleCreateUser = async () => {
        try {
            const response = await axios.post('http://localhost:8800/users', {
                nome,
                telefone,
                email,
                dataNascimento,
            });
            const { message, user } = response.data;
            Alert.alert(message);
            console.log(user); // Exemplo: exibindo o usuário cadastrado no console
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNome}
                value={nome}
                placeholder="Digite seu nome"
            />

            <Text style={styles.label}>Telefone:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTelefone}
                value={telefone}
                placeholder="Digite seu telefone"
            />

            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Digite seu email"
            />

            <Text style={styles.label}>Data de Nascimento:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDataNascimento}
                value={dataNascimento}
                placeholder="Digite sua data de nascimento"
            />

            <Button title="Cadastrar" onPress={handleCreateUser} />
            <Button title="Ir para Get" onPress={handleButtonPress} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});
