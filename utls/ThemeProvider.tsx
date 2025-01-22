// ThemeProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Theme, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

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
	brandColors: {
		brandBlack: string;
		brandWhite : string;
		brandOrange : string;
	};
	text: {
		primary: string;
		accent: string;
	}
	screen: {
		background: string;
	};
	card: {
		background: string;
		cardTextPrimary: string;
		cardTextAccent: string;
	};
	statusBar: {
		background: string
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
	brandColors: {
		brandBlack: '#000000',
		brandWhite : '#FFFFFF',
		brandOrange : '#F68B1F'
	},
	screen: {
		background: '#CCCCCC',
	},
	card: {
		background: '#FFF',
		cardTextPrimary: '#000000',
		cardTextAccent: '#CCC'
	},
	text: {
		primary: '#000',
		accent: '#CCC'
	},
	statusBar: {
		background: '#000'
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
	brandColors: {
		brandBlack: '#000000',
		brandWhite : '#FFFFFF',
		brandOrange : '#F68B1F'
	},
	screen: {
		background: '#000',
	},
	card: {
		background: '#FFF',
		cardTextPrimary: '#000000',
		cardTextAccent: '#CCC'
	},
	text: {
		primary: '#000',
		accent: '#CCC'
	},
	statusBar: {
		background: '#000R'
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
	toggleTheme: ( theme: 'light' | 'dark') => void;
	appTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const colorScheme = useColorScheme();
	const [appTheme, setAppTheme] = useState<'light' | 'dark'>(colorScheme ?? 'light');

	const toggleTheme = (toggleColorScheme: 'light' | 'dark') => setAppTheme((prev) => toggleColorScheme);

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
