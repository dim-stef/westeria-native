/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  TouchableNativeFeedback,
  FlatList,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import HTML from 'react-native-render-html';
import {useNavigation} from '@react-navigation/native';
import {BaseNavigationContainer} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-paper';

function Search({navigation, route}) {
  const [text, setText] = useState('');
  const [searchResults, setResults] = useState([]);
  const [topLevelBranches, setTopLevelBranches] = useState([]);

  async function getTopLevel() {
    const url = 'https://westeria.app/api/v1/top_level_branches/';
    try {
      let response = await fetch(url);
      let data = await response.json();
      setTopLevelBranches(data);
    } catch (e) {}
  }

  async function getSearchResults() {
    let url = 'https://westeria.app/api/v1/search2/';
    let _text = text[0] === '@' ? text.substr(1) : text;
    let param = text[0] == '@' ? 'uri' : 'name';

    try {
      const u = `${url}?${param}=${text}`;
      console.log(u);
      let response = await fetch(`${url}?${param}=${_text}`);
      let data = await response.json();
      console.log(data);
      setResults(data.results);
    } catch (e) {
      console.log(e);
    }
  }

  function onSearchChange(newText) {
    setText(newText);
  }

  useEffect(() => {
    if (text) {
      getSearchResults();
    } else {
      setResults([]);
    }
  }, [text]);

  useEffect(() => {
    getTopLevel();
  }, []);
  return (
    <ScrollView>
      <TextInput
        onChangeText={onSearchChange}
        mode="outlined"
        style={{margin: 10}}
        theme={{colors: {placeholder: '#a2a2a2'}}}
        label="Search for a name or @username"
      />
      {searchResults.length > 0 ? (
        <BranchList branches={searchResults} title="Results" />
      ) : null}
      <BranchList branches={topLevelBranches} title="Popular communities" />
    </ScrollView>
  );
}

function BranchList({branches, title}) {
  const navigation = useNavigation();

  function handlePress(profile) {
    navigation.navigate('ProfileScreen', {profile: profile});
  }
  return (
    <>
      <Text style={{margin: 10, fontSize: 26, fontWeight: 'bold'}}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {branches.map((b, i) => {
          return (
            <View style={styles.branch}>
              <TouchableNativeFeedback key={i} onPress={() => handlePress(b)}>
                <View style={{padding: 20}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <SharedElement id={`profile.search.${b.id}`}>
                      <Image
                        resizeMode="cover"
                        source={{uri: b.branch_image}}
                        style={{height: 60, width: 60, borderRadius: 100}}
                      />
                    </SharedElement>
                    <View style={{marginLeft: 10}}>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        {b.name}
                      </Text>
                      <Text>@{b.uri}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <MaterialCommunityIcons
                      name={
                        b.branch_type == 'CM'
                          ? 'account-group-outline'
                          : 'account-outline'
                      }
                      size={24}
                    />
                    <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                      {b.branch_type == 'CM' ? 'Community' : 'User'}
                    </Text>
                  </View>
                  {b.description ? (
                    <View style={{marginTop: 10}}>
                      <Text>{b.description}</Text>
                    </View>
                  ) : null}
                </View>
              </TouchableNativeFeedback>
            </View>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  branch: {
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: Dimensions.get('screen').width - 20,
    borderRadius: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default Search;
