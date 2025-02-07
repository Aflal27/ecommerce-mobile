import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import ProductListItem from '@/components/ProductListItem'
import { listProducts } from '@/api/products'
import { useQuery } from '@tanstack/react-query'
 
const HomeScreen = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return (
      <Text>
        Error: {error.message || 'Something went wrong with the request'}
      </Text>
    )
  }

  return (
    <View>
      <FlatList
        data={products}
        numColumns={2}
        contentContainerClassName='gap-2'
        columnWrapperClassName='gap-2'
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
