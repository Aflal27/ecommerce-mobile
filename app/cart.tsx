import { FlatList, StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { useCart } from '@/store/cartStore'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Button, ButtonText } from '@/components/ui/button'
import { Redirect } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { createOrder } from '@/api/orders'
import { useAuth } from '@/store/authStore'
// import { Text } from '@/components/ui/text'

const cart = () => {
  const items = useCart((state) => state.items)
  const resetCart = useCart((state) => state.resetCart)
  const { token } = useAuth()

  const createOrderMutation = useMutation({
    mutationFn: () =>
      createOrder(
        items.map((item) => ({
          productId: item.product.id,
          quentity: item.quentity,
          price: item.product.price,
        })),
        token
      ),
    onSuccess: (data) => {
      resetCart()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const onCheckout = () => {
    createOrderMutation.mutate()
  }

  if (items.length === 0) {
    return <Redirect href={'/'} />
  }

  return (
    <FlatList
      data={items}
      contentContainerClassName='gap-2 max-w-[960px] w-full mx-auto p-2'
      renderItem={({ item }) => (
        <HStack className='bg-white p-3'>
          <VStack space='sm'>
            <Text bold>{item?.product?.name}</Text>
            <Text>$ {item?.product?.price}</Text>
          </VStack>
          <Text className='ml-auto'>{item?.quentity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  )
}

export default cart

const styles = StyleSheet.create({})
