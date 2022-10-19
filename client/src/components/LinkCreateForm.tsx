import React, { useMemo, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { linkService } from "../services/link.service";
import { validateLink, validateLinkName } from "../utils/validation";

interface Props {
  callback: () => Promise<void>;
}

const LinkCreate = ({ callback }: Props) => {
  const [link, setLink] = useState("");
  const [linkName, setLinkName] = useState("");

  const [isPrint, setIsPrint] = useState(false);
  const [isPrintName, setIsPrintName] = useState(false);

  const validLink = useMemo(() => {
    if (!isPrint) {
      return true;
    }
    return validateLink(link);
  }, [isPrint, link]);

  const validLinkName = useMemo(() => {
    if (!isPrintName) {
      return true;
    }
    return validateLinkName(linkName);
  }, [isPrintName, linkName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrint(true);
    setLink(e.target.value);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrintName(true);
    setLinkName(e.target.value);
  };

  const handleSave = async () => {
    try {
      setIsPrint(true);

      if (!validLink) {
        return;
      }

      await linkService.create({ link, linkName });

      await callback();

      setLink("");
      setIsPrint(false);

      setLinkName("");
      setIsPrintName(false);
    } catch (e) {}
  };

  return (
    <Grid container sx={{ mt: 6, ml: 30, mr: 30 }} spacing={2}>
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Введите ссылку"
            value={link}
            onChange={handleChange}
            size="small"
            sx={{ height: "40px" }}
            error={!validLink}
            helperText={validLink ? "" : "Невалидная ссылка"}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ height: "40px" }}
            onClick={handleSave}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={4} sx={{ ml: 0, mt: 2 }}>
        <TextField
          fullWidth
          label="Укажите Название ссылки"
          value={linkName}
          onChange={handleChangeName}
          size="small"
          sx={{ height: "40px" }}
          error={!validLinkName}
          helperText={
            validLinkName
              ? "Необязательно поле"
              : "Невалидное названия для ссылки"
          }
        />
      </Grid>
    </Grid>
  );
};

export { LinkCreate };
