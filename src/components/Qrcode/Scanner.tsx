import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import CButton from '../basics/Button';
import { useNavigation } from '@react-navigation/native';

export default function QrcodeScanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigration = useNavigation()

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            console.log(status)
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        navigration.navigate("tokenTransfer", {
            scannedAddress: data
        })
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner style={styles.preview}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            <View style={styles.scanContainer}>
                <View style={styles.scan}>
                    <View style={[styles.sanCorner, styles.scanCornerLeftTop]}></View>
                    <View style={[styles.sanCorner, styles.scanCornerRightTop]}></View>
                    <View style={[styles.sanCorner, styles.scanCornerRightBottom]}></View>
                    <View style={[styles.sanCorner, styles.scanCornerLeftBottom]}></View>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    scanContainer: {
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderTopWidth: 100,
        borderBottomWidth: (Dimensions.get('window').height),
        borderLeftWidth: 50,
        borderRightWidth: 50
    },
    scan: {
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').width - 100
    },
    sanCorner: {
        borderColor: 'rgb(0, 166, 255)',
        height: 20,
        width: 20
    },
    scanCornerLeftBottom: {
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    scanCornerLeftTop: {
        borderLeftWidth: 2,
        borderTopWidth: 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    scanCornerRightBottom: {
        borderRightWidth: 2,
        borderBottomWidth: 2,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    scanCornerRightTop: {
        borderRightWidth: 2,
        borderTopWidth: 2,
        position: 'absolute',
        top: 0,
        right: 0,
    }
});