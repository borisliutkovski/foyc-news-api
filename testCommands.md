# get

`
curl http://localhost:3000/news
`

```
[
  {"id":"23e23aet","title":"Article about politics"},
  {"id":"346thjbkxdfg","title":"Whatever i cant be bothered"}
]
```

# post

`
curl --header "Content-Type: application/json" --request POST --data "{\"title\": \"post works\"}" http://localhost:3000/news
`

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

# put

`
curl --header "Content-Type: application/json" --request PUT --data "{\"_id\": \"5c55b95c537f4e16c427a642\", \"title\": \"put works\"}" http://localhost:3000/news
`

# delete

`
curl --header "Content-Type: application/json" --request DELETE http://localhost:3000/news/5c55b8a5740c0335d4674ee7
`

# error

`
curl http://localhost:3000/news/er4tert
`

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

# login

`
curl --request POST --header "Content-Type: application/json" --data "{\"username\": \"user1\", \"password\": \"password123\"}" http://localhost:3000/auth/login
`

# signup

`
curl --request POST --header "Content-Type: application/json" --data "{\"username\": \"user1\", \"password\": \"password123\"}" http://localhost:3000/auth/signup
`

# post

`
curl --header "Content-Type: application/json" --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiX2lkIjoiNWM1ODcwMDU3NzYwYWMyNjJjY2Q1NDdmIiwiaWF0IjoxNTQ5MzAwMjY3fQ.PbWuvOatvhhWEXj-V8Y-BRekWmzsswX65Heh6ASyXbI" --request POST --data "{\"title\": \"post works\"}" http://localhost:3000/news
`
