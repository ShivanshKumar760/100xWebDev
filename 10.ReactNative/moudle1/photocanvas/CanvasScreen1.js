// import React, { useRef, useState } from 'react';
// import { View, Image, Button, StyleSheet, PanResponder } from 'react-native';
// import { Canvas, Path, SkiaView, Paint } from '@shopify/react-native-skia';
// import ViewShot from 'react-native-view-shot';

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
//   { id: 3, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/ieujfwt803ap7hixkbyu.png' },
//   { id: 4, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mb9k4ygt0zeq3odvjtdv.png' },
//   { id: 5, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/hivhzd8budwnbxclq2kh.png' },
//   { id: 6, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/iujlewgxmclhiq2pjcom.png' },
//   { id: 7, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/arhu3r8mymikztqury0x.png' },
//   { id: 8, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/wqdtt1zvx7jyosm3mwde.png' },
//   { id: 9, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/znwkxnzplfazpgzpg1v4.png' },
//   { id: 10, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/qlj25v2n0czdacf7xerl.png' },
//   { id: 11, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dsls3qilxpih4jbta9r9.png' },
//   { id: 12, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/sp3almvjdnugeiyl03mw.png' },

//   { id: 13, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/cm6pdydacpaoneuqsoqn.png' },
//   { id: 14, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dg6ezya8mk5r04tyosdb.png' },
  
//   { id: 15, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/vholp1d6l0imenw0uox4.png' },
//   { id: 16, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/m0kuuxbomavh4fhiozmu.png' },
  
//   { id: 17, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/xuaae9xlnmfbwxigi68x.png' },
//   { id: 18, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/zuur44bl5su9rq2f99gb.png' },
  
//   { id: 19, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/mqooeqzeowvkln3wznte.png' },
//   { id: 20, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/c4v068jczdzj74wucvyx.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [paths, setPaths] = useState([]);
//   const [stickerPos, setStickerPos] = useState({ x: 50, y: 50 });
//   const captureRef = useRef(null);

