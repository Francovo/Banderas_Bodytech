import {
  Box,
  Button,
  Img,
  Input,
  Select,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { React, useState, useEffect } from "react";
import axios from "axios";
import { BsFillSunFill, BsCloudMoonFill, BsSearch } from "react-icons/bs";
import Detalles from "./Detalles";
import Link from "next/link";

const Home = () => {
  const [data, setData] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "black");
  const [busqueda, setBusqueda] = useState("");
  const [continente, setContinente] = useState("");
  // const [idPais, setidPais] = useState('');

  //Handle Change del pais a ingresar (Input)
  const handleChangeInput = (e) => {
    setBusqueda(e.target.value);
  };

  //Handle Change del continente del Option
  const handleChangeContinente = (e) => {
    setContinente(e.target.value);
    console.log(continente);
  };

  useEffect(() => {
    axios
      .get(
        `https://restcountries.com/v2/${busqueda ? `name/${busqueda}` : "all"}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        alert("La peticion no tuvo exito", error);
      });
  }, [busqueda]);

  return (
    <Box>
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
      </Box>

      <Box padding="1rem" display="flex" justifyContent="space-between">
        <Box width="50%" display="flex" alignItems="center">
          <Button backgroundColor="white" borderRadius="10px 0px 0 10px">
            <BsSearch color={color} />
          </Button>
          <Input
            borderRadius="0 10px 10px 0"
            placeholder="Busca un pais"
            _placeholder={{ color: "black" }}
            backgroundColor="white"
            border="none"
            padding="1rem 0"
            value={busqueda}
            onChange={handleChangeInput}
          />
        </Box>
        <Select
          width="fit-content"
          backgroundColor="white"
          color={color}
          onChange={handleChangeContinente}
        >
          <option value="Continente">Continente</option>
          <option value="Africa">Africa</option>
          <option value="Antartida">Antartida</option>
          <option value="America">America</option>
          <option value="Asia">Asia</option>
          <option value="Europa">Europa</option>
          <option value="Oceania">Oceania</option>
        </Select>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{
          base: "100%",
          sm: "50% 50%",
          md: "25% 25% 25% 25%",
        }}
        gap="1.5rem"
        padding="2rem"
      >
        {data.map((paises, index) => (
          <Box
            key={`pais-${index}`}
            boxShadow="dark-lg"
            width="fit-content"
            backgroundColor="transparent"
          >
            <Img src={paises.flag} width="15rem" height="10rem" />
            {/* Se utiliza codigo numerico del pais en el array como key del button */}
            <Button
              key={paises.id}
              width="100%"
              height="fit-content"
              display="flex"
              flexDirection="column"
              onClick={() => {
                <Detalles datos={data} />;
              }}
            >
              <Link href="/Detalles">
                <a>
                  {" "}
                  <Box
                    width="100%"
                    align="left"
                    padding="0.5rem 1rem 1rem 1rem"
                  >
                    <Box margin="0 0 1rem 0" backgroundColor="transparent">
                      <mark>{paises.name}</mark>
                    </Box>

                    <Box fontSize="sm" backgroundColor="transparent">
                      <Box>
                        <mark>Poblacion: </mark>
                        {paises.population}
                      </Box>
                      <Box>
                        <mark>Region: </mark>
                        {paises.region}
                      </Box>
                      <Box>
                        <mark>Capital: </mark>
                        {paises.capital}
                      </Box>
                    </Box>
                  </Box>{" "}
                </a>
              </Link>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
