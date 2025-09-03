import { Link } from "react-router-dom";
import React, { useContext } from "react";

import { Button } from "../ui/button";

import Logo from "../../assets/img/logo.png";

/* contexts */
import { Context } from "../../context/UserContext";

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="AdotaPet" className="h-8 w-8" />
          <h2 className="text-xl font-bold text-primary">AdotaPet</h2>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Adotar
          </Link>

          {authenticated ? (
            <>
              <Link
                to="/pet/myadoptions"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Minhas Adoções
              </Link>
              <Link
                to="/pet/mypets"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Meus Pets
              </Link>
              <Link
                to="/user/profile"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Meu Perfil
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-sm font-medium"
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Registrar</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
