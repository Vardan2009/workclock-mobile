import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_STORAGE_KEY = "@workclock_user_theme";

export const saveTheme = async (theme) => {
    try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
        console.error("Error setting theme:", error);
    }
};

export const loadTheme = async () => {
    try {
        const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        return theme;
    } catch (error) {
        return "light";
    }
};
