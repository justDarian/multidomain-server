module.exports = [
    {
      domain: 'example.com',
      endpoint: '/test',
      callback: (req, res, next) => {
        res.send("test")
      },
    },
];
