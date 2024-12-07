import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
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
    const cameraRef = useRef<Camera>(null);


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


    const takePhoto = async () => {
        try {
            if (!cameraRef.current) {
                Alert.alert('Error', 'Camera is not ready');
                return;
            }
            const photo = await cameraRef.current.takePhoto({
                flash: 'off',
            });
            
            Alert.alert('Success', 'Photo was taken');
            // // Save photo to a directory (for example: app's cache directory)
            // const savePath = `${FS.CachesDirectoryPath}/photo_${Date.now()}.jpg`;
            // await FS.moveFile(photo.path, savePath);

            // Alert.alert('Photo Saved', `Photo saved to ${savePath}`);
        } catch (error) {
            console.error('Failed to take photo:', error);
            Alert.alert('Error', 'Failed to capture photo');
        }
    };

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
        <SafeAreaView style={{flex: 1}}>
            <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true} ref={cameraRef}/>
            <View style={styles.buttonContainer}>
                <Button title="Take Photo" onPress={takePhoto} />
            </View>
        </SafeAreaView>
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
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 10,
    },
});

export default CameraScreen;
