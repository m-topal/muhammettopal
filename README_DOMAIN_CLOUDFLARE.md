# Connecting muhammettopal.com through Cloudflare and GitHub Pages

This package already includes:

- `CNAME` file with `muhammettopal.com`
- `_config.yml` set for the custom domain:
  - `url: "https://muhammettopal.com"`
  - `baseurl: ""`

## GitHub Pages settings

1. Upload the contents of this folder to the root of the GitHub repository.
2. Go to the repository on GitHub.
3. Open Settings → Pages.
4. Under Custom domain, enter:

   muhammettopal.com

5. Save.
6. After DNS works, enable “Enforce HTTPS.”

## Cloudflare DNS

In Cloudflare, go to DNS → Records.

For the root domain, add A records pointing to GitHub Pages:

- Type: A, Name: @, Content: 185.199.108.153
- Type: A, Name: @, Content: 185.199.109.153
- Type: A, Name: @, Content: 185.199.110.153
- Type: A, Name: @, Content: 185.199.111.153

For www, add:

- Type: CNAME, Name: www, Target: m-topal.github.io

## Cloudflare SSL/TLS

Use SSL/TLS mode: Full.

If GitHub says the domain is not ready yet, wait a few minutes and check again. DNS propagation can take time.
