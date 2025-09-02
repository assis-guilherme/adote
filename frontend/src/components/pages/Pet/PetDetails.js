import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function PetDetails() {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet);
    });
  }, [id]);

  async function schedule() {
    let msgType = "success";

    const data = await api
      .patch(
        `pets/schedule/${pet._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <>
      {pet.name && (
        <div className="max-w-6xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Conhecendo o Pet: {pet.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              Se tiver interesse, marque uma visita para conhecê-lo!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Fotos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pet.images.map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div
                      className="h-64 w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${image})`,
                      }}
                    />
                  </Card>
                ))}
              </div>
            </div>

            {/* Pet Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{pet.name}</CardTitle>
                  <CardDescription>
                    {pet.breed} • {pet.age} anos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Peso
                      </p>
                      <p className="text-lg font-semibold">{pet.weight}kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Idade
                      </p>
                      <p className="text-lg font-semibold">{pet.age} anos</p>
                    </div>
                  </div>

                  {pet.color && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Cor
                      </p>
                      <p className="text-lg font-semibold">{pet.color}</p>
                    </div>
                  )}

                  {pet.description && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Descrição
                      </p>
                      <p className="text-sm">{pet.description}</p>
                    </div>
                  )}

                  <div className="pt-4">
                    {token ? (
                      <Button onClick={schedule} className="w-full" size="lg">
                        Solicitar uma Visita
                      </Button>
                    ) : (
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Você precisa criar uma conta para solicitar a visita.
                        </p>
                        <Link to="/register">
                          <Button variant="outline" className="w-full">
                            Criar Conta
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Owner Info */}
              {pet.user && (
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Tutor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Nome
                      </p>
                      <p className="font-semibold">{pet.user.name}</p>

                      {pet.user.phone && (
                        <>
                          <p className="text-sm font-medium text-muted-foreground">
                            Telefone
                          </p>
                          <p className="font-semibold">{pet.user.phone}</p>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PetDetails;
