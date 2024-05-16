import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Image } from 'react-native';

const products = [
  { id: '1', name: 'Banana Prata', price: 10.99, image: require('./assets/banana.png') },
  { id: '2', name: 'Maçã', price: 6.99, image: require('./assets/maca.png') },
  { id: '3', name: 'Manga', price: 7.99, image: require('./assets/manga.png') },
  { id: '4', name: 'Laranja', price: 11.99, image: require('./assets/laranja.png') },
  { id: '5', name: 'Uva Verde', price: 11.99, image: require('./assets/uva.png') },
  { id: '6', name: 'Limão', price: 5.00, image: require('./assets/limao.png') },
  { id: '7', name: 'Melão', price: 10.99, image: require('./assets/melao.png') },
];

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      )
    );
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header1}>FRUTAS</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image 
              source={item.image} 
              style={styles.image} 
            />
            <View style={styles.productInfo}>
              <Text style={[styles.productName, item.name === 'Banana Prata' && styles.bananaName]}>
                {item.name}
              </Text>
              <Text>R$ {item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.button}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>
                {cart.find((cartItem) => cartItem.id === item.id)?.quantity || 0}
              </Text>
              <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.button}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
            <Button title="Adicionar ao Carrinho" onPress={() => addToCart(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
  },
  header1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    backgroundColor: '#B60952',
    borderRadius: 30,
    height: 50,
    width: 200,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18, // Fonte padrão para os nomes dos produtos
    fontWeight: 'bold',
  },
  bananaName: {
    fontSize: 24, // Fonte maior para "Banana Prata"
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 5,
  },
});

export default App;
