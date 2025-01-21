import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
	const colorTheme = useColorScheme();
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorTheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</ThemeProvider>	
		</QueryClientProvider>

	)
}
