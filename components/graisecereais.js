import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, Image } from 'react-native';

const products = [
  { id: '1', name: 'Arroz', price: 34.00, image: require('./assets/arroz.png') },
  { id: '2', name: 'Feijão', price: 7.99, image: require('./assets/feijao.png') },
  { id: '3', name: 'Açúcar', price: 5.99, image: require('./assets/açucar.png') },
  { id: '4', name: 'Milho para Pipoca', price: 8.90, image: require('./assets/pipoca.png') },
  { id: '5', name: 'Farinha de Trigo', price: 4.90, image: require('./assets/trigo.png') },
  { id: '6', name: 'Farinha de Aveia', price: 9.99, image: require('./assets/aveia.png') },
  { id: '7', name: 'Granola', price: 15.00, image: require('./assets/granola.png') },
  { id: '8', name: 'Espaguete N°8', price: 4.99, image: require('./assets/espaguete.png') },
  { id: '9', name: 'Macarrão Pena', price: 4.99, image: require('./assets/pena.png') },
  { id: '10', name: 'Macarrão Parafuso', price: 4.99, image: require('./assets/parafuso.png') },
  { id: '11', name: 'Massa de Bolo sabor chocolate', price: 7.99, image: require('./assets/massachocolate.png') },
  { id: '12', name: 'Massa de Bolo sabor baunilha', price: 7.99, image: require('./assets/massabaunilha.png') },
  { id: '13', name: 'Massa de Bolo sabor laranja', price: 7.99, image: require('./assets/massalaranja.png') },
  { id: '14', name: 'Cereal nestle', price: 9.99, image: require('./assets/nescau.png') },
  { id: '15', name: 'Sucrilhos', price: 9.99, image: require('./assets/sucrilhos.png') },
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
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === productId);
      if (itemInCart.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== productId);
      }
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === productId);
      if (itemInCart.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== productId);
      }
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header1}>GRÃOS E CEREAIS</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.productInfo}>
              <Text style={[styles.productName, item.name === 'Arroz' && styles.arrozName]}>
                {item.name}
              </Text>
              <Text>R$ {item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Adicionar" onPress={() => addToCart(item)} color="#FFD166" />
              <View style={styles.quantityControl}>
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
            </View>
          </View>
        )}
      />
      <Text style={styles.header}>Carrinho</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.name} - R$ {item.price.toFixed(2)}</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.button}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.button}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: R$ {calculateTotal()}</Text>
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
    backgroundColor: '#FFD166',
    borderRadius: 30,
    height: 60,
    width: 270,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    top: -9,
  },
  buttonContainer: {
    width: 100,
    height: 70,
    alignItems: 'center',
  },
  button: {
    width: 20,
    height: 20,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default App;
