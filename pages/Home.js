import { Box, Button, Img, useColorMode } from "@chakra-ui/react";
import { React, useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert("La peticion no tuvo exito", error);
      });
  }, []);
  //
  //
  //

  return (
    <Box>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>

      <Box>
        {data.map((paises) => (
          <Button key={paises.name}>
            <Img src={paises.flag} width="10rem" />
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Home;
