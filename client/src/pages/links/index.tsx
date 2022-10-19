import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { stringify } from "query-string";
import { linkService } from "../../services/link.service";
import { linksTableHeadCells } from "../../components/table/utils";
import { TablePro } from "../../components/table";
import { LinkEntity } from "../../entities/link.entity";
import { LinkCreate } from "../../components/LinkCreateForm";
import { Header } from "../../components/header";

const Home = () => {
  const [links, setLinks] = useState<LinkEntity[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const navigate = useNavigate();

  const query = useMemo(() => {
    return stringify({
      page: page,
      limit: limit,
    });
  }, [page, limit]);

  const headCells = useMemo(() => {
    return linksTableHeadCells;
  }, []);

  const getLinks = useCallback(async () => {
    navigate("?" + query);
    const response = await linkService.getAll({ page, limit });
    setLinks(response.data.items);
    setTotalCount(response.data.paging.totalCount);
  }, [query]);

  useEffect(() => {
    (async () => {
      await getLinks();
    })();
  }, [query]);

  return (
    <>
      <Header />
      <Grid container sx={{ mb: 6 }}>
        <LinkCreate callback={getLinks} />
      </Grid>
      <Grid container sx={{ mb: 6 }}></Grid>
      <TablePro
        headCells={headCells}
        rows={links}
        page={page}
        setPage={setPage}
        rowsPerPage={limit}
        setRowsPerPage={setLimit}
        totalCount={totalCount}
      />
    </>
  );
};

export { Home };
