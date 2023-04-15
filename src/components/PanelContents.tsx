import { Box, Grid, Paper, Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

interface Props {
  value: string;
}
export const PanelContents = ({ value }: Props) => {
  return (
    <Grid key={value} item xs={4} alignItems={"stretch"}>
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
          <InfoOutlined sx={{ marginRight: 1 }} />
          <Typography variant='h6' component='span' justifyContent={"center"}>
            {value}
          </Typography>
          <br />
          {`Cras mattis consectetur purus sit amet fermentum.
          Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`}
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
