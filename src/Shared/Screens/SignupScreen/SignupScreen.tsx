/* eslint-disable @typescript-eslint/no-unused-vars */
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useMemo} from 'react';
import {inject, observer} from 'mobx-react';
import AuthStore from '../../Stores/Auth.store';
import {mobxFormValidation} from '../../Components/MobxFormValidation/MobxFormValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fields} from './fields';

export interface GenericType {
  [name: string]: any;
}

interface Props {
  navigation: any;
  authStore?: AuthStore;
}

const SignupScreen = ({navigation, authStore}: Props) => {
  const form = useMemo(() => mobxFormValidation(fields), []);
  const getField = (key: string) => form.$(key);

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('storedUser');
      console.log('Data cleared successfully.');
    } catch (e) {
      console.error('Error clearing data:', e);
    }
  };

  const storeData = async (data: any) => {
    try {
      await AsyncStorage.setItem('storedUser', JSON.stringify(data));
    } catch (e) {
      // saving error
      console.log('e', e);
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('storedUser');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const onLogin = async () => {
    const {username, email, password} = form.values();
    const storedData = await getData();
    console.log('storedData', storedData);
    const req = {username, email, password};
    const signupData = storedData ? [...storedData, req] : [req];
    console.log('req Data', signupData);
    storeData(signupData);
    form.clear();
    navigation.navigate('Login');
  };

  const onSubmit = () => {
    form.submit({
      onSuccess: async () => {
        try {
          await onLogin();
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      },
      onError: (error: GenericType) => {
        console.log('error--', error.errors());
      },
    });
  };

  const handleChange = (value: any, field: string): void => {
    getField(field).set(value);
  };

  return (
    <View className="bg-white h-full w-full flex-1 justify-center items-center">
      <View className="bg-green-400 w-11/12 px-4 py-10 shadow-md rounded-md">
        <Text className="text-gray-800 text-center font-bold text-2xl mb-8">
          Signup Screen
        </Text>
        <Text>{form.errors().username}</Text>
        <View className="flex flex-row mb-8">
          <Text className="w-2/5 font-medium text-lg text-gray-800">
            Username
          </Text>
          <TextInput
            autoComplete="off"
            autoCapitalize="none"
            className="w-3/5 p-2 bg-gray-100 text-gray-800 rounded-md"
            placeholder="Enter username"
            {...form.$('username').bind()}
            value={form.$('username')?.value}
            onChangeText={text => handleChange(text, 'username')}
          />
        </View>
        <Text>{form.errors().email}</Text>
        <View className="flex flex-row mb-8">
          <Text className="w-2/5 font-medium text-lg text-gray-800">Email</Text>
          <TextInput
            autoComplete="off"
            autoCapitalize="none"
            className="w-3/5 p-2 bg-gray-100 text-gray-800 rounded-md"
            placeholder="Enter username"
            {...form.$('email').bind()}
            value={form.$('email')?.value}
            onChangeText={text => handleChange(text, 'email')}
          />
        </View>
        <Text>{form.errors().password}</Text>
        <View className="flex flex-row mb-8">
          <Text className="w-2/5 font-medium text-lg text-gray-800">
            Password
          </Text>
          <TextInput
            autoComplete="off"
            autoCapitalize="none"
            {...form.$('password').bind()}
            value={form.$('password')?.value}
            onChangeText={(value: string) => handleChange(value, 'password')}
            className="w-3/5 p-2 bg-gray-100 text-gray-800 rounded-md"
            placeholder="Enter Password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={() => onSubmit()}
          className="mt-4 cursor-pointer py-2 px-4  bg-blue-500 rounded-full hover:bg-blue-200 focus:ring-blue-300">
          <Text className="text-center text-white">Signup Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default inject('authStore')(observer(SignupScreen));
