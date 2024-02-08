import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';

export default function App() {
  const width = useSharedValue(100)
  const progress =useSharedValue(0.5)
  const scale =useSharedValue(1)
  const size=100

  const reanimatedStyle=useAnimatedStyle(()=>{
    return{
opacity:progress.value,
borderRadius:progress.value*size/2,
transform:[
  {scale:scale.value},
  {rotate:`${progress.value*Math.PI}rad`}
]
    }
  },[])

  const handlePress=()=>{
    width.value=width.value+50
  }
  useEffect(() => {
   progress.value=withRepeat(withTiming(0.3,{duration:5000}),-1,true)
   scale.value=withRepeat(withSpring(2,{duration:5000}),-1,true)
  }, [])
  
  return (
    <View style={styles.container}>
      <Animated.View style={{width ,height:100,backgroundColor:'violet'}}>
        <Button onPress={handlePress} title='Click me ' />
      </Animated.View>
<View style={{marginTop:5}}>
      <Animated.View style={[{width:50 ,height:50,backgroundColor:'violet'},reanimatedStyle]}>

        
      </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
