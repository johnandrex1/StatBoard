// ThemeProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { Theme, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ColorValue, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FontStyle = {
	fontFamily: string;
	fontWeight:
	| 'normal'
	| 'bold'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'
};

interface CustomTheme extends Theme {
	tab: {
		iconColor: string;
		backgroundColor: ColorValue;
	}
	brandColors: {
		brandBlack: ColorValue;
		brandWhite: ColorValue;
		brandOrange: ColorValue;
	};
	text: {
		primary: ColorValue;
		accent: ColorValue;
	}
	screen: {
		background: ColorValue;
		textPrimary: ColorValue;
	};
	card: {
		background: ColorValue;
		cardTextDisplayHeader: ColorValue,
		cardTextPrimary: ColorValue;
		cardTextAccent: ColorValue;
	};
	statusBar: {
		background: ColorValue
	};
	table: {
		background: ColorValue;
		headerColor: ColorValue;
		dataColor: ColorValue;
		iconColorPrimary: ColorValue;
		iconColorAccent: ColorValue;
	};
	radarGraph: {
		firstOvelay: ColorValue;
		secondOvelay: ColorValue;
		thirdOvelay: ColorValue;
		mainOverlay: ColorValue;
		label: ColorValue;
		points: ColorValue;
	},
	intro: {
		background: ColorValue;
	},
	themeToggle: {
		moon: ColorValue;
		sun: ColorValue;
		label: ColorValue;
	}
	fonts: {
		regularFontThin: string;
		regularFontExtraLight: string;
		regularFontLight: string;
		regularFontRegular: string;
		regularFontMedium: string;
		regularFontSemiBold: string;
		regularFontBold: string;
		regularFontExtraBold: string;
		regularFontBlack: string;
		regularRegular: FontStyle,
		regularMedium: FontStyle;
		regularBold: FontStyle;
		regularHeavy: FontStyle;

		headerFontThin: string;
		headerFontExtraLight: string;
		headerFontLight: string;
		headerFontRegular: string;
		headerFontMedium: string;
		headerFontSemiBold: string;
		headerFontBold: string;
		headerFontExtraBold: string;
		headerFontBlack: string;
		regular: FontStyle,
		medium: FontStyle;
		bold: FontStyle;
		heavy: FontStyle;
	},
}

const lightTheme: CustomTheme = {
	...DefaultTheme,
	tab: {
		iconColor: '#000',
		backgroundColor: '#F5F5F5'
	},
	brandColors: {
		brandBlack: '#000000',
		brandWhite: '#FFFFFF',
		brandOrange: '#F68B1F'
	},
	screen: {
		background: '#F5F5F5',
		textPrimary: '#000'
	},
	card: {
		background: '#FFF',
		cardTextDisplayHeader: '#F68B1F',
		cardTextPrimary: '#000000',
		cardTextAccent: '#8F8F8F'
	},
	text: {
		primary: '#000',
		accent: '#CCC'
	},
	statusBar: {
		background: '#000'
	},
	table: {
		background: '#FFF',
		headerColor: '#000',
		dataColor: '#000',
		iconColorPrimary: '#F68B1F',
		iconColorAccent: '#F68B1F'
	},
	radarGraph: {
		firstOvelay: 'rgba(246, 139, 31, 0.1)',
		secondOvelay: 'rgba(246, 139, 31, 0.2)',
		thirdOvelay: 'rgba(246, 139, 31, 0.3)',
		mainOverlay: 'rgba(122, 122, 122, 0.4)',
		label: '#000',
		points: ''
	},
	intro: {
		background: '#FFF'
	},
	themeToggle: {
		moon: '#000',
		sun: '#000',
		label: '#000'
	},
	fonts: {
		regularFontThin: 'Roboto-Thin',
		regularFontExtraLight: 'Roboto-ExtraLight',
		regularFontLight: 'Roboto-Light',
		regularFontRegular: 'Roboto-Regular',
		regularFontMedium: 'Roboto-Medium',
		regularFontSemiBold: 'Roboto-SemiBold',
		regularFontBold: 'Roboto-Bold',
		regularFontExtraBold: 'Roboto-ExtraBold',
		regularFontBlack: 'Roboto-Black',
		regularRegular: { fontFamily: 'Roboto-Regular', fontWeight: 'normal' },
		regularMedium: { fontFamily: 'Roboto-Medium', fontWeight: '500' },
		regularBold: { fontFamily: 'Roboto-Bold', fontWeight: '700' },
		regularHeavy: { fontFamily: 'Roboto-ExtraBold', fontWeight: '900' },

		headerFontThin: 'Oswald-Thin',
		headerFontExtraLight: 'Oswald-ExtraLight',
		headerFontLight: 'Oswald-Light',
		headerFontRegular: 'Oswald-Regular',
		headerFontMedium: 'Oswald-Medium',
		headerFontSemiBold: 'Oswald-SemiBold',
		headerFontBold: 'Oswald-Bold',
		headerFontExtraBold: 'Oswald-ExtraBold',
		headerFontBlack: 'Oswald-Black',
		regular: { fontFamily: 'Oswald-Regular', fontWeight: 'normal' },
		medium: { fontFamily: 'Oswald-Medium', fontWeight: '500' },
		heavy: { fontFamily: 'Oswald-Bold', fontWeight: '700' },
		bold: { fontFamily: 'Oswald-ExtraBold', fontWeight: '900' }
	},
};

