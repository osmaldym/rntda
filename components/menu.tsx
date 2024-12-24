import { PropsWithChildren, RefObject, createContext, useContext } from "react";
import { DrawerLayoutAndroid, Image, StyleSheet } from "react-native";
import { Row } from "./arrangements";
import { Drawer } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AppRoutes from "../enums/routes.enum";
import { AuthContext, GuardData, useAuthGuard } from "../hooks/auth.guard";
import { AppDefTheme } from "../theme/colors";

// Types
type MenuItem = {
    label: 'Home' | 'Tags' | 'Profile' | 'Logout',
    icon: string,
    route?: AppRoutes,
    onPress?: () => void,
}

// Imports and necessary code to export or use here
const LOGO = require('../assets/logo.png')
const drawerWidth: number = 300;

export const MenuContext = createContext({} as RefObject<DrawerLayoutAndroid>);

/**
 * Edit this array if you want to add/edit elements to menu
 */
const allItems: Array<MenuItem> = [
    {
        label: 'Home',
        icon: 'home',
        route: AppRoutes.home,
    },
    {
        label: "Tags",
        icon: "tag-outline",
    },
    {
        label: "Profile",
        icon: "account-circle-outline",
    },
    {
        label: 'Logout',
        icon: 'logout',
    },
]

// Styles
const styles = StyleSheet.create({
    items: {
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    row: {
        marginVertical: 25,
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: "contain",
    }
})

// Elements
const allItemsToRender = () => allItems.map((el, i) => (
    <Drawer.Item
        key={i}
        label={el.label}
        icon={el.icon}
        active={true}
        onPress={el.onPress}
        background={{color: AppDefTheme.colors.primary}}
        style={styles.items}
        />
)) 

const MenuView = (props: PropsWithChildren<{}>) => (
    <>
        <Row style={styles.row}>
            <Image source={LOGO} style={styles.logo}/>
        </Row>
        {props.children}
    </>
)

export function Menu(props: PropsWithChildren<{}>): React.JSX.Element {
    const [guard] = useAuthGuard();

    const drawerContext = useContext(MenuContext);
    const { logout } = useContext(AuthContext) as AuthContext;
    const nav = useNavigation();
    
    // Edit here the item childs of menu if you want to use dynamic variables/functions.
    for (const item of allItems) {
        if (item.label === 'Logout') {
            item.onPress = () => {
                setTimeout(() => drawerContext.current?.closeDrawer());
                logout();
            }
            continue
        }
        
        item.onPress = () => {
            setTimeout(() => drawerContext.current?.closeDrawer());
            nav.navigate(item.route as never ?? AppRoutes.home)
        }
    }

    return (
        <DrawerLayoutAndroid
            ref={drawerContext}
            renderNavigationView={() => <MenuView children={allItemsToRender()} />}
            drawerLockMode={ !(guard as GuardData).userToken ? 'locked-closed' : 'unlocked' }
            drawerWidth={drawerWidth}
            children={props.children}
            />
    )
}