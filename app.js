const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/:size/:background?/:textColor?', (req, res, next) => {
  let [width, height] = req.params.size.split('x');

  if (!height) height = width;

  if (isNaN(width) || isNaN(height)) return next();

  const background = req.params.background || 'DDD';
  const textColor = req.params.textColor || '777';
  const fontSize = req.query.fontSize || 24;
  const text = req.query.text || `${width}×${height}`;

  console.log(req.originalUrl);

  res
    .set('Cache-Control', `public, max-age=${365 * 24 * 60 * 60}`)
    .type('image/svg+xml')
    .send(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect fill="#${background}" width="${width}" height="${height}"/>
      <text fill="#${textColor}" font-family="monospace, sans-serif" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle" x="50%" y="50%">${text}</text>
    </svg>`)
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
