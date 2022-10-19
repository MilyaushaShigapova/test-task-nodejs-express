import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      <Box sx={{ mb: 10 }}>
        <AppBar position="static" sx={{ pl: "40%" }}>
          <Toolbar variant="dense">
            <Typography variant="h4" color="inherit" component="div">
              Сокращение ссылок
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export { Header };
