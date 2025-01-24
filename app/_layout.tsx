import { ThemeProvider } from "@/utls/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';

const queryClient = new QueryClient();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		'Oswald-ExtraLight': require('../assets/fonts/Oswald-ExtraLight.ttf'),
		'Oswald-Light': require('../assets/fonts/Oswald-Light.ttf'),
		'Oswald-Regular': require('../assets/fonts/Oswald-Regular.ttf'),
		'Oswald-Medium': require('../assets/fonts/Oswald-Medium.ttf'),
		'Oswald-SemiBold': require('../assets/fonts/Oswald-SemiBold.ttf'),
		'Oswald-Bold': require('../assets/fonts/Oswald-Bold.ttf'),
		'Roboto-ExtraLight': require('../assets/fonts/Roboto-ExtraLight.ttf'),
		'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
		'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
		'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
		'Roboto-SemiBold': require('../assets/fonts/Roboto-SemiBold.ttf'),
		'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf')

	});
	
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<Stack screenOptions={{headerShown: false}}>
					<Stack.Screen name="index"/>
					<Stack.Screen name="(tabs)"/>
				</Stack>
			</ThemeProvider>	
		</QueryClientProvider>
	)
}
