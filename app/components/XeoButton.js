import React from "react";
import {Text, TouchableOpacity} from "react-native";


const XeoButtonStyle = {

};


export interface XeoButtonProps {
    title: string,
    colors: {
        text: string,
        background: string
    },
    size?: 'small' | 'medium' | 'large',
    onPress: function,
    disabled?: boolean
}


const defaultXeoButtonProps : XeoButtonProps = {
    size: 'medium',
    colors: {
        background: 'blue',
        text: 'white'
    },
    disabled: false
};

export const XeoButton = (props: XeoButtonProps) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                backgroundColor: props.colors.background,
                borderRadius: 8,
                padding: 6
            }}
            disabled={props.disabled}
        >
            <Text
                style={{
                    color: props.colors.text,
                    alignSelf: "center",
                    fontSize: 18
                }}
            >
                {
                    props.title
                }
            </Text>
        </TouchableOpacity>
    )
};