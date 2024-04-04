/* eslint-disable @typescript-eslint/no-unused-vars */
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {inject, observer, useLocalObservable} from 'mobx-react';
import AuthStore from '../../Stores/Auth.store';
import {mobxFormValidation} from '../../Components/MobxFormValidation/MobxFormValidation';
import {fields} from './fields';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
  authStore?: AuthStore;
}

const LoginScreen = ({navigation, authStore}: Props) => {
  const form = useMemo(() => mobxFormValidation(fields), []);
  const getField = (key: string) => form.$(key);

  useEffect(() => {
    storeData('ajay sinha');
  }, []);

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('my-key', value);
    } catch (e) {
      // saving error
      console.log('e', e);
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        // value previously stored
        console.log('value', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const onLogin = () => {
    const req = {username: authStore?.username, password: authStore?.password};
    console.log('req Data', req);
    console.log('form', form.values());
    getData();
    // navigation.navigate('Signup');
  };
  const handleChange = (value: any, field: string): void => {
    getField(field).set(value);
  };

  return (
    <View className="bg-white h-full w-full flex-1 justify-center items-center">
      <View className="bg-green-400 w-11/12 px-4 py-10 shadow-md rounded-md">
        <Text className="text-gray-800 text-center font-bold text-2xl mb-8">
          Login Screen
        </Text>
        <View className="flex flex-row mb-8">
          <Text className="w-2/5 font-medium text-lg text-gray-800">
            Username
          </Text>
          <TextInput
            className="w-3/5 p-2 bg-gray-100 text-gray-800 rounded-md"
            placeholder="Enter username"
            {...form.$('username').bind()}
            value={form.$('username')?.value}
            onChangeText={text => handleChange(text, 'username')}
          />
        </View>
        <View className="flex flex-row mb-8">
          <Text className="w-2/5 font-medium text-lg text-gray-800">
            Password
          </Text>
          <TextInput
            {...form.$('password').bind()}
            onChangeText={(value: string) => handleChange(value, 'password')}
            className="w-3/5 p-2 bg-gray-100 text-gray-800 rounded-md"
            placeholder="Enter Password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={() => onLogin()}
          className="mt-4 cursor-pointer py-2 px-4  bg-blue-400 rounded-full hover:bg-blue-200 focus:ring-blue-300">
          <Text className="text-center text-white ">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default inject('authStore')(observer(LoginScreen));
