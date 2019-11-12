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
  npm run migration:generate AddArtworkAndArtCollections
```

- Applying migrations

```bash
npm run migration:run
```

## Elasticsearch

Data: /usr/local/var/lib/elasticsearch/elasticsearch_sampastoriza/
Logs: /usr/local/var/log/elasticsearch/elasticsearch_sampastoriza.log
Plugins: /usr/local/var/elasticsearch/plugins/
Config: /usr/local/etc/elasticsearch/
