import {
  Box,
  Button,
  Img,
  Tag,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";
import { BsFillSunFill, BsCloudMoonFill } from "react-icons/bs";
import Link from "next/link";

const Detalles = () => {
  //Cambio de color de la pagina
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "black");

  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    let nombre = router.query.name;
    console.log(nombre);

    axios
      .get(`https://restcountries.com/v2/name/${nombre}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("La peticion no tuvo exito", error);
      });
  }, []);

  return (
    <Box backgroundColor='transparent'>
      <Box
        display="flex"
        padding="0.5rem 1.5rem"
        width="100%"
        backgroundColor="white"
        justifyContent="space-between"
        fontWeight="bold"
        alignItems="center"
        color={color}
      >
        Where in the world
        <Button onClick={toggleColorMode} colorScheme="linkedin">
          {colorMode === "light" ? <BsCloudMoonFill /> : <BsFillSunFill />}
        </Button>
        <Button colorScheme="linkedin">
          <Link href={`/`}>
            <a>Volver</a>
          </Link>
        </Button>
      </Box>
      {data.map((pais, index) => (
        <Box
          key={`pais-${index}`}
          display="flex"
          margin="11rem 30rem"
          backgroundColor="black"
        >
          <Box>
            <Img src={pais.flag} width="100%" height="100%" />
          </Box>
          <Box
            padding="3rem"
            display="flex"
            flexDirection="column"
            gap="2rem"
            width="50%"
            color="white"
          >
            <Box>
              <h1>
                Nombre: <br /> {pais.name}
              </h1>
            </Box>
            <Box>
              <h1>
                Capital: <br /> {pais.capital}
              </h1>
            </Box>
            <Box>
              <h1>
                Region: <br /> {pais.region}
              </h1>
            </Box>
            <Box background="transparent">
              {pais.currencies.map((moneda, index) => (
                <Box key={`moneda-${index}`}>
                  <h1>
                    Moneda: <br /> {moneda.code}
                  </h1>
                </Box>
              ))}
            </Box>
            <Box>
              {pais.languages.map((lenguajes, index) => (
                <Tag key={`lenguajes-${index}`}>{lenguajes.name}</Tag>
              ))}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Detalles;
