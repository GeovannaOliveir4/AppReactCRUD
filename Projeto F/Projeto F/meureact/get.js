import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, Platform, SafeAreaView, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function Get() {
    const [users, setUsers] = useState([]);
    const [editedUser, setEditedUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8800/users');
            setUsers(response.data);
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(`http://localhost:8800/users/${editedUser.id}`, editedUser);
            Alert.alert('Sucesso', response.data.message);
            setIsEditing(false);
            fetchUsers();
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    const handleEditUser = (user) => {
        setEditedUser(user);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedUser({});
    };
    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8800/users/${userId}`);
            Alert.alert('Sucesso', 'Usuário excluído com sucesso');
            fetchUsers();
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    const renderUserItem = ({ item }) => (
        <View style={styles.userContainer}>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.nome}</Text>
                <Text style={styles.userPhone}>{item.telefone}</Text>
            </View>
            <View style={styles.actionContainer}>
                {isEditing && editedUser.id === item.id ? (
                    <>
                        <TextInput
                            style={styles.input}
                            value={editedUser.nome}
                            onChangeText={(text) => setEditedUser({ ...editedUser, nome: text })}
                        />
                        <TextInput
                            style={styles.input}
                            value={editedUser.telefone}
                            onChangeText={(text) => setEditedUser({ ...editedUser, telefone: text })}
                        />
                        <Button title="Atualizar" onPress={handleUpdateUser} />
                        <Button title="Cancelar" onPress={handleCancelEdit} />
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={() => handleEditUser(item)}>
                            <Text style={styles.actionText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteUser(item.id)}>
                            <Text style={styles.actionText}>Excluir</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderUserItem}
                contentContainerStyle={styles.flatListContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 100
    },
    flatListContent: {
        paddingBottom: 16,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userPhone: {
        fontSize: 14,
        color: '#888',
    },
    actionContainer: {
        flexDirection: 'row',
    },
    actionText: {
        color: 'blue',
        marginLeft: 8,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
});
