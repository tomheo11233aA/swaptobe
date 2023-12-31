import React, { useState } from 'react';
import { StyleSheet, Image, View, ActivityIndicator } from 'react-native';
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@themes/colors';
import Btn from '@commom/Btn';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'react-native-image-picker';

interface Props {
    title?: string;
    onImageSelected?: (image: string) => void;
}

const ImportImage: React.FC<Props> = ({ title, onImageSelected }) => {
    const { t } = useTranslation();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleImagePicker = () => {
        setLoading(true);
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                setLoading(false);
                if (response.didCancel) {
                } else if (response.errorCode) {
                } else {
                    const source = { uri: response?.assets?.[0]?.uri ?? 'Anh bi null' };
                    setSelectedImage(source.uri);
                    onImageSelected?.(response?.assets?.[0]?.uri ?? 'Anh bi null')
                }
            },
        );
    };

    return (
        <Box marginHorizontal={20} marginBottom={15}>
            <Btn onPress={handleImagePicker}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.violet} />
                ) : selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={{
                        width: '100%',
                        height: 150,
                        borderRadius: 10,
                    }} />
                ) : (
                    <View style={styles.rectangle}>
                        <Txt center alignSelf="center">
                            {t(`Press here to choose ${title} image`)}
                        </Txt>
                    </View>
                )}
            </Btn>
        </Box>
    );
};

export default React.memo(ImportImage);

const styles = StyleSheet.create({
    rectangle: {
        width: '100%',
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        backgroundColor: colors.gray7,
        justifyContent: 'center',
        padding: 10,
    },
});