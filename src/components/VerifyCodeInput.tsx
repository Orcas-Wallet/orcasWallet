import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useBlurOnFulfill, useClearByFocusCell, CodeField, Cursor } from 'react-native-confirmation-code-field';
import InterText from './basics/Button/InterText';
const CELL_COUNT = 6
const VerifyCodeInput = ({ onComplete }) => {
    const [value, setValue] = useState('')
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    useEffect(() => {
        onComplete(value)
    }, [value])

    return <View>
        <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
                <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    className={"w-12 h-12 bg-[#F9F9FA] mr-2 justify-center items-center rounded-lg"}
                >

                    <InterText passedClassName={"text-center text-[#131517] text-2xl"}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </InterText>
                </View>
            )}
        /></View >
}

const styles = StyleSheet.create({
    root: { minHeight: 300 },
    codeFiledRoot: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        border: 1,
    },
    cellText: {
    },
    focusCell: {
        borderBottomColor: '#007AFF',
        borderBottomWidth: 2,
    },
});

export default VerifyCodeInput