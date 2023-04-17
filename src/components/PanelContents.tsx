import { Box, Grid, Paper, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { FC } from "react";

interface Fruits {
  id: number;
  name: string;
  price: number;
  area: string;
}

interface PanelContentsProps {
  value: Fruits;
}

export const PanelContents: FC<PanelContentsProps> = ({
  value,
}: {
  value: Fruits;
}) => {
  return (
    <Grid item xs={4} alignItems={"stretch"}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          bgcolor: "lightblue",
        }}
        elevation={0}
      >
        <Typography variant='body2'>
          <InfoOutlinedIcon sx={{ marginRight: 1 }} />
          <Typography variant='h6' component='span' justifyContent={"center"}>
            {value.id}
            {value.name}
            {value.price}
            {value.area}
          </Typography>
        </Typography>
      </Paper>
      <Box
        sx={{
          height: 40,
          width: "100%",
          bgcolor: "#cfe8fc",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant='body2'>aaaa</Typography>
      </Box>
    </Grid>
  );
};
