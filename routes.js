module.exports = [
    {
      domain: 'dariandev.com',
      endpoint: '/test',
      callback: (req, res, next) => {
        res.send("test")
      },
    },
    {
        domain: "devhaxx.xyz",
        endpoint: "/test2",
        callback: (req, res) => {
            res.send("test2")
        }
    }
];