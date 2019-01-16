# get

`curl http://localhost:3000/news`

```
[
  {"id":"23e23aet","title":"Article about politics"},
  {"id":"346thjbkxdfg","title":"Whatever i cant be bothered"}
]
```

# post

`curl --header "Content-Type: application/json" --request POST --data "{\"title\": \"post works\"}" http://localhost:3000/news`

response

`mTEF3`

next get call

```
[
  {"id":"23e23aet","title":"Article about politics"},
  {"id":"346thjbkxdfg","title":"Whatever i cant be bothered"},
  {"title":"post works","id":"mTEF3"}
]
```

# error

`curl http://localhost:3000/news/er4tert`

response

```
<html>
  <head>
    <title>Not found</title>
  </head>
  <body>
    <h1>Not found</h1>
  </body>
</html>
```
