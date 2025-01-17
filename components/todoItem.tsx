import React, { PropsWithChildren } from 'react';
import { Column, Row } from './arrangements';
import { Txt } from './text';
import { Platform, StyleSheet } from 'react-native';
import { AppDefTheme } from '../theme/colors';
import { IconButton } from 'react-native-paper';
import { Skeleton } from './skeleton';

type TodoItemProps = PropsWithChildren<{
    title: string,
    onFlatList?: boolean,
    completed?: boolean,
    content?: string,
    onPressCompleted?: () => unknown,
    onPressEdit?: () => unknown,
    onPressRemove?: () => unknown,
}>;

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderColor: AppDefTheme.colors.primary,
        borderWidth: 2,
        borderRadius: 10,
        boxShadow: '0 0 20 rgba(0,0,0, 0.2)',
    },
    iconButton: {
        marginLeft: 0,
        marginRight: 0,
    },
    actions: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        width: '60%',
    },
    titleSection: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

const stylesSkeleton = StyleSheet.create({
    titleSection: {
        ...styles.titleSection,
        flex: undefined,
    },
});

export function TodoItem(props: TodoItemProps): React.JSX.Element {
    // This cause the `overflow: 'visible'` doesn't work in FlatList on android.
    let remBoxShadow;
    if (Platform.OS === 'android' && props.onFlatList) remBoxShadow = { boxShadow: '' };

    const rippleColor = AppDefTheme.colors.primary + '20'; // Opacity in hex

    return (
        <Column style={[styles.item, remBoxShadow] as any} gap={0}>
            <Row style={styles.titleSection}>
                <Txt bold style={styles.title} numberOfLines={2} size={20}>{props.title}</Txt>
                <Row style={styles.actions} gap={0}>
                    <IconButton
                        iconColor={props.completed ? AppDefTheme.colors.primary : '#000000'}
                        icon="check"
                        rippleColor={rippleColor}
                        style={styles.iconButton}
                        onPress={props.onPressCompleted}
                    />
                    <IconButton
                        iconColor="#000000"
                        icon="pencil"
                        style={styles.iconButton}
                        rippleColor={rippleColor}
                        onPress={props.onPressEdit}
                    />
                    <IconButton
                        iconColor="#000000"
                        icon="delete"
                        style={styles.iconButton}
                        rippleColor={rippleColor}
                        onPress={props.onPressRemove}
                    />
                </Row>
            </Row>
            <Column>
                { props.content ? <Txt>{ props.content }</Txt> : null }
            </Column>
        </Column>
    );
}

export function TodoItemSkeleton(): React.JSX.Element {
    return (
        <Column style={styles.item}>
            <Row style={stylesSkeleton.titleSection}>
                <Skeleton width={'60%'} />
                <Row style={styles.actions} gap={0}>
                    <IconButton
                        disabled
                        icon="check"
                        style={styles.iconButton}
                        />
                    <IconButton
                        disabled
                        icon="pencil"
                        style={styles.iconButton}
                        />
                    <IconButton
                        disabled
                        icon="delete"
                        style={styles.iconButton}
                        />
                </Row>
            </Row>
            <Column>
                <Skeleton height={14} />
                <Skeleton height={14} />
                <Skeleton height={14} />
            </Column>
        </Column>
    );
}
