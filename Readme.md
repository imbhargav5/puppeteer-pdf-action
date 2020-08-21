## Puppeteer PDF Action

It runs puppeteer to get print a PDF version of a URL.

A very handy action if you want to generate resumes/cover letters using your portfolio website. 


## Usage

```
steps:
  - name: Convert https://imbhargav5.com to PDF
    uses: "imbhargav5/puppeteer-pdf-action@master"
    with:
      url: https://github.com
      output-file-path: github.pdf
```