import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [volume, setVolume] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [ip, setIp] = useState('192.168.76.146');

  const changeVolume = type => {
    fetch(`http://${ip}:7512/volume/${type}`).then(r => r.text()).then(r => setVolume(r))
  }

  const doPowerAction = type => {
    fetch(`http://${ip}:7512/power/${type}`)
  }

  const getInitData = () => {
    setErrorMessage("");
    fetch(`http://${ip}:7512/volume`).then(r => r.text()).then(r => setVolume(r)).catch(e => setErrorMessage(e.message))
  }

  useEffect(() => {
    getInitData();
  }, [])

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          // height: 60,
          // marginTop: 35,
          paddingTop: 35,
          paddingBottom: 5,
          backgroundColor: '#2196f3',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '800',
            fontSize: 32,
          }}>
          Remote App
          </Text>
      </View>
      <Text style={{ color: "#e53935" }}>{errorMessage}</Text>
      <TextInput
        style={{
          height: 40,
          margin: 20,
          borderBottomWidth: 1,
          borderColor: '#2196f3',
          fontSize: 20,
        }}
        onBlur={getInitData}
        onChangeText={text => setIp(text)}
        value={ip}
      />
      <View style={{
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
        borderColor: '#2196f3',
        borderWidth: 1
      }}>
        <Text style={{ margin: 10 }}>{`Volume ${volume}`}</Text>
        <View style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center"
        }}>
          <View style={[{ width: 90, height: 90, margin: 10 }]}>
            <Button title="Volume down" onPress={() => { changeVolume('-') }} />
          </View>
          <View style={[{ width: 90, height: 90, margin: 10 }]}>
            <Button title="Volume up" onPress={() => { changeVolume('+') }} />
          </View>
        </View>
      </View>
      <View style={{
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        // borderColor: '#2196f3',
        // borderWidth: 1
      }}>

        <View style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <View style={[{ margin: 5 }]}>
            <Button color="#cddc39" title="Hibernate" onPress={() => { doPowerAction('hibernate') }} />
          </View>
          <View style={[{ margin: 5 }]}>
            <Button color="#d32f2f" title="Shutdown" onPress={() => { doPowerAction('sdn') }} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: "800"
  },
});
