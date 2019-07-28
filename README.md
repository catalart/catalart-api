## Catalart API

A simple API that powers the catalog

## Useful commands

- Starting docker container for sql server
- Make sure the database exists (catalart)

```bash
  docker run -d -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=reallyStrongPwd123' -p 1433:1433 microsoft/mssql-server-linux
```

- Generating a migration

```bash
  npm run typeorm-generate AddArtworkAndArtCollections
```
