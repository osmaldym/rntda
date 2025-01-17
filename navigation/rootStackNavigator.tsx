import { NavigationContainer, Theme } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogInScreen } from '../screens/login';
import { SignInScreen } from '../screens/signin';
import React, { PropsWithRef, useRef } from 'react';
import AppRoutes from '../enums/routes.enum';
import { AuthContext, GuardData, useAuthGuard } from '../hooks/auth.guard';
import { HomeScreen } from '../screens/home';
import { SplashScreen } from '../screens/splash';
import { Menu, MenuContext } from '../components/menu';
import { DrawerLayoutAndroid } from 'react-native';
import { Header } from '../components/header';
import { ProfileScreen } from '../screens/profile';
import { TagScreen } from '../screens/tags';
import { TaskForm } from '../screens/taskForm';

const Stack = createNativeStackNavigator();

type AppNavProps = PropsWithRef<{
    theme?: Theme | any
}>

const opts: NativeStackNavigationOptions = {
    animation: 'ios_from_right',
    statusBarBackgroundColor: '#000',
    statusBarStyle: 'light',
};

export function AppNav(props: AppNavProps): React.JSX.Element {
    const [guard, authContext] = useAuthGuard();

    return (
        <AuthContext.Provider value={authContext as AuthContext}>
            <NavigationContainer theme={props.theme}>
                <MenuContext.Provider value={useRef<DrawerLayoutAndroid>(null)}>
                    <Menu>
                        <Stack.Navigator screenOptions={opts}>
                            {
                                (guard as GuardData).loading ? (
                                    <Stack.Screen
                                        name={AppRoutes.splashScreen}
                                        component={SplashScreen}
                                        options={{ headerShown: false }}
                                        />
                                ) : !(guard as GuardData).userToken ? (
                                    <>
                                        <Stack.Screen
                                            name={AppRoutes.logIn}
                                            component={LogInScreen}
                                            options={{
                                                headerShown: false,
                                                animationTypeForReplace: guard.logout ? 'pop' : 'push',
                                            }}
                                        />
                                        <Stack.Screen
                                            name={AppRoutes.signIn}
                                            component={SignInScreen}
                                            options={{ header: (propsHeader) => <Header nativeStackProps={propsHeader} /> }}
                                            />
                                    </>
                                ) : (
                                    <>
                                        <Stack.Screen
                                            name={AppRoutes.home}
                                            component={HomeScreen}
                                            options={{ header: (propsHeader) => <Header nativeStackProps={propsHeader} strictMenu={true} /> }}
                                        />
                                        <Stack.Screen
                                            name={AppRoutes.profile}
                                            component={ProfileScreen}
                                            options={{
                                                title: 'Profile',
                                                header: (propsHeader) => <Header nativeStackProps={propsHeader} strictMenu={true} />,
                                            }}
                                        />
                                        <Stack.Screen
                                            name={AppRoutes.tags}
                                            component={TagScreen}
                                            options={{
                                                title: 'Tags',
                                                headerTitle: 'Tags',
                                                header: (propsHeader) => <Header nativeStackProps={propsHeader} strictMenu={true} />,
                                            }}
                                        />
                                        <Stack.Screen
                                            name={AppRoutes.taskForm}
                                            component={TaskForm}
                                            options={{
                                                header: (propsHeader) => <Header nativeStackProps={propsHeader} />,
                                            }}
                                        />
                                    </>
                                )
                            }
                        </Stack.Navigator>
                    </Menu>
                </MenuContext.Provider>
            </NavigationContainer>
        </AuthContext.Provider>
    ) ;
}
