import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

type SkeletonProps = PropsWithChildren<{
    width?: number,
    height?: number,
    animated?: boolean,
    borderRadius?: number,
    bgColor?: string,
    style?: ViewStyle,
}>

export function Skeleton(props: SkeletonProps) {
    const anim = useRef(new Animated.Value(0.5)).current;

    const startAnim = useCallback(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(anim, {
                    toValue: 0.5,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start()
    }, [anim]) 

    useEffect(() => startAnim(), [startAnim])

    const animStyle: ViewStyle = {
        opacity: anim,
        borderRadius: props.borderRadius ?? 25,
        backgroundColor: props.bgColor ?? "#999999",
        width: props.width ?? 300,
        height: props.height ?? 20,
    }

    return <Animated.View style={[props.style, animStyle]} />
}