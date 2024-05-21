const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Yay !! Authenticated !!</title>
  </head>

  <body>
    <h1>Hello 👋🏻</h1>
    <p>${userEmail} authenticated at ${timeStamp} from ${countryCode}</p>
  </body>
</html>
`

export default template