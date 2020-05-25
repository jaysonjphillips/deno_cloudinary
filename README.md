# Deno_Cloudinary
### An unofficial open-source Cloudinary client for deno


## Set up
### Requirements

- [deno](https://deno.land/)
- A Cloudinary Account - [sign up](https://cloudinary.com/)

### Cloudinary Settings

You will need your `cloud name`, `api secret` and `api key` from Cloudinary in order to get started with this client. You can find each of these [on the main Dashboard](https://cloudinary.com/console).

We **strongly** recommend setting these up as environment variables and ensuring you do not store these keys in your repository or accessible code. 

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloud Name  | Your primary idenifier and required for interaction with the Cloudinary API.                                                          |
| API Key   | This essentially acts as your username when interacting with the Cloudinary API.                                                         |
| API Secret | This essentially acts as your password when interacting with the Cloudinary API. KEEP THIS SAFE! 

### Local development

After the above requirements have been met, you can develop on this locally by:

1. Clone this repository and `cd` into it

```bash
git clone git@github.com:jaysonjphillips/deno_cloudinary.git
cd deno_cloudinary
```

2. If you'd like to give it a test spin, ensure your environment variables are setup as: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.

3. Next, you can run any of the examples using deno"

```bash
deno run --allow-net --allow-env examples/admin_get_resources.ts
```

### Coding Standards

- We will follow and expect adherence to the `deno` [style guide](https://deno.land/manual/contributing/style_guide)

### Tests

TBD/TODO: Test the main client

## Contributing

TBD
(TODO: Establish Code of Conduct, Contributors Policy)

[Visit the project on GitHub]()

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.
