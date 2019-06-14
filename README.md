## Catalart API

A simple API that powers the catalog

## Useful commands

- Starting docker container for sql server

```bash
  docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=reallyStrongPwd123' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2017-latest
```

- Generating a migration

```bash
  npm run typeorm-generate AddArtworkAndArtCollections
```
