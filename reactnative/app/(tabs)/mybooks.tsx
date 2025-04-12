import MyBooksScreen from '@/components/organisms/MyBooksScreen';
import React from 'react';
import { View } from 'react-native';

const MyBooks: React.FC = () => {
    return (
        <View className='flex-1'>
            <MyBooksScreen/>
        </View>
    )
}

export default MyBooks;