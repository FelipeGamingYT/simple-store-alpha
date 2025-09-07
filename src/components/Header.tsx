import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Minha Loja</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#produtos" className="text-foreground hover:text-primary transition-colors">
              Produtos
            </a>
            <a href="#sobre" className="text-foreground hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </nav>

          <Button
            variant="outline"
            size="sm"
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="ml-2">Carrinho</span>
            {cartItemsCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};