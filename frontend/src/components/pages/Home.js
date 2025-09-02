import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <section className="py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Adote um Pet</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Veja os detalhes de cada um e conheça o tutor deles. Dê um lar cheio
          de amor para um animal que precisa.
        </p>
      </div>

      {/* Pets Grid */}
      {pets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <Card
              key={pet._id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <div
                  className="h-48 w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                  }}
                />
                {!pet.available && (
                  <Badge
                    variant="secondary"
                    className="absolute top-2 right-2 bg-green-500 text-white"
                  >
                    Adotado
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{pet.name}</CardTitle>
                <CardDescription>
                  {pet.breed} • {pet.age} anos
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Peso:</span> {pet.weight}kg
                  </p>
                  {pet.color && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Cor:</span> {pet.color}
                    </p>
                  )}
                </div>

                {pet.available ? (
                  <Link to={`/pet/${pet._id}`} className="block">
                    <Button className="w-full">Ver Detalhes</Button>
                  </Link>
                ) : (
                  <Button disabled className="w-full">
                    Já Adotado
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-semibold mb-2">Nenhum pet disponível</h3>
          <p className="text-muted-foreground">
            Não há pets cadastrados ou disponíveis para adoção no momento.
          </p>
        </div>
      )}
    </section>
  );
}

export default Home;