//   // Drawing
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gesture) => {
//         setPaths([...paths, { x: gesture.moveX, y: gesture.moveY }]);
//       },
//     })
//   ).current;

//   const saveImage = () => {
//     captureRef.current.capture().then((uri) => {
//       console.log('Saved at:', uri);
//       navigation.goBack();
//     });
//   };

//   return (
//     <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//       <Image source={{ uri: photoUri }} style={styles.image} />
//       <Canvas style={styles.canvas} {...panResponder.panHandlers}>
//         <Paint strokeWidth={5} color="red" />
//         {paths.map((point, index) => (
//           <Path key={index} path={`M${point.x},${point.y} L${point.x + 1},${point.y + 1}`} />
//         ))}
//       </Canvas>
//       <Image source={{ uri: stickers[0].uri }} style={[styles.sticker, { top: stickerPos.y, left: stickerPos.x }]} />
//       <Button title="Save" onPress={saveImage} />
//     </ViewShot>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   image: { width: '100%', height: '80%', position: 'absolute' },
//   canvas: { position: 'absolute', width: '100%', height: '80%' },
//   sticker: { width: 50, height: 50, position: 'absolute' },
// });


// import React, { useRef, useState } from 'react';
// import { View, Image, Button, StyleSheet, PanResponder, TouchableOpacity, ScrollView } from 'react-native';
// import { Canvas, Path, SkiaView, Paint } from '@shopify/react-native-skia';
// import ViewShot from 'react-native-view-shot';

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
//   { id: 3, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/ieujfwt803ap7hixkbyu.png' },
//   { id: 4, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mb9k4ygt0zeq3odvjtdv.png' },
//   { id: 5, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/hivhzd8budwnbxclq2kh.png' },
//   { id: 6, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/iujlewgxmclhiq2pjcom.png' },
//   { id: 7, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/arhu3r8mymikztqury0x.png' },
//   { id: 8, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/wqdtt1zvx7jyosm3mwde.png' },
//   { id: 9, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/znwkxnzplfazpgzpg1v4.png' },
//   { id: 10, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/qlj25v2n0czdacf7xerl.png' },
//   { id: 11, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dsls3qilxpih4jbta9r9.png' },
//   { id: 12, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/sp3almvjdnugeiyl03mw.png' },
//   { id: 13, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/cm6pdydacpaoneuqsoqn.png' },
//   { id: 14, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dg6ezya8mk5r04tyosdb.png' },
//   { id: 15, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/vholp1d6l0imenw0uox4.png' },
//   { id: 16, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/m0kuuxbomavh4fhiozmu.png' },
//   { id: 17, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/xuaae9xlnmfbwxigi68x.png' },
//   { id: 18, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/zuur44bl5su9rq2f99gb.png' },
//   { id: 19, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/mqooeqzeowvkln3wznte.png' },
//   { id: 20, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/c4v068jczdzj74wucvyx.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [paths, setPaths] = useState([]);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const [stickerPos, setStickerPos] = useState({ x: 50, y: 50 });
//   const captureRef = useRef(null);

//   // Drawing functionality
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gesture) => {
//         setPaths([...paths, { x: gesture.moveX, y: gesture.moveY }]);
//       },
//     })
//   ).current;

//   // Save image
//   const saveImage = () => {
//     captureRef.current.capture().then((uri) => {
//       console.log('Saved at:', uri);
//       navigation.goBack();
//     });
//   };

//   // Sticker selection
//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     setStickerPos({ x: 100, y: 100 }); // Set initial position for the selected sticker
//   };

//   // Move sticker around (dragging functionality)
//   const moveSticker = (gesture) => {
//     setStickerPos({
//       x: stickerPos.x + gesture.moveX,
//       y: stickerPos.y + gesture.moveY,
//     });
//   };

//   return (
//     <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//       {/* Background Image */}
//       <Image source={{ uri: photoUri }} style={styles.image} />

//       {/* Canvas for drawing */}
//       <Canvas style={styles.canvas} {...panResponder.panHandlers}>
//         <Paint strokeWidth={5} color="red" />
//         {paths.map((point, index) => (
//           <Path key={index} path={`M${point.x},${point.y} L${point.x + 1},${point.y + 1}`} />
//         ))}
//       </Canvas>

//       {/* Sticker */}
//       {selectedSticker && (
//         <Image
//           source={{ uri: selectedSticker.uri }}
//           style={[styles.sticker, { top: stickerPos.y, left: stickerPos.x }]}
//           {...panResponder.panHandlers}
//         />
//       )}

//       {/* Sticker Selection */}
//       <ScrollView horizontal style={styles.stickerSelector}>
//         {stickers.map((sticker) => (
//           <TouchableOpacity key={sticker.id} onPress={() => handleStickerSelect(sticker)}>
//             <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Save Button */}
//       <Button title="Save" onPress={saveImage} />
//     </ViewShot>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   image: { width: '100%', height: '80%', position: 'absolute' },
//   canvas: { position: 'absolute', width: '100%', height: '80%' },
//   sticker: { width: 50, height: 50, position: 'absolute' },
//   stickerSelector: { position: 'absolute', bottom: 10, flexDirection: 'row', padding: 10 },
//   stickerThumb: { width: 50, height: 50, marginRight: 10 },
// });


// import React, { useRef, useState } from 'react';
// import { View, Image, Button, StyleSheet, PanResponder, TouchableOpacity, ScrollView } from 'react-native';
// import { Canvas, Path, SkiaView, Paint } from '@shopify/react-native-skia';
// import ViewShot from 'react-native-view-shot';

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
//   { id: 3, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/ieujfwt803ap7hixkbyu.png' },
//   { id: 4, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mb9k4ygt0zeq3odvjtdv.png' },
//   { id: 5, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/hivhzd8budwnbxclq2kh.png' },
//   { id: 6, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/iujlewgxmclhiq2pjcom.png' },
//   { id: 7, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/arhu3r8mymikztqury0x.png' },
//   { id: 8, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/wqdtt1zvx7jyosm3mwde.png' },
//   { id: 9, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/znwkxnzplfazpgzpg1v4.png' },
//   { id: 10, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/qlj25v2n0czdacf7xerl.png' },
//   { id: 11, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dsls3qilxpih4jbta9r9.png' },
//   { id: 12, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/sp3almvjdnugeiyl03mw.png' },
//   { id: 13, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/cm6pdydacpaoneuqsoqn.png' },
//   { id: 14, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dg6ezya8mk5r04tyosdb.png' },
//   { id: 15, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/vholp1d6l0imenw0uox4.png' },
//   { id: 16, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/m0kuuxbomavh4fhiozmu.png' },
//   { id: 17, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/xuaae9xlnmfbwxigi68x.png' },
//   { id: 18, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/zuur44bl5su9rq2f99gb.png' },
//   { id: 19, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/mqooeqzeowvkln3wznte.png' },
//   { id: 20, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/c4v068jczdzj74wucvyx.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [paths, setPaths] = useState([]);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const [stickerPos, setStickerPos] = useState({ x: 50, y: 50 });
//   const captureRef = useRef(null);

//   // Drawing functionality
//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gesture) => {
//         setPaths([...paths, { x: gesture.moveX, y: gesture.moveY }]);
//       },
//     })
//   ).current;

//   // Save image
//   const saveImage = () => {
//     captureRef.current.capture().then((uri) => {
//       console.log('Saved at:', uri);
//       navigation.goBack();
//     });
//   };

//   // Sticker selection
//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     setStickerPos({ x: 100, y: 100 }); // Set initial position for the selected sticker
//   };

//   // Move sticker around (dragging functionality)
//   const moveSticker = (gesture) => {
//     setStickerPos({
//       x: stickerPos.x + gesture.moveX,
//       y: stickerPos.y + gesture.moveY,
//     });
//   };

//   return (
//     <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//       {/* Background Image */}
//       <Canvas style={styles.canvas} {...panResponder.panHandlers}>
//         <Paint strokeWidth={5} color="black" />
//         {paths.map((point, index) => (
//           <Path key={index} path={`M${point.x},${point.y} L${point.x + 1},${point.y + 1}`} />
//         ))}
//       </Canvas>
//       <Image source={{ uri: photoUri }} style={styles.image} />

//       {/* Canvas for drawing */}
//       {/* <Canvas style={styles.canvas} {...panResponder.panHandlers}>
//         <Paint strokeWidth={5} color="red" />
//         {paths.map((point, index) => (
//           <Path key={index} path={`M${point.x},${point.y} L${point.x + 1},${point.y + 1}`} />
//         ))}
//       </Canvas> */}

//       {/* Sticker */}
//       {selectedSticker && (
//         <Image
//           source={{ uri: selectedSticker.uri }}
//           style={[styles.sticker, { top: stickerPos.y, left: stickerPos.x }]}
//           {...panResponder.panHandlers} // Allow dragging of the sticker
//         />
//       )}

//       {/* Sticker Selection */}
//       <ScrollView horizontal style={styles.stickerSelector}>
//         {stickers.map((sticker) => (
//           <TouchableOpacity key={sticker.id} onPress={() => handleStickerSelect(sticker)}>
//             <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Save Button */}
//       <Button title="Save" onPress={saveImage} />
//     </ViewShot>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   image: { width: '100%', height: '80%', position: 'absolute' },
//   canvas: { position: 'absolute', width: '100%', height: '80%' },
//   sticker: { width: 50, height: 50, position: 'absolute' },
//   stickerSelector: { position: 'absolute', bottom: 10, flexDirection: 'row', padding: 10 },
//   stickerThumb: { width: 50, height: 50, marginRight: 10 },
// });


// import React, { useRef, useState } from 'react';
// import { View, Image, Button, StyleSheet, PanResponder, TouchableOpacity, ScrollView } from 'react-native';
// import { Canvas, Path, SkiaView, Paint } from '@shopify/react-native-skia';
// import ViewShot from 'react-native-view-shot';

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
//   { id: 3, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/ieujfwt803ap7hixkbyu.png' },
//   { id: 4, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mb9k4ygt0zeq3odvjtdv.png' },
//   { id: 5, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/hivhzd8budwnbxclq2kh.png' },
//   { id: 6, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/iujlewgxmclhiq2pjcom.png' },
//   { id: 7, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/arhu3r8mymikztqury0x.png' },
//   { id: 8, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/wqdtt1zvx7jyosm3mwde.png' },
//   { id: 9, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/znwkxnzplfazpgzpg1v4.png' },
//   { id: 10, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/qlj25v2n0czdacf7xerl.png' },
//   { id: 11, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dsls3qilxpih4jbta9r9.png' },
//   { id: 12, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/sp3almvjdnugeiyl03mw.png' },
//   { id: 13, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/cm6pdydacpaoneuqsoqn.png' },
//   { id: 14, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dg6ezya8mk5r04tyosdb.png' },
//   { id: 15, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/vholp1d6l0imenw0uox4.png' },
//   { id: 16, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/m0kuuxbomavh4fhiozmu.png' },
//   { id: 17, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/xuaae9xlnmfbwxigi68x.png' },
//   { id: 18, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/zuur44bl5su9rq2f99gb.png' },
//   { id: 19, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/mqooeqzeowvkln3wznte.png' },
//   { id: 20, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/c4v068jczdzj74wucvyx.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [paths, setPaths] = useState([]);
//   const [stickerPos, setStickerPos] = useState({ x: 50, y: 50 });
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const captureRef = useRef(null);

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gesture) => {
//         setPaths((prevPaths) => [...prevPaths, { x: gesture.moveX, y: gesture.moveY }]);
//       },
//     })
//   ).current;

//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     setStickerPos({ x: 100, y: 100 });
//   };

//   const handleStickerMove = (gesture) => {
//     setStickerPos((prevPos) => ({
//       x: prevPos.x + gesture.moveX,
//       y: prevPos.y + gesture.moveY,
//     }));
//   };

//   const saveImage = () => {
//     captureRef.current.capture().then((uri) => {
//       console.log('Saved at:', uri);
//       navigation.goBack();
//     });
//   };

//   return (
//     <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//       <Image source={{ uri: photoUri }} style={styles.image} />

//       <Canvas style={styles.canvas} {...panResponder.panHandlers}>
//         <Paint strokeWidth={5} color="red" />
//         {paths.map((point, index) => (
//           <Path key={index} path={`M${point.x},${point.y} L${point.x + 1},${point.y + 1}`} />
//         ))}
//       </Canvas>

//       {selectedSticker && (
//         <Image
//           source={{ uri: selectedSticker.uri }}
//           style={[styles.sticker, { top: stickerPos.y, left: stickerPos.x }]}
//           {...panResponder.panHandlers}
//         />
//       )}

//       <ScrollView horizontal style={styles.stickerSelector}>
//         {stickers.map((sticker) => (
//           <TouchableOpacity key={sticker.id} onPress={() => handleStickerSelect(sticker)}>
//             <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Button title="Save" onPress={saveImage} />
//     </ViewShot>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   image: { width: '100%', height: '80%', position: 'absolute' },
//   canvas: { position: 'absolute', width: '100%', height: '80%' },
//   sticker: { width: 50, height: 50, position: 'absolute' },
//   stickerSelector: { position: 'absolute', bottom: 10, flexDirection: 'row', padding: 10 },
//   stickerThumb: { width: 50, height: 50, marginRight: 10 },
// });

// import React, { useRef, useState } from 'react';
// import { View, Image, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { Canvas, Path, Paint } from '@shopify/react-native-skia';
// import ViewShot from 'react-native-view-shot';
// import { GestureHandlerRootView, GestureDetector, Gesture, GestureHandlerUpdateEvent, GestureHandlerEndEvent } from 'react-native-gesture-handler';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
//   // Add more stickers here...
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [paths, setPaths] = useState([]);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const captureRef = useRef(null);

//   // Shared values for animated sticker movement
//   const stickerPosition = useSharedValue({ x: 100, y: 100 });

//   const panGesture = Gesture.Pan()
//     .onUpdate((event) => {
//       stickerPosition.value = {
//         x: event.translationX,
//         y: event.translationY,
//       };
//     })
//     .onEnd(() => {
//       stickerPosition.value = { x: withSpring(stickerPosition.value.x), y: withSpring(stickerPosition.value.y) };
//     });

//   const stickerStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: withSpring(stickerPosition.value.x) },
//       { translateY: withSpring(stickerPosition.value.y) },
//     ],
//   }));

//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     stickerPosition.value = { x: 100, y: 100 }; // reset position
//   };

//   const saveImage = () => {
//     captureRef.current.capture().then((uri) => {
//       console.log('Saved at:', uri);
//       navigation.goBack();
//     });
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//       <Canvas style={styles.canvas}>
//           <Paint strokeWidth={100} color="red" />
//           {paths.map((point, index) => (
//             <Path key={index} path={`M${point.x},${point.y} L${point.x + 1},${point.y + 1}`} />
//           ))}
//         </Canvas>
//         <Image source={{ uri: photoUri }} style={styles.image} />

//         {/* Skia Canvas for drawing */}
       

//         {/* Animated Sticker */}
//         {selectedSticker && (
//           <GestureDetector gesture={panGesture}>
//             <Animated.View style={[styles.sticker, stickerStyle]}>
//               <Image source={{ uri: selectedSticker.uri }} style={styles.stickerImage} />
//             </Animated.View>
//           </GestureDetector>
//         )}

//         {/* Sticker Selector */}
//         <ScrollView horizontal style={styles.stickerSelector}>
//           {stickers.map((sticker) => (
//             <TouchableOpacity key={sticker.id} onPress={() => handleStickerSelect(sticker)}>
//               <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <Button title="Save" onPress={saveImage} />
//       </ViewShot>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   image: { width: '100%', height: '50%', position: 'absolute' },
//   canvas: { position: 'absolute', width: '100%', height: '80%' },
//   sticker: { width: 50, height: 50, position: 'absolute' },
//   stickerImage: { width: '100%', height: '100%' },
//   stickerSelector: { position: 'absolute', bottom: 10, flexDirection: 'row', padding: 10 },
//   stickerThumb: { width: 50, height: 50, marginRight: 10 },
// });


// import React, { useState } from 'react';
// import { View, Image, Button, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
// import { Canvas, Path, Paint, Skia } from '@shopify/react-native-skia';
// import ViewShot from 'react-native-view-shot';
// import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// const { width, height } = Dimensions.get('window');

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [currentPath, setCurrentPath] = useState(null);
//   const [paths, setPaths] = useState([]);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const captureRef = React.useRef(null);

//   // Shared values for animated sticker movement
//   const stickerPosition = useSharedValue({ x: 100, y: 100 });

//   // Drawing gesture
//   const drawingGesture = Gesture.Pan()
//     .onStart((e) => {
//       const newPath = Skia.Path.Make();
//       newPath.moveTo(e.x, e.y);
//       setCurrentPath(newPath);
//     })
//     .onUpdate((e) => {
//       if (currentPath) {
//         currentPath.lineTo(e.x, e.y);
//         // Force re-render
//         setCurrentPath(Skia.Path.MakeFromCmds(currentPath.toCmds()));
//       }
//     })
//     .onEnd(() => {
//       if (currentPath) {
//         setPaths([...paths, currentPath]);
//         setCurrentPath(null);
//       }
//     });

//   // Sticker gesture
//   const stickerGesture = Gesture.Pan()
//     .onUpdate((event) => {
//       stickerPosition.value = {
//         x: event.translationX,
//         y: event.translationY,
//       };
//     })
//     .onEnd(() => {
//       stickerPosition.value = {
//         x: withSpring(stickerPosition.value.x),
//         y: withSpring(stickerPosition.value.y),
//       };
//     });

//   const stickerStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: withSpring(stickerPosition.value.x) },
//       { translateY: withSpring(stickerPosition.value.y) },
//     ],
//   }));

//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     stickerPosition.value = { x: 100, y: 100 }; // reset position
//   };

//   const saveImage = async () => {
//     try {
//       const uri = await captureRef.current.capture();
//       console.log('Saved at:', uri);
//       navigation.goBack();
//     } catch (error) {
//       console.error('Failed to save image:', error);
//     }
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//         <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />
        
//         <GestureDetector gesture={drawingGesture}>
//           <Canvas style={styles.canvas}>
//             <Paint
//               color="red"
//               strokeWidth={5}
//               style="stroke"
//               strokeJoin="round"
//               strokeCap="round"
//             />
//             {paths.map((path, index) => (
//               <Path key={index} path={path} />
//             ))}
//             {currentPath && <Path path={currentPath} />}
//           </Canvas>
//         </GestureDetector>

//         {selectedSticker && (
//           <GestureDetector gesture={stickerGesture}>
//             <Animated.View style={[styles.sticker, stickerStyle]}>
//               <Image source={{ uri: selectedSticker.uri }} style={styles.stickerImage} />
//             </Animated.View>
//           </GestureDetector>
//         )}

//         <ScrollView horizontal style={styles.stickerSelector}>
//           {stickers.map((sticker) => (
//             <TouchableOpacity
//               key={sticker.id}
//               onPress={() => handleStickerSelect(sticker)}
//             >
//               <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <Button title="Save" onPress={saveImage} />
//       </ViewShot>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: width,
//     height: height * 0.7,
//     position: 'absolute',
//   },
//   canvas: {
//     width: width,
//     height: height * 0.7,
//   },
//   sticker: {
//     width: 100,
//     height: 100,
//     position: 'absolute',
//   },
//   stickerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   stickerSelector: {
//     position: 'absolute',
//     bottom: 20,
//     flexDirection: 'row',
//     padding: 10,
//   },
//   stickerThumb: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
// });


// import React, { useState, useCallback } from 'react';
// import { View, Image, Button, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
// import { Canvas, Path, Paint, Skia, useCanvasRef } from '@shopify/react-native-skia';
// import ViewShot from 'react-native-view-shot';
// import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// const { width, height } = Dimensions.get('window');

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [paths, setPaths] = useState([]);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const captureRef = React.useRef(null);
//   const currentPath = useSharedValue('');
//   const canvasRef = useCanvasRef();

//   // Shared values for animated sticker movement
//   const stickerPosition = useSharedValue({ x: 100, y: 100 });

//   const onDrawingStart = useCallback((x, y) => {
//     try {
//       const path = Skia.Path.Make();
//       path.moveTo(x, y);
//       currentPath.value = path;
//     } catch (error) {
//       console.log('Drawing start error:', error);
//     }
//   }, []);

//   const onDrawingActive = useCallback((x, y) => {
//     try {
//       if (currentPath.value) {
//         currentPath.value.lineTo(x, y);
//         setPaths(prev => [...prev, currentPath.value.copy()]);
//       }
//     } catch (error) {
//       console.log('Drawing active error:', error);
//     }
//   }, []);

//   const onDrawingFinished = useCallback(() => {
//     try {
//       if (currentPath.value) {
//         setPaths(prev => [...prev, currentPath.value.copy()]);
//         currentPath.value = null;
//       }
//     } catch (error) {
//       console.log('Drawing finish error:', error);
//     }
//   }, []);

//   // Drawing gesture with error handling
//   const drawingGesture = Gesture.Pan()
//     .onStart((e) => {
//       try {
//         onDrawingStart(e.x, e.y);
//       } catch (error) {
//         console.log('Gesture start error:', error);
//       }
//     })
//     .onUpdate((e) => {
//       try {
//         onDrawingActive(e.x, e.y);
//       } catch (error) {
//         console.log('Gesture update error:', error);
//       }
//     })
//     .onFinalize(() => {
//       try {
//         onDrawingFinished();
//       } catch (error) {
//         console.log('Gesture finish error:', error);
//       }
//     });

//   // Sticker gesture
//   const stickerGesture = Gesture.Pan()
//     .onUpdate((event) => {
//       stickerPosition.value = {
//         x: event.translationX,
//         y: event.translationY,
//       };
//     })
//     .onEnd(() => {
//       stickerPosition.value = {
//         x: withSpring(stickerPosition.value.x),
//         y: withSpring(stickerPosition.value.y),
//       };
//     });

//   const stickerStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: withSpring(stickerPosition.value.x) },
//       { translateY: withSpring(stickerPosition.value.y) },
//     ],
//   }));

//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     stickerPosition.value = { x: 100, y: 100 };
//   };

//   const saveImage = async () => {
//     try {
//       const uri = await captureRef.current.capture();
//       console.log('Saved at:', uri);
//       navigation.goBack();
//     } catch (error) {
//       console.error('Failed to save image:', error);
//     }
//   };

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//         <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />
        
//         <GestureDetector gesture={drawingGesture}>
//           <Canvas style={styles.canvas} ref={canvasRef}>
//             <Paint
//               color="red"
//               strokeWidth={3}
//               style="stroke"
//               strokeJoin="round"
//               strokeCap="round"
//             />
//             {paths.map((path, index) => (
//               <Path key={`path-${index}`} path={path} />
//             ))}
//           </Canvas>
//         </GestureDetector>

//         {selectedSticker && (
//           <GestureDetector gesture={stickerGesture}>
//             <Animated.View style={[styles.sticker, stickerStyle]}>
//               <Image source={{ uri: selectedSticker.uri }} style={styles.stickerImage} />
//             </Animated.View>
//           </GestureDetector>
//         )}

//         <View style={styles.controls}>
//           <ScrollView horizontal style={styles.stickerSelector}>
//             {stickers.map((sticker) => (
//               <TouchableOpacity
//                 key={sticker.id}
//                 onPress={() => handleStickerSelect(sticker)}
//               >
//                 <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//           <Button title="Save" onPress={saveImage} />
//         </View>
//       </ViewShot>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: width,
//     height: height * 0.7,
//     position: 'absolute',
//   },
//   canvas: {
//     width: width,
//     height: height * 0.7,
//   },
//   sticker: {
//     width: 100,
//     height: 100,
//     position: 'absolute',
//   },
//   stickerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   controls: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 10,
//   },
//   stickerSelector: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   stickerThumb: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
// });


// import React, { useState } from 'react';
// import { View, Image, Button, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
// import { Canvas, Path, Paint, useCanvasRef } from '@shopify/react-native-skia';
// import ViewShot from 'react-native-view-shot';
// import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

// const { width, height } = Dimensions.get('window');

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [paths, setPaths] = useState([]);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const captureRef = React.useRef(null);
//   const canvasRef = useCanvasRef();

//   // Store current drawing points
//   const [currentPoints, setCurrentPoints] = useState([]);

//   // Shared values for animated sticker movement
//   const stickerPosition = useSharedValue({ x: 100, y: 100 });

//   // Drawing gesture
//   const drawingGesture = Gesture.Pan()
//     .onStart((e) => {
//       setCurrentPoints([{ x: e.x, y: e.y }]);
//     })
//     .onUpdate((e) => {
//       setCurrentPoints(prevPoints => [...prevPoints, { x: e.x, y: e.y }]);
//     })
//     .onEnd(() => {
//       if (currentPoints.length > 1) {
//         const pathData = currentPoints.reduce((acc, point, index) => {
//           if (index === 0) return `M ${point.x} ${point.y}`;
//           return `${acc} L ${point.x} ${point.y}`;
//         }, '');
//         setPaths(prevPaths => [...prevPaths, pathData]);
//       }
//       setCurrentPoints([]);
//     });

//   // Sticker gesture
//   const stickerGesture = Gesture.Pan()
//     .onUpdate((event) => {
//       stickerPosition.value = {
//         x: event.translationX,
//         y: event.translationY,
//       };
//     })
//     .onEnd(() => {
//       stickerPosition.value = {
//         x: withSpring(stickerPosition.value.x),
//         y: withSpring(stickerPosition.value.y),
//       };
//     });

//   const stickerStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: withSpring(stickerPosition.value.x) },
//       { translateY: withSpring(stickerPosition.value.y) },
//     ],
//   }));

//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     stickerPosition.value = { x: 100, y: 100 };
//   };

//   const saveImage = async () => {
//     try {
//       const uri = await captureRef.current.capture();
//       console.log('Saved at:', uri);
//       navigation.goBack();
//     } catch (error) {
//       console.error('Failed to save image:', error);
//     }
//   };

//   // Create current path data
//   const currentPathData = currentPoints.length > 1
//     ? currentPoints.reduce((acc, point, index) => {
//         if (index === 0) return `M ${point.x} ${point.y}`;
//         return `${acc} L ${point.x} ${point.y}`;
//       }, '')
//     : '';

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//         <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />
        
//         <GestureDetector gesture={drawingGesture}>
//           <Canvas style={styles.canvas} ref={canvasRef}>
//             <Paint
//               color="red"
//               strokeWidth={3}
//               style="stroke"
//               strokeJoin="round"
//               strokeCap="round"
//             />
//             {paths.map((pathData, index) => (
//               <Path
//                 key={`path-${index}`}
//                 path={pathData}
//                 strokeWidth={3}
//                 color="red"
//               />
//             ))}
//             {currentPathData && (
//               <Path
//                 path={currentPathData}
//                 strokeWidth={3}
//                 color="red"
//               />
//             )}
//           </Canvas>
//         </GestureDetector>

//         {selectedSticker && (
//           <GestureDetector gesture={stickerGesture}>
//             <Animated.View style={[styles.sticker, stickerStyle]}>
//               <Image source={{ uri: selectedSticker.uri }} style={styles.stickerImage} />
//             </Animated.View>
//           </GestureDetector>
//         )}

//         <View style={styles.controls}>
//           <ScrollView horizontal style={styles.stickerSelector}>
//             {stickers.map((sticker) => (
//               <TouchableOpacity
//                 key={sticker.id}
//                 onPress={() => handleStickerSelect(sticker)}
//               >
//                 <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//           <Button title="Save" onPress={saveImage} />
//         </View>
//       </ViewShot>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: width,
//     height: height * 0.7,
//     position: 'absolute',
//   },
//   canvas: {
//     width: width,
//     height: height * 0.7,
//   },
//   sticker: {
//     width: 100,
//     height: 100,
//     position: 'absolute',
//   },
//   stickerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   controls: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 10,
//   },
//   stickerSelector: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   stickerThumb: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
// });


// import React, { useState } from 'react';
// import {
//   View,
//   Image,
//   Button,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   PanResponder,
// } from 'react-native';
// import ViewShot from 'react-native-view-shot';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
// } from 'react-native-reanimated';

// import { shareAsync } from 'expo-sharing';
// import * as MediaLibrary from 'expo-media-library';

// const { width, height } = Dimensions.get('window');

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [lines, setLines] = useState([]);
//   const [currentLine, setCurrentLine] = useState([]);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const captureRef = React.useRef(null);


//   // Shared values for sticker movement
//   const stickerPosition = useSharedValue({ x: 100, y: 100 });

//   // Create PanResponder for drawing
//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: (event) => {
//       const { locationX, locationY } = event.nativeEvent;
//       setCurrentLine([{ x: locationX, y: locationY }]);
//     },
//     onPanResponderMove: (event) => {
//       const { locationX, locationY } = event.nativeEvent;
//       setCurrentLine(prevLine => [...prevLine, { x: locationX, y: locationY }]);
//     },
//     onPanResponderRelease: () => {
//       if (currentLine.length > 0) {
//         setLines(prevLines => [...prevLines, currentLine]);
//         setCurrentLine([]);
//       }
//     },
//   });

//   // Sticker movement
//   const onStickerMove = (event) => {
//     const { translationX, translationY } = event.nativeEvent;
//     stickerPosition.value = {
//       x: translationX,
//       y: translationY,
//     };
//   };

//   const stickerStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: withSpring(stickerPosition.value.x) },
//       { translateY: withSpring(stickerPosition.value.y) },
//     ],
//   }));

//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     stickerPosition.value = { x: 100, y: 100 };
//   };

//   const saveImage = async () => {
//     try {
//       const uri = await captureRef.current.capture();
//       console.log('Saved at:', uri);
//       navigation.goBack();
//     } catch (error) {
//       console.error('Failed to save image:', error);
//     }
//   };

//   const renderLine = (points, index) => {
//     if (points.length < 2) return null;

//     return points.map((point, i) => {
//       if (i === 0) return null;
//       const startPoint = points[i - 1];

//       return (
//         <View
//           key={`line-${index}-${i}`}
//           style={[
//             styles.line,
//             {
//               left: startPoint.x,
//               top: startPoint.y,
//               width: 3,
//               height: 3,
//               backgroundColor: 'red',
//               borderRadius: 1.5,
//             },
//           ]}
//         />
//       );
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//         <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />

//         <View style={styles.drawingArea} {...panResponder.panHandlers}>
//           {lines.map((line, index) => renderLine(line, index))}
//           {renderLine(currentLine, 'current')}
//         </View>

//         {selectedSticker && (
//           <Animated.View
//             style={[styles.sticker, stickerStyle]}
//             onTouchMove={onStickerMove}
//           >
//             <Image source={{ uri: selectedSticker.uri }} style={styles.stickerImage} />
//           </Animated.View>
//         )}

//         <View style={styles.controls}>
//           <ScrollView horizontal style={styles.stickerSelector}>
//             {stickers.map((sticker) => (
//               <TouchableOpacity
//                 key={sticker.id}
//                 onPress={() => handleStickerSelect(sticker)}
//               >
//                 <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//           <Button title="Save" onPress={saveImage} />
//         </View>
//       </ViewShot>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: width,
//     height: height * 0.7,
//     position: 'absolute',
//   },
//   drawingArea: {
//     width: width,
//     height: height * 0.7,
//     position: 'absolute',
//   },
//   line: {
//     position: 'absolute',
//   },
//   sticker: {
//     width: 100,
//     height: 100,
//     position: 'absolute',
//   },
//   stickerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   controls: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 10,
//   },
//   stickerSelector: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   stickerThumb: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
// });


// import React, { useState } from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   PanResponder,
//   Alert,
//   ActivityIndicator,
//   Text,
// } from 'react-native';
// import ViewShot from 'react-native-view-shot';
// import * as MediaLibrary from 'expo-media-library';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
// } from 'react-native-reanimated';
// import { Share } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [lines, setLines] = useState([]);
//   const [currentLine, setCurrentLine] = useState([]);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const captureRef = React.useRef(null);

//   // Shared values for sticker movement
//   const stickerPosition = useSharedValue({ x: 100, y: 100 });

//   // Create PanResponder for drawing
//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: (event) => {
//       const { locationX, locationY } = event.nativeEvent;
//       setCurrentLine([{ x: locationX, y: locationY }]);
//     },
//     onPanResponderMove: (event) => {
//       const { locationX, locationY } = event.nativeEvent;
//       setCurrentLine(prevLine => [...prevLine, { x: locationX, y: locationY }]);
//     },
//     onPanResponderRelease: () => {
//       if (currentLine.length > 0) {
//         setLines(prevLines => [...prevLines, currentLine]);
//         setCurrentLine([]);
//       }
//     },
//   });

//   // Sticker movement
//   const onStickerMove = (event) => {
//     const { translationX, translationY } = event.nativeEvent;
//     stickerPosition.value = {
//       x: translationX,
//       y: translationY,
//     };
//   };

//   const stickerStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: withSpring(stickerPosition.value.x) },
//       { translateY: withSpring(stickerPosition.value.y) },
//     ],
//   }));

//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     stickerPosition.value = { x: 100, y: 100 };
//   };

//   const saveToGallery = async (uri) => {
//     try {
//       const { status } = await MediaLibrary.requestPermissionsAsync();
      
//       if (status === 'granted') {
//         const asset = await MediaLibrary.createAssetAsync(uri);
//         await MediaLibrary.createAlbumAsync('DrawingApp', asset, false);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Error saving to gallery:', error);
//       return false;
//     }
//   };

//   const handleShare = async (uri) => {
//     try {
//       await Share.share({
//         url: uri,
//       });
//     } catch (error) {
//       console.error('Error sharing:', error);
//     }
//   };

//   const saveImage = async () => {
//     try {
//       setIsSaving(true);
//       const uri = await captureRef.current.capture();
      
//       // Save to gallery
//       const saved = await saveToGallery(uri);
      
//       if (saved) {
//         Alert.alert(
//           'Success',
//           'Image saved to gallery successfully!',
//           [
//             {
//               text: 'Share',
//               onPress: () => handleShare(uri),
//             },
//             {
//               text: 'Done',
//               onPress: () => navigation.goBack(),
//             },
//           ],
//           { cancelable: false }
//         );
//       } else {
//         Alert.alert('Error', 'Failed to save image to gallery');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to save image');
//       console.error('Failed to save image:', error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDiscard = () => {
//     Alert.alert(
//       'Discard Changes',
//       'Are you sure you want to discard all changes?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Discard',
//           style: 'destructive',
//           onPress: () => navigation.goBack(),
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   const renderLine = (points, index) => {
//     if (points.length < 2) return null;

//     return points.map((point, i) => {
//       if (i === 0) return null;
//       const startPoint = points[i - 1];

//       return (
//         <View
//           key={`line-${index}-${i}`}
//           style={[
//             styles.line,
//             {
//               left: startPoint.x,
//               top: startPoint.y,
//               width: 3,
//               height: 3,
//               backgroundColor: 'red',
//               borderRadius: 1.5,
//             },
//           ]}
//         />
//       );
//     });
//   };

//   if (isSaving) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text style={styles.loadingText}>Saving image...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
//         <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />

//         <View style={styles.drawingArea} {...panResponder.panHandlers}>
//           {lines.map((line, index) => renderLine(line, index))}
//           {renderLine(currentLine, 'current')}
//         </View>

//         {selectedSticker && (
//           <Animated.View
//             style={[styles.sticker, stickerStyle]}
//             onTouchMove={onStickerMove}
//           >
//             <Image source={{ uri: selectedSticker.uri }} style={styles.stickerImage} />
//           </Animated.View>
//         )}

//         <View style={styles.controls}>
//           <ScrollView horizontal style={styles.stickerSelector}>
//             {stickers.map((sticker) => (
//               <TouchableOpacity
//                 key={sticker.id}
//                 onPress={() => handleStickerSelect(sticker)}
//               >
//                 <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
          
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[styles.button, styles.discardButton]}
//               onPress={handleDiscard}
//             >
//               <Text style={styles.buttonText}>Discard</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[styles.button, styles.saveButton]}
//               onPress={saveImage}
//             >
//               <Text style={styles.buttonText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ViewShot>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#666',
//   },
//   image: {
//     width: width,
//     height: height * 0.7,
//     position: 'absolute',
//   },
//   drawingArea: {
//     width: width,
//     height: height * 0.7,
//     position: 'absolute',
//   },
//   line: {
//     position: 'absolute',
//   },
//   sticker: {
//     width: 100,
//     height: 100,
//     position: 'absolute',
//   },
//   stickerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   controls: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//   },
//   stickerSelector: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   stickerThumb: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   button: {
//     padding: 12,
//     borderRadius: 8,
//     minWidth: 120,
//     alignItems: 'center',
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//   },
//   discardButton: {
//     backgroundColor: '#f44336',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



// import React, { useState } from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   PanResponder,
//   Alert,
//   ActivityIndicator,
//   Text,
//   Platform,
// } from 'react-native';
// import ViewShot from 'react-native-view-shot';
// import * as MediaLibrary from 'expo-media-library';
// import * as FileSystem from 'expo-file-system';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
// } from 'react-native-reanimated';

// const { width, height } = Dimensions.get('window');

// const stickers = [
//   { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
//   { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
//   { id: 3, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/ieujfwt803ap7hixkbyu.png' },
//   { id: 4, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mb9k4ygt0zeq3odvjtdv.png' },
//   { id: 5, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/hivhzd8budwnbxclq2kh.png' },
//   { id: 6, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/iujlewgxmclhiq2pjcom.png' },
//   { id: 7, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/arhu3r8mymikztqury0x.png' },
//   { id: 8, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/wqdtt1zvx7jyosm3mwde.png' },
//   { id: 9, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/znwkxnzplfazpgzpg1v4.png' },
//   { id: 10, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/qlj25v2n0czdacf7xerl.png' },
//   { id: 11, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dsls3qilxpih4jbta9r9.png' },
//   { id: 12, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/sp3almvjdnugeiyl03mw.png' },

//   { id: 13, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/cm6pdydacpaoneuqsoqn.png' },
//   { id: 14, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dg6ezya8mk5r04tyosdb.png' },
  
//   { id: 15, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/vholp1d6l0imenw0uox4.png' },
//   { id: 16, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/m0kuuxbomavh4fhiozmu.png' },
  
//   { id: 17, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/xuaae9xlnmfbwxigi68x.png' },
//   { id: 18, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/zuur44bl5su9rq2f99gb.png' },
  
//   { id: 19, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/mqooeqzeowvkln3wznte.png' },
//   { id: 20, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/c4v068jczdzj74wucvyx.png' },
// ];

// export default function CanvasScreen({ route, navigation }) {
//   const { photoUri } = route.params;
//   const [lines, setLines] = useState([]);
//   const [currentLine, setCurrentLine] = useState([]);
//   const [selectedSticker, setSelectedSticker] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const captureRef = React.useRef(null);

//   // Shared values for sticker movement
//   const stickerPosition = useSharedValue({ x: 100, y: 100 });

//   // Create PanResponder for drawing
//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: (event) => {
//       const { locationX, locationY } = event.nativeEvent;
//       setCurrentLine([{ x: locationX, y: locationY }]);
//     },
//     onPanResponderMove: (event) => {
//       const { locationX, locationY } = event.nativeEvent;
//       setCurrentLine(prevLine => [...prevLine, { x: locationX, y: locationY }]);
//     },
//     onPanResponderRelease: () => {
//       if (currentLine.length > 0) {
//         setLines(prevLines => [...prevLines, currentLine]);
//         setCurrentLine([]);
//       }
//     },
//   });

//   // Request permissions
//   const requestPermissions = async () => {
//     try {
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission needed', 'Please grant permission to save photos');
//         return false;
//       }
//       return true;
//     } catch (error) {
//       console.error('Error requesting permissions:', error);
//       return false;
//     }
//   };

//   // Save image function
//   const saveImage = async () => {
//     try {
//       setIsSaving(true);

//       // Request permissions first
//       const hasPermission = await requestPermissions();
//       if (!hasPermission) {
//         setIsSaving(false);
//         return;
//       }

//       // Capture the view
//       console.log('Capturing view...');
//       const uri = await captureRef.current.capture();
//       console.log('Captured URI:', uri);

//       if (!uri) {
//         throw new Error('Failed to capture view');
//       }

//       // On Android, we need to copy the file to proper location
//       let finalUri = uri;
//       if (Platform.OS === 'android') {
//         const filename = `drawing-${Date.now()}.png`;
//         const destination = `${FileSystem.documentDirectory}${filename}`;
//         await FileSystem.copyAsync({
//           from: uri,
//           to: destination
//         });
//         finalUri = destination;
//       }

//       // Save to media library
//       console.log('Saving to media library...');
//       const asset = await MediaLibrary.createAssetAsync(finalUri);
//       console.log('Asset created:', asset);

//       // Create album and add asset
//       Alert.alert(
//         'Success',
//         'Image saved successfully!',
//         [{ text: 'OK', onPress: () => navigation.goBack() }]
//       );

//     } catch (error) {
//       console.error('Error saving image:', error);
//       Alert.alert(
//         'Error',
//         `Failed to save image: ${error.message}`
//       );
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDiscard = () => {
//     Alert.alert(
//       'Discard Changes',
//       'Are you sure you want to discard all changes?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Discard', style: 'destructive', onPress: () => navigation.goBack() }
//       ]
//     );
//   };

//   const renderLine = (points, index) => {
//     if (points.length < 2) return null;
//     return points.map((point, i) => {
//       if (i === 0) return null;
//       const startPoint = points[i - 1];
//       return (
//         <View
//           key={`line-${index}-${i}`}
//           style={[
//             styles.line,
//             {
//               left: startPoint.x,
//               top: startPoint.y,
//               width: 3,
//               height: 3,
//               backgroundColor: 'red',
//               borderRadius: 1.5,
//             },
//           ]}
//         />
//       );
//     });
//   };

//   const onStickerMove = (event) => {
//     const { translationX, translationY } = event.nativeEvent;
//     stickerPosition.value = {
//       x: translationX,
//       y: translationY,
//     };
//   };

//   const stickerStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: withSpring(stickerPosition.value.x) },
//       { translateY: withSpring(stickerPosition.value.y) },
//     ],
//   }));

//   const handleStickerSelect = (sticker) => {
//     setSelectedSticker(sticker);
//     stickerPosition.value = { x: 100, y: 100 };
//   };

//   return (
//     <View style={styles.container}>
//       <ViewShot 
//         ref={captureRef} 
//         style={styles.container} 
//         options={{ 
//           format: 'png', 
//           quality: 1,
//           result: 'tmpfile'
//         }}
//       >
//         <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />

//         <View style={styles.drawingArea} {...panResponder.panHandlers}>
//           {lines.map((line, index) => renderLine(line, index))}
//           {renderLine(currentLine, 'current')}
//         </View>

//         {selectedSticker && (
//           <Animated.View
//             style={[styles.sticker, stickerStyle]}
//             onTouchMove={onStickerMove}
//           >
//             <Image source={{ uri: selectedSticker.uri }} style={styles.stickerImage} />
//           </Animated.View>
//         )}

//         <View style={styles.controls}>
//           <ScrollView horizontal style={styles.stickerSelector}>
//             {stickers.map((sticker) => (
//               <TouchableOpacity
//                 key={sticker.id}
//                 onPress={() => handleStickerSelect(sticker)}
//               >
//                 <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
          
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[styles.button, styles.discardButton]}
//               onPress={handleDiscard}
//               disabled={isSaving}
//             >
//               <Text style={styles.buttonText}>
//                 {isSaving ? 'Please wait...' : 'Discard'}
//               </Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[styles.button, styles.saveButton]}
//               onPress={saveImage}
//               disabled={isSaving}
//             >
//               {isSaving ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.buttonText}>Save</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ViewShot>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: width,
//     height: height * 0.7,
//     position: 'absolute',
//   },
//   drawingArea: {
//     width: width,
//     height: height * 0.7,
//     position: 'absolute',
//   },
//   line: {
//     position: 'absolute',
//   },
//   sticker: {
//     width: 100,
//     height: 100,
//     position: 'absolute',
//   },
//   stickerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
//   controls: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//   },
//   stickerSelector: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   stickerThumb: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   button: {
//     padding: 12,
//     borderRadius: 8,
//     minWidth: 120,
//     alignItems: 'center',
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//   },
//   discardButton: {
//     backgroundColor: '#f44336',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PanResponder,
  Alert,
  ActivityIndicator,
  Text,
  Platform,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const stickers = [
  { id: 1, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mecjekxwfmwwrgikvrdo.png' },
  { id: 2, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/k3xizdhozhct5qrhm3ye.png' },
  { id: 3, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/ieujfwt803ap7hixkbyu.png' },
  { id: 4, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475323/photocanvas/Project%20Status%20Stickers/mb9k4ygt0zeq3odvjtdv.png' },
  { id: 5, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/hivhzd8budwnbxclq2kh.png' },
  { id: 6, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/iujlewgxmclhiq2pjcom.png' },
  { id: 7, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/arhu3r8mymikztqury0x.png' },
  { id: 8, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/wqdtt1zvx7jyosm3mwde.png' },
  { id: 9, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/znwkxnzplfazpgzpg1v4.png' },
  { id: 10, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475315/photocanvas/Project%20Status%20Stickers/qlj25v2n0czdacf7xerl.png' },
  { id: 11, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dsls3qilxpih4jbta9r9.png' },
  { id: 12, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/sp3almvjdnugeiyl03mw.png' },

  { id: 13, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/cm6pdydacpaoneuqsoqn.png' },
  { id: 14, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/dg6ezya8mk5r04tyosdb.png' },
  
  { id: 15, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/vholp1d6l0imenw0uox4.png' },
  { id: 16, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/m0kuuxbomavh4fhiozmu.png' },
  
  { id: 17, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/xuaae9xlnmfbwxigi68x.png' },
  { id: 18, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475314/photocanvas/Project%20Status%20Stickers/zuur44bl5su9rq2f99gb.png' },
  
  { id: 19, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/mqooeqzeowvkln3wznte.png' },
  { id: 20, uri: 'https://res.cloudinary.com/dgbmqsnns/image/upload/v1738475313/photocanvas/Project%20Status%20Stickers/c4v068jczdzj74wucvyx.png' },

];

export default function CanvasScreen({ route, navigation }) {
  const { photoUri } = route.params;
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const captureRef = React.useRef(null);

  const stickerPosition = useSharedValue({ x: 100, y: 100 });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      setCurrentLine([{ x: locationX, y: locationY }]);
    },
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      setCurrentLine(prevLine => [...prevLine, { x: locationX, y: locationY }]);
    },
    onPanResponderRelease: () => {
      if (currentLine.length > 0) {
        setLines(prevLines => [...prevLines, currentLine]);
        setCurrentLine([]);
      }
    },
  });

  const saveImage = async () => {
    try {
      setIsSaving(true);
      const uri = await captureRef.current.capture();
      let finalUri = uri;
      if (Platform.OS === 'android') {
        const filename = `drawing-${Date.now()}.png`;
        const destination = `${FileSystem.documentDirectory}${filename}`;
        await FileSystem.copyAsync({ from: uri, to: destination });
        finalUri = destination;
      }
      await MediaLibrary.createAssetAsync(finalUri);
      Alert.alert('Success', 'Image saved successfully!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      Alert.alert('Error', `Failed to save image: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStickerSelect = (sticker) => {
    setSelectedSticker(sticker);
    stickerPosition.value = { x: 100, y: 100 };
  };

  const stickerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(stickerPosition.value.x) },
      { translateY: withSpring(stickerPosition.value.y) },
    ],
  }));

  return (
    <View style={styles.container}>
      <ViewShot ref={captureRef} style={styles.container} options={{ format: 'png', quality: 1 }}>
        <Image source={{ uri: photoUri }} style={styles.image} resizeMode="contain" />
        <View style={styles.drawingArea} {...panResponder.panHandlers}>
          {lines.map((line, index) => line.map((point, i) => (
            i > 0 && (
              <View
                key={`line-${index}-${i}`}
                style={[styles.line, { left: point.x, top: point.y }]}
              />
            )
          )))}
        </View>
        {selectedSticker && (
          <Animated.View style={[styles.sticker, stickerStyle]}>
            <Image source={{ uri: selectedSticker.uri }} style={styles.stickerImage} />
          </Animated.View>
        )}
      </ViewShot>

      <View style={styles.controls}>
        <ScrollView horizontal style={styles.stickerSelector} showsHorizontalScrollIndicator={true}>
          {stickers.map((sticker) => (
            <TouchableOpacity key={sticker.id} onPress={() => handleStickerSelect(sticker)}>
              <Image source={{ uri: sticker.uri }} style={styles.stickerThumb} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.saveButton} onPress={saveImage} disabled={isSaving}>
          {isSaving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingBottom: 10 },
  image: { width: width * 0.9, height: height * 0.6, alignSelf: 'center', marginTop: 20, borderRadius: 10 },
  drawingArea: { position: 'absolute', width: '100%', height: '70%' },
  line: { position: 'absolute', width: 3, height: 3, backgroundColor: 'red', borderRadius: 1.5 },
  sticker: { width: 80, height: 80, position: 'absolute' },
  stickerImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  controls: { padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, marginTop: 10 },
  stickerSelector: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#333', borderRadius: 8 },
  stickerThumb: { width: 60, height: 60, marginHorizontal: 5, borderRadius: 10 },
  saveButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
