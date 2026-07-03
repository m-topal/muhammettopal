# v19 Blog Shelves Patch

Apply this patch by uploading/replacing these two files in your GitHub repo:

- `blog.md`
- `assets/css/style.css`

What it does:
- Changes the blog homepage from one vertical list to three horizontal shelves:
  - 📝 Essays
  - 🎙️ Podcasts
  - 🎬 Videos
- Keeps each post clickable.
- Shows YouTube previews on the Videos shelf when the video post has `youtube_id`.

For your video post, the front matter should include:

```yaml
category: video
format: video
youtube_id: MzwBaoCErMo
```

For essays:

```yaml
category: essay
format: essay
```

For podcasts:

```yaml
category: podcast
format: podcast
```
