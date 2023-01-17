import { useState, useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication'

export const MyAuthentication = ({
    title,
    onAuthenticate,
    onAuthenticateError,
    authenticateOption,
    showAuthenticationType,
}: {
    title: string
    onAuthenticate: (result: LocalAuthentication.LocalAuthenticationResult) => void
    onAuthenticateError?: (error: Error) => void
    authenticateOption?: LocalAuthentication.LocalAuthenticationOptions
    showAuthenticationType?: boolean
}) => {
    // 当前设备是否具有验证硬件
    const [hasHardware, setHasHardware] = useState(false)
    useEffect(() => {
        LocalAuthentication.hasHardwareAsync().then((res) => setHasHardware(res))
    }, [])

    // 当前设备是否注册了验证信息
    const [isEnrolled, setIsEnrolled] = useState(false)
    useEffect(() => {
        LocalAuthentication.isEnrolledAsync().then((res) => setIsEnrolled(res))
    }, [])

    // 当前设备注册验证信息级别
    const [level, setLevel] = useState<LocalAuthentication.SecurityLevel>(LocalAuthentication.SecurityLevel.NONE)
    useEffect(() => {
        LocalAuthentication.getEnrolledLevelAsync().then((res) => {
            setLevel(res)
        })
    }, [])

    // 当前设备支持验证类型
    const [types, setTypes] = useState<LocalAuthentication.AuthenticationType[]>([])
    useEffect(() => {
        LocalAuthentication.supportedAuthenticationTypesAsync().then((res) => {
            setTypes(res)
        })
    }, [])

    const authenticate = () => {
        LocalAuthentication.authenticateAsync(authenticateOption)
            .then(onAuthenticate)
            .catch((err) => {
                if (onAuthenticateError) {
                    onAuthenticateError(err)
                } else {
                    console.warn(err)
                }
            })
    }

    if (!hasHardware) {
        return <Text>当前设备不具有身份验证功能</Text>
    }
    if (!isEnrolled || level === LocalAuthentication.SecurityLevel.NONE) {
        return <Text>当前设备未注册验证信息，请注册后使用</Text>
    }

    const btn = <Button title={title} onPress={authenticate} disabled={types.length === 0} />

    return showAuthenticationType ? (
        <View>
            {
                <Text>
                    当前设备支持验证类型：
                    {types.length > 0
                        ? types
                            .map((t) => {
                                if (t === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION) {
                                    return '人脸识别'
                                } else if (t === LocalAuthentication.AuthenticationType.FINGERPRINT) {
                                    return '指纹识别'
                                } else if (t === LocalAuthentication.AuthenticationType.IRIS) {
                                    return '视网膜识别'
                                }
                                return `未知 ${LocalAuthentication.AuthenticationType[t]}`
                            })
                            .join('、')
                        : '无'}
                </Text>
            }
            {btn}
        </View>
    ) : (
        btn
    )
}