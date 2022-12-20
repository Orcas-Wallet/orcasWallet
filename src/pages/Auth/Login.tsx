import { Alert, Text, View } from 'react-native'
import React from 'react'
import { MyAuthentication } from '@components/MyAuthentication'

const Login = () => {
  return (
    <View>
      <Text>Login in</Text>
      <MyAuthentication
        title="验证"
        showAuthenticationType={true}
        authenticateOption={{
          promptMessage: '进行验证',
          // 禁止人脸不可用的情况下使用密码
          disableDeviceFallback: false,
        }}
        onAuthenticate={(result) => {
          if (result.success) {
            Alert.alert('验证成功')
          } else {
            Alert.alert('验证失败')
          }
        }}
        onAuthenticateError={(err) => {
          Alert.alert('验证错误', err.message)
        }}
      />
    </View>
  )
}

export default Login
