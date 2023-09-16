import type { NextPage } from "next";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { IComic } from "types/IComic.type";

interface Props {
  comic: IComic;
}

const percentageOffDiscount = (comic : IComic) => {
  const oldPrice = comic?.oldPrice;
  const newPrice = comic?.price;

  return oldPrice && newPrice ? Math.round(100 - (newPrice * 100) / oldPrice) : 0;
}

const CardComicDetails: NextPage<Props> = ({ comic }) => {
  const offert = percentageOffDiscount(comic)
  
  return (
    <Box
      sx={{
        paddingBottom: "30px",
      }}
    >
      <Typography gutterBottom component="div">
        Serie: {comic?.series.name}
      </Typography>
      <Typography gutterBottom variant="h5">
        {comic?.title}
      </Typography>
      {comic?.isbn !== "" && (
        <Typography gutterBottom component="div">
          ISBN: {comic?.isbn}
        </Typography>
      )}
      <Box
        sx={{
          padding: "30px 0px",
        }}
      >
        {comic?.oldPrice && comic?.stock > 0 && (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              textDecoration: "line-through",
              marginBottom: "5px",
              paddingRight: "15px",
            }}
          >
            ${comic?.oldPrice}
          </Typography>
        )}

        {offert > 0 && (
          <Typography variant="h6" color="text.secondary">
            {offert}% OFF!
          </Typography>
        )}
      </Box>
      <Typography variant="h4">${comic?.price}</Typography>
    </Box>
  );
};

export default CardComicDetails;
