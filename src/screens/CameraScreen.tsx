import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

function PermissionsPage({ onRequestPermission }: { onRequestPermission: () => void }): React.JSX.Element {
    return (
        <SafeAreaView style={styles.centered}>
            <Text style={styles.text}>Camera permission is required to use this feature.</Text>
            <Button title="Grant Permission" onPress={onRequestPermission} />
        </SafeAreaView>
    );
}

function CameraScreen(): React.JSX.Element {
    const device = useCameraDevice('back');
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const checkPermission = async () => {
            const result = await check(PERMISSIONS.ANDROID.CAMERA); 
            if (result === RESULTS.GRANTED) {
                setHasPermission(true);
            } else {
                setHasPermission(false);
            }
        };
        checkPermission();
    }, []);

    const requestPermission = async () => {
        const result = await request(PERMISSIONS.ANDROID.CAMERA); 
        if (result === RESULTS.GRANTED) {
            setHasPermission(true);
        } else {
            setHasPermission(false);
        }
    };

    if (hasPermission === null) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.text}>Checking Permissions...</Text>
            </SafeAreaView>
        );
    }

    if (!hasPermission) {
        return <PermissionsPage onRequestPermission={requestPermission} />;
    }

    if (device == null) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.text}>No Camera Device Found</Text>
            </SafeAreaView>
        );
    }

    return (
        <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default CameraScreen;
