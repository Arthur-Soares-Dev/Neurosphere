import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => useContext(LoadingContext);


// import React, { createContext, useContext, useState } from 'react';
// import { View, Modal, StyleSheet } from 'react-native';
// import FastImage from 'react-native-fast-image';

// const LoadingContext = createContext();

// export function LoadingProvider({ children }) {
//     const [isLoading, setIsLoading] = useState(false);

//     const startLoading = () => setIsLoading(true);
//     const stopLoading = () => setIsLoading(false);

//     return (
//         <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
//             {children}
//             {isLoading && <Loading />}
//         </LoadingContext.Provider>
//     );
// }

// export const useLoading = () => useContext(LoadingContext);

// function Loading() {
//     return (
//         <Modal transparent={true} animationType="fade" visible={true}>
//             <View style={styles.overlay}>
//                 <FastImage
//                     source={require('./assets/loading.gif')}
//                     style={styles.gif}
//                     resizeMode={FastImage.resizeMode.contain}
//                 />
//             </View>
//         </Modal>
//     );
// }

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     gif: {
//         width: 150,
//         height: 150,
//     },
// });
