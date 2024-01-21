import { Text, View } from "react-native";
import React from 'react';
import { SafeAreaView } from 'react-native';
import { MiMapView } from '@mappedin/react-native-sdk';

const options = {
  clientId: '5eab30aa91b055001a68e996',
  clientSecret: 'RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1',
  venue: 'mappedin-demo-mall',
  perspective: 'Website',
};

export default function index() {
  return (
    <SafeAreaView style={{flex: 1}}>
    {/* <MiMapView
      style={{ flex: 1 }}
      key="mappedin"
      options={options}
    /> */}
  </SafeAreaView>
  );
}
