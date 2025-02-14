import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import { Icon } from '@/components/ui/icon'
import '@/global.css'
import { useAuth } from '@/store/authStore'
import { useCart } from '@/store/cartStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Link, Slot, Stack } from 'expo-router'
import { ShoppingCart, User } from 'lucide-react-native'
import { Pressable, Text } from 'react-native'

const queryClient = new QueryClient()

export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length)
  const isLoggedIn = useAuth((s) => !!s.token)

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode='light'>
        <Stack
          screenOptions={{
            headerRight: () =>
              cartItemsNum > 0 && (
                <Link href={'/cart'} asChild>
                  <Pressable className='flex-row gap-2'>
                    <Icon as={ShoppingCart} />
                    <Text>{cartItemsNum}</Text>
                  </Pressable>
                </Link>
              ),
          }}
        >
          <Stack.Screen
            name='index'
            options={{
              title: 'Shop',
              headerLeft: () =>
                !isLoggedIn && (
                  <Link href={'/login'} asChild>
                    <Pressable className='flex-row gap-2'>
                      <Icon as={User} />
                    </Pressable>
                  </Link>
                ),
            }}
          />
          <Stack.Screen name='product/[id]' options={{ title: 'Product' }} />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  )
}
