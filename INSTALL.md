# Topal Live Patch Pack

Bu paket önceki paket gibi sadece yönerge değildir. Bu paket siteye eklendiğinde değişiklikleri DOM üzerinde zorla uygular.

## Ne yapıyor?

1. Browser tab favicon’unu el yazısı Topal ikonu yapar.
2. Sticky tab bar / navigation içine el yazısı Topal logosunu ekler.
3. “Muhammet Topal” ana başlığını ve “Academic Portfolio and Personal Blog” alt başlığını korur.
4. About Me sayfasında büyük tekrar eden “About Me” başlığını gizler.
5. About Me metninin üstüne iki kolonu kapsayan yatay Topal divider ekler.
6. Blog search/filter panelini genişletir.
7. Search, All formats, All tags, Newest first gibi kırpılan metinleri rahatlatır.
8. Blogda Essays ve Podcasts boş olsa bile başlıklarını ve “No essays yet.” / “No podcasts yet.” mesajlarını gösterir.

## Kurulum

### 1. Dosyaları siteye koy

`assets/` içindeki tüm dosyaları sitenin public asset klasörüne koy.

Genellikle şu klasörlerden biridir:

```text
public/assets/
assets/
static/assets/
```

URL’de dosyalar şu şekilde açılabilmeli:

```text
https://muhammettopal.com/assets/topal-wordmark-transparent.png
https://muhammettopal.com/assets/topal-live-patch.css
https://muhammettopal.com/assets/topal-live-patch.js
```

### 2. Site-wide layout içine ekle

Ana layout/head dosyana şunu ekle:

```html
<link rel="stylesheet" href="/assets/topal-live-patch.css">
<script src="/assets/topal-live-patch.js" defer></script>
```

Bunu sadece About veya Blog sayfasına değil, site-wide layout’a ekle. Böylece her sayfada sticky tab bar logosu görünür.

### 3. Asset path farklıysa

Eğer assets klasörü `/assets/` değilse, script’ten önce bunu ekle:

```html
<script>
  window.TOPAL_ASSET_BASE = "/YOUR-PATH-HERE/";
</script>
<link rel="stylesheet" href="/YOUR-PATH-HERE/topal-live-patch.css">
<script src="/YOUR-PATH-HERE/topal-live-patch.js" defer></script>
```

Örnek:

```html
<script>
  window.TOPAL_ASSET_BASE = "/static/";
</script>
<link rel="stylesheet" href="/static/topal-live-patch.css">
<script src="/static/topal-live-patch.js" defer></script>
```

## Kontrol

Tarayıcıda hard refresh yap:

Mac:
```text
Cmd + Shift + R
```

Chrome’da ayrıca:
```text
DevTools > Network > Disable cache
```

Sonra kontrol et:

1. Browser tab ikonunda el yazısı Topal görünüyor mu?
2. Sticky tab bar içinde Home’dan önce küçük el yazısı Topal logosu var mı?
3. Ana header hâlâ “Muhammet Topal” mı?
4. “Academic Portfolio and Personal Blog” hâlâ duruyor mu?
5. About sayfasında büyük tekrar eden “About Me” gizlendi mi?
6. About metninin üstünde yatay Topal divider var mı?
7. Blog filter alanları genişledi mi?
8. All seçiliyken Essays, Podcasts, Videos başlıkları görünüyor mu?
9. Essays seçilince başlık ve “No essays yet.” görünüyor mu?
10. Podcasts seçilince başlık ve “No podcasts yet.” görünüyor mu?

## Eğer hâlâ hiçbir şey değişmezse

Bu iki dosyadan biri yüklenmiyordur:

```text
/assets/topal-live-patch.css
/assets/topal-live-patch.js
```

Bunu browser’da doğrudan açmayı dene. 404 veriyorsa path yanlıştır.

Doğrudan test URL’leri:

```text
https://muhammettopal.com/assets/topal-live-patch.css
https://muhammettopal.com/assets/topal-live-patch.js
https://muhammettopal.com/assets/topal-wordmark-transparent.png
```

Bu üçünün de açılması gerekir.
