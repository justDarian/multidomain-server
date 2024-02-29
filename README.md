# A webserver that handles multiple domains with custom endpoints
(this readme is chatgpt generated, too lazy to make my own lmfao) <br>
## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/justDarian/multidomain-server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd multidomain-server
   ```

3. Install the required dependencies using npm:

   ```bash
   npm install
   ```

## Configuration

- Configure your endpoints in the `routes.js` file.
- Organize your site content within the `sites` folder. You can create subfolders for each site.

## Usage

Start the webserver using the following command:

```bash
node index.js
```

This will start the server, and you can access it by navigating to [http://localhost:80](http://localhost:80) in your web browser.

## Custom Endpoints

Define your custom endpoints in the `routes.js` file. You can modify the array to add objects per each endpoint. Each Object must require a domain, endpoint, and callback. The callback function has 3 arguments: req, res, and next

## Adding More Sites

Organize your site content within the `sites` folder. Each subfolder can represent a different site. For example:

```
sites/
  ├── site1.com/
  │   ├── index.html
  │   ├── styles/
  │   │   └── style.css
  │   └── images/
  │       └── logo.png
  ├── site2.com/
  │   ├── index.html
  │   └── scripts/
  │       └── app.js
  └── another-site.com/
      └── ...
```

Feel free to customize the structure based on your needs.

## License

This project is licensed under something.

---

If you have any issues or suggestions, feel free to [open an issue](https://github.com/justDarian/multidomain-server/issues).
