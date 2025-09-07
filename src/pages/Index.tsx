import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard, Product } from "@/components/ProductCard";
import { Cart, CartItem } from "@/components/Cart";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const products: Product[] = [
    {
      id: 1,
      name: "Smartphone Premium",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      category: "Eletrônicos",
      description: "Smartphone com tela OLED e câmera profissional"
    },
    {
      id: 2,
      name: "Notebook Gamer",
      price: 2499.99,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      category: "Eletrônicos", 
      description: "Notebook para jogos com placa de vídeo dedicada"
    },
    {
      id: 3,
      name: "Fones Bluetooth",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      category: "Áudio",
      description: "Fones sem fio com cancelamento de ruído"
    },
    {
      id: 4,
      name: "Câmera DSLR",
      price: 1899.99,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      category: "Fotografia",
      description: "Câmera profissional para fotografia"
    },
    {
      id: 5,
      name: "Smartwatch",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      category: "Wearables",
      description: "Relógio inteligente com monitor cardíaco"
    },
    {
      id: 6,
      name: "Tablet Pro",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400",
      category: "Eletrônicos",
      description: "Tablet com caneta digital incluída"
    }
  ];

  const addToCart = (product: Product) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
    
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
    toast({
      title: "Produto removido",
      description: "Item removido do carrinho.",
      variant: "destructive",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Compra finalizada!",
      description: "Obrigado pela sua compra. Você receberá um email de confirmação.",
    });
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à nossa loja!</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra produtos incríveis com os melhores preços e qualidade garantida.
          </p>
        </section>

        <section id="produtos">
          <h2 className="text-3xl font-bold mb-8 text-center">Nossos Produtos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
