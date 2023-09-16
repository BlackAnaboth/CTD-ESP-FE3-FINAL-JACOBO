import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Box } from "@mui/system";
import { Button, Grid, Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { getComic, getComics } from "dh-marvel/services/marvel/marvel.service";
import { IComic, IComicResponse } from "types/IComic.type";
import NextLink from "next/link";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CardComicDetails from "dh-marvel/components/card-comic-details/card-comic-details.component";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IItem } from "types/generalTypes";

interface Props {
  comic: IComic;
}

const Comic: NextPage<Props> = ({ comic }) => {

  function getIdFromResourceURI ( resourceURI  : String) {
    const result = resourceURI.split("/");
    return result[result.length-1];
  }

  return (
    <>
      <Head>
        <title>DH-MARVEL</title>
        <meta
          name="description"
          content={`Comic de Marvel.${comic?.title}.${comic?.series}`}
        />
      </Head>
      <Stack
        component="section"
        maxWidth="xl"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          padding: "100px 20px",
        }}
      >
        <Grid container spacing={4} maxWidth="xl">
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                alt={comic?.title}
                src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                sx={{
                  boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
                  margin: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CardComicDetails comic={comic} />
            <Box
              sx={{
                paddingBottom: "90px",
              }}
            >
              {comic?.stock > 0 ? (
                <NextLink
                  href={{ pathname: "/checkout/", query: `comic=${comic?.id}` }}
                >
                  <Button
                    endIcon={<AddShoppingCartOutlinedIcon />}
                  >
                    COMPRAR
                  </Button>
                </NextLink>
              ) : (
                <Button
                  disabled
                  endIcon={<AddShoppingCartOutlinedIcon />}
                >
                  SIN STOCK
                </Button>
              )}
            </Box>
            <Box>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  Descripcion
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                  {comic?.description === null ? comic?.description : "No cuenta con una descripcion"}
                </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  Personajes
                </AccordionSummary>
                {comic?.characters && comic?.characters.items.map((character : IItem, key)=> {
                  return (
                  <AccordionDetails key={key}>
                    <NextLink href={"/characters/"+getIdFromResourceURI(character?.resourceURI)}>{character?.name}</NextLink>
                  </AccordionDetails>
                  )
                })}
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  Creadores
                </AccordionSummary>
                {
                comic && comic?.creators.items.map((creators : IItem, key)=> {
                  return (
                  <AccordionDetails key={key}>
                    <Typography>
                      {creators?.name}
                    </Typography>
                  </AccordionDetails>
                  )
                  })}
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = parseInt(params?.id as string)
  const data = await getComic(id);
  return {
    props: {
      comic: data,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: IComicResponse = await getComics();
  const paths = data.data.results.map((comic) => {
    return { params: { id: comic.id.toString() } };
  })
  return {
    paths,
    fallback: true,
  };
}


export default Comic;
