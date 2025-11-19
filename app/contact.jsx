import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

export default function Contact() {
  const openLink = (url) => Linking.openURL(url);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        
        <Text style={styles.header}>Contact Me</Text>
        <Text style={styles.subtitle}>Feel free to reach out anytime!</Text>

        {/* Instagram */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => openLink('https://instagram.com/yourusername')}
        >
          <FontAwesome5 name="instagram" size={28} color="#E1306C" />
          <Text style={styles.text}>@yourInstagram</Text>
        </TouchableOpacity>

        {/* LinkedIn */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => openLink('https://linkedin.com/in/yourprofile')}
        >
          <FontAwesome5 name="linkedin" size={28} color="#0A66C2" />
          <Text style={styles.text}>LinkedIn Profile</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => openLink('https://facebook.com/yourusername')}
        >
          <FontAwesome5 name="facebook" size={28} color="#1877F2" />
          <Text style={styles.text}>Facebook Page</Text>
        </TouchableOpacity>

        {/* GitHub */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => openLink('https://github.com/yourusername')}
        >
          <FontAwesome5 name="github" size={28} color="#000" />
          <Text style={styles.text}>GitHub</Text>
        </TouchableOpacity>

        {/* Phone */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => openLink('tel:+1234567890')}
        >
          <FontAwesome name="phone" size={28} color="green" />
          <Text style={styles.text}>+1 234 567 890</Text>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity
          style={styles.row}
          onPress={() => openLink('mailto:yourEmail@gmail.com')}
        >
          <FontAwesome5 name="envelope" size={28} color="red" />
          <Text style={styles.text}>yourEmail@gmail.com</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c9d6ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2a4d9b',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#444',
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
    color: '#333',
  },
});
