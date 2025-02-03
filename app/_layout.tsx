import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider'
import '@/global.css'

import { Slot, Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <GluestackUIProvider mode='light'>
      <Stack>
        <Stack.Screen name='index' options={{ title: 'Shop' }} />
      </Stack>
    </GluestackUIProvider>
  )
}
