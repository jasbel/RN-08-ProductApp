/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useContext, useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsContext} from '../context/ProductsContext';
import {ProductsStackParams} from '../navigator/NavProducts';
import {useState} from 'react';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

const ProductsScreen = ({navigation}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {products, loadProducts} = useContext(ProductsContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 15}}
          onPress={() =>
            navigation.navigate('ProductScreen', {
              name: 'nuevo Producto',
            })
          }>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProductsFromBackend = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  };

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    marginVertical: 5,
    borderEndWidth: 2,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});
