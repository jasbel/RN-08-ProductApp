/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/NavProducts';
import {useEffect, useState, useContext} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import useCategories from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

const ProductScreen = (props: Props) => {
  const {route, navigation} = props;
  const {id = '', name = ''} = route.params;

  const [tempUri, setTempUri] = useState<string>();

  const {categories} = useCategories();
  const {loadProductById, addProduct, updateProduct, uploadImage} =
    useContext(ProductsContext);

  const {_id, categoriaId, nombre, img, onChange, form, setFormValue} = useForm(
    {
      _id: id,
      categoriaId: '',
      nombre: name,
      img: '',
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: nombre || 'Sin nombre del Producto',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;

    const product = await loadProductById(id);

    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      if (categoriaId.length === 0) {
        onChange(categories[0]._id, 'categoriaId');
      }
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        if (!resp.assets) return;

        setTempUri(resp.assets.uri);
        uploadImage(resp, _id);
      },
    );
  };
  const takePhotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      resp => {
        if (resp.didCancel) return;
        if (!resp.assets) return;

        setTempUri(resp.assets.uri);
        uploadImage(resp, _id);
      },
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Nombre del Categorias</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>

        <Button
          title="Guardar"
          //TODO: Por Hacer
          onPress={saveOrUpdate}
          color="#5856D6"
        />
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="Camara" onPress={takePhoto} color="#5856D6" />

            <View style={{width: 10}} />

            <Button
              title="Galeria"
              onPress={takePhotoFromGallery}
              color="#5856D6"
            />
          </View>
        )}

        {img.length > 0 && !tempUri && (
          <Image
            source={{uri: img}}
            style={{
              marginTop: 20,
              width: 100,
              height: 300,
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginBottom: 10,
  },
});
