import { Stack, useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { Image } from '@/components/ui/image'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { useQuery } from '@tanstack/react-query'
import { fetchProductByID } from '@/api/products'
import { useCart } from '@/store/cartStore'

export default function ProductDetails() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const addProduct = useCart((state) => state.addToCart)

  const addToCart = () => {
    addProduct(product)
  }

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchProductByID(Number(id)),
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return (
      <View>
        <Text>{error.message || 'Something went wrong with the request'}</Text>
      </View>
    )
  }

  return (
    <View>
      <Stack.Screen name='product/[id]' options={{ title: product?.name }} />

      <Card className='p-5 rounded-lg max-w-[560px]  '>
        <Image
          source={{
            uri: product?.image,
          }}
          className='mb-6 h-[240px] w-full rounded-md '
          alt={`${product?.name} image`}
          resizeMode='contain'
        />
        <Text className='text-sm font-normal mb-2 text-typography-700'>
          {product?.name}
        </Text>
        <VStack className='mb-6'>
          <Heading size='md' className='mb-4'>
            {product?.price}
          </Heading>
          <Text size='sm'>{product?.description}</Text>
        </VStack>
        <Box className='flex-col sm:flex-row'>
          <Button
            onPress={addToCart}
            className='px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1'
          >
            <ButtonText size='sm'>Add to cart</ButtonText>
          </Button>
          <Button
            variant='outline'
            className='px-4 py-2 border-outline-300 sm:flex-1'
          >
            <ButtonText size='sm' className='text-typography-600'>
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </View>
  )
}