const darkTheme: CustomTheme = {
	...DarkTheme,
	tab: {
		iconColor: '#000',
		backgroundColor: '#3D3D3D'
	},
	brandColors: {
		brandBlack: '#000000',
		brandWhite: '#FFFFFF',
		brandOrange: '#F68B1F'
	},
	screen: {
		background: '#141414',
		textPrimary: '#FFF'
	},
	card: {
		background: '#FFF',
		cardTextDisplayHeader: '#F68B1F',
		cardTextPrimary: '#000000',
		cardTextAccent: '#8F8F8F'
	},
	text: {
		primary: '#fff',
		accent: '#CCC'
	},
	statusBar: {
		background: '#000'
	},
	table: {
		background: '#FFF',
		headerColor: '#000',
		dataColor: '#000',
		iconColorPrimary: '#F68B1F',
		iconColorAccent: '#8F8F8F'
	},
	radarGraph: {
		firstOvelay: 'rgba(246, 139, 31, 0.1)',
		secondOvelay: 'rgba(246, 139, 31, 0.2)',
		thirdOvelay: 'rgba(246, 139, 31, 0.3)',
		mainOverlay: 'rgba(122, 122, 122, 0.4)',
		label: '#fff',
		points: ''
	},
	intro: {
		background: '#000'
	},
	themeToggle: {
		moon: '#fff',
		sun: '#fff',
		label: '#fff'
	},
	fonts: {
		regularFontThin: 'Roboto-Thin',
		regularFontExtraLight: 'Roboto-ExtraLight',
		regularFontLight: 'Roboto-Light',
		regularFontRegular: 'Roboto-Regular',
		regularFontMedium: 'Roboto-Medium',
		regularFontSemiBold: 'Roboto-SemiBold',
		regularFontBold: 'Roboto-Bold',
		regularFontExtraBold: 'Roboto-ExtraBold',
		regularFontBlack: 'Roboto-Black',
		regularRegular: { fontFamily: 'Roboto-Regular', fontWeight: 'normal' },
		regularMedium: { fontFamily: 'Roboto-Medium', fontWeight: '500' },
		regularBold: { fontFamily: 'Roboto-Bold', fontWeight: '700' },
		regularHeavy: { fontFamily: 'Roboto-ExtraBold', fontWeight: '900' },

		headerFontThin: 'Oswald-Thin',
		headerFontExtraLight: 'Oswald-ExtraLight',
		headerFontLight: 'Oswald-Light',
		headerFontRegular: 'Oswald-Regular',
		headerFontMedium: 'Oswald-Medium',
		headerFontSemiBold: 'Oswald-SemiBold',
		headerFontBold: 'Oswald-Bold',
		headerFontExtraBold: 'Oswald-ExtraBold',
		headerFontBlack: 'Oswald-Black',
		regular: { fontFamily: 'Oswald-Regular', fontWeight: 'normal' },
		medium: { fontFamily: 'Oswald-Medium', fontWeight: '500' },
		heavy: { fontFamily: 'Oswald-Bold', fontWeight: '700' },
		bold: { fontFamily: 'Oswald-ExtraBold', fontWeight: '900' }
	}
};

interface ThemeContextProps {
	theme: CustomTheme;
	toggleTheme: (theme: 'light' | 'dark') => void;
	appTheme: 'light' | 'dark'
}

const THEME_KEY = 'APP_THEME';

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const colorScheme = useColorScheme();
	const [appTheme, setAppTheme] = useState<'light' | 'dark'>(colorScheme ?? 'light');

	// Load saved theme from AsyncStorage
	useEffect(() => {
		const loadTheme = async () => {
			try {
				const savedTheme = await AsyncStorage.getItem(THEME_KEY);
				if (savedTheme) {
					setAppTheme(savedTheme as 'light' | 'dark');
				}
			} catch (error) {
				console.error('Error loading theme:', error);
			}
		};
		loadTheme();
	}, []);

	const toggleTheme = async (toggleColorScheme: 'light' | 'dark') => {
		setAppTheme(toggleColorScheme);
		try {
			await AsyncStorage.setItem(THEME_KEY, toggleColorScheme);
		} catch (error) {
			console.error('Error saving theme:', error);
		}
	};

	const theme = useMemo(() => (appTheme === 'light' ? lightTheme : darkTheme), [appTheme]);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, appTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextProps => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
