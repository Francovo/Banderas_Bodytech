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
import Link from "next/link";

const Home = () => {
  //Cambio de color de la pagina
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("black", "black");

  //******************* */
  const [data, setData] = useState([]);
  const [dataFiltrada, setDataFiltrada] = useState([]);
  const [continente, setContinente] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [indexPagination, setindexPagination] = useState(40);

  //Handle Change del continente del Option
  const handleChangeContinente = (e) => {
    if (e.target.value === "Continente") {
      setDataFiltrada(data);
      setContinente("");
    } else {
      const filtroSelect = data.filter((continente) => {
        return continente.region.startsWith(e.target.value);
      });
      setDataFiltrada(filtroSelect);
      setContinente(e.target.value);
    }
  };

  //Handle Change del pais a ingresar (Input)
  const handleChangeInput = (e) => {
    let filtroInput = [];

    if (continente) {
      filtroInput = data
        .filter((pais) => {
          return pais.region === continente;
        })
        .filter((pais) => {
          return pais.name
            .toLowerCase()
            .startsWith(e.target.value.toLowerCase());
        });
    } else {
      filtroInput = data.filter((pais) => {
        return pais.name.toLowerCase().startsWith(e.target.value.toLowerCase());
      });
    }

    setDataFiltrada(filtroInput);
    setBusqueda(e.target.value);
  };

  //Paginacion
  const handlePagination = () => {
    setindexPagination(indexPagination + 40);
  };

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v2/all`)
      .then((response) => {
        // let newArreglo = filtroArreglo.filter((item, index) => {
        //   return index <= 50
        // })
        setDataFiltrada(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log("La peticion no tuvo exito", error);
      });
  }, [indexPagination]);

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
          <option value="Polar">Polar</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
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
        {/* Paginacion mas Mapeo de datos */}
        {dataFiltrada.slice(0, indexPagination).map((paises, index) => (
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
              onClick={() => {}}
            >
              <Link href={`/pais/${paises.name}`}>
                <a
                  style={{
                    width: "100%",
                  }}
                >
                  <Box align="left" padding="0.5rem 1rem 1rem 1rem">
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
                  </Box>
                </a>
              </Link>
            </Button>
          </Box>
        ))}
        <Box backgroundColor="transparent">
          {dataFiltrada.slice(indexPagination).length < dataFiltrada.length ? (
            <Button colorScheme="linkedin" onClick={handlePagination}>
              Mostrar más...
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
