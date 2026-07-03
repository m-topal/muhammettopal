# Muhammet Topal Full Static Site

Bu paket tam çalışan standalone statik site paketidir.

Önemli:
Bu senin mevcut sitenin gerçek source dosyası değildir. Mevcut sitenin source dosyalarını upload etmeden onu birebir değiştiremem. Bu paket, doğrudan deploy edilebilecek tam bir replacement/static version olarak hazırlandı.

## İçindekiler

- index.html
- about.html
- research.html
- teaching.html
- publications.html
- presentations.html
- extra-curricular.html
- diversions.html
- cv.html
- contact.html
- blog.html
- css/style.css
- js/site.js
- assets/topal-wordmark-transparent.png
- favicon dosyaları
- site.webmanifest

## Yapılanlar

- Ana header korunur:
  - Muhammet Topal
  - Academic Portfolio and Personal Blog
- El yazısı Topal wordmark sticky tab bar içinde her sayfada görünür.
- El yazısı Topal favicon/browser tab icon olarak ayarlanmıştır.
- About Me sayfasında büyük tekrarlayan title yoktur.
- About Me’de iki kolonu kapsayan yatay Topal divider vardır.
- Blog search/filter bar geniştir.
- Search, All formats, All tags, Newest first gibi alanlar kırpılmaz.
- Blogda All seçilince Essays, Podcasts, Videos bölümleri birlikte görünür.
- Essays veya Podcasts boş olsa bile başlıkları ve empty-state mesajları görünür.
- Videos seçilince mevcut video kartı görünür.

## Nasıl test edilir?

Klasörü aç ve `index.html` dosyasını browser’da aç.

Daha iyi test için terminalden:

```bash
cd muhammet_topal_full_static_site
python3 -m http.server 8000
```

Sonra aç:

```text
http://localhost:8000
```

## Nasıl deploy edilir?

Bütün klasörü hosting sistemine yükleyebilirsin.

GitHub Pages, Netlify, Vercel static, cPanel veya herhangi bir statik host çalışır.

## İçeriği nereden değiştireceksin?

- About metni: `about.html`
- Blog postları: `js/site.js` içindeki `posts` array
- Genel tasarım: `css/style.css`
- Header/navigation: her HTML dosyasındaki `<nav class="sticky-nav">` kısmı

## Mevcut sitene birebir patch için

Bir dahaki sefere mevcut sitenin full source ZIP’ini upload et:

- package.json
- src/
- app/
- pages/
- components/
- layouts/
- public/
- assets/
- styles/

Şunları upload etme:

- node_modules/
- .next/
- dist/
- build/
- .cache/
- .env
