import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, ButtonText } from '@/components/ui/button'

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button>
        <ButtonText>Button</ButtonText>
      </Button>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
